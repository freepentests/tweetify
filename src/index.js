import { Server } from './Modules/Server.js';

const server = new Server(8080);

server.start(() => {
	console.log('server started');
});

