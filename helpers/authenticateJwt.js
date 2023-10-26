
const jwt = require('jsonwebtoken')
const authenticateJwt = async (req, res, next) => {
    console.log('req.headers-->', req.headers)
    try {
        const token = req.headers?.authorization?.split(' ')[1]
        console.log('token-->', token)
        if (token) {
            const isVerified = await jwt.verify(token,
                'stiuqtdsauitdsauytvduastvyuasityduiastdiuastduiq')

            if (isVerified && isVerified.data) {
                req.user = isVerified.data
                next()
            }
        }
        else {
            res.status(403).send({
                error: true,
                msg: 'Token not valid',
                status: 403
            });
        }
    } catch (err) {
        res.status(403).send({
            error: true,
            msg: 'Token not valid',
            status: 403
        });
    }

}

module.exports = authenticateJwt