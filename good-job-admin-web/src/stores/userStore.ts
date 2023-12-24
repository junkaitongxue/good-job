import { createStore, Store } from 'vuex'
 
interface State {
  isLoggedIn: boolean;
  user: any; // 根据你的需求定义用户对象的类型
  expirationTime: any;
  token: any;
}

const expirationInMinutes = 60
 
export default class UserStore implements Store<State> {
  state: State = {
    isLoggedIn: false,
    user: null,
    expirationTime: null,
    token: null
  }
 
  mutations = {
    // 更新登录状态和用户信息
    setLoginState(state: State, { isLoggedIn , user, expirationTime,  token}) {
      state.isLoggedIn = isLoggedIn;
      state.user = user;
      state.expirationTime = expirationTime;
      state.token = token;
    },

    setLoginStatus(state: State, isLoggedIn: boolean) {
      state.isLoggedIn = isLoggedIn;
    },

    setUser(state: State, user: any) {
      state.user = user;
    }
  }
 
  actions = {
    // 登录操作
    login({ commit }, { username}) {
      // 假设这里有一个登录API调用，验证用户名和密码，并返回用户信息
        const expirationTime = new Date(Date.now() + expirationInMinutes * 60000);
        commit('setLoginState', { isLoggedIn: true, user: username, expirationTime: expirationTime});
    },
    logout({ commit }) {
      // 在这里执行登出逻辑，例如清除用户信息和登录状态
      commit('setLoginState', { isLoggedIn: false, user: null, expirationTime: null, token: null});
    }
  }
}

