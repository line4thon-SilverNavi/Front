export function setTokens({
  access,
  refresh,
  careGrade,
  name,
}: {
  access: string;
  refresh: string;
  careGrade?: string | null;
  name?: string;
}) {
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  if (careGrade) {
    localStorage.setItem("careGrade", careGrade);
  }
  if (name) {
    localStorage.setItem("careGrade", name);
  }
}

export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("careGrade");
  localStorage.removeItem("name");
}
