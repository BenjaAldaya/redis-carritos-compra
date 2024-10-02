const redis = require('redis');

class ClienteCarritoController {
    constructor() {
        this.redisClient = redis.createClient({
            url: 'redis://localhost:6379'
        });
        this.redisClient.connect().catch(console.error);
    }

    async agregarAlCarrito(clienteId, casaNombre, productoNombre, precio, cantidad) {
        const key = `carrito:${clienteId}`;
        const item = JSON.stringify({ casaNombre, productoNombre, precio, cantidad });
        await this.redisClient.hSet(key, `${casaNombre}:${productoNombre}`, item);
    }

    async obtenerCarrito(clienteId) {
        const key = `carrito:${clienteId}`;
        const carrito = await this.redisClient.hGetAll(key);
        return Object.values(carrito).map(item => JSON.parse(item));
    }

    async limpiarCarrito(clienteId) {
        const key = `carrito:${clienteId}`;
        await this.redisClient.del(key);
    }

    async eliminarDelCarrito(clienteId, casaNombre, productoNombre) {
        const key = `carrito:${clienteId}`;
        await this.redisClient.hDel(key, `${casaNombre}:${productoNombre}`);
    }
}

module.exports = ClienteCarritoController;