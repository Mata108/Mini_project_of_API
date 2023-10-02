 const UserModal=require('../modal/user.js')
 const bcrypt=require('bcrypt')
 const jwt= require('jsonwebtoken')
 const cloudinary=require('cloudinary').v2;




 cloudinary.config({ 
   cloud_name: 'ddpowodla', 
   api_key: '393855291736591', 
   api_secret: '9LJCkK4Dz3KLvFQuAbzT42P2nqw' 
 });
class usercontroller{

    static login=async(req,res)=>{
         try{
           res.send("welcome")  
         }catch(error){
            console.log(error)
         }
    }
    static userinsert=async(req,res)=>{
         try{
            // const imagefile = req.files.image
            // const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
            //     folder: 'profileimage'
            // })
            console.log(req.body)
            const{firstname, lastname, email, password, confirmpassword}=req.body
           const user =await UserModal.findOne({email:email})
        if(user){
          res.status(401).json({ status: "failed", message: "ᴛʜɪꜱ ᴇᴍᴀɪʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ ᴇxɪᴛꜱ" });
        }else{
         if(firstname && lastname && email && password && confirmpassword ){
             if(password==confirmpassword){
               const hashpassword = await bcrypt.hash(password, 10);
               const datauser = new UserModal({
                  firstname:firstname,
                  lastname:lastname,
                  email:email,
                  password:hashpassword,
                //   image: {
                //     public_id: imageupload.public_id,
                //     url: imageupload.secure_url
                // }

               })
               await  datauser.save();
               res.status(401).json({ status: "success", message: "Successfully your Registration,Plesase login'" });
             }else{
              res.status(401).json({ status: "failed", message: "password and confirm password not match" });
              //  res.redirect('./registration')
             }
         }else{
          
             res.status(401).json({ status: "failed", message: "all fields are required" });
            // res.redirect('./registration')
         }
        }
          // console.log("hello ji")
          //  console.log(req.body) 
         }catch(error){
            console.log(error)
         }
    }
    static verifylogin = async (req, res) => {
      try {
          const { email, password } = req.body;
          console.log(req.body)
          if (email && password) {
              const user = await UserModal.findOne({ email: email })

              if (user != null) {
                  const isMatched = await bcrypt.compare(password, user.password)
                  if (isMatched) {
                      const token = jwt.sign({ ID: user._id }, 'omnamahshivay@108');
                      // console.log(token)
                      res.cookie('token', token)
                      res.status(201).json({
                          status: 'success',
                          message: 'successful',
                          token: token,
                          user,
                      })
                  } else {
                      res
                          .status(401)
                          .json({ status: "failed", message: "email or password is not valid" });
                  }
              } else {
                  res
                      .status(401)
                      .json({ status: "failed", message: "you are not register user" });
              }
          } else {
              res
                  .status(401)
                  .json({ status: "failed", message: "all field required" });
          }
      } catch (err) {
          console.log(err);
      }
  }
  static Logout = async (req, res) => {
    try {
      res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })

      res.status(200).json({
        success: true,
        message: 'Logged Out',
      })
    } catch (error) {
      console.log(error)
    }
  }
  static updateprofile=async(req,res)=>{
    try{
        
        const{id}=req.data1
       
        const { firstname, lastname, email} = req.body
        
        const user = await UserModal.findById(id)
        if (req.files){
    // const user = await UserModal.findOne({ email: email })
    // const user = await UserModal.findById(req.body.email);
    const image_id = user.image.public_id;
    // await cloudinary.uploader.destroy(image_id);

    // const file = req.files.image;  

    // const myimage = await cloudinary.uploader.upload(file.tempFilePath, { 
    //     folder: "profileimage",

    // });
    var data = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        // image: {
        //     public_id: myimage.public_id,
        //     url: myimage.secure_url,
        // },
    };
} else {
    var data = {
        firstname: req.body.firstname, 
        lastname: req.body.lastname,
        email: req.body.email,

    }
    // console.log(email)
    res
    .status(401)
    .json({ status: "success", message: "succesful" });
}
const update_profile = await UserModal.findByIdAndUpdate(id, data)

        
//   res.redirect('/') 
    }catch(error){
        console.log(error) 
    }
}
static updatepassword=async(req,res)=>{
    try{
        // console.log("hello ji")
        // res.render()
        const{firstname,lastname,email,image,_id}=req.data1
        // const data= await UserModal.findById(req.body._id)
        // console.log(req.body)
        const user = await UserModal.findOne({ email: email })
        const { old_password, new_password, cpassword } = req.body;
      if (old_password && new_password && cpassword) {
        const user = await UserModal.findById(_id);
        const ismatch = await bcrypt.compare(old_password, user.password);
        if (!ismatch) {
          res.status(401).json({ status: "failed", message: " old password is not correct" });
         
        } else {
          if (new_password !== cpassword) {
            res.status(401).json({ status: "failed", message: " Password and confirm password do not match." });
         
          } else {
            const newHashpassword = await bcrypt.hash(new_password, 10);
            await UserModal.findByIdAndUpdate(_id, {
              $set: { password: newHashpassword },
            });
           
            res.status(401).json({ status: "success", message: "Password changed successfully. Please log in with your new password. " });
            
            
          }
        }
      } else {
        
        res.status(401).json({ status: "failed", message: " All fields are required." });
        
        
        
      }

//   res.redirect('/')
    }catch(error){
        console.log(error)
    }
}
static DeleteUser = async (req, res) => {
    try {
      const userDelete = await UserModal.findById(req.params.id)

      if (!userDelete) {
        return res
          .status(500)
          .json({ status: '500', message: 'user not !! found  😪  ' })
      }
// To delete the data from database
      await UserModal.deleteOne(userDelete)

      res.status(200).json({
        status: 'deleted successfully',
        message: '  Successfully user deleted 🥂🍻',
      })
    } catch (err) {
      console.log(err)
    }
  }
}



module.exports=usercontroller
// static verifylogin=async(req,res)=>{
         
//   try {
//     console.log("namaste ji")
//     const { email, password } = req.body;
//     console.log(req.body)
//     if (email && password) {
//       const user = await UserModal.findOne({ email: email })
//   //   console.log(user)
//       if (user != null) { 
//         const isMatched = await bcrypt.compare(password, user.password)
//         if ( isMatched) { 
//             // generate token
//             if(user.role=='admin'){
//                 const token = jwt.sign({ ID: user._id }, 'jaiparvatimai@108');
//                 // console.log(token) 
//                 // console.log("namaste ji")
//                 res.cookie('token',token)
//                 // console.log(token)
//                 // res.redirect('/admin/display')
//             }
//             else{ 
//                 if(user.role=='user'){
//                 const token = jwt.sign({ ID: user._id }, 'omnamahshivay@108');
//                 // console.log(token) 
//                 console.log("hello ji")
//                 res.cookie('token',token)
//                 // res.redirect('/home')
//             }}
           
          
          
//         } else {
  
//           res.status(401).json({ status: "failed", message: "Email or password is not valid" });
          
//         }
//       } else {
        
//         res.status(401).json({ status: "failed", message: "You are not a registered user" });
//         // return res.redirect('/')
//       }
//     } else {
      
//       res.status(401).json({ status: "failed", message: "All Fields Required" });
//       // return res.redirect('/')
//     }
//   }catch(error){
//           console.log(error)
//         }
//       }