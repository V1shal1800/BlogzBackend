const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

ver_email = 'somerandomfunnymail@mymail.com';
ver_password = 'SomeRandomFunnyPassword';

router.post('/', (req,res,next) => {
  email= req.body.email;
  password= req.body.password;
  if(email !== ver_email || password !== ver_password)
  {
    return res.status(401).json({
      message: "Auth Failed"
    });
  }
  else{
    const token = jwt.sign({email},"SomeRandomFunnyKey",{expiresIn: '1h'});
    return res.status(200).json({
      message: "Auth Successful",
      token: token
    });
  }
});

module.exports = router;