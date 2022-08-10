import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setTil } from "./redux/modules/tilSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./shared/firebase";
import NullImg from './shared/img/null_img.jpg';
import axios from "axios";
const Home = () => {
  const [is_login, setIsLogin] = React.useState(true);
  const [name, setUserName] = React.useState("User");
  const til_lists = useSelector((state) => state.til.til_lists);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginCheck = async (user) => {
    const showData = await getDocs(collection(db, "users"));

    if (user) {
      setIsLogin(true);
      console.log(user.uid);
      showData.forEach((doc) => {
        if (user.email === doc.data().user_id) {
          if(!doc.data().image_url){
            return (document.getElementById("img").src = NullImg);
          }else{
            const imageUrl = doc.data().image_url;
            document.getElementById("img").src = imageUrl;
          }
          setUserName(doc.data().name);
        }
      });
    } else {
      setIsLogin(false);
    }
  };

  const Img = () => {
    React.useEffect(() => {
      onAuthStateChanged(auth, loginCheck);
    }, []);

    return (
      <div>
        <UserImg
          src="" alt="img"
          id="img"
        />
      </div>
    );
  };

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
    <ListTil>
      <Menu>
        <p>00님</p>
      </Menu>
      <Main>
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
      </Main>
      <User>
        <Img />
        <h2>{name}</h2>
        <button>나의 TIL 보기</button>
        <span onClick={()=>{navigate('/info')}}>정보수정</span>
        <span onClick={()=>{
            signOut(auth);
            navigate("/")}}>로그아웃</span>
      </User>
    </ListTil>
  );
};

const ListTil = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  text-overflow: unset;
`;

const Menu = styled.div`
  background-color: saddlebrown;
`;

const Main = styled.div`
  background-color: aliceblue;
  width: 35em;
`;

const User = styled.div`
  border: 1px solid gray;
  width: 10em;
  height: 17em;
  text-align: center;
  padding:2em;
  margin:1em;
  border-radius: 10%;

  h2{
    margin-top:-0.1em;
    margin-bottom: 0.2em;
  }

  button {
    background-color: #808080;
    color:white;
    border:1px solid gray;
    margin:0.2em;
    font-weight: bold;
    width:10em;
    height:3em;
    font-size:0.9em;
    cursor: pointer;

    :hover{
      background-color: #696969;
    }
  }

  span{
    font-size: 0.8em;
    margin:0.8em;
    cursor: pointer;

    :hover{
      border-bottom: 1px solid black;
      font-weight: bold;
    }
  }
`;

const TitleZone = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1em;
`;

const Time = styled.h3`
  margin: -0.5em 0 0 1em;
`;

const Desc = styled.p`
  margin: 0.5em 0 0.5em 1em;
  font-size: 1em;
`;

const AddButton = styled.button`
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  margin: auto 0 1em auto;
  border: 1px solid gray;
  border-radius: 2em;
  font-size: 1.2em;
  &:hover {
    background-color: pink;
  }
`;
const List = styled.div`
  border: 1px solid gray;
  padding: 1em;
  margin-bottom: 1em;
`;

const UserImg = styled.img`
  width: 10em;
  height: 10em;
  border-radius: 20%;
`;

export default Home;
