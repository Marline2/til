import React from "react";
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddTil = () => {
  const work_ref = React.useRef(null);
  const description_ref = React.useRef(null);
  const study_time_ref = React.useRef(null);

  const navigate = useNavigate();

  const addTilForm = async () => {
    if (work_ref.current.value === "") {
      alert("과목을 작성해주세요!");
    } else if (study_time_ref.current.value === "") {
      alert("시간을 작성해주세요!");
    } else if (description_ref.current.value === "") {
      alert("내용을 작성해주세요!");
    } else {
      const til_data = {
        work: work_ref.current.value,
        description: description_ref.current.value,
        study_time: study_time_ref.current.value,
      };


      const postList = await axios.post("http://localhost:5001/til_list", til_data);
      console.log(postList);

      alert("추가 완료");

      work_ref.current.value = "";
      description_ref.current.value = "";
      study_time_ref.current.value = "";

      navigate(-1);
    }
  };

  return (

    <AddTilForm>
      <Title>🍒 당신의 TIL을 간략히 작성해요</Title>
      <Form>
        <InputBox ref={work_ref} placeholder="과목" />
        <InputBox ref={study_time_ref} placeholder="총 시간" />
        <InputBoxBig ref={description_ref} placeholder="내용" />
      </Form>
      <Btn onClick={addTilForm}>추가하기 🍓</Btn>
    </AddTilForm>

  );
}

const AddTilForm = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dashed #feebe1;
  padding: 10px;
  margin: auto;
`;

const Title = styled.h3`
  text-align: center;
  height: 30px;
`

const Form = styled.div`
  height: 200px;
  width: 280px;
`

const InputBox = styled.input`
  border-radius: 20px;
  border: 1px solid gray;
  padding: 10px;
  width: 250px;
  height: 20px;
  margin-bottom: 2px;

`;

const InputBoxBig = styled.textarea`
  border-radius: 20px;
  border: 1px solid gray;
  width: 250px;
  height: 80px;
  padding: 15px 10px 10px 10px;
`;

const Btn = styled.button`
  background-color: #fbe0c5;
  height: 30px;
  width: 110px;
  margin: 10px 10px 10px auto;
  border: 1px solid gray;
  border-radius: 20px;
  font-size: 15px;
  font-weight: bold;
  &:hover{  
    background-color : pink;
  }
`;


export default AddTil;