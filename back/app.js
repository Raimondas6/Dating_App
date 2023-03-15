const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const http = require('http').createServer(app)
const router = require('./router/mainRouter')
const socketIO = require('socket.io')
const io = socketIO (http, {cors: {origin: 'http://localhost:3000'}})
http.listen(4000)
console.log('server started on port 4000')
app.set('socketio', io)
mongoose.connect(process.env.MONGODB_KEY)
    .then(res => console.log('DB -> ok'))
    .catch(e  => console.log(e));
app.use(cors({
    origin: true,
    credentials: true,
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE"
}))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
app.use('/', router)

let users = []
io.on('connect', socket => {
    socket.on('login', data => {
        users = users.filter(x=>x.socketID!==socket.id)
        users.push({socketID: socket.id, userID:data._id})
    })
    socket.on('alert', data => {
        let user = users.find(x=>x.userID===data.id)
        if (user) io.to(user.socketID).emit('alert', data.message)
    })
})