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
    rank:[
      {
      e:"",
      count:0,
      },
    ],
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
    },

    setRank: (state, action) =>{
      console.log(action);
      state.rank = action.payload;
    }
  },
});


export const getTilList = (til_lists) => async (dispatch) => {
  const response = await axios.get("http://localhost:5001/til_list");
  const til = response.data;
  dispatch(setTil(til));
};

export const showEmailTilList = (user_email) => async(dispatch) =>{
  await axios.get("http://localhost:5001/til_list").then((res)=>{
    const data = res.data;
    let email_til = data.map((til, idx)=>{
      if(til.email === user_email){
        return til;
      }else{ return null;}
    });
    email_til = email_til.filter((til, idx)=>til !== null)
    if(email_til.length === 0){
      return  dispatch(setTil([]));
    }else if(email_til.length > 0){
      dispatch(setTil(email_til));
    }
  })
}

export const addTilList = (til_lists) => async (dispatch) => {
  const response = await axios.post("http://localhost:5001/til_list", til_lists);
  dispatch(addTil(response.data));
};

export const getRank = (til_lists) => async (dispatch) => {
  await axios.get("http://localhost:5001/til_list").then((res)=>{
  const data = res.data;
  let email_til = data.map((til, idx)=>{
    return til.email; 
  })
  const all_users = [...new Set(email_til)]
  const add_count = all_users.map((e)=>{return{e, count:0}})
  for(let i = 0; i < add_count.length; i++){
      email_til.map((email, idx)=>{
        if(add_count[i].e === email){
          add_count[i].count++;
        }
      })
  }
  add_count.sort(function(a, b){
    return b.count - a.count;
  })

  dispatch(setRank(add_count));
  })
};

export const showList = (state) => state.til.til_lists;
export const showUser = (state) => state.til.user_info;
export const showRank = (state) => state.til.rank;
export const { setTil, setUser, addTil, setRank } = tilSlice.actions;
export default tilSlice.reducer;
