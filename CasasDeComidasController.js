const redis = require('redis');
const { CasaDeComidas } = require('./CasaDeComidas');

class CasasDeComidasController {
    constructor() {
        this.redisClient = redis.createClient({
            url: 'redis://localhost:6379'
        });
        this.redisClient.connect().catch(console.error);
        this.CASAS_KEY = 'casas_de_comidas';
        this.casas = new Map();
    }

    async inicializar() {
        const casasGuardadas = await this.redisClient.sMembers(this.CASAS_KEY);
        console.log(`Cargando ${casasGuardadas.length} casas de comidas...`);
        
        for (const nombreCasa of casasGuardadas) {
            const casa = new CasaDeComidas(nombreCasa, this.redisClient);
            const productos = await casa.listarProductos();
            console.log(`Cargada ${nombreCasa} con ${productos.length} productos`);
            this.casas.set(nombreCasa, casa);
        }
        
        console.log('Inicialización completada');
    }

    async crearCasa(nombre) {
        const existe = await this.redisClient.sIsMember(this.CASAS_KEY, nombre);
        if (!existe) {
            await this.redisClient.sAdd(this.CASAS_KEY, nombre);
            const nuevaCasa = new CasaDeComidas(nombre, this.redisClient);
            this.casas.set(nombre, nuevaCasa);
            console.log(`Casa creada: ${nombre}`);
            return nuevaCasa;
        }
        console.log(`La casa ${nombre} ya existe`);
        return this.casas.get(nombre);
    }

    getCasa(nombre) {
        return this.casas.get(nombre);
    }

    listarCasas() {
        return Array.from(this.casas.keys());
    }

    async agregarProducto(nombreCasa, nombreProducto, precio) {
        const casa = this.getCasa(nombreCasa);
        if (casa) {
            return await casa.agregarProducto(nombreProducto, precio);
        }
        return null;
    }

    async listarProductos(nombreCasa) {
        const casa = this.getCasa(nombreCasa);
        if (casa) {
            return await casa.listarProductos();
        }
        return [];
    }
}

module.exports = CasasDeComidasController;