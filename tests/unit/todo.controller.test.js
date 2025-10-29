const TodoController = require('../../controllers/todo.controller');
const Todo = require('../../models/todo.models');

jest.mock('../../models/todo.models'); // Mockime Mongoose mudeli

describe('TodoController.createTodo', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should handle errors when done is missing', async () => {
    req.body = { title: 'Test todo' };

    await TodoController.createTodo(req, res, next);

    expect(next).toHaveBeenCalled(); // kontroll, et viga edasi antakse
    expect(next.mock.calls[0][0].message).toBe('Missing done field');
  });

  it('should create todo successfully', async () => {
    req.body = { title: 'Test todo', done: false };
    const createdTodo = { title: 'Test todo', done: false, _id: '123' };
    Todo.create.mockResolvedValue(createdTodo);

    await TodoController.createTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(createdTodo);
  });
});

describe('TodoController.getTodos', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it('should return all todos successfully', async () => {
    const todos = [
      { _id: '1', title: 'Test 1', done: false },
      { _id: '2', title: 'Test 2', done: true },
    ];

    Todo.find.mockResolvedValue(todos);

    await TodoController.getTodos(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(todos);
  });

  it('should handle errors properly', async () => {
    const error = new Error('DB error');
    Todo.find.mockRejectedValue(error);

    await TodoController.getTodos(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
