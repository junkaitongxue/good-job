import { createStore } from "vuex";
import UserStore from "./userStore";

const store = createStore(new UserStore())

export default store