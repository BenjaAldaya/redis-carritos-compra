# Sistema de Gestión de Casas de Comidas con Redis

## Descripción

Este proyecto es un sistema de gestión de casas de comidas desarrollado como parte de un seminario de introducción a bases de datos NoSQL. Utiliza Node.js como plataforma de desarrollo y Redis como base de datos, demostrando las ventajas de las bases de datos NoSQL en aplicaciones de tiempo real.

## Funcionalidades Principales

1. **Gestión de Casas de Comidas**
   - Crear y listar casas de comidas
   - Añadir y modificar menús de cada casa de comidas

2. **Manejo de Productos**
   - Agregar nuevos productos a las casas de comidas
   - Listar todos los productos disponibles por casa de comidas

3. **Carritos de Compra en Tiempo Real**
   - Agregar productos de diferentes casas de comidas al carrito
   - Modificar cantidades de productos en el carrito
   - Realizar pedidos

4. **Interfaz de Usuario Intuitiva**
   - Navegación rápida entre casas de comidas
   - Visualización clara del carrito de compras

## Tecnologías Utilizadas

- **Node.js**: Plataforma de desarrollo
- **Redis**: Base de datos NoSQL
- **Express.js**: Framework web para Node.js

## Instalación

1. Instalar Node.js y npm
2. Instalar Redis (ver instrucciones detalladas en la documentación)
3. Clonar el repositorio
4. Ejecutar `npm install` para instalar dependencias
5. Configurar la conexión a Redis en los archivos correspondientes
6. Ejecutar `node app.js` para iniciar la aplicación

## Uso de Redis

El proyecto utiliza varias estructuras de datos de Redis:

- **Sets**: Para almacenar la lista de casas de comidas
- **Hashes**: Para productos de casas de comidas y carritos de cliente
- **Strings**: Para almacenar datos serializados en JSON

Ejemplos de comandos Redis:

```
# Agregar una casa de comidas
SADD casas_de_comidas "Restaurante El Sabroso"

# Agregar un producto
HSET "casa:Restaurante El Sabroso:productos" "Pizza Margherita" '{"nombre":"Pizza Margherita","precio":10.99}'

# Obtener productos de una casa de comidas
HGETALL "casa:Restaurante El Sabroso:productos"
```

## Ventajas de Aprender Redis

1. **Rendimiento Excepcional**: Redis es una base de datos en memoria, lo que proporciona tiempos de respuesta extremadamente rápidos.

2. **Versatilidad**: Ofrece varias estructuras de datos (strings, hashes, lists, sets, sorted sets) que se adaptan a diferentes necesidades.

3. **Escalabilidad**: Facilita la construcción de sistemas distribuidos y altamente escalables.

4. **Persistencia Opcional**: Permite un balance entre velocidad y durabilidad de los datos.

5. **Casos de Uso Diversos**: Ideal para cachés, gestión de sesiones, colas de mensajes, y más.

6. **Simplicidad**: API sencilla y fácil de aprender, con clientes disponibles en muchos lenguajes de programación.

7. **Comunidad Activa**: Amplio soporte y recursos disponibles para el aprendizaje y resolución de problemas.

8. **Demanda en la Industria**: Habilidades en Redis son altamente valoradas en el desarrollo de aplicaciones modernas.
