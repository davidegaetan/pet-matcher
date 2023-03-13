const express = require("express");
const cors = require("cors")
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
require("./config/pets.config");
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000',credentials: true, }));
const PetRoutes = require('./routes/pets.routes');
PetRoutes(app);
const UserRoutes = require('./routes/users.routes');
UserRoutes(app);
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
