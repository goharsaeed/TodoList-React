const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors());
const UserRoute = require('./routes/authRoute');
const TodoRoute = require('./routes/todoRoutes');

mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err))

app.use('/', UserRoute);
app.use('/todo', TodoRoute);

app.listen(PORT, () => console.log("Server connected"));