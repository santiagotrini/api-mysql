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