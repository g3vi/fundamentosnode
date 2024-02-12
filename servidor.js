import express from 'express'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/app"

// Conexion a la base de datos de Firebase
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "crud-practica1-aedf1.firebaseapp.com",
  projectId: "crud-practica1-aedf1",
  storageBucket: "crud-practica1-aedf1.appspot.com",
  messagingSenderId: "468172985668",
  appId: "1:468172985668:web:9c5ad33fb46b9ef9e13311"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Respuesta Raiz 👏')
})

app.get('/contacto', (req, res) => {
    res.send('Respuesta de contacto 👏')
})

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log('Servidor en Funcionamiento 🐕: ',port)
})