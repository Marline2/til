import React from "react";
import styled from "styled-components";

import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddTil from './AddTil';

function App() {
  return (
    <div className="App">
      <All>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTil />} />
        </Routes>
      </All>
    </div>
  );
}

const All = styled.div`
  width: 500px;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;


export default App;
