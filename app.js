const express = require('express');
const todoRoutes = require("./routes/todo.routes");
const app = express();

const connectDB = require('./mongodb/mongodb.connect');

// Andmebaasi ühendus
connectDB();

app.use(express.json());

// Todo route
app.use("/todos", todoRoutes);

// Error middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: error.message || 'Something went wrong'
  });
});

app.get('/', (req, res) => {
  res.send('Express test');
});

module.exports = app;
