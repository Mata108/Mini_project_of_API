const express=require('express')
const app=express()
const dotenv =require('dotenv')
dotenv.config({path:'./.env'})
const web=require('./routes/web')
app.use(express.json())
const connectdb=require('./db/connectdb')


const fileUpload = require("express-fileupload"); 

//Temp file uploader
app.use(fileUpload({useTempFiles: true}));
app.use(express.urlencoded({extended:true}));
const cookieparser=require('cookie-parser')
app.use(cookieparser())
connectdb()

const session = require('express-session')
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));
app.use('/',web)
// //server create
app.listen(process.env.PORT,()=>{
  console.log(`server running on localhost: ${process.env.PORT}`)
})
// PORT = 4000




//delete user start
// static DeleteUser = async (req, res) => {
//     try {
//       const userDelete = await UserModel.findById(req.params.id)

//       if (!userDelete) {
//         return res
//           .status(500)
//           .json({ status: '500', message: 'user not !! found  😪  ' })
//       }
//       // To delete the data from database
//       await UserModel.deleteOne(userDelete)

//       res.status(200).json({
//         status: 'deleted successfully',
//         message: '  Successfully user deleted 🥂🍻',
// vikas jain8:00 AM
// hello4
// static DeleteUser = async (req, res) => {
//     try {
//       const userDelete = await UserModel.findById(req.params.id)

//       if (!userDelete) {
//         return res
//           .status(500)
//           .json({ status: '500', message: 'user not !! found  😪  ' })
//       }
// // To delete the data from database
//       await UserModel.deleteOne(userDelete)

//       res.status(200).json({
//         status: 'deleted successfully',
//         message: '  Successfully user deleted 🥂🍻',
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }
// fzr-tpbw-cvw







// vikas jain7:58 AM
// //delete user start
//   static DeleteUser = async (req, res) => {
//     try {
//       const userDelete = await UserModel.findById(req.params.id)

//       if (!userDelete) {
//         return res
//           .status(500)
//           .json({ status: '500', message: 'user not !! found  😪  ' })
//       }
//       // To delete the data from database
//       await UserModel.deleteOne(userDelete)

//       res.status(200).json({
//         status: 'deleted successfully',
//         message: '  Successfully user deleted 🥂🍻',
// vikas jain8:00 AM
// hello4
// static DeleteUser = async (req, res) => {
//     try {
//       const userDelete = await UserModel.findById(req.params.id)

//       if (!userDelete) {
//         return res
//           .status(500)
//           .json({ status: '500', message: 'user not !! found  😪  ' })
//       }
// // To delete the data from database
//       await UserModel.deleteOne(userDelete)

//       res.status(200).json({
//         status: 'deleted successfully',
//         message: '  Successfully user deleted 🥂🍻',
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }
// Pushpendra Jadon8:08 AM
// Product
// vikas jain8:10 AM
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     description: {
//       type: String,
//       required: true,
//     },

//     price: {
//       type: Number,
//       required: true,
//     },