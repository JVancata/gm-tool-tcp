class TeleportLocation {
    constructor(x, y, z, server, channel, map) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.server = server;
        this.channel = channel;
        this.map = map;
    }
}

module.exports = {TeleportLocation};