import NavigationBar from "./components/NavigationBar";
import Employees from "./components/Employees"; 

import { useState, useEffect } from "react";

const App = () => {

  const [employeesData, setEmployeesData] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/employees')
    .then(res => res.json())
    .then(setEmployeesData)
  }, [])
  // console.log(employeesData);

  const handlePostData = (task) => {

    const employeeIndex = employeesData.findIndex(obj => obj.id === task.employee_id)
    const updatedEmployee = {...employeesData[employeeIndex], tasks: [...employeesData[employeeIndex].tasks, task]}
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.id === task.employee_id){
        return updatedEmployee
      }
      else {
        return employee
      }
    })

    setEmployeesData(updatedEmployeesData)
  }


  const handleUpdateData = (task) => {
    const employeeIndex = employeesData.findIndex(obj => obj.id === task.employee_id)
    const updatedEmployee = {...employeesData[employeeIndex]};
    const taskId = task.id;
    const taskIndex = updatedEmployee.tasks.findIndex(obj => obj.id === taskId)
    updatedEmployee.tasks[taskIndex] = task
    
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.id === task.employee_id){
        return updatedEmployee
      }
      else {
        return employee
      }
    })

    setEmployeesData(updatedEmployeesData)

    }

  return (
    <>
      <NavigationBar />
      <Employees employeesData={employeesData} handlePostData={handlePostData} handleUpdateData={handleUpdateData}/>
    </>
  
  );
}

export default App;
