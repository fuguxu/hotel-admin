<template>
  <section :class="$style.login">
    <div :class="$style.loginBox">
      <div :class="$style.header">User Login</div>
      <el-input placeholder="用户名" prefix-icon="el-icon-s-custom" v-model="username" ></el-input>
      <el-input placeholder="密码" type="password" prefix-icon="el-icon-key" v-model="password" ></el-input>
      <el-button :class="$style.loginBtn" @click="login" type="primary">登陆</el-button>
    </div>
  </section>
</template>

<script>
import { doLogin } from '@/service/service.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      name:'jack'
    }
  },
  methods: {
    async login () {
      let res = await doLogin({
        username: this.username,
        password: this.password
      })
      res.code === 200 && this.$router.push('/h/product_manage')
    }
  },
  async created () {
  }
}
</script>
<style lang="scss" module>
  .login{
    width:100%;
    height:100%;
    background-image: url('../../img/login-bg.jpg');
    background-size:cover;
    position: relative;
    .loginBox{
      position: absolute;
      bottom: 250px;
      right: 100px;
      width:250px;
      padding:20px;
      line-height: 50px;
      .header{
        font-size: 20px;
        color: #fff;
        text-align: center;
      }
      .loginBtn{
        width:100%;
      }
    }
  }
</style>
