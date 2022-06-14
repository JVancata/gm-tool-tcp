const BASE_ID = 0x1108;

const LOGIN_REQUEST = BASE_ID + 0x0001;
const LOGIN_RECEIVE = BASE_ID + 0x0002;
const SERVER_LIST_RECEIVE = BASE_ID + 0x0005;
const KICK_REQUEST = BASE_ID + 0x002B;
const TELEPORT_REQUEST = BASE_ID + 0x002D;
const MESSAGE_REQUEST = BASE_ID + 0x003C;
const TPTOUSER_REQUEST = BASE_ID + 0x0043;
const CHATBAN_REQUEST = BASE_ID + 0x004C;
const ANNOUNCE_REQUEST = BASE_ID + 0x0029;
const MONSTER_FIND_REQUEST = BASE_ID + 0x0036;
const MONSTER_FIND_RECEIVE = BASE_ID + 0x0037;
const MONSTER_SPAWN_REQUEST = BASE_ID + 0x0038;

module.exports = {
    LOGIN_REQUEST,
    TELEPORT_REQUEST,
    KICK_REQUEST,
    TPTOUSER_REQUEST,
    CHATBAN_REQUEST,
    MESSAGE_REQUEST,
    LOGIN_RECEIVE,
    SERVER_LIST_RECEIVE,
    ANNOUNCE_REQUEST,
    MONSTER_FIND_REQUEST,
    MONSTER_SPAWN_REQUEST,
    MONSTER_FIND_RECEIVE
};