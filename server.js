const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const config = require("./config/key");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
var uri =''
if (process.env.NODE_ENV === 'production') {
  uri = process.env.MONGO_URI
} else {
  uri = 'mongodb+srv://ashish:ashish@7@cluster0.nq7bi.mongodb.net/<dbname>?retryWrites=true&w=majority'
}

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
const taskRouter = require('./router/task');
app.use('/task', taskRouter);

if(process.env.NODE_ENV=="production"){
    app.use(express.static("build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
      });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});