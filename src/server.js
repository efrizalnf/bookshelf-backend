const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = '5000';
const host = 'localhost';
const initServer = async () => {
    const server = Hapi.server({
        host, port,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.route(routes);
    await server.start();
    console.log(`Server dimulai pada alamat : ${server.info.uri}`);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

initServer({
    host, port
})



