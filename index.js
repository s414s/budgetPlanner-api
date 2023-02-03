const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

// Config
    app.use(express.json());
    app.use(cors());

// Rutas
    app.use("/budgets", require('./routes/budgets'));
    app.use("/folders", require('./routes/folders'));
    app.use("/groups", require('./routes/groups'));
    app.use("/items", require('./routes/items'));
    app.use("/users", require('./routes/users'));
    app.use("/prices", require('./routes/prices'));

app.listen(port, ()=>{
    console.log("Estoy escuchando");
})