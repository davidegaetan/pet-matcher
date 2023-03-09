const mongoose = require("mongoose")

const petSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Your pet's name is required"],
        minlength: [3, "Your pet's name must be at least 3 characters long"]
    },
    petType: {
        type: String,
        required: [true,"Your pet's type is required"],
        minlength: [3, "Your pet's type must be at least 3 characters long"]
    },
    description: {
        type: String,
        required: [true,"Your pet's description is required"],
        minlength: [3, "Your pet's description must be at least 3 characters long"]
    },
    location : {
        lat :{
            type : Number,
            required : [true, "Your pet's location is required"],
            min : [-90, "Your min latitude is -90"],
            max : [90, "Your max latitude is 90"]
        },
        lng : {
            type : Number,
            required : [true, "Your pet's location is required"],
            min : [-180, "Your min longitude is -90"],
            max : [180, "Your max longitude is -90"]
        }
    },
    skill1: String,
    skill2: String,
    skill3: String,
    likes: 0,
    imgUrl: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    comments: [
        {
            comment: String,
            commentBy: String
        }
    ],
    userId: String,
    approved: false
})

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;