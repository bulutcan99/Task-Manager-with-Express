const Task = require('../models/task');
const asyncWrapper = require('../middleware/asyncWrapper.js');
const {createCustomError} = require('../errors/custom-error.js');

// Creating functions for the tasksController

const getAllTasks = asyncWrapper(async (req, res) => { // This is the asyncWrapper function that will allow us to handle errors in a better way.
    const tasks = await Task.find({});                 // asyncWrapper saves us from having to use a try catch block. 
    res.status(200).json({ status: 'success', results: tasks.length, data: {tasks}});
});

const createTask = asyncWrapper(async (req,res) => {    // And automatically returns 404 if it encounters an error.
    const task = await Task.create(req.body);
    res.status(201).json({task});
});

const getTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) { // If the task is not found, then return 404
        return next(createCustomError(`No task found with this id ${req.params.id}`, 404));
    }
    res.status(200).json({task});
});

const updateTask = asyncWrapper(async (req, res) => {  // Patch just updates the fields that are provided in the body of the request.
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true});
    if (!task) { // If the task is not found, then return 404
        return next(createCustomError(`No task found with this id ${req.params.id}`, 404));
    }
    res.status(200).json({msg: `Task updated successfully with ${req.body.name}`});
});

const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID});
    if (!task) { // If the task is not found, then return 404
        return next(createCustomError(`No task found with this id ${req.params.id}`, 404));
    }
    res.status(200).json({task: null, status: 'success'});
});


module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
}