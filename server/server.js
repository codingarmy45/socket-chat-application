const express = require('express');
const cookieParser = require('cookie-parser')
const http = require('http');
const socketIOfunc = require('./utils/socket.setup.js');
const connectDB = require('./config/db.js')

const userRouter = require('./routes/user.router.js')
const chatRouter = require('./routes/chat.router.js')
const messageRouter = require('./routes/message.router.js')

require('dotenv').config();
// const cors = require('cors');

const app = express();
const server = http.createServer(app);


const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
socketIOfunc(server, app);


app.use('/api', userRouter);
app.use('/api', chatRouter);
app.use('/api', messageRouter);

connectDB();
server.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
})