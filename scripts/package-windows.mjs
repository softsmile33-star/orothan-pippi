// Windows equivalent of the bundled Sites packager when Bash is unavailable.
// Reuses its build validation and preparation without changing the artifact contract.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {isDeepStrictEqual} from 'node:util';
const [helper,archiveArg]=process.argv.slice(2);
if(!helper||!archiveArg)throw new Error('Usage: node scripts/package-windows.mjs PREPARE_HELPER ARCHIVE');
const project=process.cwd(),archive=path.resolve(archiveArg);
const stage=fs.mkdtempSync(path.join(os.tmpdir(),'pippi-package-'));
const destination=path.resolve(stage,'dist');
if(!destination.startsWith(path.resolve(os.tmpdir())+path.sep)||path.dirname(destination)!==stage)throw new Error('Invalid stage path');
const run=(cmd,args)=>{const r=spawnSync(cmd,args,{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr||r.stdout||String(r.error));return r.stdout.trim()};
let kind;
if(fs.existsSync(helper)){
  kind=run(process.execPath,[helper,project,destination]);
}else{
  // The original Sites plugin helper is no longer installed on this host.
  // Validate and stage this established Worker build with the same contract.
  const buildRoot=path.resolve(project,'dist');
  if(!fs.statSync(path.join(buildRoot,'server/index.js')).isFile())throw new Error('Missing Worker entrypoint');
  function validateTree(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const file=path.join(dir,entry.name);
    if(entry.isSymbolicLink()||(!entry.isDirectory()&&!entry.isFile()))throw new Error('Unsupported build file');
    if(entry.isDirectory())validateTree(file);
  }}
  validateTree(buildRoot);
  fs.cpSync(buildRoot,destination,{recursive:true,dereference:false});
  kind='worker';
}
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const source=read(path.join(project,'.openai/hosting.json'));
const built=read(path.join(project,'dist/.openai/hosting.json'));
if(source.artifact_metadata&&built.artifact_metadata&&!isDeepStrictEqual(source.artifact_metadata,built.artifact_metadata))throw new Error('Conflicting attribution');
const staged=kind==='worker'?source:read(path.join(destination,'.openai/hosting.json'));
if(built.artifact_metadata??source.artifact_metadata)staged.artifact_metadata=built.artifact_metadata??source.artifact_metadata;
fs.mkdirSync(path.join(destination,'.openai'),{recursive:true});
fs.writeFileSync(path.join(destination,'.openai/hosting.json'),JSON.stringify(staged,null,2)+'\n');
if(fs.existsSync(path.join(project,'drizzle')))fs.cpSync(path.join(project,'drizzle'),path.join(destination,'.openai/drizzle'),{recursive:true});
run('tar',['-C',stage,'-czf',archive,'dist']);
const entries=run('tar',['-tzf',archive]).split(/\r?\n/);
if(!entries.includes('dist/.openai/hosting.json')||!entries.includes('dist/server/index.js'))throw new Error('Invalid archive');
if(entries.some(e=>/(^|\/)\.dev\.vars|(^|\/)\.env($|\.)/.test(e)))throw new Error('Secret file in archive');
console.log(JSON.stringify({archive,files:entries.length,bytes:fs.statSync(archive).size}));
