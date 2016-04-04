#DESCRIPCIÓN

Desarrollo de una API mediante el uso de las tecnologías Node.js, express y Mongo.db.
Nodepop es una plataforma de venta o búsqueda de artículos de segunda mano.

#INTRUCCIONES DE USO DE BackEndBill

##INSTALACIÓN

Comenzaremos con `$npm install` para instalar todas las dependencias.

Para iniciar el BackEnd eliminando los datos que se encuentran en la DB y que aparezcan los datos por defecto ejecutar comando:
`$npm run install_db` (ya que en dicha variable tenemos introducido el script que queremos que se ejecute al iniciar la app).

Deberás tener abierta la conexión a la DB de Mongo y un terminal en el que corras la API, es decir:
	-Iniciado startMongo
	-Iniciado Mongo
	-nodemon

##RUTAS

Todo lo relacionado con facturas (GET y POST) --> http://localhost:3000/api/v1/facturas
Todo lo relacionado con usuarios (GET y POST) --> http://localhost:3000/routes/users



