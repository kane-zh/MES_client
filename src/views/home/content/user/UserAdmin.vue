<template>
  <div class="userAdmin">
    <!-- 列表页显示-->
    <div  class="list"  v-show ="showViewid==='list'">
      <table >
            <caption align="top">可授权账号</caption>
            <tr align="center"  type="height:2em">
              <th>序号</th>
              <th>用户名</th>
              <th>工号</th>
              <th>职位</th>
              <th>邮箱</th>
              <th>微信</th>
              <th>电话</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.username}}</td>
              <td>{{item.job_number}}</td>
              <td>{{item.post}}</td>
              <td>{{item.email}}</td>
              <td>{{item.wechat}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.desc}}</td>
              <td>
                <button type="button" @click="showAdminView(item.id)">授权</button>
              </td>
            </tr>
            <tr>

            </tr>
          </table>
    </div>
    <!-- 授权页显示-->
    <div  class="admin" v-show="showViewid==='admin'">
      <form >
        <div>
          <Transfer
            :data="groupInfor"
            :target-keys="targetKeys1"
            :render-format="render1"
            @on-change="handleChange1"
            :list-style="listStyle"
            :titles="['源用户组','目标用户组']"></Transfer>
        </div>
        <div>
          <Transfer
            :data="permisionInfor"
            :target-keys="targetKeys2"
            :render-format="render2"
            @on-change="handleChange2"
            :list-style="listStyle"
            :titles="['源权限','目标权限']"></Transfer>
        </div>
        <div class="button">
          <button type="button" @click="showCreateGroupView">创建权限组</button>
          <button type="button" @click="showGroupDetailView">权限组详情</button>
          <button type="button" @click="update">确认授权</button>
          <button type="button" @click="showListView">返回列表页</button>
        </div>
      </form>
    </div>
    <!-- 权限组创建页显示-->
    <div  class="create" v-show="showViewid==='createGroup'">
        <div class="name">组名称:
          <input v-model="groupName"  placeholder="请输入权限组名称...">
        </div>
        <div class="permission">
          <Transfer
            :data="permisionInfor"
            :target-keys="targetKeys2"
            :render-format="render2"
            @on-change="handleChange2"
            :list-style="listStyle"
            :titles="['源权限','目标权限']"></Transfer>
        </div>
        <div class="button">
          <button type="button" @click="createGroup">提交</button>
          <button type="button" @click="showAdminView(currentUser)">返回授权页</button>
        </div>
    </div>
    <!-- 权限组详情页显示-->
    <div  class="groupDetail" v-show="showViewid==='groupDetail'">
        <div>
          <Tree :data="baseData"  ref="groupTree" ></Tree>
        </div>
        <div class="button">
          <button type="button" @click="deleteGroup">删除组</button>
          <button type="button" @click="showAdminView(currentUser)">返回授权页</button>
        </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'userAdmin',
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      listStyle: {
        width: '350px',
        height: '350px'
      },
      /* 列表关键字 */
      searchItem: '',
      /* 列表页数据 */
      list: [],
      groupInfor: [], // 组穿梭框源数据
      targetKeys1: [],
      permisionInfor: [], // 权限穿梭框源数据
      targetKeys2: [],
      currentUser: '',
      baseData: [], // 权限详情树结构元数据
      groupName: ''
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
    /* 显示列表视图 */
    showListView () {
      this.list = [] // 清空列表数据
      var self = this
      this.$axios.get('/user/userInfor/?auditor=' + self.username).then(function (response) {
        self.list = response.data.results
        self.showViewid = 'list'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 显示授权视图 */
    showAdminView (index) {
      /* 清空表单数据 */
      this.groupInfor = []
      this.targetKeys1 = []
      this.permisionInfor = []
      this.targetKeys2 = []
      this.currentUser = index
      var self = this
      this.$axios.get(`user/userInfor/` + index).then(function (response) {
        response.data.groups.forEach(function (value, i) {
          self.targetKeys1.push(value.id.toString())
        })
        response.data.user_permissions.forEach(function (value, i) {
          self.targetKeys2.push(value.id.toString())
        })
        self.$axios.get('user/groupInfor/?page_size=99999&ordering=-id').then(function (response) {
          for (let i = 0; i < response.data.results.length; i++) {
            self.groupInfor.push({
              key: response.data.results[i].id.toString(),
              formItem: response.data.results[i].name,
              description: ''
            })
          }
          self.$axios.get('user/permissionInfor/?page_size=99999&ordering=-id').then(function (response) {
            for (let i = 0; i < response.data.results.length; i++) {
              self.permisionInfor.push({
                key: response.data.results[i].id.toString(),
                formItem: response.data.results[i].name,
                description: ''
              })
            }
            self.showViewid = 'admin'
          }).catch(function (err) {
            // 错误提示
            console.log(err)
          })
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 创建权限组 */
    showCreateGroupView () {
      /* 清空表单数据 */
      this.permisionInfor = []
      this.targetKeys2 = []
      var self = this
      this.$axios.get('user/permissionInfor/?page_size=99999&ordering=-id').then(function (response) {
        for (let i = 0; i < response.data.results.length; i++) {
          self.permisionInfor.push({
            key: response.data.results[i].id.toString(),
            formItem: response.data.results[i].name,
            description: ''
          })
        }
        self.showViewid = 'createGroup'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 显示权限组详情视图 */
    showGroupDetailView () {
      /* 清空表单数据 */
      this.baseData = []
      var self = this
      this.$axios.get('user/groupInfor/?page_size=99999&ordering=-id').then(function (response) {
        for (let i = 0; i < response.data.results.length; i++) {
          let permissions = response.data.results[i].permissions
          let children = []
          for (let j = 0; j < permissions.length; j++) {
            children.push({'title': permissions[j].name, 'disableCheckbox': true})
          }
          var obj2 = {'id': response.data.results[i].id, 'title': response.data.results[i].name, 'children': children, 'disableCheckbox': true}
          self.baseData.push(obj2)
        }
        self.showViewid = 'groupDetail'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 更新表单数据 */
    update () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`user/userInfor/` + self.currentUser + '/', {
        groups: self.targetKeys1,
        user_permissions: self.targetKeys2
      }).then(function (response) {
        alert('数据提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    handleChange1 (newTargetKeys, direction, moveKeys) {
      this.targetKeys1 = newTargetKeys
    },
    handleChange2 (newTargetKeys, direction, moveKeys) {
      this.targetKeys2 = newTargetKeys
    },
    /* 创建用户组 */
    createGroup () {
      var self = this
      this.$axios.post(`user/groupInfor/`, {
        name: self.groupName,
        permissions: self.targetKeys2
      }).then(function (response) {
        alert('数据提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 删除用户组 */
    deleteGroup () {
      var self = this
      var data = this.$refs.groupTree.getSelectedNodes()
      if (data.length === 0) {
        alert('请选择要删除的组名称')
      }
      if (data[0].hasOwnProperty('children') === false) {
        alert('请选择要删除的组名称')
        return
      }
      this.$axios.delete(`user/groupInfor/` + data[0].id).then(function (response) {
        alert('数据提交成功')
        self.showGroupDetailView()
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  },
  created () {
    this.showListView()
  },
  computed: {
    username () {
      return this.$store.getters.getLoginInfor.name
    }
  }
}
</script>
<style scoped>
  .userAdmin{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .list{
    position: relative;
    top: 10%;
    width: 100%;
    height: 80%;
    overflow: auto;
  }
  .list table{
    height: 90%;
    width: 100%;
        /*table-layout: fixed;*/
    empty-cells:hide;
  }
  .list th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #ffffff;
    text-align: center;

    background: #191A1E;
  }
  .list  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.4em;
    color: #191A1E;

    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }
  .admin .button{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 10%;
  }
  .admin .button button{
    width: 6em;
    margin: 2em;
    font-size: 0.3em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .create .name{
    position: absolute;
    top: 5%;
    width: 50%;
    height: 12%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;

  }
  .create .name input{
    position: relative;
    width: 15em;
    left: 1em;
    padding-left: 1em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .create .permission{
    position: absolute;
    top: 20%;
    width: 50%;
    height: 60%;
  }
  .create .button{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 10%;
  }
  .create .button button{
    width: 6em;
    margin: 2em;
    font-size: 0.3em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .groupDetail Tree{
    margin: 2em;
    font-size: 0.6em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .groupDetail .button{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 10%;
  }
  .groupDetail .button button{
    width: 6em;
    margin: 2em;
    font-size: 0.3em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
</style>
