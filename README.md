# API REST con NodeJS y Firebase

## Descripción
API REST eccomerce - Tienda Virtual Desarrollada en Node JS - Express - Firebase

## Instalación
1. Clonar Repositorio
2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
#Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo .env con los valores correpondientes para tu entorno

4. Ejecutar en modo desarrollo

```bash
npm run dev
```

##Documentación de la API

### Obtener todos los productos

- **GET** `/products`
- **Descripción** Devuelve la lista de todos los productos
- **Respuesta ejemplo**

```json
[
    { "id": 1, "name": "Camiseta Deportiva",
    "price": 150
    },
    { "id": 2, "name": "Zapatos Running",
    "price": 1200
    },
    { "id": 3, "name": "Mochila Escolar",
    "price": 350
    }
]
```

### Buscar productos por nombre

- **GET** `/products/search?name=palabra`
- **Descripción** Devuelve los productos cuyo nombre contiene la palabra
- **Parametros**
  - `name` (query, requerido): texto a buscar en el nombre del producto
- **Ejemplo de uso:** `/products/search?name=camiseta`
- **Respuesta ejemplo**

```json
[{ "id": 1, "name": "Camiseta Deportiva", "price": 150}]
```

### Obtener Producto por ID

- **GET** `/products/:id`
- **Descripción** Devuelve un producto especifico por su ID
- **Parametros**
  - `id` (path, requerido): ID del producto
- **Ejemplo de uso:** `/products/1`
- **Respuesta ejemplo**

```json
[{ "id": 1, "name": "Camiseta Deportiva", "price": 150}]
```