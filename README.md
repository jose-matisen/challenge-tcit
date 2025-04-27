Software desarrollado con React, Redux, Node js y Postgresql
sumando express, cors y prisma

Para iniciar el proyecto y que funcione tiene que ejecuar los siguientes comandos:

1. Instalar dependecencia concurrently
    # npm i

2. Instalar las dependencias del frontend y backend
    # npm run install-fb

3. Ir a la carpeta backend y copiar el archivo .env.example y renombrarlo a .env y las letras mayusculas reemplazarlo con las credenciales de la base de datos en postgresql

3. Migra la base de datos de postgres
    # npm run migrate

4. Generar carpeta generated prisma
    # npm run generate

4. Iniciar el proyecto en react en el puerto 3000 y el del backend en el puerto 3001 al mismo tiempo
    # npm run start

