const User = require('../models/users.model')
const Pet = require("../models/pets.model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {
    insertNewUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body)
            // const userToken = jwt.sign({_id: newUser._id}, SECRET)
            res.status(201).json({ successMessage: "User created ", user: newUser })
        } catch (err) {
            res.status(400).json(err)
        }
    },

    logInUser: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })
        console.log("User ", user, " is trying to log in")
        if (!user) {
            res.status(400).json({ error: "This user doesn't exist" })
        }
        try {
            const passwordValidate = await bcrypt.compare(req.body.password, user.password)
            console.log(passwordValidate, "pw val")
            if (!passwordValidate) {
                res.status(400).json({ error: "Incorrect Email and/or Password" })
            } else if (!user.admin) {
                const userToken = jwt.sign({ _id: user._id }, SECRET)
                res.status(200)
                    .cookie('userToken', userToken, { httpOnly: true })
                    .json({ successMessage: "User logged in ", user: user })
            } else {
                const adminToken = jwt.sign({ _id: user._id }, SECRET)
                res.status(200)
                    .cookie('adminToken', adminToken, { httpOnly: true })
                    .json({ successMessage: "Admin logged in ", user: user })
            }

        } catch (err) {
            console.log(err, "err")
        }
    },

    logOutUser: (req, res) => {
        res.clearCookie('userToken')
        res.clearCookie('adminToken')
        res.json({ success: 'User logged out' })
    },

    checkLogin: (req, res) => {
        res.json({ status: true })
    },

    checkAdminLogin: (req, res) => {
        res.json({ status: true })
    },

    getUserPets: (req, res) => {
        const { adminToken } = req.cookies;
        const { userToken } = req.cookies;
        console.log(adminToken, 'adminToken')
        console.log(userToken, 'userToken')

        let decoded
        if (adminToken) {
            decoded = jwt.verify(adminToken, SECRET)
        } else if (userToken) {
            decoded = jwt.verify(userToken, SECRET)
        }

        Pet.find({ userId: decoded._id })
            .then(allPets => res.json({ Pets: allPets }))
            .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
    },

    getAdminPets: (req, res) => {
        const { adminToken } = req.cookies;
        console.log(adminToken, 'adminToken')
        const decoded = jwt.verify(adminToken, SECRET)

        Pet.find({ approved: false })
            .then(allPets => {
                console.log(allPets, "allPets")
                res.json({ Pets: allPets })
            })
            .catch(err => res.status(400).json({ message: "Something went wrong", error: err }));
    }
}
