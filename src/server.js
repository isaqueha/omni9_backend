const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const router = require('./router');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};


// https://cloud.mongodb.com/v2/5d96469bff7a2577dd4000b4#clusters

mongoose.connect('mongodb+srv://famTree:famTree@famtree-y6fg2.mongodb.net/famTree?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

io.on('connection', socket => {
	const { user_id } = socket.handshake.query;

	connectedUsers[user_id] = socket.id;
})

app.use((req, res, next) => {
	req.io = io;
	req.connectedUsers = connectedUsers;

	return next();
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(router);

server.listen(3333);