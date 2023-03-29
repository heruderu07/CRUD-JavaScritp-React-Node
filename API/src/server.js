const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(taskRoutes);

app.get("/health", (req, res) => {
    return res.json("up");
});

app.listen(3333, () => console.log("Listening to port 3333"));