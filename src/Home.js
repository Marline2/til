import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./shared/firebase";
import Modal from './AddTils';

import { useSelector, useDispatch } from "react-redux";
import { setEmailTilList, setUser, showList, showUser } from "./redux/modules/tilSlice";

import RecentList from "./RecentList";
const Home = () => {
  const [is_login, setIsLogin] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const user_info = useSelector(showUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = ()=>{
    setModalOpen(true);
  };
  const closeModal = ()=>{
    setModalOpen(false);
  }

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
      dispatch(setUser({
        name: user.displayName,
        email : user.email,
        photo : user.photoURL
      }));
    } else {
      setIsLogin(false);
      navigate("/");
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck)
  }, []);

  return (
    <ListTil>
      <Main>
        <TitleZone>
          <h1>TIL ✍</h1>
          <AddButton>
            <span
              onClick={() => {
                openModal();
              }}
              className="material-symbols-outlined"
            >
              maps_ugc
            </span>
            <Modal open={modalOpen} close={closeModal}
            header="Modal heading"/>
          </AddButton>
        </TitleZone>
        <RecentList/>
      </Main>
      <User>
        <UserImg src={user_info.photo} alt="img"/>
        <h2>{user_info.name}</h2>
        <button onClick={ ()=>{dispatch(setEmailTilList(user_info));}}>나의 TIL 보기</button>
        <span
          onClick={() => {
            navigate("/info");
          }}
        >
          정보수정
        </span>
        <span
          onClick={() => {
            signOut(auth);
            alert("로그아웃 되었습니다.");
            navigate("/");
            
          }}
        >
          로그아웃
        </span>
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

const Main = styled.div`
  width: 35em;
`;

const User = styled.div`
  border: 1px solid gray;
  width: 10em;
  height: 17em;
  text-align: center;
  padding: 2em;
  margin: 1em;
  border-radius: 10%;

  h2 {
    margin-top: -0.1em;
    margin-bottom: 0.2em;
  }

  button {
    background-color: #808080;
    color: white;
    border: 1px solid gray;
    margin: 0.2em;
    font-weight: bold;
    width: 10em;
    height: 3em;
    font-size: 0.9em;
    cursor: pointer;

    :hover {
      background-color: #696969;
    }
  }

  span {
    font-size: 0.8em;
    margin: 0.8em;
    cursor: pointer;

    :hover {
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

const AddButton = styled.div`
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  margin: auto 1em 1em auto;
  border-radius: 2em;
  font-size: 1.5em;
  cursor: pointer;
  span{
    font-size: 1.5em;

    :hover{
      font-size: 1.7em;
      transition: 0.2s;
    }
  }
`;

const UserImg = styled.img`
  width: 10em;
  height: 10em;
  border-radius: 20%;
`;

export default Home;
