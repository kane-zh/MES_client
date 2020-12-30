<template>
  <div class="userConfig">
    <!--   /*详情页显示*/-->
    <div class="detail" v-show="showViewIndex==='detail'">
      <div class="content">
        <ul>
          <li>{{"账号名:"+"&#12288;"+detail.username}}</li>
          <li>{{"名字:"+"&#12288;"+detail.first_name}}</li>
          <li>{{"姓氏:"+"&#12288;"+detail.last_name}}</li>
          <li>{{"超级用户:"+"&#12288;"+detail.is_superuser}}</li>
          <li>{{"邮箱地址:"+"&#12288;"+detail.email}}</li>
          <li>{{"工号:"+"&#12288;"+detail.job_number}}</li>
          <li>{{"职位:"+"&#12288;"+detail.post}}</li>
          <li>{{"微信:"+"&#12288;"+detail.wechat}}</li>
          <li>{{"手机:"+"&#12288;"+detail.mobile}}</li>
          <li>{{"备注:"+"&#12288;"+detail.desc}}</li>
          <li>{{"授权账号:"+"&#12288;"+detail.auditor}}</li>
          <li>{{"创建时间:"+"&#12288;"+detail.create_time}}</li>
          <li>{{"上次更新时间:"+"&#12288;"+detail.update_time}}</li>
          <li>{{"最近登录时间:"+"&#12288;"+detail.last_login}}</li>
        </ul>
        <dl>
          <dt>照片:</dt>
          <dd  v-bind:key="0" >
            <img v-bind:src="detail.image" width="100" >
          </dd>
        </dl>
        <dl>
          <dt>用户组:</dt>
          <dd v-for="(value,index) in details.groups" v-bind:key="index" >
            {{value.name}}
          </dd>
        </dl>
        <dl>
          <dt>用户权限:</dt>
          <dd v-for="(value,index) in details.user_permissions" v-bind:key="index" >
            {{value.name}}
          </dd>
        </dl>
      </div>
      <div class="button">
        <button type="button" @click="showUpdateView">信息更改</button>
        <button type="button" @click="showChangePasswordView">密码更改</button>
      </div>
    </div>
    <!-- 更新页显示-->
    <div class="update" v-show="showViewIndex==='update'">
      <form>
          <div>名字:
            <input v-model="formItem.first_name"  placeholder="请输账号的用户名字...">
          </div>
          <div>姓氏:
            <input v-model="formItem.last_name"  placeholder="请输入账号的用户姓氏...">
          </div>
          <div>电话:
            <input v-model="formItem.mobile"  placeholder="请输入账号用户电话...">
          </div>
          <div>微信:
            <input v-model="formItem.wechat"  placeholder="请输入账号的用户微信...">
          </div>
          <div>邮箱:
            <input v-model="formItem.email"  placeholder="请输入账号的用户邮箱...">
          </div>
          <div>工号:
            <input v-model="formItem.job_number"  placeholder="请输入账号的用户工号...">
          </div>
          <div>职位:
            <input v-model="formItem.post"  placeholder="请输入账号的用户职位...">
          </div>
          <div>说明:
            <input v-model="formItem.desc"  placeholder="请输入用户的其他说明信息...">
          </div>
          <div>照片:
            <input type="file"  @change="imageBeforeUpload"/>
          </div>
          <div>
            <img :src="formItem.image" width="150px">
          </div>
      </form>
      <div class="button">
          <button type="button" @click="update">提交数据</button>
          <button type="button" @click="showDetailView">返回列表页</button>
      </div>
    </div>
    <!--    /密码更改页显示*/-->
    <div class="change" v-show="showViewIndex==='change'">
      <form>
          <div>请输入新密码:
            <input v-model="password.firstinput" type="password"  placeholder="请输入新密码...">
          </div>
          <div>请确认新密码:
            <input v-model="password.secondinput" type="password"   placeholder="请确认新密码...">
          </div>
          <div class="button">
            <button type="button" @click="changePassword">更改密码</button>
            <button type="button" @click="showDetailView">返回列表页</button>
          </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'userConfig',
  data () {
    return {
      /* 视图显示控制 */
      showViewIndex: 'list',
      /* 详情页数据 */
      detail: [],
      details: {
        'groups': [],
        'user_permissions': []
      },
      /* 创建表单项数据 */
      formItem: {
        'id': '',
        'password': '',
        'first_name': '',
        'last_name': '',
        'email': '',
        'job_number': '',
        'post': '',
        'wechat': '',
        'mobile': '',
        'image': '',
        'desc': ''
      },
      password: {
        firstinput: '',
        secondinput: ''
      },
      /* 具有审核权限的账号信息 */
      userinfor: [],
      image: ''
    }
  },
  validations: {
    formItem: {
      code: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(32)
      },
      auditor: {
        required
      }
    }
  },
  methods: {
    /* 显示详情视图 */
    showDetailView () {
      this.Detail = [] // 清空详情数据
      var self = this
      var index = this.$store.getters.getLoginInfor.id
      this.$axios.get(`user/userInfor/` + index).then(function (response) {
        self.detail = response.data
        self.showViewIndex = 'detail'
      }).catch(function (err) {
        console.log(err)
      })
    },
    /* 显示更新视图 */
    showUpdateView () {
      /* 清空更新数据 */
      for (let key in this.formItem) {
        this.formItem[key] = ''
      }
      this.image = ''
      var self = this
      var index = this.$store.getters.getLoginInfor.id
      this.$axios.get(`user/userInfor/` + index).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.password = ''
        self.formItem.first_name = response.data.first_name
        self.formItem.last_name = response.data.last_name
        self.formItem.email = response.data.email
        self.formItem.job_number = response.data.job_number
        self.formItem.post = response.data.post
        self.formItem.wechat = response.data.wechat
        self.formItem.mobile = response.data.mobile
        self.formItem.image = response.data.image
        self.formItem.desc = response.data.desc
        self.showViewIndex = 'update'
      }).catch(function (err) {
        console.log(err)
      })
    },
    showChangePasswordView () {
      this.password.firstinput = ''
      this.password.secondinput = ''
      this.showViewIndex = 'change'
    },
    imageBeforeUpload (event) {
      this.image = event.target.files[0]
    },
    /* 更新表单数据 */
    update () {
      let formData = new FormData()
      // 下面是表单绑定的data 数据
      formData.append('first_name', this.formItem.first_name)
      formData.append('last_name', this.formItem.last_name)
      formData.append('email', this.formItem.email)
      formData.append('job_number', this.formItem.job_number)
      formData.append('post', this.formItem.post)
      formData.append('wechat', this.formItem.wechat)
      formData.append('mobile', this.formItem.mobile)
      if (this.image !== '') {
        formData.append('image', this.image)
      }
      formData.append('desc', this.formItem.desc)
      var self = this
      this.$axios.put(`user/userInfor/` + self.formItem.id + '/', formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        self.formItem.image = response.data.image
        alert('数据提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 改变密码函数 */
    changePassword () {
      var self = this
      if (this.password.firstinput === '') {
        alert('请输入新密码')
        return
      }
      if (this.password.firstinput !== this.password.secondinput) {
        alert('两次密码不一致')
        this.password.firstinput = ''
        this.password.secondinput = ''
        return
      }
      this.$axios.patch(`user/userInfor/` + self.detail.id + '/', {
        password: self.password.firstinput
      }).then(function (response
      ) {
        alert('修改密码成功')
        self.showViewIndex = 'detail'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  },
  created () {
    this.showDetailView(4)
  },
  watch: {
    detail () {
      var self = this
      self.details.groups = self.detail.groups
      self.details.user_permissions = self.detail.user_permissions
    }
  }
}
</script>
<style scoped>
  .userConfig{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .detail{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .detail .content{
    position: absolute;
    top: 0;
    width: 100%;
    height: 80%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    line-height: 2em;
    color: #000000;

    overflow: auto;
    background: rgba(255, 255, 255, 0.57);
  }
  .detail .button{
    position: absolute;
    top: 90%;
    width: 100%;
    height: 10%;
  }
  .detail .button button{
    width: 12em;
    margin: 4em;
    font-size: 0.3em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .update{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .update form{
    position: absolute;
    top: 0;
    left: 2%;
    width: 80%;
    height: 90%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #151515;

    overflow: auto;
  }
  .update form div{
    position: relative;
    width: 50%;
    height: 12%;
    float: left;
  }
  .update form div select,.update form div input,.update form div textarea{
    position: absolute;
    width: 15em;
    right: 4em;
    font-family: AppleSystemUIFont;
    padding-left: 2em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .update form div span{
    position: absolute;
    width: 15em;
    right: 6em;
    font-family: AppleSystemUIFont;
    padding-left: 2em;
    font-size: 0.6em;
    color: #f5222d;
    display: block;
  }
  .update .button{
    position: absolute;
    top: 90%;
    width: 100%;
    height: 10%;
    float: left;
  }
  .update .button button{
    width: 12em;
    margin: 0.2em;
    font-size: 0.4em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .change{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .change form{
    position: absolute;
    top: 10%;
    left: 2%;
    width: 80%;
    height: 90%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #151515;

    overflow: auto;
  }
  .change form div{
    position: relative;
    width: 50%;
    height: 12%;
  }
  .change form div input{
    position: absolute;
    width: 15em;
    right: 4em;
    font-family: AppleSystemUIFont;
    padding-left: 2em;
    font-size: 0.8em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .change .button{
    position: absolute;
    top: 60%;
    width: 100%;
    height: 10%;
    float: left;
  }
  .change .button button{
    width: 12em;
    margin: 0.2em;
    font-size: 0.8em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
</style>
