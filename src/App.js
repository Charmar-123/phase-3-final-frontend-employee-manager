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
  console.log(employeesData);

  const handlePostData = (task) => {
    // console.log(employeesData[task.employee_id - 1]);
    const updatedEmployee = {...employeesData[task.employee_id - 1], tasks: [...employeesData[task.employee_id-1].tasks, task]}
    console.log(updatedEmployee);
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

  const handleUpdateData = () => {

  }

  return (
    <>
      <NavigationBar />
      <Employees employeesData={employeesData} handlePostData={handlePostData} handleUpdateData={handleUpdateData}/>
    </>
  
  );
}

export default App;
