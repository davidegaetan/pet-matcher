const mongoose = require("mongoose")
const URI = process.env.MONGO_URI;
mongoose.set('strictQuery', true);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("Connected to database"))
.catch(err=>console.log("Couldn't connect to database",err));