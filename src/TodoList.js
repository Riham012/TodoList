import React ,{useState,useEffect}from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import './TodoList.css';
import axios from 'axios'
function TodoList(){
  const [todos,setTodos]=useState([]);
  const [todo,setTodo]=useState('');
  const [todoEditing,setTodoEditing]=useState(null);
  const [todoTextEdit,setTodoTextEdit]=useState('');
 
  
  useEffect(() => {
    // const temp=JSON.stringify(todos);
    // localStorage.setItem('todos',temp)
  }, [todos]);

  useEffect(() => {
    const getAllTodos= async()=>{
     await axios.get(`https://jsonplaceholder.typicode.com/todos`).then(res=>{
     const responseTodos=res.data;
     if(responseTodos) setTodos(responseTodos)
   });
    }
    getAllTodos();
  }, []);
  // useEffect(() => {
  //   const temp= localStorage.getItem('todos');
  //   const loadedTodos=JSON.parse(temp);
  //   console.log(loadedTodos)
  //   if(loadedTodos){
  //     setTodos(loadedTodos)
  //   }
  // }, []);
  
  const handleSubmit = async (e)=> {
    e.preventDefault();
    const request={
      id:uuidv4(),
      title:todo,
      completed:false
    }
    const response= await axios.post("https://jsonplaceholder.typicode.com/todos", request);
    setTodos([...todos,response.data]);
    setTodo('')
  }
  function ToggleCompleted(id){
    let updatedTodos=todos.map((todo)=>{
      if(todo.id === id){
        todo.completed=!todo.completed
      }
      return todo;
    })
    setTodos(updatedTodos)
  }
  function handleDelete(id){
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    let updatedTodos= todos.filter( (todo)=> todo.id !== id);
    setTodos(updatedTodos);
  }
 
  const HandleEdit = async(e,todo,id) =>{
    e.preventDefault()
    console.log(todo);
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`,todo);
    console.log(response);
    setTodos(todos.map((todo)=>{
      return (todo.id===id)? {...response.data}:todo;
    }))
    // let updatedTodos=todos.map((todo)=>{
    //   if(todo.id === id){
    //     todo.title=todoTextEdit
    //   }
    //    return todo;
    // });
   // setTodos(updatedTodos);
    setTodoEditing(null)
  }

  function edit(todo){
      setTodoEditing(todo.id);
      setTodoTextEdit(todo.title)
    }
  return (
    <div className='TodoList'>
      <h1> Todo List! <span>A Simple React Todo List App.</span></h1>
      <form className="NewTodoForm"  onSubmit={handleSubmit}>
        <input type="text" onChange={(e)=>setTodo(e.target.value)} placeholder='New Todo' value={todo}/>
        <button type="submit">Add Todo</button>
      </form>
      {todos.map((todo)=> (
        <div key={todo.id} id={todo.id} className="Todo">
            <div>
          <input type="checkbox" onChange={()=>ToggleCompleted(todo.id)} checked={todo.completed}/>
          </div>
          {todoEditing===todo.id ?(
            <div>
              <form className='Todo-edit-form'>
              <input type="text" onChange={(e)=>setTodoTextEdit(e.target.value)} value={todoTextEdit}/>
              <button onClick={(e)=>HandleEdit(e,todo)}> Save Editing</button>
              </form>
            </div>
          ):(
            <div className="Todo-task">
                <ul>{todo.title}</ul>
            </div>
             )}
          <div className='Todo-buttons'>
          <button onClick={()=>edit(todo)}><i className='fas fa-pen' /></button>

          <button onClick={()=> handleDelete(todo.id)}><i className='fas fa-trash' /></button>
          </div>
        </div>
       ))}
    </div>
  );
}

export default TodoList;