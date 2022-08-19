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

const Rank = (props) => {
  const { rank, click, ani, back } = props;
  const dispatch = useDispatch();

  const clickUser = (til_email) => {
    const user_email = til_email;
    click(user_email);
    dispatch(showEmailTilList(user_email));
    ani();
    back();
  };

  return (
    <Ranks>
      <h3>활동 TOP 3 &#127942;</h3>
      <div>
      {rank.map((e, idx) => {
        if (idx === 0) {
          return (
            <RankNumber key={idx}>
              <span style={{ borderBottom: "2px solid gold" }}>1등</span>{" "}
              &#127940;&nbsp;
              <Count>
                TIL : <CountNum>{e.count}</CountNum>
              </Count>
              <br />
              &nbsp;&nbsp;
              <RankEmail
                onClick={() => {
                  clickUser(e.e);
                }}
              >
                {e.e}
              </RankEmail>
            </RankNumber>
          );
        } else if (idx === 1) {
          return (
            <RankNumber key={idx}>
              <span style={{ borderBottom: "2px solid silver" }}>2등</span>{" "}
              &#127946;&nbsp;
              <Count>
                TIL : <CountNum>{e.count}</CountNum>
              </Count>
              <br />
              &nbsp;&nbsp;
              <RankEmail
                onClick={() => {
                  clickUser(e.e);
                }}
              >
                {e.e}
              </RankEmail>
            </RankNumber>
          );
        } else if (idx === 2) {
          return (
            <RankNumber key={idx}>
              <span style={{ borderBottom: "2px solid brown" }}>3등</span>
              &nbsp;&#127939;&nbsp;&nbsp;
              <Count>
                TIL : <CountNum>{e.count}</CountNum>
              </Count>
              <br />
              &nbsp;&nbsp;
              <RankEmail
                onClick={() => {
                  clickUser(e.e);
                }}
              >
                {e.e}
              </RankEmail>
            </RankNumber>
          );
        } else {
          return null;
        }
      })}
      </div>
    </Ranks>
  );
};

const RecentList = (props) => {
  const { back, ani, keys, click } = props;
  const til_lists = useSelector(showList);

  const dispatch = useDispatch();


  const clickUser = (til_email) => {
    const user_email = til_email.target.alt;
    click(user_email);
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
  height: 35em;
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
      margin-top: -3em;
    }
    to {
      opacity: 1;
      margin-top: 1;
    }
  }
`;

const List = styled.div`
  border: 1px solid gray;
  padding: 1em;
  margin-bottom: 1em;

  @media screen and (max-width: 600px){
    text-overflow: ellipsis;
  
  }

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
    @media screen and (max-width: 600px){
    width:8em;
    height:1.7em;
  
  }
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
  @media screen and (max-width: 600px){
    display: none;
  }

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

const Ranks = styled.div`
  border: 1px solid gray;
  width: 10em;
  height: 16em;
  text-align: center;
  padding: 2em;
  margin: 1em;
  border-radius: 10%;

  @media screen and (max-width: 600px){
    width:15em;
    height: 17em;  
    box-shadow: 1px 1px 3px 1px gray;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0em;
  }
`;

const RankNumber = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  width: 10.7em;
  margin-left: 0.5em;
  text-align: left;
`;
const RankEmail = styled.span`
  font-weight: lighter;
  font-size: 0.7em;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;
const Count = styled.span`
  font-size: 0.6em;

`;
const CountNum = styled.span`
  font-weight: bold;
  background-color: antiquewhite;
  border-radius: 50%;
`;
export default RecentList;
export { Rank };
