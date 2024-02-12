const http = require('http')
const port = 5000

const server = http.createServer((req, res) => {
    res.end('Arre 🐿')
})

server.listen(port, () => {
    console.log('Servidor en Ejecucion 🐕')

})