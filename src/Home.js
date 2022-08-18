import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./shared/firebase";
import Modal from "./AddTils";
import { Rank } from "./RecentList";
import { useSelector, useDispatch } from "react-redux";
import {
  showEmailTilList,
  setUser,
  getTilList,
  showUser,
  getRank,
  showRank,
} from "./redux/modules/tilSlice";

import RecentList from "./RecentList";
const Home = () => {
  const [back, setBack] = React.useState(false);
  const [randomData, setRandomData] = React.useState(Math.random());
  const [is_login, setIsLogin] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [click, setClick] = React.useState(null);
  const user_info = useSelector(showUser);
  const rank = useSelector(showRank);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const WantToBack = () => {
    if (back === true) {
      return (
        <div>
          <TextHome>
            <span id="home">홈으로</span>
          </TextHome>
          <ClickUser>&#127793;{click}</ClickUser>
        </div>
      );
    } else {
      return null;
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    showAni();
    setModalOpen(false);
  };

  const userBack = () => {
    showAni();
    setBack(true);
  };

  const showClickUser = (props) => {
    setClick(props);
  };


  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
      dispatch(
        setUser({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      dispatch(getRank(rank));
    } else {
      setIsLogin(false);
      navigate("/");
    }
  };

  const showAni = () => {
    setRandomData(Math.random());
  };

  const showMyList = () => {
    const btn = document.getElementById("myTil");
    showAni();
    setBack(false);
    if (btn.innerText === "나의 TIL 보기") {
      btn.innerText = "전체 TIL 보기";
      dispatch(showEmailTilList(user_info.email));
    } else {
      btn.innerText = "나의 TIL 보기";
      dispatch(getTilList());
    }
  };

  
  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <ListTil>
      <Main>
        <TitleZone>
          <h1>&nbsp;&nbsp;
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(getTilList());
                setBack(false);
                showAni();
                setClick(null);
              }}
            >
              TIL
            </span>{" "}
            ✍
          </h1>
          <AddButton>
            <span
              onClick={() => {
                openModal();
              }}
              className="material-symbols-outlined"
            >
              maps_ugc
            </span>
            <Modal open={modalOpen} close={closeModal} />
            <span className="tooltiptextBottom">작성하기</span>
          </AddButton>
        </TitleZone>
        <WantToBack />
        <RecentList
          click={showClickUser}
          back={userBack}
          ani={showAni}
          keys={randomData}
        />
      </Main>
      <div>
        <User>
          <UserImg src={user_info.photo} alt="img" />
          <h2>{user_info.name}</h2>
          <button
            id="myTil"
            onClick={() => {
              showMyList();
            }}
          >
            나의 TIL 보기
          </button>
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
        <Rank
          click={showClickUser}  
          back={userBack}
          ani={showAni}
          rank={rank}/>
      </div>
    </ListTil>
  );
};
const TextHome = styled.div`
  position: relative;
  display: inline-block;
  animation: motion 0.4s linear 0s infinite alternate;
  margin-bottom: 0;

  @keyframes motion {
    0% {
      margin-bottom: 0;
    }
    100% {
      margin-bottom: 0.5em;
    }
  }
  #home {
    width: 5em;
    height: 1.3em;
    background-color: #7c7c7c;
    text-align: center;
    color: white;
    border-radius: 6px;
    padding: 5px 0;
    font-weight: bold;
    position: absolute;
    font-size: 0.6em;
    z-index: 1;
    top: -4.5em;
    left: 7em;
    margin-left: -6em;

    ::after {
      content: "";
      position: absolute;
      bottom: 80%;
      left: 80%;
      margin-left: -3em;
      border-width: 0.8em;
      border-style: solid;
      border-color: transparent transparent #7c7c7c transparent;
    }
  }
`;

const ClickUser = styled.h4`
  text-align: right;
  margin-right: 1em;
  margin-top: -1.8em;
  margin-bottom: -0.5em;
  animation: show 1.5s;
`;

const ListTil = styled.div`
border-radius: 5%;
  margin: 2em auto;
  background-color: white;
  padding:2em;
  max-width: 60em;
  height: 45em;
  display: flex;
  flex-direction: row;
  cursor: default;
  margin-top: 3em;
  box-shadow: 1px 1px 3px 1px gray;
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
  position: relative;
  display: inline-block;
  cursor: pointer;
  .tooltiptextBottom {
    visibility: hidden;
    width: 5em;
    height: 1.3em;
    background-color: #fcc00c;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    font-weight: bold;
    position: absolute;
    font-size: 0.5em;
    z-index: 1;
    top: 150%;
    left: 180%;
    margin-left: -6em;
  }

  :hover .tooltiptextBottom {
    visibility: visible;
    :hover {
      font-size: 0.5em;
      visibility: hidden;
    }
    ::after {
      content: "";
      position: absolute;
      bottom: 80%;
      left: 80%;
      margin-left: -3em;
      border-width: 0.8em;
      border-style: solid;
      border-color: transparent transparent #fcc00c transparent;
    }
  }
  span {
    font-size: 1.5em;

    :hover {
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
