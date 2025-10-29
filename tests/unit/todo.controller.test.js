const TodoController = require('../../controllers/todo.controller');
const Todo = require('../../models/todo.models');

jest.mock('../../models/todo.models'); // Mongoose mock

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

    expect(next).toHaveBeenCalled(); // spy kontroll
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
