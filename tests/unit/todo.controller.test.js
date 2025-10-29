const TodoController = require('../../controllers/todo.controller');
const TodoModal = require('../../models/todo.models');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

TodoModal.create = jest.fn();

let req, res, next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('TodoController.createTodo', () =>{
    beforeEach(() => {
        req.body = newTodo;
    });

    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });

    it('should call TodoModal.create',  () =>{
        req.body = newTodo;
        TodoController.createTodo(req, res, next);
        expect(TodoModal.create).toHaveBeenCalledWith(newTodo);
    })
    it('should return 201 response code', () =>{
        TodoController.createTodo(req, res, next)
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
    it('should return json in response', () =>{
        TodoModal.create.mockReturnValue(newTodo);
        TodoController.createTodo(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newTodo);
    });
});