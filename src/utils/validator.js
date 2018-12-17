import Validator from 'validator.tool';
import { password } from './regex';
const v = new Validator();

export function isEmail(text) {
  return v.isEmail(text);
}

export function isPhone(text) {
  return v.isPhone(text);
}

export function isPassword(text) {
  return password.test(text);
}

export function required(text) {
  return v.required(text);
}
