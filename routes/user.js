const app = require('express')
const router = app.Router()

const users = [
    {
        name: 'Bilal',
        id: 1
    },
    {
        name: 'Faiz',
        id: 2
    },
    {
        name: 'Ahbaab',
        id: 3
    }
]

// Get All Users
router.get('/', (req, res) => {
    res.status(200).send({
        status: 200,
        users: users
    })
})


// Get Single User
router.get('/:id', (req, res) => {
    const user = users.find((data) => data.id == req.params.id)
    if (!user) {
        res.status(500).send({ status: 500, error: true, msg: "user not found" })

    }
    if (user) {
        res.status(200).send({ status: 200, user })
    }
})

router.post('/', (req, res) => {
    console.log(req.body)
    users.push({name :req.body.name , id : users.length + 1 })
    res.status(200).send({ status: 200, user : {name :req.body.name , id : users.length + 1 } })

})



module.exports = router
