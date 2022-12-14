const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/swapi', routes);
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))