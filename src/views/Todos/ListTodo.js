import React from "react";
import AddTodo from "./AddTodo";
import './ListTodo.scss'
import { toast } from 'react-toastify';

class ListTodo extends React.Component {

    state = {
        listTodos: [
            { id: 'todo1', title: 'Doing project' },
            { id: 'todo2', title: 'Listening to music' },
            { id: 'todo3', title: 'Going out' },

        ],
        editTodo: {

        }
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })

        toast.success("Added success!")
    }

    editTodo = (todo) => {
        let { editTodo, listTodos } = this.state;

        let isEmptyObj = Object.keys(editTodo).length === 0;

        //Khi nhấn nút Edit
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodos];

            let objIndex = listTodosCopy.findIndex(item => item.id === todo.id);

            listTodosCopy[objIndex].title = editTodo.title;

            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })

            toast.success('Edited success')

            return;
        }

        //Khi nhấn nút Save
        this.setState({
            editTodo: todo
        })

    }

    handleEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }

    deleteTodo = (todo) => {
        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodos
        })
        toast.success('Deleted success')
    }
    render() {
        let { listTodos, editTodo } = this.state;

        let isEmptyObj = Object.keys(editTodo).length === 0;  //check Object có rỗng hay k

        return (
            <>
                <p>
                    Simple Todo Apps
                </p>
                <div className="list-todo-container">
                    <AddTodo
                        addNewTodo={this.addNewTodo} />
                    <div className="list-todo-content">
                        {listTodos && listTodos.length > 0 &&
                            listTodos.map((item, index) => {
                                return (
                                    <div className="todo-child" key={item.id}>
                                        {isEmptyObj === true ?
                                            <span> {index + 1} - {item.title} </span>
                                            :
                                            <>
                                                {editTodo.id === item.id ?
                                                    <span> {index + 1} -  <input value={editTodo.title}
                                                        onChange={(event) => this.handleEditTodo(event)}
                                                    /></span>
                                                    :
                                                    <span> {index + 1} - {item.title} </span>

                                                }
                                            </>
                                        }
                                        <button className="edit"
                                            onClick={() => this.editTodo(item)}
                                        >
                                            {isEmptyObj === false && editTodo.id === item.id ?
                                                'Save' : 'Edit'
                                            }
                                        </button>
                                        <button className="delete"
                                            onClick={() => this.deleteTodo(item)}
                                        >Delete</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default ListTodo;