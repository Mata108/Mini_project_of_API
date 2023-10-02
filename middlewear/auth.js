const jwt=require('jsonwebtoken')
const UserModal=require('../modal/user.js')
const  securityauth=async(req,res,next)=>{
    const{token}=req.cookies
    if(!token){
        // res.status(401).json({ status: "success", message: "Successfully your Registration,Plesase login'" });
    }else{
        const verifytoken=jwt.verify(token,'omnamahshivay@108')
        const data= await UserModal.findOne({_id:verifytoken.ID})
        req.data1=data
        next();
    }
}
module.exports=securityauth