const jwt = require('jsonwebtoken');
const JWT_SECRET="secretcode";

const fetchuser= (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Invalid credentials"});
    }
    try {
        const data =  jwt.verify(token,JWT_SECRET);
        console.log(data);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Invalid credentials"})
    }
}

module.exports=fetchuser;