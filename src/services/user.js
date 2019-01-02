
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

export function deleteFriend(friendCuraNumber) {
  return $request('/api/friend/delete', {
    method: 'delete',
    data: {
      friendCuraNumber,
    }
  })
}

export function updateFriendRemark({friendCuraNumber, remark}) {
  return $request('/api/friend/update_remark', {
    method: 'put',
    data: {
      friendCuraNumber,
      remark
    }
  })
}

export function updateFriendGroup({ friendCuraNumber, groupId }) {
  return $request('/api/friend/move', {
    method: 'put',
    data: {
      friendCuraNumber,
      groupId
    }
  })
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

export function updateAvatar(formdata) {
  return $request('/api/user/update_headUrl', {
    method: 'put',
    data: formdata,
  })
}

export function updatePhone(phone) {
  return $request('/api/user/update_phone', {
    method: 'put',
    data: {
      phone,
    }
  })
}

export function updateNickname(nickname) {
  return $request('/api/user/update_nickname', {
    method: 'put',
    data: {
      nickname,
    }
  })
}

export function updateExtraInfo(info) {
  return $request('/api/user/update_user_info', {
    method: 'put',
    data: info,
  })
}

export function deleteGroup(groupId) {
  return $request('/api/user/delete_group', {
    method: 'delete',
    data: {
      groupId,
    }
  })
}

export function addGroup(groupName) {
  return $request('/api/user/add_group', {
    method: 'post',
    data: {
      groupName,
    }
  })
}

export function updateGroupName({id, name}) {
  return $request('/api/user/update_group_name', {
    method: 'put',
    data: {
      groupId: id,
      groupName: name
    }
  })
}

export function clearChatHistory(friendCuraNumber) {
  return $request('/api/friend/delete_chat', {
    method: 'delete',
    data: {
      friendCuraNumber,
    }
  })
}

export function downloadChatHistory(friendCuraNumber) {
  return $request('/api/friend/download', {
    method: 'post',
    data: {
      friendCuraNumber,
    }
  })
}

export function deleteCommend(commendId) {
  return $request('/api/user/delete_commend', {
    method: 'delete',
    data: {
      commendId,
    }
  })
}
