const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "User name is required"]
    },
    fname: {
        type: String,
        required: [true, "First name is required"]
    },
    lname: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "That email has already been used"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    admin: false
}, { timestamps: true });

userSchema.pre('save', async function(next){
    try{
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log("Hashed Password", hashedPassword)
        this.password = hashedPassword
        next()
    }
    catch(err){
        console.log("Password failed to hash",err)
    }
})

module.exports = mongoose.model("User", userSchema);