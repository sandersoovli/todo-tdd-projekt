const Todo = require('../models/todo.models');

const createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTodo };
