//db
const messages = {};

const addMessage = ({ userid, name, room, message, isActivityMessage }) => {
    room = room.trim();
    const putmessage = { userid, user:name, text:message, time: Date.now(), isActivityMessage: isActivityMessage || false };
    var roommessages = messages[room] || [];
    roommessages.push(putmessage);
    messages[room] = roommessages;
    return true;
}

const getMessages = (room) => {
    return messages[room] || [];
}

const clearChat = (room) => {
    messages[room] = [];
    return true;
}

module.exports = { addMessage, getMessages, clearChat }
