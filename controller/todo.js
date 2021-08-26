const todoModel = require('../models/todoSchema')




const todo = async(req, res) => {
    let userCreate = new todoModel({
        todoName: req.body.todoWalaKam})
    userCreate.save()
    .then((response) => {
        res.status(200).send({result: response, message: "ToDo Added successfully"})
    })
    .catch((err) => {
        res.status(400).send({result: err.message, message: "ToDo Not Added successfully"})

    })
},

const getAllTodo = async(req, res) => {
    var result = await todoModel.find({})
    res.status(200).send({message: 'All data fetch successfully', data: result})
}
