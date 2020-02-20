const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const router = require('./router');

const app = express();

// https://cloud.mongodb.com/v2/5d96469bff7a2577dd4000b4#clusters

mongoose.connect('mongodb+srv://famTree:famTree@famtree-y6fg2.mongodb.net/famTree?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(router);

app.listen(3333);