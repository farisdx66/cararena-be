const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:4001"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;


db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });



function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "admin"
    });
    
}


app.get("/", (req, res) => {
    res.json({ message: "Welcome to running application." });
});

// routes
require('./app/routes/authRoutes')(app);
require('./app/routes/userRoutes')(app);
require('./app/routes/backgroundRoutes')(app);
require('./app/routes/imgCarRoutes')(app);
require('./app/routes/brandRoutes')(app);
require('./app/routes/generalRoutes')(app);
require('./app/routes/specificationRoutes')(app);
require('./app/routes/reviewRoutes')(app);
require('./app/routes/urlRoutes')(app);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});