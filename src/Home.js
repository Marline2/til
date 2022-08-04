
import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setTil } from "./redux/modules/tilSlice";

import axios from "axios";

const Home = () => {
  const til_lists = useSelector((state) => state.til.til_lists);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getTilList = async () =>{
    const response = await axios.get("http://localhost:5001/til_list");
    console.log(response.data);
    const til = response.data;
    dispatch(setTil(til))
  };
  React.useEffect(()=>{
    getTilList();
  },[]);

  return (
    <ListTil>
      <TitleZone>
        <h1>TIL ✍</h1>
        <AddButton
          onClick={() => {
            navigate("/add");
          }}
        >
          +
        </AddButton>
      </TitleZone>
      {til_lists.map((til, idx) => {
        if (idx % 3 === 0) {
          return (
            <List key={idx}>
              <h2>🍰 {til.work}</h2>
              <Time>{til.study_time}</Time>
              <Desc>{til.description}</Desc>
            </List>
          );}
         else if (idx % 3 === 1) {
          return (
            <List key={idx}>
              <h2>🍨 {til.work}</h2>
              <Time>{til.study_time}</Time>
              <Desc>{til.description}</Desc>
            </List>
          );
        } else if (idx % 3 === 2) {
          return (
            <List key={idx}>
              <h2>🍩 {til.work}</h2>
              <Time>{til.study_time}</Time>
              <Desc>{til.description}</Desc>
            </List>
          );
        } return (<h1>목록을 불러올 수 없습니다!</h1>);
      })}
    </ListTil>
  );
};

const ListTil = styled.div`
  width: 450px;
  margin: auto;
`;

const TitleZone = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Time = styled.h3`
  margin: -10px 0 0 20px;
`;

const Desc = styled.p`
  margin: 10px 0 10px 20px;
  font-size: 15px;
`;

const AddButton = styled.button`
  width: 30px;
  height: 30px;
  text-align: center;
  margin: auto 0 20px auto;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 20px;
  &:hover {
    background-color: pink;
  }
`;
const List = styled.div`
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
`;

export default Home;
