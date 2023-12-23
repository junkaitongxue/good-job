<template>
  <div class="login-box">
    <div class="login-logo">
      <a><b>Good</b>JOB</a>
    </div>

    <form id="loginForm" @submit.prevent="handleSubmit" >
      <div class="login-box-body">
        <p class="login-box-msg">{{$t("I18n.admin_name")}}</p>
        <div class="form-group has-feedback">
          <input type="text" name="userName" class="form-control" v-model="loginInfo.userName" :placeholder="$t('I18n.login_username_placeholder')" maxlength="18" >
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
          <div class="form-group has-feedback">
            <input type="password" name="password" class="form-control" v-model="loginInfo.password" :placeholder="$t('I18n.login_password_placeholder')"  maxlength="18" >
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
          <div class="col-xs-8">
            <div class="checkbox icheck">
                <label>
                  <input type="checkbox" name="ifRemember"  v-model="loginInfo.ifRemember"> &nbsp; {{$t('I18n.login_remember_me')}}
                </label>
            </div>
            </div><!-- /.col -->
            <div class="col-xs-4">
            <button type="submit" class="btn btn-primary btn-block btn-flat">{{$t('I18n.login_btn')}}</button>
        </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import axios, { type IResponseData } from '@/utils/axios';
import { useI18n } from 'vue-i18n'
import {useRouter} from 'vue-router'
import { ElNotification } from 'element-plus'
import { useStore } from 'vuex';

const { t } = useI18n()
const loginInfo = {
  userName: '',
  password: '',
  ifRemember: false
}
const router = useRouter()
const store = useStore()
const handleSubmit = async () => {
  try {
    const response = await axios.post<IResponseData<Object>>('/login', {
      data: loginInfo,
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
    console.log(response)
    if (response.code === 200) {
      store.dispatch('login', {useName: loginInfo.userName})
      // store.commit('setLoginStatus', true)
      // store.commit('setLoginState', {true, loginInfo.})
      console.log(response)
      console.log(response.content)
      // window.sessionStorage.setItem('userInfo', JSON.stringify(data.value))
      router.push('/home')
    } else {
      ElNotification({
        title: '登录失败',
        message: response.msg,
        type: 'error'
      })
    }
  } catch (err) {
    console.error(err)
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box,.register-box{
  width:360px;margin:7% auto
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
