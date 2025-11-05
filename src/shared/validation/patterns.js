export const namePattern =
  /^[0-9]{9} || [A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
export const phonePattern = /^[+]?[0-9]{9,12}$/;
export const emailPattern = /[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;

export const MESSAGES = {
  nameRequired: "Name is required",
  nameInvalid: "2-60 letters, spaces or hyphens",
  phoneRequired: "Phone is required",
  phoneInvalid: "Use digits, spaces or +. Example: +49 160 2956386",
  emailRequired: "Email is required",
  emailInvalid: "Enter a valid email like name@example.com",
};
