<template>
  <div class="register" :style ="{'background-image': 'url('+require('../../../static/icons/beijing.png')+')'}">
      <form>
        <div>账号名:
            <input v-model="formItem.username" placeholder="请输入账号名...">
        </div>
        <div>密码:
          <input v-model="formItem.password" placeholder="请输入密码...">
        </div>
        <div>审核账号:
          <select v-model="formItem.auditor">
            <option v-for="item in auditor" :value="item.username" :key="item.id">{{item.username}}</option>
          </select>
        </div>
        <div>
          <button type="button" size="large" @click="register">注册</button>
        </div>
        <div>
          <router-link to="/">登录页面</router-link>
        </div>
      </form>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    return {
      /* 用户注册数据 */
      formItem: {
        username: '',
        password: '',
        auditor: ''
      },
      auditor: []
    }
  },
  /* 保存创建的数据数据 */
  methods: {
    register () {
      var self = this
      this.$axios.post(`user/userInfor/`, {
        username: self.formItem.username,
        password: self.formItem.password,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.$router.push('/home')
        alert(self.formItem.username + '用户注册成功')
      }).catch(function (error) {
        if (error.request) {
          alert(error.request.response)
        } else {
          console.log('Error', error.message)
        }
      })
    }
  },
  created () {
    var self = this
    this.$axios.get('user/userInfor').then(function (response) {
      self.auditor = response.data.results
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>
<style scoped>
  .register{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-size: cover;
    background-position: center;
  }
  .register form{
    position: absolute;
    top: 35%;
    left: 37%;
    width: 20%;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #ffffff;
    letter-spacing: -0.45px;
  }
  .register form div{
    position: relative;
    width: 100%;
    height: 25%;
  }
  .register form div input,.register form div select{
    position: absolute;
    left: 7em;
    width: 15em;
    right: 4em;
    font-family: AppleSystemUIFont;
    padding-left: 2em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .register button{
    position: absolute;
    bottom: 0;
    left: 7em;
    width: 50%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .register a{
    position: absolute;
    bottom: 0;
    left: 7em;
    width: 50%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
    text-align: center;
  }
</style>
