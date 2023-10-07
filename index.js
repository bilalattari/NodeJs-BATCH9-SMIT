const express = require('express');
const app = express();
const morgan = require('morgan');

const userRoutes = require('./routes/user')

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

// app.get('/user/:id', (req, res) => {
//     console.log('console.log-->', req.params.id)
//     console.log('console.log-->', req.query)
//     res.send({ 
//         status: 200,
//         msg: "User id is " + req.params.id
//     })
// })

const port = 3000

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
