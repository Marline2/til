import React from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./shared/firebase";
import Modal from "./AddTils";

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
  const user_info = useSelector(showUser);
  const rank = useSelector(showRank);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const WantToBack = () => {
    if (back === true) {
      return (
        <TextHome>
          <span id="home">홈으로</span>
        </TextHome>
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
          <h1>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(getTilList());
                setBack(false);
                showAni();
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
        <RecentList back={userBack} ani={showAni} keys={randomData} />
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
        <Rank>
          <h3>활동 순위 TOP 3</h3>
          {rank.map((e, idx) => {
            if (idx === 0) {
              return <p key={idx}><span>1등</span>{e.e}</p>;
            } else if (idx === 1) {
              return <p key={idx}><span>2등</span>{e.e}</p>;
            } else if (idx === 2) {
              return <p key={idx}><span>3등</span>{e.e}</p>;
            } else {
              return null;
            }
          })}
          <h4>나의 순위</h4>
        </Rank>
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

const ListTil = styled.div`
  width: 60em;
  height: 55em;
  margin: auto;
  display: flex;
  flex-direction: row;
  text-overflow: unset;
  cursor: default;
  margin-top: 2em;
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

const Rank = styled.div`
  border: 1px solid gray;
  width: 10em;
  height: 17em;
  text-align: center;
  padding: 2em;
  margin: 1em;
  border-radius: 10%;
`;
export default Home;
