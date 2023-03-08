const mongoose = require("mongoose")
const database = "pet-shelter"
mongoose.set('strictQuery', true);
mongoose.connect(`mongodb://127.0.0.1:27017/${database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connected to database"))
.catch(err=>console.log("Couldn't connect to database",err));