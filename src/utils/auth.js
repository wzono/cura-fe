import qs from 'qs';
import moment from 'moment';

export function getToken() {
  const auth = qs.parse(localStorage.getItem('auth'));
  const now = moment();
  return (auth && now.valueOf() - auth.start < auth.expire * 60 * 60 * 1000) ? auth.token : null;
}

export function setToken(token, expire = 24) {
  localStorage.setItem('auth', qs.stringify({
    token,
    expire,
    start: moment().valueOf(),
  }));
}

export function clearToken() {
  localStorage.removeItem('auth');
}
