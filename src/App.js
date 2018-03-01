import React, { Component } from 'react';
import './App.css';
import Medium  from "./components/UpScriber/medium";
import ToolBar from "./components/UpScriber/toolbar";
import Upload from "./components/UpScriber/upload";
import Home from "./components/UpScriber/home"
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router basename="/app-ubscriber">
       <div className="App">
        <ToolBar title="rainbow" />
        <Route exact path="/" component={Home}/>
        <Route path="/editor" component={Medium}/>
        <Route path="/upload" component={Upload}/>
      </div>
   </Router>
    );
  }
}

export default App;
