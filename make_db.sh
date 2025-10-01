#! /bin/bash

echo "Vamo a hacer la base de datos"
mysql < db_schema.sql 2> /dev/null
mysql school < db_data.sql 2> /dev/null
echo "Base de datos lista, piola"