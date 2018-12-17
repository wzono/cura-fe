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
