const {body , validationResult} = require("express-validator")

const regisiterRules= () =>[
   
    body("name", "Name is required").notEmpty(),
    body("lastName", "lastName is required").notEmpty(),
    body("email", "should be an email").isEmail(),
    body("Password", "Password must contain between 5 and 20 caracters ").isLength({
        min:5,
        max : 20
    }),
]

const loginRules= () =>[
   
   
    body("email", "should be an email").isEmail(),
    body("Password", "Password must contain between 5 and 20 caracters ").isLength({
        min:5,
        max : 20
    }),
]

const validator = (req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors.array()})
    }
    next()
}
module.exports = {regisiterRules, loginRules, validator}