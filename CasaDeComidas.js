const redis = require('redis');

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class CasaDeComidas {
    constructor(nombre) {
        this.nombre = nombre;
        this.redisClient = redis.createClient({
            url: 'redis://localhost:6379'
        });
        this.redisClient.connect().catch(console.error);
    }

    async agregarProducto(nombre, precio) {
        const producto = new Producto(nombre, precio);
        await this.redisClient.hSet(`casa:${this.nombre}:productos`, nombre, JSON.stringify(producto));
        return producto;
    }

    async eliminarProducto(nombre) {
        const eliminado = await this.redisClient.hDel(`casa:${this.nombre}:productos`, nombre);
        return eliminado > 0;
    }

    async listarProductos() {
        const productos = await this.redisClient.hGetAll(`casa:${this.nombre}:productos`);
        return Object.values(productos).map(p => JSON.parse(p));
    }

    async buscarProducto(nombre) {
        const producto = await this.redisClient.hGet(`casa:${this.nombre}:productos`, nombre);
        return producto ? JSON.parse(producto) : null;
    }

    async cerrar() {
        await this.redisClient.quit();
    }
}

module.exports = { CasaDeComidas, Producto };