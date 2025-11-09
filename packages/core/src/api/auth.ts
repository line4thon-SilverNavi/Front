export function setTokens({
  access,
  refresh,
  careGrade,
}: {
  access: string;
  refresh: string;
  careGrade?: string | null;
}) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  if (careGrade) {
    localStorage.setItem("careGrade", careGrade);
  }
}

export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("careGrade");
}
