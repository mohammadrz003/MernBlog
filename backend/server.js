import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
import connectDB from './config/db.js'
import { errorResponserHandler, invalidPathHandler } from './middleware/errorHandler.js'

//Routes
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is running')
})


app.use('/api/users', userRoutes)

//Static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
console.log(path.join(__dirname, "/uploads"));


//ERROR MIDDLEWARE
app.use(invalidPathHandler)
app.use(errorResponserHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})