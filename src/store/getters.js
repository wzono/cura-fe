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
      headUrl: contact.headUrl,
      isOnline: contact.isOnline,
    }))
  },
  groups: (state) => {
    const { groups } = state;
    return groups.map(group => ({
      id: group.groupId,
      name: group.groupName,
    }))
  },
  getContact: (state, getters) => curaNumber => {
    return getters.contacts.find(({ curaNumber: c }) => c == curaNumber) || {};
  }
}

export default getters;
