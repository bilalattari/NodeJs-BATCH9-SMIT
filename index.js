const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')

mongoose.connect('mongodb+srv://blog:blog@cluster0.hw5owlh.mongodb.net/').then(() => {
    console.log('Mongodb Connected')
}).catch((err) => console.log(err))

function middleware(req, res, next) {
    console.log('Middleware console')
    next()
}
app.use(morgan('tiny'))
app.use(middleware)
app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        status: 200,
        msg: "API is working fine with nodemon"
    })
})

app.get('/about', (req, res) => {
    res.send({
        status: 200,
        msg: "About Route"
    })
})


app.use('/user', userRoutes)
app.use('/blogs', blogRoutes)

const port = 3000

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
