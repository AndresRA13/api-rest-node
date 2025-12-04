# API REST con NodeJS y Firebase

## Descripción
API REST e-commerce - Tienda Virtual Desarrollada en Node JS - Express - Firebase

## Características
- Gestión completa de productos (Crear, Leer, Actualizar, Eliminar)
- Autenticación basada en tokens JWT
- Almacenamiento en la nube con Firebase Firestore
- Arquitectura modular siguiendo patrones MVC

## Instalación
1. Clonar Repositorio
2. Instalar dependencias

```bash
npm install
```

3. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo y completar los datos requeridos
cp .env-example .env
```

Luego editar el archivo .env con los valores correspondientes para tu entorno

4. Ejecutar en modo desarrollo

```bash
npm run dev
```

## Documentación de la API

### Registro de Usuario

- **POST** `/api/auth/register`
- **Descripción** Registra un nuevo usuario en el sistema
- **Body (JSON):** 

```json
{
    "email": "usuario@example.com",
    "password": "contraseña_segura"
}
```

- **Respuesta ejemplo:**

```json
{
    "id": "ABC123",
    "email": "usuario@example.com"
}
```

### Inicio de Sesión

- **POST** `/api/auth/login`
- **Descripción:** Inicia sesión de un usuario existente
- **Body (JSON):** 

```json
{
    "email": "usuario@example.com",
    "password": "contraseña_segura"
}
```

- **Respuesta ejemplo:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Obtener todos los productos

- **GET** `/api/products`
- **Descripción** Devuelve la lista de todos los productos
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Respuesta ejemplo**

```json
[
    { 
        "id": "1", 
        "name": "Camiseta Deportiva",
        "price": 150,
        "category": ["ropa", "deportes"]
    },
    { 
        "id": "2", 
        "name": "Zapatos Running",
        "price": 1200,
        "category": ["calzado", "deportes"]
    },
    { 
        "id": "3", 
        "name": "Mochila Escolar",
        "price": 350,
        "category": ["accesorios", "escolar"]
    }
]
```

### Buscar productos por nombre

- **GET** `/api/products/search?name=palabra`
- **Descripción** Devuelve los productos cuyo nombre contiene la palabra
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Parámetros**
  - `name` (query, requerido): texto a buscar en el nombre del producto
- **Ejemplo de uso:** `/api/products/search?name=camiseta`
- **Respuesta ejemplo**

```json
[
    { 
        "id": "1", 
        "name": "Camiseta Deportiva", 
        "price": 150,
        "category": ["ropa", "deportes"]
    }
]
```

### Obtener Producto por ID

- **GET** `/api/products/:id`
- **Descripción** Devuelve un producto específico por su ID
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Parámetros**
  - `id` (path, requerido): ID del producto
- **Ejemplo de uso:** `/api/products/1`
- **Respuesta ejemplo**

```json
{
    "id": "1", 
    "name": "Camiseta Deportiva", 
    "price": 150,
    "category": ["ropa", "deportes"]
}
```

### Crear Producto

- **POST** `/api/products`
- **Descripción:** Crea un nuevo producto
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Body (JSON):** 

```json
{
    "name": "Producto Nuevo",
    "price": 26,
    "category": [
        "category1",
        "category2"
    ]
}
```

- **Respuesta ejemplo:**

```json
{
    "id": "HW7qWkrUd4A2loxV4qlY",
    "name": "Producto Nuevo",
    "price": 26,
    "category": [
        "category1",
        "category2"
    ]
}
```

### Actualizar Producto (PUT)

- **PUT** `/api/products/:id`
- **Descripción:** Actualiza completamente un producto existente
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Parámetros**
  - `id` (path, requerido): ID del producto a actualizar
- **Body (JSON):** 

```json
{
    "name": "Producto Actualizado",
    "price": 30,
    "category": [
        "categoria1",
        "categoria2"
    ]
}
```

- **Respuesta ejemplo:**

```json
{
    "id": "HW7qWkrUd4A2loxV4qlY",
    "name": "Producto Actualizado",
    "price": 30,
    "category": [
        "categoria1",
        "categoria2"
    ]
}
```

### Actualizar Producto Parcialmente (PATCH)

- **PATCH** `/api/products/:id`
- **Descripción:** Actualiza parcialmente un producto existente
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Parámetros**
  - `id` (path, requerido): ID del producto a actualizar
- **Body (JSON):** 

```json
{
    "price": 35
}
```

- **Respuesta ejemplo:**

```json
{
    "id": "HW7qWkrUd4A2loxV4qlY",
    "name": "Producto Actualizado",
    "price": 35,
    "category": [
        "categoria1",
        "categoria2"
    ]
}
```

### Eliminar un producto

- **DELETE** `/api/products/:id`
- **Descripción:** Elimina un producto por su ID
- **Cabecera requerida:** `Authorization: Bearer <token>`
- **Parámetros:**
   - `id` (path, requerido):  ID del producto a eliminar
- **Respuesta:** 204 No Content