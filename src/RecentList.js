import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { showList, getTilList } from "./redux/modules/tilSlice";

const RecentList = () => {
  const til_lists = useSelector(showList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTilList());
  }, []);

  return (
    <Scroll>
      {til_lists
        .slice(0)
        .reverse()
        .map((til, idx) => {
          if (til.work === "작성된 TIL이 없습니다.") {
            return (
              <div key={idx}>
                <h2>{til.work}</h2>
                <h4
                  style={{
                    fontWeight: "normal",
                    margin: "-1em 1em",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ borderBottom: "0.3em solid #FF7F50" }}
                  >
                    maps_ugc
                  </span>{" "}
                  를 클릭해서 당신의 TIL을 기록해보세요 &#128518;
                </h4>
              </div>
            );
          } else {
            return (
              <List key={idx}>
                <h3>
                  {til.day}
                  &nbsp;
                  <span className="material-symbols-outlined">
                    calendar_today
                  </span>
                  <br />
                  <span className="material-symbols-outlined">timer</span>&nbsp;
                  <span className="time">{til.study_time}</span>
                </h3>
                <Title>
                  <h2>
                    <img src={til.photo} alt="img" />
                    <br />
                    <Name>{til.name}</Name>
                  </h2>
                  <SubTitle>
                    <h2>{til.work}</h2>
                    <p>{til.description}</p>
                  </SubTitle>
                </Title>
              </List>
            );
          }
        })}
    </Scroll>
  );
};
const Scroll = styled.div`
  overflow-y: scroll;
  padding:1em;
  height: 80%;

  ::-webkit-scrollbar {
    display: none;
  }
`
const List = styled.div`
  border: 1px solid gray;
  padding: 1em;
  margin-bottom: 1em;

  h3 {
    font-size: 0.8em;
    font-weight: normal;
    text-align: right;
    margin: 0;

    span {
      font-size: 0.75em;
    }

    span.time {
      font-size: 1.1em;
      border-radius: 10%;
      border-bottom: 2px solid cornflowerblue;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;

  img {
    width: 2em;
    height: 2em;
    border-radius: 10%;
    margin-right: 0.8em;
    margin-top: -1em;
    border: 1px solid gray;
  }
`;

const Name = styled.div`
  font-size: 0.4em;
  width: 5.2em;
  text-align: center;
  margin: 0;
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    margin-top: 0em;
    width: fit-content;
  }

  p {
    margin: -1em 0 2em 0.2em;
    font-size: 1em;
  }
`;
export default RecentList;
