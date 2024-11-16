import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componenets/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  // const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

useEffect(() => {
  let todostring  = localStorage.getItem("todos")
  if (todostring ) {
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
}, [])



const savetols = ()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}
const toogleFinished = (e)=>{
  setshowfinished(!showfinished)
}

  let handleEdit = async (e, id) => {
    console.log(e, id)
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    savetols()
  }

  let handleDelete = async (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    savetols()
  }

  let handleChange = async (e) => {
    settodo(e.target.value)
  }

  let handleAdd = async () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    settodo("")
    savetols()
  }

  let handleCheckbox = async (e) => {
    let id = e.target.name
    console.log(id)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    settodos(newTodos)
    savetols()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 h-auto md:w-1/2">
        <div className="addtodo my-5">
          <h1 className="text-lg">Add a Todo</h1>
          <input placeholder='Name Of Your Todo' onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-2 mt-5' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='w-[100%] m-auto mt-[25px] bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 text-white rounded-md '>Save</button>
        </div>
        <input onChange={toogleFinished} type="checkbox" checked={showfinished}/> Show Finished
        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div>No Todos To Display</div>}
          {todos.map(items => {
            return (showfinished || !items.isComplete) && <div key={items.id} className="todo w-[100%] flex md:w-1/2 my-3 justify-between">
              <div className="flex gap-5">
                <input onChange={handleCheckbox} checked={items.isComplete} type="checkbox" name={items.id} id="" />
                <div className={items.isComplete ? "line-through" : ""}>{items.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => handleEdit(e, items.id)} className="button bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, items.id) }} className="button bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-1"><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
