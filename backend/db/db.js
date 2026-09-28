const mongoose=require("mongoose")

function connectToDB(){
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("MONGODB CONNECTED!!")
  })
  .catch(err=>{
    console.log("Error in handeling DB!!")
    process.exit(1)
  })
}
module.exports = connectToDB