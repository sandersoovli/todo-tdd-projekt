const Todo = require('../models/todo.models');

const createTodo = (req, res, next) => {
    const createdModal = Todo.create(req.body);
    res.status(201).json(createdModal);
}

module.exports = { createTodo };
