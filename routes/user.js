const app = require('express')
const router = app.Router()
const UserModal = require('../Model/user')

// Get All Users
router.get('/', async (req, res) => {
    const users = await UserModal.find()
    console.log('users-<', users)
    res.status(200).send({
        status: 200,
        users
    })
})


// Get Single User
router.get('/:id', async (req, res) => {
    const user = await UserModal.findById(req.params.id)
    if (!user) {
        res.status(500).send({ status: 500, error: true, msg: "user not found" })
    }
    if (user) {
        res.status(200).send({ status: 200, user })
    }
})

router.get('/findByEmail', async (req, res) => {
    const user = await UserModal.find({ email: req.query.email })
    if (!user) {
        res.status(500).send({ status: 500, error: true, msg: "user not found" })
    }
    if (user) {
        res.status(200).send({ status: 200, user })
    }
})


router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const user = await UserModal.create({ ...req.body })
        res.status(200).send({ status: 200, user })

    }
    catch (err) {
        res.status(500).send({ status: 500, error: err, msg: "internal sever error" })

    }
    // users.push({ name: req.body.name, id: users.length + 1 })
})


router.delete('/:id', (req, res) => {
    users.splice(req.params.id - 1, 1)
    res.status(200).send({ status: 200, users })
})

router.put('/:id', (req, res) => {

    if (users[req.params.id - 1]) {
        users[req.params.id - 1].name = req.body.name
        res.status(200).send({ status: 200, user: users[req.params.id - 1] })

    } else {


    }
    res.status(200).send({ status: 200, users })
})



module.exports = router
