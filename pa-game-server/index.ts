import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import webSocket from 'ws';
import { uuid } from 'uuidv4';

const port = 3000;
const app = express();
const wss = new webSocket.Server({ port: 6661 });

const clients = new Map();

wss.on('connection', (ws) => {
	const id = uuid();
	const color = Math.floor(Math.random() * 360);
	const metadata = { id, color };
	clients.set(ws, metadata);

	ws.on('message', (data) => {
		const message = JSON.parse(data.toString());
		const metadata = clients.get(ws);

		console.log(message, metadata);
	});

	ws.on('close', () => {
		clients.delete(ws);
	});
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json({ status: 'ok' });
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
