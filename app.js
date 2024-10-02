const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const CasasDeComidasController = require('./CasasDeComidasController');
const ClienteCarritoController = require('./ClienteCarritoController');

const app = express();
const casasController = new CasasDeComidasController();
const carritoController = new ClienteCarritoController();

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.use(express.urlencoded({ extended: true }));

// Middleware para simular un ID de cliente
app.use((req, res, next) => {
    req.clienteId = 'cliente1'; // En una aplicación real, esto vendría de una sesión o autenticación
    next();
});

// Inicializar el controlador de casas de comidas
casasController.inicializar().then(() => {
    console.log('Controlador de casas de comidas inicializado');
}).catch(console.error);

app.get('/', async (req, res) => {
    const casas = await casasController.listarCasas();
    res.render('index', { title: 'Casas de Comidas', casas });
});

app.get('/', async (req, res) => {
    const casas = casasController.listarCasas();
    res.render('index', { title: 'Casas de Comidas', casas });
});

app.post('/casa', async (req, res) => {
    const { nombre } = req.body;
    await casasController.crearCasa(nombre);
    res.redirect('/');
});

app.get('/casa/:nombre', async (req, res) => {
    const { nombre } = req.params;
    const productos = await casasController.listarProductos(nombre);
    res.render('casa', { title: nombre, nombreCasa: nombre, productos });
});

app.post('/casa/:nombre/producto', async (req, res) => {
    const { nombre } = req.params;
    const { nombre: nombreProducto, precio } = req.body;
    await casasController.agregarProducto(nombre, nombreProducto, parseFloat(precio));
    res.redirect(`/casa/${nombre}`);
});

app.get('/carrito', async (req, res) => {
    const carrito = await carritoController.obtenerCarrito(req.clienteId);
    res.render('carrito', { title: 'Carrito', carrito });
});

app.post('/carrito/agregar', async (req, res) => {
    const { casaNombre, productoNombre, precio, cantidad } = req.body;
    await carritoController.agregarAlCarrito(req.clienteId, casaNombre, productoNombre, parseFloat(precio), parseInt(cantidad));
    res.redirect(`/casa/${casaNombre}`);
});

app.post('/carrito/eliminar', async (req, res) => {
    const { casaNombre, productoNombre } = req.body;
    await carritoController.eliminarDelCarrito(req.clienteId, casaNombre, productoNombre);
    res.redirect('/carrito');
});

app.post('/carrito/limpiar', async (req, res) => {
    await carritoController.limpiarCarrito(req.clienteId);
    res.redirect('/carrito');
});

const PORT = process.env.PORT || 3000;
async function iniciarServidor() {
    try {
        await casasController.inicializar();
        console.log('Controlador de casas de comidas inicializado');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al inicializar el servidor:', error);
        process.exit(1);
    }
}

iniciarServidor();