import toArray from 'lodash/lang/toArray'
import each from 'lodash/collection/each'




/* our stores */
import USERS from './users';
import MESSAGES from './messages';
/* our stores */


const EVENTS_FROM_CLIENT = {
  /*'i am reconnect, is it something new messages for me?' (user, {channels, users}) {
    // check in mysql all new for this user
    // send by default emit
  },*/
  'i am typing' (user) {
    /*if(user._.isTyping) {
      clearTimeout(user._.timeout);
      user._.timeout = null;
    }

    user._.isTyping = true;

    user._.timeout = setTimeout(() => {
      user._.isTyping = false;
      user._.timeout = null;

      user.sendToAnotherClients('typing-users changed', USERS.getAllTyping())
    }, 3000);

    user.sendToAnotherClients('typing-users changed', USERS.getAllTyping())*/
  },
  'i send the message' (user, message) {
    const newMessage = MESSAGES.add({message, user});
    user.sendToAll('messages added', [newMessage]);
  },
  'connect' (user) {
    USERS.push(user);
    user.sendToAll('online-users changed', USERS.getAll());
  },
  'disconnect' (user) {
    USERS.remove(user);
    user.sendToAll('online-users changed', USERS.getAll());
  }
};


module.exports = function (io) {
  io.on('connection', (socket) => {
    const user = USERS.createUser({io, socket});

    // binding listeners and logging
    each(EVENTS_FROM_CLIENT, function (method, name) {
      user.on(name, function () {
        console.log('[SOCKET] "' + name + '", with arguments:', arguments);
        method.apply(null, [user].concat(toArray(arguments)));
      })
    });

    // call 'connect' events (why not automatic?)
    EVENTS_FROM_CLIENT['connect'](user);
  })
};