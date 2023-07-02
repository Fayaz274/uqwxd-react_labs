import React from "react";
import "./App.css";
const App = () => {
    //eslint-disable-next-line
  const [todos, setTodos] = React.useState([]);//eslint-disable-next-line
  const [todo, setTodo] = React.useState("");
  const[todoEditing,setToDoEditing]=React.useState(null);
  const[editingText,setEditingText]=React.useState("");

  React.useEffect(()=>{
      const json=localStorage.getItem("todos");
      const loadedTodos=JSON.parse(json);
      if(loadedTodos){
          setTodos(loadedTodos);
      }
  },[]);

  React.useEffect(()=>{
      if(todos.length>0){
          const json=JSON.stringify(todos);
          localStorage.setItem("todos",json);
      }
  }, [todos]);
  // Add the handlesubmit code here
  function handlesubmit(e){
      e.preventDefault();
      const newTodo={
          id:new Date().getTime(),
          text:todo.trim(),
          completed:false,
      };
      if(newTodo.text.length>0){
          setTodos([...todos].concat(newTodo));
          setTodo("");
      }
      else{
          alert("ENtr valid Task");
          setTodo("");
      }

  }
  
  //eslint-disable-next-line
  // Add the deleteToDo code here
  function deleteTodo(id){
      //eslint-disablee-next-line
      let updateTodos=[...todos].filter((todo)=>todo.id!==id);
      setTodos(updateTodos);
  }

  
  // Add the toggleComplete code here
  function toggleComplete(id){
      let updatedTodos=[...todos].map((todo)=>{
          if(todo.id===id){
              todo.completed=!todo.completed;
          }
          return todo;
      });
      setTodos(updatedTodos);
  }

  
  // Add the submitEdits code here
  function submitEdits(id){
      const updatedTodos=[...todos].map((todo)=>{
          if(todo.id===id){
              todo.text=editingText;;
          }
          return todo;
      });
      setTodos(updatedTodos);
      setToDoEditing(null);
  }

  
return(
<div className ="App">
    <h1>Todo List</h1>
    <form onSubmit={handlesubmit}>
        <input 
            type ="text" 
            onChange={(e)=>setTodo(e.target.value)}
            placeholder="add a new task"
            value={todo}
            align ="right" />
        <button type ="submit">Add Todo</button>
    </form>
    {todos.map((todo)=>(
        <div key={todo.id} className="todo">
            <div className="todo-text">
            <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setToDoEditing(todo.id)}>Edit</button>
                )}
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            </div>
    
))}
</div>
);
                };
export default App;
