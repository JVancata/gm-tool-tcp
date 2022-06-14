const { Packet } = require("./packet");
const { LOGIN_REQUEST, TELEPORT_REQUEST, KICK_REQUEST, TPTOUSER_REQUEST, CHATBAN_REQUEST, MESSAGE_REQUEST, ANNOUNCE_REQUEST, MONSTER_FIND_REQUEST, MONSTER_SPAWN_REQUEST } = require('./packetTypes');

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

    static createAnnouncementPacket(server, announcement) {
        const packet = this.creator(ANNOUNCE_REQUEST);
        packet.writeDWord(server); // server
        packet.writeString(announcement); // announcement
        return packet.build();
    }

    static createMonsterFindPacket(server, channel, mapId, spawnId) {
        const packet = this.creator(MONSTER_FIND_REQUEST);

        packet.writeByte(server);
        packet.writeByte(channel);
        packet.writeWord(mapId);
        packet.writeWord(spawnId);

        return packet.build();
    }

    static createMonsterActionPacket(server, channel, mapId, monId, action, triggerId, hostId, rhID, rhType, spawnId) {
        const packet = this.creator(MONSTER_SPAWN_REQUEST);

        packet.writeByte(server);
        packet.writeByte(channel);
        packet.writeWord(mapId);
        packet.writeDWord(monId);
        packet.writeByte(action);
        packet.writeDWord(triggerId);
        packet.writeDWord(hostId);
        packet.writeDWord(rhID);
        packet.writeByte(rhType);
        packet.writeWord(spawnId);

        return packet.build();
    }
}

module.exports = {
    Handler
}