const MESSAGES = [],
      assign = Object.assign.bind(Object);

import uniqueId from 'lodash/utility/uniqueId';

MESSAGES.add = ({message, user}) => {
  const newMessage = assign({}, message, {
    id: uniqueId('message_'),
    from: user._.nickname,
    date: new Date()
  });

  MESSAGES.push(newMessage);
  return newMessage
};

export default MESSAGES