import { createSlice } from '@reduxjs/toolkit';


const tilSlice = createSlice({
  name: "til",
  initialState: {
    til_lists:[
      {
        work:"React",
        description:"알고리즘 공부",
        study_time:"04:00"
      }
    ]
  },
  reducers: {
    addTil: (state, action) => {
      console.log(action);
      state.til_lists.push(action.payload);
    }, //사용중이 아님

    setTil: (state, action) =>{
      console.log(action);
      state.til_lists = action.payload;
    }
  }
})

export const { addTil, setTil } = tilSlice.actions;
export default tilSlice.reducer;