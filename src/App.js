import NavigationBar from "./components/NavigationBar";
import Employees from "./components/Employees"; 

import { useState, useEffect } from "react";

const App = () => {

  const [employeeData, setEmployeeData] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/employees')
    .then(res => res.json())
    .then(setEmployeeData)
  }, [])

  const handlePostData = () => {
    
  }

  return (
    <>
      <NavigationBar />
      <Employees employeeData={employeeData} handlePostData={handlePostData}/>
    </>
  
  );
}

export default App;
