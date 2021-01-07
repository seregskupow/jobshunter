/* eslint-disable import/prefer-default-export */
import { Dispatch } from "redux";
import { Option } from "../../components/Components/FormsComponents/Select";
import * as t from "../types";

export const setSubCategories = (data: Array<Option>) => {
  return (dispatch) => {
    dispatch({
      type: t.SET_SUBCATEGORIES,
      payload: data,
    });
  };
};
