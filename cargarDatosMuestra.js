const CasasDeComidasController = require('./CasasDeComidasController');

const tiposCocina = [
    'Italiana', 'Mexicana', 'China', 'Japonesa', 'India', 'Tailandesa',
    'Francesa', 'Española', 'Griega', 'Americana', 'Brasileña', 'Argentina',
    'Peruana', 'Vietnamita', 'Coreana', 'Turca', 'Marroquí', 'Libanesa'
];

const tiposEstablecimiento = [
    'Restaurante', 'Cafetería', 'Bistró', 'Taquería', 'Pizzería',
    'Fonda', 'Trattoria', 'Sushi Bar', 'Food Truck', 'Cantina'
];

const nombresComunes = [
    'El', 'La', 'Los', 'Las', 'Don', 'Doña', 'Casa', 'Rincón', 'Sabor',
    'Aroma', 'Delicia', 'Gusto', 'Bocado', 'Manjar', 'Festín'
];

const adjetivos = [
    'Sabroso', 'Delicioso', 'Exquisito', 'Auténtico', 'Tradicional',
    'Gourmet', 'Casero', 'Fresco', 'Aromático', 'Picante'
];

const platosComunes = {
    'Italiana': ['Pizza', 'Pasta', 'Lasaña', 'Risotto', 'Carpaccio', 'Tiramisú'],
    'Mexicana': ['Tacos', 'Enchiladas', 'Guacamole', 'Quesadillas', 'Mole', 'Tamales'],
    'China': ['Arroz frito', 'Chow mein', 'Dumplings', 'Pato Pekín', 'Mapo tofu'],
    'Japonesa': ['Sushi', 'Ramen', 'Tempura', 'Udon', 'Sashimi', 'Miso'],
    'India': ['Curry', 'Tandoori', 'Naan', 'Biryani', 'Samosas', 'Tikka masala'],
    // ... otros tipos de cocina
};

function generarNombreRestaurante() {
    const tipo = tiposEstablecimiento[Math.floor(Math.random() * tiposEstablecimiento.length)];
    const nombre = nombresComunes[Math.floor(Math.random() * nombresComunes.length)];
    const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
    const cocina = tiposCocina[Math.floor(Math.random() * tiposCocina.length)];
    return `${tipo} ${nombre} ${adjetivo} (${cocina})`;
}

function generarProducto(tipoCocina) {
    const platos = platosComunes[tipoCocina] || Object.values(platosComunes).flat();
    const plato = platos[Math.floor(Math.random() * platos.length)];
    const precio = (Math.random() * (25 - 5) + 5).toFixed(2);
    return { nombre: plato, precio: parseFloat(precio) };
}

async function cargarDatosMuestra() {
    const controller = new CasasDeComidasController();
    await controller.inicializar();

    for (let i = 0; i < 50; i++) {
        const nombreRestaurante = generarNombreRestaurante();
        const casa = await controller.crearCasa(nombreRestaurante);
        
        const numProductos = Math.floor(Math.random() * (31 - 20) + 20); // Entre 20 y 30 productos
        const tipoCocina = nombreRestaurante.split('(')[1].split(')')[0];

        const productosPromises = [];
        for (let j = 0; j < numProductos; j++) {
            const producto = generarProducto(tipoCocina);
            productosPromises.push(controller.agregarProducto(nombreRestaurante, producto.nombre, producto.precio));
        }

        await Promise.all(productosPromises);

        console.log(`Creado ${nombreRestaurante} con ${numProductos} productos.`);
    }

    console.log('Carga de datos de muestra completada.');
    
    // Cerrar la conexión con Redis
    await controller.redisClient.quit();
}

cargarDatosMuestra().catch(console.error);