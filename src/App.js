import React, { useState, useEffect } from "react";
import CollectionList from "./components/CollectionList";
import './App.css';

function App() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    // API Call
    fetch('https://api.hatchways.io/assessment/students')
    .then(response => response.json())
    .then(data => 
      setUserData(data.students)
      );
  }, [])

  return (
    <div className="App container">
      <CollectionList userData={userData}></CollectionList>
    </div>
  );
}

export default App;
