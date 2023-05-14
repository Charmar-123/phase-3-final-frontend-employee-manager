// Components
import NavigationBar from "./components/NavigationBar";
import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";
import CreateNewTask from "./components/CreateNewTask";
import EditEmployeeTask from "./components/EditEmployeeTask";

import { useState, useEffect } from "react";

// React - Router

import { Routes, Route } from 'react-router-dom';

const App = () => {

  const [employeesData, setEmployeesData] = useState([])

  // new tasks to be added for employee
  const [newTaskEmployeeData, setNewTaskEmployeeData] = useState({ tasks: [] })


  // fetch initial nested data with employees and their tasks
  useEffect(() => {
    fetch('http://localhost:9292/employees')
      .then(res => res.json())
      .then(setEmployeesData)
  }, [])


  // update state with the new tasks from CreateNewTask
  const handlePostTaskData = (newTasks) => {

    const employeeIndex = employeesData.findIndex(obj => obj.id === newTasks[0].employee_id)

    const updatedEmployee = { ...employeesData[employeeIndex], tasks: [...employeesData[employeeIndex].tasks, ...newTasks] }
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.id === newTasks[0].employee_id) {
        return updatedEmployee
      }
      else {
        return employee
      }
    })
    console.log(updatedEmployee)

    setEmployeesData(updatedEmployeesData)
  }

// update state with new task status, changed to complete
  const handleUpdateData = (task) => {
    const employeeIndex = employeesData.findIndex(obj => obj.id === task.employee_id)
    const updatedEmployee = employeesData[employeeIndex];
    const taskId = task.id;
    const taskIndex = updatedEmployee.tasks.findIndex(obj => obj.id === taskId)
    updatedEmployee.tasks[taskIndex] = task

    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.id === task.employee_id) {
        return updatedEmployee
      }
      else {
        return employee
      }
    })

    setEmployeesData(updatedEmployeesData)

  }

  // update state with the task deleted
  const handleDeleteData = (task) => {
    console.log(task);
    const employeeIndex = employeesData.findIndex(obj => obj.id === task.employee_id)
    const updatedEmployee = employeesData[employeeIndex];
    updatedEmployee.tasks = updatedEmployee.tasks.filter(t => t.id !== task.id)

    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.id === task.employee_id) {
        return updatedEmployee
      }
      else {
        return employee
      }
    })

    setEmployeesData(updatedEmployeesData)
  }


// employee form data passed to populate CreateNewTaskForm
  const presetFormData = (id, name, image_url, position, tasks) => {
    setNewTaskEmployeeData({ id: id, name: name, position: position, image_url: image_url, tasks })
  }


  // update state with new employee added
  const handlePostEmployeeData = (newEmployee) => {
    setEmployeesData([...employeesData, newEmployee])
  }

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route exact path='/employees' element={<Employees employeesData={employeesData} handleUpdateData={handleUpdateData} handleDeleteData={handleDeleteData} presetFormData={presetFormData} />}/>
        <Route path='employees/new' element={<CreateEmployee handlePostEmployeeData={handlePostEmployeeData} />}/>
        <Route path='employees/:id/new_tasks' element={<CreateNewTask newTaskEmployeeData={newTaskEmployeeData} handlePostTaskData={handlePostTaskData} />}/>
        <Route path='/employees/:id/edit_task/:task_id' element={<EditEmployeeTask newTaskEmployeeData={newTaskEmployeeData} handleUpdateData={handleUpdateData}/>}/>
        
        
        
      </Routes>

    </>

  );
}

export default App;
