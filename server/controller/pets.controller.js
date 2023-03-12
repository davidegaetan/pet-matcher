const Pet = require("../models/pets.model");
const User = require("../models/users.model");
const SECRET = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')

module.exports.findAllPets = (req, res) => {
    Pet.find({approved:true})
        .then(allPets => res.json({ Pets: allPets }))
        .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
}

module.exports.findOnePet = (req, res) => {
    Pet.findOne({ _id: req.params.id })
        .then(onePet => res.json({ Pets: onePet }))
        .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
}
module.exports.findAllPetsBut = (req, res) => {
    const tipo = req.params.petType
    Pet.find({approved:true, petType: tipo})
        .then(allPets => res.json({ Pets: allPets }))
        .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
}
module.exports.insertNewPet = (req, res) => {
    const { adminToken } = req.cookies;
    const { userToken } = req.cookies;

    let decoded
    if (adminToken) {
        decoded = jwt.verify(adminToken, SECRET)
    } else if (userToken) {
        decoded = jwt.verify(userToken, SECRET)
    }

    const newPetBody = { ...req.body, userId: decoded._id }

    Pet.create(newPetBody)
        .then(newPet => res.json({ pet: newPet }))
        .catch(err => {
            res.status(400).json(err)
        });
}

module.exports.editPet = (req, res) => {
    //console.log(req.body)
    Pet.findOneAndUpdate({ _id: req.params.id }, req.body, { runValidators: true })
        .then(updatedPet => {
            //console.log(updatedPet)
            res.json({ Pets: updatedPet })
        })
        .catch(err => {
            res.status(400).json(err)
        });
}

module.exports.newComment = async (req, res) => {
    const { adminToken } = req.cookies;
    const { userToken } = req.cookies;

    let decoded
    if (adminToken) {
        decoded = jwt.verify(adminToken, SECRET)
    } else 
    if (userToken) {
        decoded = jwt.verify(userToken, SECRET)
    }

    const user = await User.findById(decoded._id)
    console.log(req.body.details.comments,"req.body.details.comments")
    req.body.details.comments.push(
        {
            comment: req.body.newComment,
            commentBy: user.userName
        }
    )

    console.log(req.body.details.comments,"req.body.details.comments")

    console.log(req.body.details, "req.body.details")
    

    Pet.findOneAndUpdate({ _id: req.params.id }, req.body.details, { runValidators: true })
        .then(updatedPet => {
            res.json({ Pet: updatedPet })
        })
        .catch(err => {
            res.status(400).json(err)
        });
}


module.exports.adoptPet = (req, res) => {
    Pet.remove({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json({ error: err }));
}