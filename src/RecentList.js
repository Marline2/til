import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { showList, getTilList} from "./redux/modules/tilSlice";


const RecentList = () => {
  const til_lists = useSelector(showList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTilList());
  }, []);

  return (
    <div>
      {til_lists.slice(0).reverse().map((til, idx) => {
        return (
          <List key={idx}>
            <h3>
              {til.day}
              &nbsp;<span className="material-symbols-outlined">calendar_today</span>
            </h3>
            <Title>
              <h2>
                <img src={til.photo} alt="img" />
                <br />
                <Name>
                  {til.name}
                </Name>
              </h2>
              <SubTitle>
                <p><span className="material-symbols-outlined">timer</span>
                  {til.study_time}</p>
                <h2>{til.work}</h2>
              </SubTitle>
            </Title>
            <Desc>{til.description}</Desc>
          </List>
        );
      })}
    </div>
  );
};

const Desc = styled.p`
  margin: -2.2em 0 2em 4.2em;
  font-size: 1em;
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

    span{
      font-size:0.75em;
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
    border:1px solid gray;
  }
`;

const Name = styled.div`
    font-size: 0.4em;
    width: 5.2em;
    text-align: center;
    margin: 0;
`

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 2em;

  h2 {
    margin-top: -0.8em;
  }

  p {
    font-size: 1em;
    border-radius: 10%;
    width: fit-content;
    background-color: #dff1df;
    span{
      font-size:0.8em;
    }
  }
`;

export default RecentList;
