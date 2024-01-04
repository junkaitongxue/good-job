import store from "@/stores"
import axios, { type IResponseData } from '@/utils/axios';
import { cookies } from "./cookies"
import { ElNotification } from "element-plus";

export default class AuthUtils {
  static async logout() {
    const isLoggedIn = store.state.isLoggedIn
    store.dispatch('logout',)
    const response = await axios.post<IResponseData<Object>>('/logout', {})
    console.log(response)
    if (response.code === 200) {
      ElNotification({
        title: '注销成功',
        message: response.msg,
        type: 'success'
      })
    }
  }

  static async checkLogin(): Promise<boolean> {
    // 你可以在这里进行登录验证，例如通过请求后端接口或检查本地存储中的登录状态
    // 这里假设使用 store 中的登录状态进行判断
    const token = cookies.getCookie('XXL_JOB_LOGIN_IDENTITY')
    if ( token == null || token === '') {
      // 如果未登录，重定向到登录页面或执行其他操作
      return false
    } 
   
    return true
  }
}