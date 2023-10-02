const mongoose= require('mongoose')

// const live_url="mongodb+srv://nikhilsahu78695:Nikhil123456@cluster0.6b9itae.mongodb.net/nodeexpress?retryWrites=true&w=majority"
const connectdb=()=>{
    return mongoose.connect(process.env.LOCAL_URL)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })

}
module.exports=connectdb