import { __values } from "tslib";

export function login({
  cura_number,
  password,
}) {
  return $request('/api/user/login', {
    method: 'post',
    data: {
      cura_number,
      password,
    }
  })
}

export function register({
  phone,
  nickname,
  password,
}) {
  return $request('/api/user/register', {
    method: 'post',
    data: {
      phone,
      nickname,
      password
    }
  })
}


export function getUser() {
  return $request('/api/user/me');
}


export function getContacts() {
  return $request('/api/user/contacts');
}

export function searchOthers(value) {
  return $request('/api/user/search_contacts', {
    method: 'get',
    params: {
      searchValue: value,
    }
  })
}
