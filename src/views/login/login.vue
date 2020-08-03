<template>
    <div class="login"  :style ="{'background-image': 'url('+require('../../../static/icons/beijing.jpg')+')'}">
       <form>
        <div>账号名:
            <input v-model="formItem.username" placeholder="请输入账号名...">
        </div>
        <div>密码:
            <input v-model="formItem.password" type="password"   placeholder="请输入密码...">
        </div>
        <div>保存密码:
            <input type="checkbox" style="margin-top: 0.5em" v-model="savePassword">
        </div>
        <div>
            <button type="button"  @click="login">登录</button>
        </div>
      </form>
    </div>
</template>

<script>
// 全局状态控制引入
export default {
  name: 'login',
  data: function () {
    return {
      savePassword: false,
      /* 用户登录数据 */
      formItem: {
        username: '',
        password: '',
        id: '',
        token: '',
        permissions: '',
        is_superuser: false
      }
    }
  },
  methods: {
    login () {
      var self = this
      this.$axios.post('login', {
        username: self.formItem.username,
        password: self.formItem.password
      }).then(function (response) {
        self.formItem.token = response.data.token
        self.$store.commit({
          type: 'saveLoginInfor',
          name: self.formItem.username,
          id: self.formItem.id,
          is_superuser: self.formItem.is_superuser,
          token: self.formItem.token,
          permissions: self.formItem.permissions
        })
        self.$axios.get('user/userInfor/?username=' + self.formItem.username).then(function (response) {
          self.formItem.id = response.data.results[0].id
          self.$axios.get('user/userInfor/' + self.formItem.id).then(function (response) {
            self.formItem.permissions = response.data.all_permissions
            self.formItem.is_superuser = response.data.is_superuser
            self.$store.commit({
              type: 'saveLoginInfor',
              name: self.formItem.username,
              id: self.formItem.id,
              is_superuser: self.formItem.is_superuser,
              token: self.formItem.token,
              permissions: self.formItem.permissions
            }) // 跳转到首页页面
            sessionStorage.setItem('id', self.formItem.id)
            sessionStorage.setItem('name', self.formItem.username)
            sessionStorage.setItem('is_superuser', self.formItem.is_superuser)
            sessionStorage.setItem('token', self.formItem.token)
            sessionStorage.setItem('permissions', self.formItem.uspermissionsername)
            if (self.savePassword === true) {
              var info = {
                name: self.formItem.username,
                id: self.formItem.id,
                is_superuser: self.formItem.is_superuser,
                token: self.formItem.token,
                permissions: self.formItem.permissions
              }
              localStorage.setItem('loginInfor', JSON.stringify(info))
            }
            self.$router.push({name: 'Home'})
          }).catch(function (err) {
            console.log(err)
          })
        }).catch(function (err) {
          console.log(err)
        })
      }).catch(function (err) {
        if (err.status === 502) {
          alert(err.data)
        } else {
          alert('请输入正确的用户名跟密码')
        }

        console.log(err)
      })
    }
  },
  created () {
    var loginInfor = JSON.parse(localStorage.getItem('loginInfor'))
    if (loginInfor != null) {
      this.$store.commit({
        type: 'saveLoginInfor',
        name: loginInfor.name,
        id: loginInfor.id,
        is_superuser: loginInfor.is_superuser,
        token: loginInfor.token,
        permissions: loginInfor.permissions
      }) // 跳转到首页页面
      this.$router.push({name: 'Home'})
    }
  }
}
</script>
<style>
  .login{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-size: cover;
    background-position: center;
  }
  .login form{
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
  .login form div{
    position: relative;
    width: 100%;
    height: 25%;
  }
  .login form div input{
    position: absolute;
    left: 5em;
    width: 15em;
    right: 4em;
    font-family: AppleSystemUIFont;
    padding-left: 2em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .login button{
    position: absolute;
    bottom: 0;
    left: 5em;
    width: 50%;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
</style>
