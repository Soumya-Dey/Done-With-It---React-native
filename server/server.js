const express = require("express");

const connectDb = require("./database/connectDb");

const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json({ extended: false }));

// database connection
connectDb();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));

// // serve static assets in production
// if (process.env.NODE_ENV === "production") {
//     // static folder
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

app.listen(port, () => console.log(`server started on port ${port}`));
