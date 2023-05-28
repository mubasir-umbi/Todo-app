import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";

import "./Todo.css";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(0)

  const inputChangeHandler = (event) => {
    setTodo(event.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const addTodoHandler = () => {
   if(todo.trim() !== ''){
    setError('')
    setTodos((items) => {
        return [...items, { list: todo, id: Date.now(), status: false }];
      });
   }else{
    setError('Invalid input')
   }

   if(editId){
    const editTodo = todos.find(todo => editId === todo.id)
    const updateTodo = todos.map(item => item.id === editTodo.id
        ? (item = {...item, id: item.id, list: todo})
        : (item = {...item})
      ) 
      setTodos(updateTodo)
      setEditId(0)
   }
    setTodo("");
  };

  const onDeleteHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onDoneHandler = (id) => {
    const complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };


 const onEditeHandler = id => {
    const editTodo = todos.find(todo => todo.id === id)
    setTodo(editTodo.list)
    setEditId(editTodo.id)

  }

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });


  let disableCls 

  const todosList = todos.map((item) => {
    {disableCls = item.status ? 'icon disable' : 'icon' }
    return ( 
      <li className="todo-list">
       
        <div className="list-items" 
          id={item.status ? "doneId" : ''}>
            {item.list}
        </div>
         
        <span>
           
          <AiFillEdit 
            className= {disableCls}
            id="edit" 
            title="Edit" 
            onClick={() => onEditeHandler(item.id)}
            

          />

          <MdDownloadDone
            className="icon"
            id="done"
            title="Done"
            onClick={() => onDoneHandler(item.id)}
          />

          <AiOutlineDelete
            className="icon"
            id="delete"
            title="Delete"
            onClick={() => onDeleteHandler(item.id)}
          />
        </span>
      </li>
    );
  });

  return (
    <div className="container">
      <h2 className="header">TODO APP</h2>

      <form className="form-group" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Enter your todo"
          className="input-field"
          id="inpt-fieled"
          value={todo}
          onChange={inputChangeHandler}
          ref={inputRef}
        />

        <button className="add-btn" onClick={addTodoHandler}>
          {editId ? 'UPDATE' :  'ADD'}
        </button>
      </form>
          <p className="error">{error}</p>
      <div className="list">
        <ul>{todosList}</ul>
      </div>
    </div>
  );
}

export default Todo;
