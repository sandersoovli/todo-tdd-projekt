const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
        'mongodb+srv://sandersoovali_db_user:ca6xeKbVN8ELWJu9@cluster0.puohbut.mongodb.net/todo-tdd', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB ühendatud');
  } catch (error) {
    console.error('❌ MongoDB ühendus ebaõnnestus:', error);
    process.exit(1); // peatab rakenduse, kui ühendus ebaõnnestub
  }
};

module.exports = connectDB;
