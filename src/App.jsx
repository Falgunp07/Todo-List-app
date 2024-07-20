import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit} from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [Showfinished, setShowfinished] = useState(true)

  useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
  }, [])
  
  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (e) => {
    setShowfinished(!Showfinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

  }




  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()


  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")

  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
  
    let index = todos.findIndex(item => {
      return item.id === id;
    })
  
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }



  return (
    <>
      <Navbar />
      <div className=" mx-3md:container md:mx-auto my-5 rounded-xl p-5 bg-cyan-200 min-h-[70vh] md:w-1/2">
       <h1 className='font-bold text-center'> iTask - Manages your tasks</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-cyan-300 hover:bg-cyan-500 disabled:bg-cyan800 p-3 py-1 text-white rounded-xl '>Save</button>
        </div>
<input onChange={toggleFinished} type="checkbox" checked={Showfinished} />Show Finished
        <h2 className='text-lg font-bold'>Your TODOS</h2>
        <div className="todos">
          {todos.length ===0 && <div className='m-5'> No Todos to display</div> }
          {todos.map(item => {

            return (Showfinished || item.isCompleted) && <div key={item.id} className="md:todo flex w-1/4 my-3 justify-between">
              <div className='flex gap-4'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-cyan-300 hover:bg-cyan-500 p-3 py-1 text-white rounded-xl mx-2'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-cyan-300 hover:bg-cyan-500 p-3 py-1 text-white rounded-xl mx-2'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
