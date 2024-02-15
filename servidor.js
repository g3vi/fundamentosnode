import express from 'express'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import { initializeApp, registerVersion } from "firebase/app";
import { collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

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

app.post('/signup', (req, res) => {
    const { nombre, apaterno, amaterno, telefono, usuario, password } = req.body
    //console.log('@@ body => ', req.body)
    if (nombre.length < 3){
        res.json({'alerta': 'El nombre debe tener minimo 3 letras'})
    } else if (!apaterno.length) {
        res.json({'alerta': 'El apeido paterno no puede ser vacio'})
    } else if (!usuario.length) {
        res.json({'alerta': 'El usuario no puede ser vacio'})
    } else if (!password.length < 6 ) {
        res.json({'alerta': 'La contraseña requiere al menos 6 caracteres'})
    } else {
        // Guardar en la base de datos
        const usuarios = collection(db, 'usuarios')
        getDoc(doc(usuarios, usuario)).then (user => {
            if (user.exists()) {
                res.json({'alerta': 'El usuario ya existe'})
            } else {
                // Me quede en el minuto 43:12 del video del 29
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash

                        setDoc(doc(usuarios, usuario), req.body)
                            .then(registered => {
                                res.json({
                                    'alert': 'success',
                                    'data': registered
                                })
                            })
                    })
                })
            }
        })
    }
})

/*app.get('/contacto', (req, res) => {
    res.send('  🐱‍👤 Respuesta de contacto 👏')
})*/

app.post('/login', (req, res) => {
    const { usuario, password } = req.body

    if(!usuario.length || !password.lenght) {
        return res.json({
            'alerta': 'Algunos campos estan vacios'
        })
    }
    const usuarios = collection(db, 'usuarios')
    getDoc(doc(usuarios, usuario))
        .then(user => {
            if(!user.exists()) {
                res.json({
                    'alerta': 'El usuario no existe'
                })
            } else {
                bcrypt.compare(password, user.data().password, (err, result) => {
                    if(result) {
                        let userFound = user.data()
                        res.json({
                            'alert': 'seccess',
                            'usuario': {
                                'nombre': userFound.nombre,
                                'apaterno': userFound.apaterno,
                                'amaterno': userFound.amaterno,
                                'usuario': userFound.usuario,
                                'telefono': userFound.telefono
                                // hasta aqui termina la clase del 29 de enero.
                            }
                        })
                    } else {
                        res.json({
                            'alerta': 'La contraseña no coincide'
                        })
                    }
                })
            }
        })
})

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log('Servidor en Funcionamiento 🐕: ',port)
})