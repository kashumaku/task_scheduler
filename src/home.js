import { useEffect, useState } from "react";
//import { todos } from "./todos"
import './style.css'
import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore'
const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState();
    const [toggle, setToggle] = useState(true)
    const [time, setTime] = useState(null)
    const [date, setDate] = useState(null)
    const [alert, setAlert] = useState("")
    useEffect(() => {
        const getTask = async () => {
            const taskCollection = collection(db, 'tasks')
            const data = await getDocs(taskCollection)
            // const d = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setTasks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getTask()
    }, [tasks])
    const notify = () => {
        setAlert('All inputs are required')
        setTimeout(() => {
            setAlert("")
        }, 3000)
    }


    const addTask = async () => {
        if (!newTask || !date || !time) {
            notify()
            return
        }

        const taskCollection = collection(db, 'tasks')
        await addDoc(taskCollection, { task: newTask, created_date: new Date().toDateString(), time: time, date: date, complated: false })
        setNewTask('')
        setDate(null)
        setTime(null)
    }
    const complate = async (id, isComplated) => {

        const docRef = doc(db, 'tasks', id)
        await updateDoc(docRef, { complated: !isComplated })

    }

    const remove = async (e, id) => {
        e.stopPropagation()
        const docRef = doc(db, 'tasks', id)
        await deleteDoc(docRef)


    }

    return (<>

        <div className="main">
            <div className={toggle ? "container" : "hideContainer"}>
                {alert && <p style={{ color: 'yellow' }}>{alert}</p>}
                {tasks.map((task, index) => {
                    return <div className="task" key={index} onClick={() => { complate(task.id, task.complated) }}>
                        <div className={task.complated ? "checked" : "check"}></div>
                        <div>
                            <div className={`tasktxt ${task.complated ? 'checked-text' : 'text'}`}>
                                <p>{task.task}</p>
                            </div>
                            <p className="remainder"> <span>Start task on: {task.date + '|' + task.time}</span></p>
                        </div>
                        <div className="remove" onClick={(e) => remove(e, task.id)}>x</div>
                    </div>
                })}
                <div className="addTask">
                    <span>Add task</span>
                    <input type="text" value={newTask} placeholder="Type task.." onChange={(e) => setNewTask(e.target.value)} />
                    <input type="time" onChange={(e) => setTime(e.target.value)} required />
                    <input type="date" onChange={(e) => setDate(e.target.value)} />
                    <button onClick={addTask}>Add task</button>
                </div>
            </div>
            <div className="toggler" onClick={() => setToggle(!toggle)}>M</div>
        </div>

    </>);
}

export default Home;