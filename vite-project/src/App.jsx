import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componenets/navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [count, setCount] = useState(0)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  let handleEdit = async () => {

  }
  let handleDelete = async () => {

  }
  let handleChange = async (e) => {
    settodo(e.target.value)
  }
  let handleAdd = async () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: true }])
    settodo("")
  }
  let handleCheckbox = async (e) => {
    let id = e.target.name
    let index  = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete
    settodos = newTodos
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addtodo my-5">
          <h1 className="text-lg">Add a Todo</h1>
          <input  onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-6'>Add</button>
        </div>
        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.map(items => {
            return <div key={items.id} className="todo flex w-1/4 my-3 justify-between">
              <input onChange={handleCheckbox} value={items.isComplete} type="checkbox" name={items.id} id="" />
              <div className={items.isComplete ? "" : "line-through"}>{items.todo}</div>
              <div className="butt">
                <button onClick={handleEdit} className="button bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-1">Edit</button>
                <button onClick={handleDelete} className="button bg-violet-800 hover:bg-violet-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-1">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
