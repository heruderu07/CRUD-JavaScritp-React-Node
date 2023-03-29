import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo => {
          return (
          <div className="todo" key={todo.id}>
            <button
            onClick={ () => modifyStatusTodo(todo)}
             className="checkbox"
             style={{backgroundColor: todo.status ? "#A879E6" : "white" }}
             ></button>
             <p>{todo.name}</p> 
             <button onClick={ () => handleWithEditButton(todo) } >
               <AiOutlineEdit size={20} color={"64697b"}></AiOutlineEdit>
             </button>
             <button onClick={() => deleteTodo(todo)}>
               <AiOutlineDelete size={20} color={"64697b"}></AiOutlineDelete>
             </button>
          </div> 
         );
      }))}
      </div>
    );
  };
  
  async function handleWithNewButton() {
    setinputVisibility(!inputVisibility)
  };

  async function handleWithEditButton(todo){
    setselectedTodo(todo);
    setinputVisibility(true);
  };
  
  async function getTodos(){
    const response = await axios.get("http://localhost:3333/task");
    setTodos(response.data);
  };

  async function createTodo(){
    const response = await axios.post("http://localhost:3333/task", {
      name: inputValue,
    });
      getTodos();
      setinputVisibility(!inputVisibility);
      setInputValue("");
  };

  async function editTodo(){
    const response = await axios.put("http://localhost:3333/task",{
      id: selectedTodo.id,
      name: inputValue,
    });
    setselectedTodo();
    setinputVisibility(false);
    getTodos();
    setInputValue("");
  };

  async function deleteTodo(todo){
    const response = await axios.delete(`http://localhost:3333/task/${todo.id}`);
    getTodos();
  };

  async function modifyStatusTodo(todo){
    const response = await axios.put("http://localhost:3333/task",{
    id: todo.id,
    status: !todo.status,
   });
   getTodos();
  };

  const [ todos, setTodos ] = useState([]);
  const [ inputValue, setInputValue ] = useState("");
  const [ inputVisibility, setinputVisibility ] = useState(false); //Faz com que o input acima do botao new apareça
  const [ selectedTodo, setselectedTodo ] = useState();

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Tasks:</h1>
        </div>
        <Todos todos={todos}></Todos>
       <input 
          value={ inputValue } 
          style={{ display: inputVisibility ? "block" : "none" }}
          onChange={(event) =>{
          setInputValue(event.target.value);
        }} 
        className="inputname"
      ></input>
        <button onClick={ inputVisibility 
          ? selectedTodo 
          ? editTodo 
          : createTodo 
          : handleWithNewButton 
          } 
          className="newTaskButton">
          { inputVisibility ? "Confirm" : "+ New task" }
        </button>
      </header>
      
    </div>
  );
}

export default App;
