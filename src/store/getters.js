const getters = {
  contacts: (state) => {
    const { contacts } = state;
    return contacts.map(contact => ({
      curaNumber: contact.friendCuraNumber,
      group: {
        id: contact.groupId,
        name: contact.groupName,
      },
      remark: contact.remark,
      signature: contact.signature,
      nickname: contact.nickname,
      headUrl: contact.headUrl
    }))
  },
  groups: (state) => {
    const { groups } = state;
    return groups.map(group => ({
      id: group.groupId,
      name: group.groupName,
    }))
  }
}

export default getters;
