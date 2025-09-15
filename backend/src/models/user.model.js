const mongoose = require("mongoose");//import mongoose

const userSchema = new mongoose.Schema({//user schema is created
    fullName : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unquie : true
    },
    password : {
        type : String,
        require : true,
    },
},
{  
      timestamps : true//when user is created and updated
}
);

const userModel =mongoose.model("user", userSchema);//user model is created

module.exports = userModel;//export user model