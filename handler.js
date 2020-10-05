const { Packet } = require("./packet");
const { LOGIN_REQUEST, TELEPORT_REQUEST, KICK_REQUEST, TPTOUSER_REQUEST, CHATBAN_REQUEST, MESSAGE_REQUEST } = require('./packetTypes');

class Handler {
    static creator(packetId) {
        const packet = new Packet();
        packet.setId(packetId);
        return packet;
    }

    static createMessagePacket(username, message) {
        const packet = this.creator(MESSAGE_REQUEST);
        packet.writeString(username);
        packet.writeString(message);
        return packet.build();
    }

    static createLoginPacket(username, password) {
        const packet = this.creator(LOGIN_REQUEST);
        packet.writeString(username);
        packet.writeString(password);
        return packet.build();
    }

    static createKickPacket(username) {
        const packet = this.creator(KICK_REQUEST);
        packet.writeString(username);
        return packet.build();
    }

    static createChatBanPacket(username, time, reason) {
        const packet = this.creator(CHATBAN_REQUEST);
        packet.writeString(username);
        packet.writeWord(time);
        packet.writeString(reason);
        return packet.build();
    }

    static createTeleportPacket(server, channel, map, x, y, z, charName) {
        const packet = this.creator(TELEPORT_REQUEST);
        packet.writeByte(server); // server
        packet.writeByte(channel); // channel
        packet.writeWord(map); // map
        packet.writeFloat(x); // x
        packet.writeFloat(y); // y
        packet.writeFloat(z); // z
        packet.writeWord(0x0100); // random
        packet.writeString(charName); // player name
        return packet.build();
    }

    static createTeleportToUserPacket(server, charName, charNameTarget) {
        const packet = this.creator(TPTOUSER_REQUEST);
        packet.writeByte(server); // server
        packet.writeString(charNameTarget); // target name
        packet.writeWord(0x0001); // random
        packet.writeString(charName); // player name
        return packet.build();
    }
}

module.exports = {
    Handler
}