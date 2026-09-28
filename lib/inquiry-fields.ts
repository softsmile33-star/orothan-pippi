export const inquiryTypes = ['초등 그림책 인문학 수업','엄마와 아이 그림책 워크숍','그림책 인문학 지도사 과정','도서관·기관 강의','북토크','기타 문의'] as const;
export const successMessage = '문의가 정상적으로 접수되었습니다. 내용을 확인한 후 순차적으로 연락드리겠습니다.';
export const failureMessage = '접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
export function normalizeProgram(value = '') {
  const aliases: Record<string,string> = {'초등 그림책 인문학':'초등 그림책 인문학 수업','엄마와 아이 워크숍':'엄마와 아이 그림책 워크숍','기관 강의·북토크':'도서관·기관 강의','도서 관련 문의':'기타 문의','기타':'기타 문의'};
  const result = aliases[value] || value;
  return inquiryTypes.includes(result as typeof inquiryTypes[number]) ? result : '';
}
