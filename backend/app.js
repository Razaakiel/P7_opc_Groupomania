
const { Sequelize } = require('sequelize');
const express       = require("express");
const bodyParser    = require("body-parser");
const cors          = require("cors");
const path          = require("path");
const auth          = require("./middleware/auth");
const app           = express();

const authRoutes    = require("./routes/auth")
const userRoutes    = require("./routes/user")
const postRoutes    = require("./routes/post")
const commentRoutes = require("./routes/comment")

app.use(express.json());

const sequelize = new Sequelize('sequelize_db', 'root', 'mdp', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch((error) => console.error('Unable to connect to the database:', error));


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use('/api/log', auth, userRoutes);
app.use("/api/post", auth, postRoutes);
app.use("/api/post", auth, commentRoutes);

module.exports = app