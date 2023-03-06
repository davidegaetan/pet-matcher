const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 8080;
require('dotenv').config();
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
