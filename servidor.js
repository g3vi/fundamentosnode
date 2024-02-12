const express = require('express')
import { initializeApp } from "firebase/app";
const app = express()
const port = 5002


const firebaseConfig = {
  apiKey: "AIzaSyAI5H-3_qoxDHnEBY9DeO2AwKjOYVzdUQE",
  authDomain: "crud-practica1-aedf1.firebaseapp.com",
  projectId: "crud-practica1-aedf1",
  storageBucket: "crud-practica1-aedf1.appspot.com",
  messagingSenderId: "468172985668",
  appId: "1:468172985668:web:9c5ad33fb46b9ef9e13311"
};

const app = initializeApp(firebaseConfig);

app.get('/', (req, res) => {
    res.send('Respuesta Raiz 👏')
})

app.get('/contacto', (req, res) => {
    res.send('Respuesta de contacto 👏')
})

app.listen(port, () => {
    console.log('Servidor en Funcionamiento 🐕: ',port)
})