const { connect } = require("./connectDB.js");
const Todo = require("./TodoModel.js");

//addin table
const createTodo = async () => {
    try{
        const todo = await Todo.create();
        console.log(`Created todo with ID: ${todo.id}`);    }catch(error){
        console.error(error);
    }
};

const countItems = async () => {
    try{
        const todos = await Todo.findAll();
        console.log(`Found ${totalCount} items in the table`)
    }catch(error){
        console.error(error);
    }
}

const getAllTodos = async () => {
    try{
        const todos = await Todo.findAll();
        const todoList = todos.map(todo => todo.displayableString()).join("\n");
        console.log(todoList);
    }catch(error){
        console.error(error);
    }
}

const SingleTodo = async () => {
    try{
        const todo = await Todo.findOne({
            where: {
                completed:false
            },
            order: [
                ['id','DESC']
            ]
        });
        console.log(todo.displayableString());
    }catch(error){
        console.error(error);
    }
}

const updatetodo = async (id) => {
    try{
        await Todo.update({completed: true}, {
            where: {
                id: id
            }
        });

    }catch(error){
        console.error(error);
    }
}

const deleteItem = async (id) => {
    try{
        const deletedRowCount = await Todo.destroy({
            where: {
                id: id
            }
        });
        console.log(`Deleted ${deletedRowCount} rows!`)
    }catch(error){
        console.error(error);
    }
}




    // (async () => {
    // //await createTodo();
    // await getAllTodos();
    // //await updatetodo(2);
    // await deleteItem(1);
    // await SingleTodo();
    // })();

getAllTodos();
countItems();