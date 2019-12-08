import React from 'react';
import './App.css';
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";
import Navigation from './navigation/Navigation'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);




function App() {
  return (
    <div className="App">
      <Navigation/>
      
    </div>
  );
}

export default App;
