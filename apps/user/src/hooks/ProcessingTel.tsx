
// 전화번호 포맷 변환 함수
// - 하이픈이 있으면 제거 (010-1111-2222 → 01011112222)
// - 하이픈이 없으면 추가 (01011112222 → 010-1111-2222)
 
export const togglePhoneFormat = (phone: string): string => {
  if (!phone) return '';
  
  // 하이픈이 포함되어 있는지 확인
  if (phone.includes('-')) {
    // 하이픈 제거
    return phone.replace(/-/g, '');
  } else {
    // 하이픈 추가
    const cleaned = phone.replace(/\D/g, ''); // 숫자만 추출
    
    // 전화번호 길이에 따라 포맷 적용
    if (cleaned.length === 11) {
      // 010-1234-5678 형식
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (cleaned.length === 10) {
      // 02-1234-5678 또는 031-123-4567 형식
      if (cleaned.startsWith('02')) {
        return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
      } else {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      }
    } else if (cleaned.length === 9) {
      // 02-123-4567 형식
      return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (cleaned.length === 8) {
      // 1234-5678 형식 (지역번호 없는 경우)
      return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
    }
    
    // 그 외의 경우 원본 반환
    return cleaned;
  }
};


//하이픈 제거 전용 함수

export const removeHyphen = (phone: string): string => {
  return phone.replace(/-/g, '');
};


//하이픈 추가 전용 함수

export const addHyphen = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 10) {
    if (cleaned.startsWith('02')) {
      return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
    } else {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  } else if (cleaned.length === 9) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
  } else if (cleaned.length === 8) {
    return cleaned.replace(/(\d{4})(\d{4})/, '$1-$2');
  }
  
  return cleaned;
};
