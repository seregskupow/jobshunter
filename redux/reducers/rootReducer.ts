import { combineReducers } from "redux";
import authReducer from "./authReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
  user: authReducer,
  filter: filterReducer,
});

export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
