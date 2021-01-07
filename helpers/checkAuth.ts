import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUser } from "../redux/actions/authAction";

export default async function checkAuth(dispatch) {
  try {
    const { data } = await axios(`http://localhost:5000/checkauth`, {
      withCredentials: true,
    });
    console.log("checkkkk");

    console.log(data);
    if (data) dispatch(loginUser(data));
  } catch (e) {}
}
