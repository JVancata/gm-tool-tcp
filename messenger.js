const net = require("net");
const { EventEmitter } = require("events");
const { Handler } = require("./handler");
const { Packet } = require("./packet");
const { replaceInvalidChars } = require("./replaceInvalidChars");
const { LOGIN_RECEIVE, SERVER_LIST_RECEIVE, MONSTER_FIND_RECEIVE } = require("./packetTypes");

class Messenger extends EventEmitter {
    constructor(username, password, host, port) {
        super();
        this.username = username;
        this.password = password;
        this.authority = 0;
        this.isConnected = false;
        this.host = host;
        this.port = port;

        this.client = new net.Socket();

        this.client.on('connect', (connect) => {
            console.log("Connected");
            this.login();
            this.isConnected = true;
            this.emit('connect', connect);
        });
        // Returns packet
        this.client.on('data', (data) => {
            try {
                const packet = new Packet(Buffer.from(data, 'ascii'));
                const { id } = packet;

                switch (id) {
                    case LOGIN_RECEIVE: {
                        const hasError = packet.readByte();
                        const receivedAuthority = packet.readByte();
                        if (hasError) {
                            throw "Connection failed";
                        }
                        this.authority = receivedAuthority;
                        this.emit('authorityChange');
                        break;
                    }
                    case SERVER_LIST_RECEIVE: {
                        const serverCount = packet.readDWord();
                        const servers = [];
                        for (let i = 0; i < serverCount; i++) {
                            const serverId = packet.readByte();
                            const serverName = packet.readString();
                            servers.push({ id: serverId, name: serverName });
                        }
                        this.emit('servers', servers);
                        break;
                    }
                    case MONSTER_FIND_RECEIVE: {
                        const mapId = packet.readWord();
                        const spawnId = packet.readWord();
                        const count = packet.readByte();
                        const monsters = [];
                        for (let i = 0; i < count; i++) {
                            const monId = packet.readDWord();
                            const hostId = packet.readDWord();
                            // Stat 0: Not spawned
                            // Stat 1: Alive
                            // Stat 2: ???
                            // Stat 3: Dead
                            const monStat = packet.readByte();
                            const x = packet.readFloat();
                            const y = packet.readFloat();
                            const z = packet.readFloat();

                            monsters.push({ monId, hostId, monStat, x, y, z });
                        }
                        const objectToSend = { mapId, spawnId, count, monsters };
                        this.emit('monsterSpawns', objectToSend);
                        break;
                    }
                    default:
                        break;
                }
                this.emit('data', packet)
            }
            catch (e) {
                // emit connection error
                console.log(e);
            }
        });
        this.client.on('error', (error) => { this.emit('error', error) });

        this.client.connect({
            port,
            host
        });
    }

    login() {
        this.client.write(Handler.createLoginPacket(this.username, this.password));
    }

    teleportPlayer(server, channel, map, x, y, z, charName) {
        this.client.write(Handler.createTeleportPacket(server, channel, map, x, y, z, charName));
    }

    teleportPlayerToUser(server, charName, charNameTarget) {
        this.client.write(Handler.createTeleportToUserPacket(server, charName, charNameTarget));
    }

    messagePlayer(username, message) {
        this.client.write(Handler.createMessagePacket(username, replaceInvalidChars(message)));
    }

    kickPlayer(username) {
        this.client.write(Handler.createKickPacket(username));
    }

    chatBanPlayer(username, time, reason) {
        this.client.write(Handler.createChatBanPacket(username, time, replaceInvalidChars(reason)));
    }

    teleportPlayerToTeleportLocation(TeleportLocation, charName) {
        this.client.write(Handler.createTeleportPacket(TeleportLocation.server, TeleportLocation.channel, TeleportLocation.map, TeleportLocation.x, TeleportLocation.y, TeleportLocation.z, charName));
    }

    announceMessage(server, message) {
        this.client.write(Handler.createAnnouncementPacket(server, replaceInvalidChars(message)));
    }

    findMonster(server, channel, mapId, spawnId) {
        this.client.write(Handler.createMonsterFindPacket(server, channel, mapId, spawnId));
    }

    spawnMonster(server, channel, mapId, monId, action, triggerId, hostId, rhID, rhType, spawnId) {
        this.client.write(Handler.createMonsterActionPacket(server, channel, mapId, monId, action, triggerId, hostId, rhID, rhType, spawnId));
    }

    disconnect() {
        this.client.end();
    }
}


module.exports = { Messenger };