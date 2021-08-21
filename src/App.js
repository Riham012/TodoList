import React from 'react';
import './App.css';
import TodoList from './TodoList';
import {BrowserRouter as Router, Switch ,Route } from "react-router-dom";
function App() {
  
  return (
   <div>
    <Router>
    <Switch>
      <Route exact path="/" children={<TodoList />}></Route>
    </Switch>
    </Router>
   </div>

  );
}

export default App;