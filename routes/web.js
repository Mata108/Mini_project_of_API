const express = require('express')
const usercontroller = require('../controller/usercontroller.js')
const productcontroller = require('../controller/Productcontroller.js')
const UserModal = require('../modal/user.js')
const Productmodel = require('../modal/product.js')
const securityauth = require('../middlewear/auth.js')
// const securityauth2=require('../middlewear/auth2.js')

const route = express.Router()


route.get('/', usercontroller.login)
route.post('/userinsert', usercontroller.userinsert)
route.post('/verifylogin', usercontroller.verifylogin)
route.get('/logout', securityauth, usercontroller.Logout)
route.post('/updateprofile', securityauth, usercontroller.updateprofile)
route.post('/updatepassword', securityauth, usercontroller.updatepassword)
route.get('/DeleteUser/:id', securityauth, usercontroller.DeleteUser)


// product 
route.post('/createproduct', productcontroller.CreateProduct)
route.get('/Productdisplay/:id', productcontroller.productview)
route.post('/updateproduct/:id', productcontroller.updateproduct)
route.get('/productdelete/:id', productcontroller.Productdelete)








module.exports = route