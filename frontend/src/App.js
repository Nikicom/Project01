import React, { Component } from "react";
import Todoform from "./components/toDoForm";
import TodoList from "./components/toDoList";

class App extends Component {
  render() {
    return (
      <div> 
        <Todoform/>
        <TodoList/>
      </div>
   
    );
  }
}

export default App;
