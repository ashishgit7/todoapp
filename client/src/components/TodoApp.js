import React, { useState,useEffect } from "react";
import "./todoapp.css";
import axios from 'axios';

function TodoApp() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState('High')
  const [dueDate, setDueDate] = useState('')
  const [tasklist, setTaskList] = useState([]);
  const handlePriority = (e) => {
    console.log(e.target.value)
    setPriority(e.target.value);
  }
  const handleTask = (e) => {
    setTask(e.target.value);
  };
  const initTask = ()=>{
    axios.get('http://localhost:5000/task/')
    .then(response => {
      if (response.data.length > 0) {
        
        setTaskList(response.data)
        console.log(response.data)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    initTask()
  }, [])

  const AddTask = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    if (task !== "") {
      const taskDetails = {
        // id: Math.floor(Math.random() * 1000),
        desc: task,
        priority: priority,
        date: today,
        condition: 'To do',
        dueDate: dueDate
      };
      axios.post('http://localhost:5000/task/add/' , taskDetails)
      .then(res => {console.log(res.data)
      initTask()}
      );
    }
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    // setTaskList(tasklist.filter((t) => t.id != id));
    axios.delete('http://localhost:5000/task/'+id)
      .then(response => { console.log(response.data)
      initTask()
      });
  };

  const changeCondition = (e, id) => {
    e.preventDefault();
    const element = tasklist.findIndex((elem) => elem._id == id);
    const newTaskList = [...tasklist];
    newTaskList[element] = {
      ...newTaskList[element],
      condition: e.target.value,
    };
    console.log(newTaskList)
    axios.post('http://localhost:5000/task/update/' + id, newTaskList[element])
      .then(res => {console.log(res.data)
      initTask()
      });
  }

  return (
    <div className="container-fluid text-center">
      <div class="row g-5 align-items-center justify-content-center">
        <div class="col-auto">
          <input
            type="text"
            name="text"
            id="text"
            onChange={(e) => handleTask(e)}
            placeholder="Add task here..."
          />
        </div>
        <div class="col-auto">
          <select className="btn btn-info dropdown-toggle" value={priority} onChange={(e) => handlePriority(e)} >
            <option className="dropdown-item" value="High">High</option>
            <option className="dropdown-item" value="Medium">Medium</option>
            <option className="dropdown-item" value="Low">Low</option>
          </select>
        </div>
        <div class="col-auto">
          <label for="start">Due date:</label>
          <input type="date" id="start" onChange={(e) => setDueDate(e.target.value)}></input>
        </div>
        <div class="col-auto">
          <button className="btn btn-success" onClick={AddTask}>
            Add
      </button>
        </div></div>
      <br />
      {tasklist !== [] ? (
        <ul>
          <table className="table table-dark table-striped">
            <thead>
              <th scope="col" className='text-dark'>Task</th>
              <th scope="col" className='text-dark'>Priority</th>
              <th scope="col" className='text-dark'>Start Date</th>
              <th scope="col" className='text-dark'>Due Date</th>
              <th scope="col" className='text-dark'>State</th>
              <th scope="col" className='text-dark'></th>
            </thead>
            <tbody>
              {tasklist.map((t) => (
                <tr key = {t._id}>
                  <td>{t.desc}</td>
                  <td className={t.priority=='High'?'text-danger':t.priority=='Low'?'text-success':'text-warning'}>{t.priority}</td>
                  <td>{t.date}</td>
                  <td>{t.dueDate}</td>
                  <td>
                    <div className="btn-group">
                      <select className="btn btn-success dropdown-toggle" value={t.condition} onChange={(e) => changeCondition(e, t._id)} >
                        <option className="dropdown-item" value="To do">To do</option>
                        <option className="dropdown-item" value="Review">Review</option>
                        <option className="dropdown-item" value="Completed">Completed</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={(e) => deletetask(e, t._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ul>
      ) : null}
    </div>
  );
}

export default TodoApp;

