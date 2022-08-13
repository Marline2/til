import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tilSlice = createSlice({
  name: "til",
  initialState: {
    til_lists: [
      {
        work: "React",
        description: "알고리즘 공부",
        study_time: "04:00",
        day: "2022. 00. 00",
      },
    ],
    user_info: {
      name: "user",
      email: "",
      photo: "../../shared/img/null_img.jpg",
    },
  },

  reducers: {
    setTil: (state, action) => {
      console.log(action);
      state.til_lists = action.payload;
    },

    setUser: (state, action) => {
      console.log(action);
      state.user_info = action.payload;
    },
    addTil: (state, action)=>{
      state.til_lists.push(action.payload);
    }
  },
});


export const getTilList = (til_lists) => async (dispatch) => {
  const response = await axios.get("http://localhost:5001/til_list");
  const til = response.data;
  dispatch(setTil(til));
};

export const setEmailTilList = (user_info) => async (dispatch) => {
  const response = await axios.get("http://localhost:5001/til_list").then((res)=>{
    const data = res.data;
    console.log(user_info.email);
    const email_til = data.map((til, idx)=>{
      console.log(til.email);
    if(til.email === user_info.email){
      return {...til, til};

      //이터럴객체로 만들기
    }else{
      return;
    }})
    console.log(email_til);
  // dispatch(setTil(email_til));
  })
};

export const addTilList = (til_lists) => async (dispatch) => {
  const response = await axios.post("http://localhost:5001/til_list", til_lists);
  dispatch(addTil(response.data));
};

export const showList = (state) => state.til.til_lists;
export const showUser = (state) => state.til.user_info;
export const { setTil, setUser, addTil } = tilSlice.actions;
export default tilSlice.reducer;
