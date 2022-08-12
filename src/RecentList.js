import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { setTil } from "./redux/modules/tilSlice";
import axios from "axios";

const RecentList = () => {
  const til_lists = useSelector((state) => state.til.til_lists);
  const dispatch = useDispatch();

  const getTilList = async () => {
    const response = await axios.get("http://localhost:5001/til_list");
    console.log(response.data);
    const til = response.data;
    dispatch(setTil(til));
  };

  React.useEffect(() => {
    getTilList();
  }, []);

  return (
    <div>
      {til_lists.map((til, idx) => {
        if (idx % 3 === 0) {
          return (
            <List key={idx}>
              <h2>🍰 {til.work}</h2>
              <Time>{til.study_time}</Time>
              <Desc>{til.description}</Desc>
            </List>
          );
        } else if (idx % 3 === 1) {
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
        }
        return <h1>목록을 불러올 수 없습니다!</h1>;
      })}
    </div>
  );
};

const Time = styled.h3`
  margin: -0.5em 0 0 1em;
`;

const Desc = styled.p`
  margin: 0.5em 0 0.5em 1em;
  font-size: 1em;
`;

const List = styled.div`
  border: 1px solid gray;
  padding: 1em;
  margin-bottom: 1em;
`;


export default RecentList;
