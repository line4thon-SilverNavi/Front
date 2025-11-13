export const fmtPhone = (raw: string) => {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("02")) {
    return digits.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
  }
  return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};
