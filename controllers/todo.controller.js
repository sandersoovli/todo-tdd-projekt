const Todo = require('../models/todo.models');

const createTodo = async (req, res, next) => {
  try {
    const { title, done } = req.body;

    if (done === undefined) {
      const error = new Error('Missing done field');
      error.status = 400;
      throw error;
    }

    const createdTodo = await Todo.create({ title, done });
    res.status(201).json(createdTodo);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo };
