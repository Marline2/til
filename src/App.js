import React from "react";
import styled from "styled-components";

import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import InfoChange from "./InfoChange";
import leaf from "./shared/img/leafs.png";
import bear from './shared/img/bear.png';

function App() {
  return (
    <div className="App">
      <All>
        <ImgWrapLeft>
          <img  alt="leaf" src={leaf} />
          <img  alt="leaf" src={leaf} />
        </ImgWrapLeft>
        <Contents>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign_up" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/info" element={<InfoChange />} />
          </Routes>
        </Contents>
        <ImgWrapRight>
          <img alt="leaf" src={leaf} />
          <img alt="leaf" src={leaf} />
        </ImgWrapRight>
        <Sea>
          <img alt="bear" src={bear}/>
          </Sea>
      </All>
    </div>
  );
}

const All = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const Contents = styled.div`
  max-width: 100%;
  position: relative;
  margin: 0 auto;
  z-index: 3;

  @media screen and (max-width: 600px){
    min-width:20em;
  }
`;

const ImgWrapLeft = styled.div`
  overflow-x: hidden;
  max-width: 20em;
  margin-left: -22.5em;
  margin-right: 20em;
  height: 30em;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
  
  @media screen and (max-width: 600px){
    display: none;
  }
  img:nth-child(1) {
    position: absolute;
    transform: rotate(-40deg);
    -webkit-transform: rotate(-40deg);
    animation: Leftmove1 3s 1s infinite alternate;
     @keyframes Leftmove1 {
    from {
      -webkit-transform: rotate(-50deg);
    }
    to {
      -webkit-transform: rotate(-40deg);
    }
  }
}


  img:nth-child(2) {
    margin-top: 3em;
    position: absolute;
    transform: rotate(-10deg);
    -webkit-transform: rotate(-10deg);
    animation: Leftmove2 3s 1s infinite alternate;
     @keyframes Leftmove2 {
    from {
      -webkit-transform: rotate(-20deg);
    }
    to {
      -webkit-transform: rotate(-10deg);
    }
  }
  }
`;

const ImgWrapRight = styled.div`
  max-width: 20em;
  overflow-x: hidden;
  margin-right: -22.5em;
  height: 30em;
  background-size: cover;
  background-repeat: no-repeat;
  right:22em;
  z-index: 2;
  position: relative;

  @media screen and (max-width: 600px){
    display: none;
  }

  img:nth-child(1) {
    position: absolute;
    transform: rotate(-140deg);
    -webkit-transform: rotate(-140deg);
    animation: Rightmove1 3s 1s infinite alternate;
     @keyframes Rightmove1 {
    from {
      -webkit-transform: rotate(-150deg);
    }
    to {
      -webkit-transform: rotate(-140deg);
    }
  }
  }

  img:nth-child(2) {
    margin-top: 3em;
    transform: rotate(-170deg);
   -webkit-transform: rotate(170deg);
    animation: Rightmove2 3s 1s infinite alternate;
     @keyframes Rightmove2 {
    from {
      -webkit-transform: rotate(-180deg);
    }
    to {
      -webkit-transform: rotate(-170deg);
    }
  }
  }
`;

const Sea = styled.div`

    background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
    width: 100%;  
    height:16em;
    position:fixed;
    bottom:0;
    z-index: 1;

    @media screen and (max-width: 600px){
    display: none;
  }

    img{
      display: block;
      margin: auto;
      width:8em;
      height:8em;
      padding-left:7em;

      animation: showbear 3s;
     @keyframes showbear {
      from {
      opacity: 0;
      margin-top: 3em;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
    }
  }

`



export default App;
