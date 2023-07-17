import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

const server = http.createServer(app);
server.listen(port, () => console.log(`Server is running on port ${port}`));
