const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');
const socketHandler = require('./socket/socketHandler');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

socketHandler(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server on port ${PORT}`));
