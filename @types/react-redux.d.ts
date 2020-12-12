/* eslint-disable @typescript-eslint/no-empty-interface */
import "react-redux";

import { AppState } from "../redux/reducers/rootReducer";

declare module "react-redux" {
  interface DefaultRootState extends AppState {}
}
