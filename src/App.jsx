import Navbar from "./components/Navbar"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


function App() {
  const [Todo, setTodo] = useState("")
  const [TODOS, setTODOS] = useState([])

  // Save TO LocalStorage
  const SavetoLS = () => {
    localStorage.setItem("TODOS", JSON.stringify(TODOS))
  }

  useEffect(() => {
    let TodoString = localStorage.getItem("TODOS")
    if (TodoString) {
      let todos = JSON.parse(localStorage.getItem("TODOS"));
      setTODOS(todos)
    }

  }, [])


  const AddTodo = () => {
    setTODOS([...TODOS, { Todo, isCompleted: false, id: uuidv4() }]);
    setTodo("")
    console.log(TODOS)
    SavetoLS()
  }

  const EditTodo = (e, id) => {
    let T = TODOS.filter((item) => { return item.id === id })
    setTodo(T[0].Todo)
    let NewTODOS = TODOS.filter((item) => {
      return item.id !== id;
    })
    setTODOS(NewTODOS)
    SavetoLS()
  }

  const DeleteTodo = (e, id) => {

    let NewTODOS = TODOS.filter((item) => {
      return item.id !== id;
    })
    setTODOS(NewTODOS)
    SavetoLS()
  }

  const HandleChange = (e) => {
    setTodo(e.target.value)
  }

  const HandleCheckBox = (e) => {
    let id = e.target.name
    let index = TODOS.findIndex((item) => {
      return item.id === id;
    })
    let NewTODOS = [...TODOS];
    NewTODOS[index].isCompleted = !NewTODOS[index].isCompleted;
    setTODOS(NewTODOS);
    SavetoLS();

  }

  return (
    <>
      <div className="container mx-auto bg-slate-500">
        <Navbar />
        <div className=" w-3/5  mx-auto rounded-xl bg-violet-100 p-4 mt-16">
          <div className="flex justify-center items-center">
            <div className="w-full">
              <h1>Add a new Todo:</h1>
              <div className="flex gap-x-2">
                <input onChange={HandleChange} value={Todo} type="text" className="w-3/4 h-[45px] bg-violet-200 px-2 font-semibold text-xl border-red-100 border" />
                <button disabled={Todo.length <= 1} onClick={AddTodo} className="text-white disabled:bg-slate-400 bg-violet-600 font-bold px-4 py-1 rounded-xl ">Add</button>
              </div>
            </div>
          </div>

          <div className="mt-10">

            <h1 className="text-2xl font-semibold text-violet-400">Your TODOS :</h1>
            {TODOS.length === 0 && <div className="mx-4 mt-2 text-xl text-gray-500">No To-Do is Found !</div>}
            {TODOS.map((item) => {
              return <div key={item.id} className="flex mt-3 gap-x-3">
                <input type="checkbox" name={item.id} onChange={HandleCheckBox} checked={item.isCompleted} id="" />
                <p className={`text-md font-medium ${item.isCompleted ? " line-through text-gray-500" : ""} `}>{item.Todo}</p>
                <div className="flex justify-center items-center gap-2">
                  <button className="text-white bg-violet-600 font-bold px-4 py-1 rounded-xl" onClick={(e) => { EditTodo(e, item.id) }}>Edit</button>
                  <button className="text-white bg-violet-600 font-bold px-4 py-1 rounded-xl" onClick={(e) => { DeleteTodo(e, item.id) }}>Delete</button>
                </div>

              </div>
            })}
          </div>

        </div>
        <div className=" mx-auto w-3/5 ">
          <a href="https://www.youtube.com/@withcodecraft" target="_blank" className=" text-yellow-100  font-bold cursor-pointer ">@CodeCraft</a>
        </div>
      </div>

    </>
  )
}

export default App
