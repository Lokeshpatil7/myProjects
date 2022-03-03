import { createStore } from "redux";
const initialState = {
  missionList: [],
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const missionListCopy = [...state.missionList];
  switch (type) {
    case "MISSION_ADD":
      const id = payload.id ? payload.id : state.missionList.length + 1;
      missionListCopy.push({ ...payload, id });
      return {
        missionList: missionListCopy,
      };
  }
};
const store = createStore(reducer);
export default store;
