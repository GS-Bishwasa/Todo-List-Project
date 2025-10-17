import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componenets/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const savetols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toogleFinished = (e) => {
    setshowfinished(!showfinished);
  };

  let handleEdit = async (e, id) => {
    console.log(e, id);
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos);
    savetols();
  };

  let handleDelete = async (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos);
    savetols();
  };

  let handleChange = async (e) => {
    settodo(e.target.value);
  };

  let handleAdd = async () => {
    settodos([...todos, { id: Date.now().toString(), todo, isComplete: false }]);
    settodo("");
    savetols();
  };

  let handleCheckbox = async (e) => {
    let id = e.target.name;
    console.log(id);
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    settodos(newTodos);
    savetols();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Add Todo Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-indigo-600">+</span> Add New Task
          </h2>
          
          <div className="flex flex-col md:flex-row gap-3">
            <input
              placeholder="What needs to be done?"
              onChange={handleChange}
              value={todo}
              type="text"
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 md:w-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                onChange={toogleFinished}
                type="checkbox"
                checked={showfinished}
                className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 cursor-pointer transition-all"
              />
              {showfinished && (
                <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-3 h-3 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-slate-700 font-medium group-hover:text-indigo-600 transition-colors">
              Show Completed Tasks
            </span>
          </label>
        </div>

        {/* Todos List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Tasks</h2>
          
          <div className="space-y-3">
            {todos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 opacity-20">📝</div>
                <p className="text-slate-500 text-lg">No tasks yet</p>
                <p className="text-slate-400 text-sm mt-1">Add your first task to get started!</p>
              </div>
            )}
            
            {todos.map(items => {
              return (showfinished || !items.isComplete) && (
                <div
                  key={items.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md hover:border-indigo-200 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <input
                        onChange={handleCheckbox}
                        checked={items.isComplete}
                        type="checkbox"
                        name={items.id}
                        className="w-5 h-5 appearance-none border-2 border-slate-300 rounded-md checked:bg-green-500 checked:border-green-500 cursor-pointer transition-all"
                      />
                      {items.isComplete && (
                        <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-3 h-3 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    
                    <span
                      className={`text-slate-800 flex-1 break-words ${
                        items.isComplete ? "line-through text-slate-400" : ""
                      }`}
                    >
                      {items.todo}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={(e) => handleEdit(e, items.id)}
                      className="p-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105"
                      title="Edit task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => { handleDelete(e, items.id) }}
                      className="p-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all duration-200 hover:scale-105"
                      title="Delete task"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Footer */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-slate-500 text-sm">
            <p>
              {todos.filter(t => !t.isComplete).length} active • {todos.filter(t => t.isComplete).length} completed • {todos.length} total
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;