import NavigationBar from "./components/NavigationBar";
import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";
import CreateNewTask from "./components/CreateNewTask";

import { useState, useEffect } from "react";

// React - Router

import { Routes, Route } from 'react-router-dom';

const App = () => {

  const [employeesData, setEmployeesData] = useState([])
  const [newTaskEmployeeData, setNewTaskEmployeeData] = useState({ tasks: [] })

  useEffect(() => {
    fetch('http://localhost:9292/employees')
      .then(res => res.json())
      .then(setEmployeesData)
  }, [])


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

  const presetFormData = (id, name, image_url, position, tasks) => {
    setNewTaskEmployeeData({ id: id, name: name, position: position, image_url: image_url, tasks })
    // console.log(newTaskEmployeeData);
  }

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
        
        
        
      </Routes>

    </>

  );
}

export default App;
