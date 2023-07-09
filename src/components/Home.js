import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <h1 style={{ textAlign:"center",fontSize:"xxx-large"}}>iNotebook</h1>
      
      <Notes showAlert={showAlert}/>

    </div>
  )
}

export default Home
