import React from "react";
import styled from "styled-components";

import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from "./Login";
import Signup from "./Signup";
import InfoChange from "./InfoChange";

function App() {
  return (
    <div className="App">
      <All>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/sign_up" element={<Signup/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/info" element={<InfoChange />} />
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
