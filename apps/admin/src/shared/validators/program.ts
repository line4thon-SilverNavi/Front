export const isFutureDate = (yyyy_mm_dd: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(yyyy_mm_dd);
  return d.getTime() > today.getTime();
};

export const isHHmm = (t: string) => /^\d{2}:\d{2}$/.test(t);

export const phonePattern =
  /^(0\d{1,2}-\d{3,4}-\d{4})$|^(01[016789]-\d{3,4}-\d{4})$/;

export const isValidPhone = (s?: string | null) => !s || phonePattern.test(s);

export const toLocalDateInput = (d: Date = new Date()) =>
  d.toISOString().slice(0, 10);
