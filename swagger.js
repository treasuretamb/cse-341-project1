const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts Api',
    description: 'Contacts Api'
  },
  host: 'cse-341-project1-5d6k.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);