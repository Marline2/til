import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
  showList,
  getTilList,
  showEmailTilList,
} from "./redux/modules/tilSlice";

const NullComponent = (props) => {
  const { til_lists } = props;
  if (til_lists.length === 0) {
    return (
      <div>
        <h2>작성된 TIL이 없습니다.</h2>
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
          </span>
          를 클릭해서 당신의 TIL을 기록해보세요 &#128518;
        </h4>
      </div>
    );
  } else {
    return null;
  }
};

const RecentList = (props) => {
  const { back, ani, keys } = props;
  const til_lists = useSelector(showList);
  const dispatch = useDispatch();

  const clickUser = (til_email) => {
    const { alt } = til_email;
    const user_email = til_email.target.alt;
    dispatch(showEmailTilList(user_email));
    ani();
    back();
  };

  React.useEffect(() => {
    dispatch(getTilList());
    ani();
    
  }, []);

  return (
    <Scroll>
      <NullComponent til_lists={til_lists} />
     <Ani key={keys}>
      {til_lists
        .slice(0)
        .reverse()
        .map((til, idx) => {
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
                  <div className="tooltip">
                    <img
                      src={til.photo}
                      alt={til.email}
                      onClick={(alt) => {
                        clickUser(alt);
                      }}
                    />
                    <span className="tooltiptextTop">TIL 보기</span>
                  </div>
                  <Name>{til.name}</Name>
                </h2>
                <SubTitle>
                  <h2>{til.work}</h2>
                  <p>{til.description}</p>
                </SubTitle>
              </Title>
            </List>
          );
        })}
 </Ani>
    </Scroll>
  );
};

const Scroll = styled.div`
  overflow-y: scroll;
  padding: 1em;
  height: 80%;
  cursor: default;

  ::-webkit-scrollbar {
    display: none;
  }

`;

const Ani = styled.div`
  animation: show 1.5s;
  @keyframes show {
    from {
      opacity: 0;
      margin-top: -2em;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;


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

  h2 {
    height: 1.5em;
  }

  img {
    width: 2em;
    height: 2em;
    border-radius: 10%;
    margin-right: 0.8em;
    margin-top: -1em;
    border: 1px solid gray;
    cursor: pointer;
  }

  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptextTop {
    visibility: hidden;
    width: 5em;
    height: 1.3em;
    background-color: #ffd700;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    cursor: default;
    position: absolute;
    font-size: 0.5em;
    z-index: 1;
    top: -180%;
    left: 80%;
    margin-left: -5em;
  }

  .tooltip:hover .tooltiptextTop {
    visibility: visible;
    :hover {
      visibility: hidden;
    }
    ::after {
      content: "";
      position: absolute;
      bottom: -50%;
      left: 40%;
      margin-left: -0.3em;
      border-width: 0.8em;
      border-style: solid;
      border-color: #ffd700 transparent transparent transparent;
    }
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
