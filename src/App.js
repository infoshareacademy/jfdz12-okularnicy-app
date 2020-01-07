import React from 'react';
import './App.css';
import './item-form/Item-form';
import './form/form';
import { ItemForm } from './item-form/Item-form';
import { Wrapper } from './item-form/Wrapper';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <ItemForm/>
      </Wrapper>
    </div>
  );
}

export default App;
