import { Option } from "../../components/Components/FormsComponents/Select";
import * as t from "../types";

interface FilterTypes {
  subCategories: Array<Option>;
}
export const FILTER_DEFAULT_STATE: FilterTypes = {
  subCategories: [],
};

export default (state = FILTER_DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case t.SET_SUBCATEGORIES:
      return { ...state, subCategories: payload };
    default:
      return state;
  }
};
