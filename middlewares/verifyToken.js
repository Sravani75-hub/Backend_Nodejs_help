
const vendor =  require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretkey = process.env.WhatIsYourName

const verifyToken = async(req, res, next) =>{
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "Token is required"});
    }
    try{
        const decoded = jwt.verify(token,secretkey)
        const vendors = await vendor.findById(decoded.vendorId);
     
        if(!vendors){
            return res.status(404).json({error:"vendor not found"})
        }

   
        req.vendorId = vendors._id

        next()
    }catch (error)  {
          console.error(error)
          return res.status(500).json({error: "Invalid token"});

          }
    }


      module.exports = verifyToken