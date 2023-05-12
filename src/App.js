import NavigationBar from "./components/NavigationBar";
import Employees from "./components/Employees";
import CreateEmployee from "./components/CreateEmployee";
import CreateNewTask from "./components/CreateNewTask";

import { useState, useEffect } from "react";

const App = () => {

  const [employeesData, setEmployeesData] = useState([])
  const [newTaskEmployeeData, setNewTaskEmployeeData] = useState({tasks: []})

  useEffect(() => {
    fetch('http://localhost:9292/employees')
      .then(res => res.json())
      .then(setEmployeesData)
  }, [])
  // console.log(employeesData);

  const handlePostData = (newTasks) => {
    console.log(newTasks[0].employee_id);

    const employeeIndex = employeesData.findIndex(obj => obj.id === newTasks[0].employee_id)
    console.log(employeeIndex);
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
    // const taskId = task.id;
    // const taskIndex = updatedEmployee.tasks.findIndex(obj => obj.id === taskId)
    // delete updatedEmployee.tasks[taskIndex]
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
    setNewTaskEmployeeData({id: id, name: name,position: position, image_url: image_url, tasks})
    // console.log(newTaskEmployeeData);
  }

  return (
    <>
      <NavigationBar />
      {/* <CreateEmployee/> */}
      <CreateNewTask newTaskEmployeeData={newTaskEmployeeData} handlePostData={handlePostData}/>
      <Employees employeesData={employeesData} handlePostData={handlePostData} handleUpdateData={handleUpdateData} handleDeleteData={handleDeleteData} presetFormData={presetFormData}/>
    </>

  );
}

export default App;
