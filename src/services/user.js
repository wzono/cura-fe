
export function login({
  curaNumber,
  password,
}) {
  return $request('/api/user/login', {
    method: 'post',
    data: {
      curaNumber: parseInt(curaNumber, 10),
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


export function getMe() {
  return $request('/api/user/me');
}


export function getContacts() {
  return $request('/api/friend/all');
}

// 搜索其他人来添加好友
export function searchOthers(information) {
  return $request('/api/user/get_users_by_info', {
    method: 'get',
    params: {
      information,
    }
  })
}

export function getUser(curaNumber) {
  return $request('/api/user/get_user', {
    method: 'get',
    params: {
      curaNumber,
    }
  })
}

export function getGroups() {
  return $request('/api/user/groups');
}

export function submitFriendApply({ curaNumber,  remark, groupId }) {
  return $request('/api/friend/add', {
    method: 'post',
    data: {
      curaNumber,
      remark,
      groupId,
    }
  })
}
