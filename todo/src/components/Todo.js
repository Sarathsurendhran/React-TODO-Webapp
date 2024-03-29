import React from "react";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [editId, setEditID] = useState(0)


  const addTodo = () => {
    if(todo !== ''){
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
    }
    if(editId){
      const editTodo = todos.find((todo)=>  todo.id === editId )
      const updateTodo = todos.map((to)=>to.id === editTodo.id ? (to={id:to.id, list:todo}) : (to = {id:to.id, list:to.list}))
      setTodos(updateTodo)
      setEditID(0)
      setTodo('')
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
  };

  const onEdit = (id) =>{
    const editTodo = todos.find((to)=> to.id === id)
    setTodo(editTodo.list)
    setEditID(editTodo.id)
    console.log(editTodo)
  }

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form
        style={{ marginTop: "20px" }}
        className="form-group"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter"
          ref={inputRef}
          value={todo}
          className="form-control"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={addTodo}>{editId ? 'EDIT': 'ADD'}</button>
      </form>
      <div className="list">
        <ul style={{ paddingLeft: "0px" }}>
          {todos.map((to) => (
            <li className="list-items">
              <div className="list-item-list" id={to.status ? "list-item" : ""}>
                {to.list}
              </div>
              <span className="iconList">
                <IoMdDoneAll
                  onClick={() => onComplete(to.id)}
                  className="list-item-icons"
                  id="complete"
                  style={{ cursor: "pointer" }}
                />
                <FiEdit
                  className="list-item-icons"
                  id="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => onEdit(to.id)}
                />
                <MdDelete
                  title="delete"
                  onClick={() => onDelete(to.id)}
                  className="list-item-icons"
                  id="delete"
                  style={{ cursor: "pointer" }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
