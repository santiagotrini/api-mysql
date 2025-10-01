# Un ejemplo de API tipo REST usando MySQL/MariaDB y NodeJS/Express

Este ejemplo es solo para los alumnos de cuarto cuarta, si no estás en cuarto cuarta no sigas leyendo por favor, retirate.

## Paso 1

Crear una base de datos como para que tenga una base de datos de verdad el ejemplo. No es tema de esta materia, eso lo saben de base de datos.

Tenemos dos scripts, uno para lo que ustedes conocen como DDL (*data definition language*) y otro para las altas (los `INSERT`).

Hay un tercer archivo que es un script de Bash para tirar los dos comandos que crean la base de datos. Aclaración esto anda en Linux, si tienen Windows desinstalen por favor.

```console
$ git clone https://github.com/santiagotrini/api-mysql
$ cd api-mysql
$ ./make_db.sh
```

## Paso 2

Hacemos un cliente sencillo en HTML, CSS y JS.

```console
$ mkdir client
$ cd client
$ touch index.html styles.css main.js
```

Ver el código del cliente directamente en los archivos del repo. Es mostrar la tabla en HTML nomás.

## Paso 3

El servidor, así le podemos hacer `fetch()` a una API nuestra.

Usamos Node (chequear que esté instalado) y usamos cuatro librerías o paquetes de Node:

1. express
2. mysql
3. cors
4. morgan

Bueno, creamos los archivos necesarios y eso...

```console
$ node -v 
$ npm -v
$ mkdir server
$ cd server
$ npm init -y
$ npm install express mysql cors morgan
$ touch index.js
$ npm start
```

Antes del `npm start` hay que modificar `package.json`.

Agregar el código para que la API funcione a `index.js`.

## Paso 4

Antes de subir a GitHub recordar ignorar el directorio `node_modules`. Cuando clonen hay que reinstalar `node_modules` usando `npm install`.

¿Cómo hago eso? Muy fácil:

```console
echo node_modules > .gitignore
```

En el raíz del proyecto.