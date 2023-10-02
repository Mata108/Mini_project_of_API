const ProductModel=require('../modal/product.js')
 const cloudinary=require('cloudinary').v2;




 cloudinary.config({ 
   cloud_name: 'ddpowodla', 
   api_key: '393855291736591', 
   api_secret: '9LJCkK4Dz3KLvFQuAbzT42P2nqw' 
 });

class Productcontroller{

    static CreateProduct = async (req, res) => {
        try {
          // const file = req.files.image
          //console.log(file)
          // const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          //   folder: 'productimage',
          // })
          //console.log(myimage)
          const result = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            numOfReviews: req.body.numOfReviews,
            rating:req.body.rating,
            reviews:req.body.reviews,
            // image: {
            //   public_id: myimage.public_id,
            //   url: myimage.secure_url,
            // },
          })
          //saving data
          await result.save()
          res.status(201).send({
            status: 'success',
            message: 'Product Created Successfully 😃🍻',
            result,
          })
        } catch (err) {
          console.log(err)
        }
      }
      static productview=async(req,res)=>{
        try{
            // console.log(req.params.id)
            // res.render('view')
            // const{firstname,lastname,image}=req.data1
            let y="courseview"
            const data= await ProductModel.findById(req.params.id)
            // console.log(data)
      
            // res.render('view',{d:data,n:(firstname+" "+lastname).toUpperCase(),img:image,x:y})
            // res.send(data)
            res.status(401).json(data);
        }catch(err){
          console.log(err)
        }
      }
      static updateproduct = async (req, res) => {
        try {
          // const file = req.files.image
          // // console.log(file)
          // const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          //   folder: 'productimage',
          // })
          //console.log(myimage)
          const id=req.params.id
          const {name,description,price,stock,numOfReviews,rating,reviews}=req.body
          //  console.log(req.body.stock)
          // const productupdate=await ProductModel.findById(id)
           if( req.files  ){
              var data={
                name: name,
                description: description,
              price: price,
              stock: stock,
              numOfReviews: numOfReviews,
              rating:rating,
              reviews:reviews,
            //   image: {
            //   public_id: myimage.public_id,
            //   url: myimage.secure_url,
            // },
                
                
               }
            }
          else{
            if(name && description && price && stock && numOfReviews && rating && reviews){
               var data={
                name: name,
                description: description,
                price: price,
                stock: stock,
                numOfReviews: numOfReviews,
                rating:rating,
                reviews:reviews,
                 // image: {
            //   public_id: myimage.public_id,
            //   url: myimage.secure_url,
            // },
               }
            }else if(name && description && price && stock && numOfReviews && rating  ){
              var data={
                name: name,
                description: description,
                price: price,
                stock: stock,
                numOfReviews: numOfReviews,
                rating:rating,
                
               }
            }else if(name && description && price && stock && numOfReviews  ){
              var data={
                name: name,
                description: description,
                price: price,
                stock: stock,
                numOfReviews: numOfReviews,
            
                
               }
            }else if(name && description && price && stock    ){
              var data={
                name: name,
                description: description,
                price: price,
                stock: stock,
             
                
                
               }
            }else if(name && description && price){
              var data={
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                }
                // console.log(data)
              //  console.log("hello ji3")
            }else if(name && description    ){
              var data={
                name: name,
                description: description,
                 }
              //  console.log("hello ji2")
            }else if(name && description  ){
              var data={
                name: name,
                description: description,
                  } 
              //  console.log("hello ji1")
              }
              else{
                var data={
                  name: name,
               }
              //  console.log("hello ji")
              }
            
          }
          //saving data
          // await result.save()
          // console.log(id)
          const update_product = await ProductModel.findByIdAndUpdate(id, data)
          res.status(201).send({
            status: 'success',
            message: 'Product update Successfully 😃🍻',
          })
        } catch (err) {
          console.log(err)
        }
      }
      static Productdelete=async(req,res)=>{
        try{
          const productDelete = await ProductModel.findById(req.params.id)

          if (!productDelete) {
            return res
              .status(500)
              .json({ status: '500', message: 'product not !! found  😪  ' })
          }
    // To delete the data from database
          await ProductModel.deleteOne(productDelete)
    
          res.status(200).json({
            status: 'deleted successfully',
            message: '  Successfully product deleted 🥂🍻',
          })
        }catch(error){
          console.log(error)
        }
      }
}






module.exports=Productcontroller