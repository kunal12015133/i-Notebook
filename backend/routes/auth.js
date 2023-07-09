const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { useId } = require('react');
const JWT_SECRET="secretcode";

router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async (req,res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({success, errors: errors.array()});
    }

    
    try{
      let user = await User.findOne({email:req.body.email});
      if(user){
        return res.status(400).json({success,error :"User already exists"});
      }
      const salt = await bcrypt.genSalt(10);
      const secPass =  await bcrypt.hash(req.body.password,salt);



      user = await User.create({
          name: req.body.name,
          password:secPass,
          email:req.body.email
        })
      const data = {
          user:{
            id:user.id
          }
      }
      const authtoken  = jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,authtoken})
    }catch(err){
      console.error(err.message);
      res.status(500).send("Internal server error")
    }
      // .then(user => res.json(user))
      // .catch(err=>{console.log(err);})
})

router.post('/login',[
  body('email').isEmail(),
  body('password','password cannot be blank').exists()
],async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(400).json({ errors: errors.array() , here:"Jier"});
  }

  const {email,password} = req.body;

  try { 
    let user = await User.findOne({email});
    let success = false;
    if(!user){
      return res.status(400).json({success,error:"Invalid credentials"})
    }

    const passwordCompare =await bcrypt.compare(password,user.password)
    if(!passwordCompare){
      
      return res.status(400).json({success,error:"Invalid credentials"})
    }

    const data = {
      
      user:{
        id:user.id
      }
    }
    const authtoken  = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success,authtoken})
  }catch(err){
    console.error(err.message);
    res.status(500).send("Internal server error")
  }

})

router.post('/getuser', fetchuser,async (req,res)=>{

  try {
    const userId=req.user.id;
    const user = await User.findById(userId);
    console.log(user);
    res.send(user);
  } catch(err){
    console.error(err.message);
    res.status(500).send("Internal server error")
  }
})

module.exports = router