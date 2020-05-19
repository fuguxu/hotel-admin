<template>
  <section>登陆页面，自动登录</section>
</template>

<script>
import { doLogin } from '@/service/service.js'
export default {
  data () {
    return {
      username: 'admin',
      password: 'admin123'
    }
  },
  methods: {
    login () {
      return doLogin({
        username: this.username,
        password: this.password
      })
    }
  },
  async created () {
    let res = await this.login()
    res.code === 200 && this.$router.push('/h')
  }
}
</script>
