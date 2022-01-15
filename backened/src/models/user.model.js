const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")


const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    password : {type : String},
    album : [{type : String}], 
    roles : [{type : String}]

})

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) return next()
    let hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash;
    next();
})


userSchema.methods.checkPassword = function(password) {
    let match = bcryptjs.compareSync(password, this.password) ;
    return match;

}

const User = mongoose.model("user", userSchema);


module.exports = User;