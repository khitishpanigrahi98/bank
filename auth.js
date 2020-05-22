const jwt = require('jsonwebtoken')
const Student = require('./StudentDatabase.js')

//methods available on req -- req.method()  req.path()
const auth = async (req, res, next) => {
    try {
        console.log("Inside Authnetication")
        console.log("Testing")
        console.log(req.query.authorize)
        console.log("Testing")
        const token=req.query.authorize;
        const decoded = jwt.verify(token, process.env.JWT_SECRET )
        const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!student) {
            throw new Error()
        }
        req.token = token  //to log  out of specific device
        req.student = student
        console.log("Hurray !! Student Found");
        next()
    } catch (e) {
        // console.log(location);
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth