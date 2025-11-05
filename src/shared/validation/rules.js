import { MESSAGES, namePattern, phonePattern, emailPattern } from "./patterns";

export const nameRules = (opts = {}) => ({
  required: opts.requiredMsg || MESSAGES.nameRequired,
  pattern: {
    value: namePattern,
    massage: opts.invalidMsg || MESSAGES.nameInvalid,
  },
});

export const phoneRules = (opts = {}) => ({
  required: opts.requiredMsg || MESSAGES.phoneRequired,
  pattern: {
    value: phonePattern,
    massage: opts.invalidMsg || MESSAGES.phoneInvalid,
  },
});

export const emailRules = (opts = {}) => ({
  required: opts.requiredMsg || MESSAGES.emailRequired,
  pattern: {
    value: emailPattern,
    massage: opts.invalidMsg || MESSAGES.emailInvalid,
  },
});
