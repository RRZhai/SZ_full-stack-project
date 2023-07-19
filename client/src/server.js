const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    console.log('connected')
    socket.on('message', payload => {
        console.log('message received', payload)
        io.emit('message', payload)
    })
})

server.listen(8080, () => {
    console.log('Server is running on port 8080')
})