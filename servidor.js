const express = require('express')
const app = express()
const port = 5002

app.get('/', (req, res) => {
    res.send('Respuesta Raiz 👏')
})

app.get('/contacto', (req, res) => {
    res.send('Respuesta de contacto 👏')
})

app.listen(port, () => {
    console.log('Servidor en Funcionamiento 🐕: ',port)
})