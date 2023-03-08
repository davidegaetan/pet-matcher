const mongoose = require("mongoose")
const database = "pet-shelter"
const URL = process.env.CONFIG_URL;
mongoose.set('strictQuery', true);
mongoose.connect(`${URL}${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connected to database"))
.catch(err=>console.log("Couldn't connect to database",err));