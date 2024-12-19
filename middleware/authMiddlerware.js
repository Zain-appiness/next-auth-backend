const jwt = require('jsonwebtoken');
require("dotenv").config(); 

const authMiddleware= async(req,res,next)=>{
    try {
        const token= req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message:'NO TOKEN PROVIDED'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } 
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
}


const adminMiddleware = async (req, res, next) => {
    try {
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }
      next();
    } catch (error) {
      res.status(403).json({ message: 'Admin access required' });
    }
  };
  
  module.exports = { authMiddleware, adminMiddleware };