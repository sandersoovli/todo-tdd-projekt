const express = require('express');
const todoRoutes = require("./routes/todo.routes");
const app = express();

const connectDB = require('./mongodb/mongodb.connect');

connectDB();


app.use(express.json());

app.use("/todos", todoRoutes);


app.get('/', (req, res) => {
  res.send('express test');
});

//app.listen(3015, () => {
//  console.log('Server us running');
//});
module.exports = app;