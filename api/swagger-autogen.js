const swaggerAutogen = require('swagger-autogen')();
import doc from './docs/swaggerDefinitions.json';

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./routes/groups.js', './routes/auth.js', './routes/items.js', './routes/users.js'];

// 🚀 Inyectar manualmente los tags
doc.paths["/groups"].post.tags = ["Groups"];
doc.paths["/groups"].get.tags = ["Groups"];
doc.paths["/groups/{id}"].put.tags = ["Groups"];
doc.paths["/groups/{id}"].delete.tags = ["Groups"];

doc.paths["/auth/login"].post.tags = ["Auth"];

// Generar documentación
swaggerAutogen(outputFile, endpointsFiles, doc);
