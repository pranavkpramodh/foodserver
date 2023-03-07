const { default: mongoose } = require('mongoose')
const db = require('./db')

 
// registration
const registration = (phone, username, password) => {

  return db.User.findOne({ phone })//data
    .then(user => {
      if (user) {
        return {
          status: 'false',
          statusCode: 400,
          message: 'user already registered'
        }
      }

      else {
        const newUser = new db.User({
          phone: phone,
          username: username,
          password: password,
          balance: 0,
          transaction: []
        })

        newUser.save();//data saved in mngodb

        return {
          status: 'true',
          statusCode: 200,
          message: 'register successfull'
        }
      }
    })
}


//login service
const login = (phone, pswd) => {

  return db.User.findOne({ phone,pswd })//data
  .then(user=>{
    if(user){
      currentUser = user.username
      currentphone = phone

      return{
        status: 'true',
        statusCode: 200,
        message: 'login successful',
        currentUser:currentUser,
        currentphone:currentphone
      }
    }else{
      return{
        status: 'false',
        statusCode: 400,
        message: 'invalid userdetails'
      }
    }

  })
}











const getProducts = () => {
  return db.Products.find().then(
       (result) => {
           if(result){
               return{
                   status:true,
                   statusCode:200,
                   products:result
               }
           }else{
               return{
                   status:false,
                   statusCode:402,
                   message:'Product not found' 
               }
           }
       }
   )
}
const getwishlist = () => {
  return db.Wishlist.find().then(
       (result) => {
           if(result){
               return{
                   status:true,
                   statusCode:200,
                   products:result
               }
           }else{
               return{
                   status:false,
                   statusCode:402,
                   message:'Product not found' 
               }
           }
       }
   )
}

// addtowishlist details store to db

const addtowishlist = (id, item,price,image,description, origin) => {
  console.log(id, item, origin);
  return db.Wishlist.findOne( {id} ).then(result => {
      if(result) {
          return{
              status:false,
              statusCode:400,
              message:"Product already added to wishlist"
          }

          
      }else{

          const newProduct = new db.Wishlist({ 
              id,
              item,
              price,
              image,
              description,
              origin
          })

          newProduct.save()

          return{
              status:true,
              statusCode:200,
              message:'Product Added Successfully'
          }
      }

  })


}


const showfood = (id) =>{
 console.log(id);
  return db.Products.findOne({id}).then(
    data => {
      if(data){
        console.log(data);
        return{
          status:true,
          statusCode:200,
          message:"food",
          foodData:data
        }
      }else{
        return{
          status:false,
          statusCode:400,
          message:"error"
        }
      }

    }
  )
}

const order = (id, name, phone, email, address, pincode, location, item, price, image, origin) =>{
  console.log(origin);
  return db.Orders.find().then(
    data => {
      if(data){
        const orders = new db.Orders({
          id, name, phone, email, address, pincode, location, item, price, image, origin
        })
        orders.save();
        return{
          status:true,
          statusCode:200,
          message:"your Order placed",
        
        }
      }else{
        return{
          status:false,
          statusCode:400,
          message:"error",
        }
      }

    })
  }

  const getfood = (id) => {
    return db.Products.findOne({id}).then(
      food => {
        return{
          status:true,
          statusCode:200,
          food:food
        
        }
      }      
    )
  }


  const myorders = () => {
    return db.Orders.find().then(
      result => {
        if(result){

          return{
            status:true,
            statusCode:200,
            myorders:result
          
          }
        }else{
          return{
            status:false,
            statusCode:400,
            message:"eroor occured"
          
          }
        }
      }
    )
  }


module.exports ={ 
  registration,
  login,
  addtowishlist,
  getwishlist,
  getProducts,
  showfood,
  order,
  getfood,
  myorders
 
}