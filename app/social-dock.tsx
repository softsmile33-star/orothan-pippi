import {socialChannels} from '@/lib/social-channels';

const channelOrder = ['youtube', 'naver', 'instagram'];

export default function SocialDock() {
  return <aside className="social-dock" aria-label="공식 소셜 채널과 전화 문의">
    {channelOrder.map(type => {
      const channel = socialChannels.find(item => item.type === type)!;
      return <a key={type} href={channel.href} target="_blank" rel="noopener noreferrer"
        className={`social-channel social-${type}`} aria-label={`${channel.name} · 새 창에서 열기`} title={channel.name}>
        <span className="social-icon" aria-hidden="true">
          {type === 'youtube' ? <svg viewBox="0 0 32 32"><rect x="4" y="7" width="24" height="18" rx="6" fill="white"/><path d="m14 12 7 4-7 4z" fill="#ff0033"/></svg>
            : type === 'instagram' ? <svg viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="2.5"><rect x="5" y="5" width="22" height="22" rx="7"/><circle cx="16" cy="16" r="5"/><circle cx="23" cy="9" r="1.5" fill="white" stroke="none"/></svg>
              : <svg viewBox="0 0 32 32"><path d="M7 7h6l6 10V7h6v18h-6L13 15v10H7z" fill="white"/></svg>}
        </span>
      </a>;
    })}
    <a className="social-channel social-phone" href="tel:01022418301" aria-label="전화 문의 010-2241-8301">
      <span className="social-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.35 1.91.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.69A2 2 0 0 1 22 16.92z"/></svg></span>
      <strong className="phone-heading">상담문의</strong><span className="phone-number">010-2241-8301</span><span className="phone-hours">월~금<br/>09:00~18:00</span>
    </a>
  </aside>;
}
