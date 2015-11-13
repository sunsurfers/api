import {parse} from 'useragent';

const USERS = [],
      assign = Object.assign.bind(Object);

const DEVUsersNicknames = {
  'Safari': 'marathasanov',
  'Chrome': 'rogozhnikoff',
  'Firefox': 'marinkanamaste'
};

USERS.createUser = ({io, socket}) => {
  // add basic info
  const socketUA = parse(socket.handshake.headers['user-agent']);

  socket._ = assign({}, socket._, {
    nickname: DEVUsersNicknames[socketUA.family] || '[' + (this.length + 1) + ' :: ' + socketUA.os.family + ' : ' + socketUA.family + ']',
    isTyping: false,
    timeout: null
  });

  // extend with useful methods for emiting
  socket.sendToClient = socket.emit.bind(socket);
  socket.sendToAnotherClients = socket.broadcast.emit.bind(socket.broadcast);
  socket.sendToAll = io.emit.bind(io);

  return socket
};

USERS.getAll = () => {
  return USERS.map((user) => user._.nickname)
};
USERS.getAllTyping = () => {
  return USERS.filter((user) => user._.isTyping).map((user) => user._.nickname)
};
USERS.remove = (el) => {
  USERS.splice(USERS.indexOf(el), 1)
  return USERS
};

export default USERS