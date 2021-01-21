<template>
  <div class="equipmentState">
    <!-- 列表页显示-->
    <div  class="list">
      <div class="heard">
        <form class="select">
          <div>创建账号:
            <select v-model="selectItem.create_user">
              <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>排序:
            <select v-model="selectItem.ordering">
              <option value="id">添加时间-正排序</option>
              <option value="-id">添加时间-倒排序</option>
              <option value="update_time">更新时间-正排序</option>
              <option value="-update_time">更新时间-倒排序</option>
            </select>
          </div>
          <div>关键字:
            <input v-model="selectItem.searchValue" type="text" placeholder="  请输入要搜索的信息...">
          </div>
          <div>
            <button type="button" @click="select" style="background: #FCC400;border: none;left: 0">搜索</button>
            <button type="button" @click="showListView" style="border: none;right: 0">重置</button>
          </div>
        </form>
        <div class="button" >
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加设备监控</button>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <table >
            <tr align="center"  type="height:2em">
              <th>序号</th>
              <th>名称</th>
              <th>编码</th>
              <th>设备</th>
              <th>状态</th>
              <th>开机时长</th>
              <th>运行时长</th>
              <th>加工数量</th>
              <th>任务号</th>
              <th>更新时间</th>
              <th>创建账号</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.code}}</td>
              <td>{{item.equipment.code+"("+item.equipment.name+")"}}</td>
              <td>{{item.type}}</td>
              <td>{{item.allTime}}</td>
              <td>{{item.runTime}}</td>
              <td>{{item.sum}}</td>
              <td>{{item.task}}</td>
              <td>{{item.update_time}}</td>
              <td>{{item.create_user}}</td>
              <td>
                  <span @click="showDetailView(item.id)" v-show ="item.create_user===username ||
                  canRead===true" style="color: #FF1A5EC4">查看</span>
                <span @click="showUpdateView(item.id)" style="color: #52c41a">更改</span>
              </td>
            </tr>
            <tr>

            </tr>
          </table>
        </div>
        <div class="page">
          <div>总共：{{listCount}}</div>
          <button type="button" @click="listPre" v-show ="listPreUrl!==''">上一页</button>
          <button type="button" @click="listNext" v-show ="listNextUrl!==''">下一页</button>
        </div>
      </div>
    </div>
    <!-- 详情页显示-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="center">
       <div class="heard">
          <span>详情信息</span>
          <button type="button" @click="showViewid=list"></button>
        </div>
        <div class="content">
          <div class="basic">
            <dt>基础信息</dt>
            <dd>{{"名称:"+"&#12288;"+detail.name}}</dd>
            <dd>{{"编码:"+"&#12288;"+detail.code}}</dd>
            <dd>{{"设备状态:"+"&#12288;"+detail.type}}</dd>
            <dd>{{"运行时长:"+"&#12288;"+detail.runTime}}</dd>
            <dd>{{"开机时长:"+"&#12288;"+detail.allTime}}</dd>
            <dd>{{"加工数量:"+"&#12288;"+detail.sum}}</dd>
            <dd>{{"任务编码:"+"&#12288;"+detail.task}}</dd>
            <dd>{{"稼动率:"+"&#12288;"+detail.util_rate}}</dd>
            <dd>{{"完成率:"+"&#12288;"+detail.comp_rate}}</dd>
            <dd>{{"操作者:"+"&#12288;"+detail.handler}}</dd>
            <dd v-show ="attribute_title.attribute1!==''">{{attribute_title.attribute1 +":"+"&#12288;"+detail.attribute1}}</dd>
            <dd v-show ="attribute_title.attribute2!==''">{{attribute_title.attribute2 +":"+"&#12288;"+detail.attribute2}}</dd>
            <dd v-show ="attribute_title.attribute3!==''">{{attribute_title.attribute3 +":"+"&#12288;"+detail.attribute3}}</dd>
            <dd v-show ="attribute_title.attribute4!==''">{{attribute_title.attribute4 +":"+"&#12288;"+detail.attribute4}}</dd>
            <dd v-show ="attribute_title.attribute5!==''">{{attribute_title.attribute5 +":"+"&#12288;"+detail.attribute5}}</dd>
          </div>
          <div class="desc" v-show="detail.desc!=''">
            <dt>备注信息</dt>
            <dd>{{detail.desc}}</dd>
          </div>
          <div class="other">
            <dt>其他信息</dt>
            <dd>{{"创建账号:"+"&#12288;"+detail.create_user}}</dd>
            <dd>{{"创建时间:"+"&#12288;"+detail.create_time}}</dd>
            <dd>{{"更新时间:"+"&#12288;"+detail.update_time}}</dd>
          </div>
        </div>
        <div class="button">
          <button type="button" @click="showUpdateView(detail.id)">更改</button>
        </div>
      </div>
    </div>
    <!-- 创建页显示-->
    <div  class="create"  v-show ="showViewid==='create'">
      <div class="center">
        <div class="heard">
          <span>信息创建页</span>
          <button type="button" @click="showListView"></button>
        </div>
        <div class="content">
          <form >
            <div>名称:
              <input v-model="formItem.name"  placeholder="请输入名称">
            </div>
            <div>编码:
              <input v-model="formItem.code"  placeholder="请输入编码">
              <span class="message" v-show ="!$v.formItem.code.required">编码不能为空</span>
              <span class="message" v-show ="!$v.formItem.code.minLength">最少长度为2</span>
              <span class="message" v-show ="!$v.formItem.code.maxLength">最大长度位32</span>
            </div>
            <div>设备分类:
              <select v-model="formItem.equipmentType"   placeholder="请选择设备分类">
                <option v-for="item in equipmentType" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>设备:
              <select v-model="formItem.equipment"   placeholder="请选择设备"     >
                <option v-for="item in equipmentInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.equipment.required">请选择设备</span>
            </div>
            <div >备注信息:
              <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息"></textarea>
            </div>
          </form>
        </div>
        <div class="button">
          <button type="button" @click="save">保存数据</button>
        </div>
      </div>
    </div>
    <!-- 更新页显示-->
    <div  class="update"  v-show ="showViewid==='update'">
      <div class="center">
         <div class="heard">
          <span>信息更新页</span>
          <button type="button" @click="showViewid=list"></button>
        </div>
        <div class="content">
          <form >
            <div>名称:
              <input v-model="formItem.name"  placeholder="请输入名称">
            </div>
            <div>编码:
              <input v-model="formItem.code"  placeholder="请输入编码">
              <span class="message" v-show ="!$v.formItem.code.required">编码不能为空</span>
              <span class="message" v-show ="!$v.formItem.code.minLength">最少长度为2</span>
              <span class="message" v-show ="!$v.formItem.code.maxLength">最大长度位32</span>
            </div>
            <div>设备分类:
              <select v-model="formItem.equipmentType"   placeholder="请选择设备分类">
                <option v-for="item in equipmentType" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>设备:
              <select v-model="formItem.equipment"   placeholder="请选择设备"     >
                <option v-for="item in equipmentInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.equipment.required">请选择设备</span>
            </div>
            <div >备注信息:
              <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息"></textarea>
            </div>
          </form>
        </div>
        <div class="button">
          <button type="button" @click="update">保存数据</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'equipmentState',
  components: {
  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listPreUrl: '',
      listNextUrl: '',
      /* 列表页查询参数 */
      selectItem: {
        create_user: '',
        searchValue: '',
        ordering: ''
      }, /* 列表页数据排序 */
      /* 详情页数据 */
      detail: [],
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        name: '',
        code: '',
        equipmentType: '',
        equipment: '',
        desc: ''
      },
      /* 设备分类信息 */
      equipmentType: [],
      /* 设备信息 */
      equipmentInfor: [],
      /* 具有审核权限的账号信息 */
      userinfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        attribute6: '',
        attribute7: '',
        attribute8: '',
        attribute9: '',
        attribute10: ''
      }
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
      },
      equipment: {
        required
      }
    }
  },
  methods: {
    /* 显示列表视图 */
    showListView: function () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listPreUrl = ''
      this.listNextUrl = ''
      for (let key in this.selectItem) {
        this.selectItem[key] = ''
      }
      var self = this
      this.$axios.get('equipment/equipmentState/?ordering=' + self.selectItem.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        if (response.data.previous !== null) {
          self.listPreUrl = response.data.previous.replace(self.$axios.defaults.baseURL, '')
        }
        self.showViewid = 'list'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 列表查询数据 */
    select () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listPreUrl = ''
      this.listNextUrl = ''
      var self = this
      this.$axios.get('equipment/equipmentState/?create_user=' + self.selectItem.create_user +
              '&search=' + self.selectItem.searchValue +
              '&ordering=' + self.selectItem.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        if (response.data.previous !== null) {
          self.listPreUrl = response.data.previous.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    listPre () {
      this.list = [] // 清空列表数据
      var self = this
      this.$axios.get(this.listPreUrl).then(function (response) {
        self.listPreUrl = ''
        self.listNextUrl = ''
        self.list = response.data.results
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        if (response.data.previous !== null) {
          self.listPreUrl = response.data.previous.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    listNext () {
      this.list = [] // 清空列表数据
      var self = this
      this.$axios.get(this.listNextUrl).then(function (response) {
        self.listPreUrl = ''
        self.listNextUrl = ''
        self.list = response.data.results
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        if (response.data.previous !== null) {
          self.listPreUrl = response.data.previous.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 显示详情视图 */
    showDetailView (id) {
      this.detail = [] // 清空详情数据
      var self = this
      this.$axios.get(`equipment/equipmentState/` + id).then(function (response) {
        self.detail = response.data
        self.showViewid = 'detail'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 显示创建视图 */
    showCreatView () {
      /* 清空表单数据 */
      for (let key in this.formItem) {
        if (Object.prototype.toString.call(this.formItem[key]) === '[object Array]') {
          this.formItem[key] = []
        } else if (Object.prototype.toString.call(this.formItem[key]) === '[object Object]') {
          var obj = this.formItem[key]
          for (let key1 in obj) {
            if (Object.prototype.toString.call(obj[key1]) === '[object Array]') {
              obj[key1] = []
            } else {
              obj[key1] = ''
            }
          }
        } else {
          this.formItem[key] = ''
        }
      }
      this.equipmentInfor = []
      this.showViewid = 'create'
    },
    /* 显示更新视图 */
    showUpdateView (id) {
      /* 清空表单数据 */
      for (let key in this.formItem) {
        if (Object.prototype.toString.call(this.formItem[key]) === '[object Array]') {
          this.formItem[key] = []
        } else if (Object.prototype.toString.call(this.formItem[key]) === '[object Object]') {
          var obj = this.formItem[key]
          for (let key1 in obj) {
            if (Object.prototype.toString.call(obj[key1]) === '[object Array]') {
              obj[key1] = []
            } else {
              obj[key1] = ''
            }
          }
        } else {
          this.formItem[key] = ''
        }
      }
      var self = this
      this.$axios.get(`equipment/equipmentState/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.code = response.data.code
        self.formItem.desc = response.data.desc
        if (response.data.equipment !== null) {
          self.formItem.equipment = response.data.equipment.id
          self.formItem.equipmentType = response.data.equipment.type.id
        } else { self.formItem.equipment = response.data.equipment }
        self.showViewid = 'update'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`equipment/equipmentState/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        equipment: self.formItem.equipment,
        desc: self.formItem.desc
      }).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.state = '新建'
        alert('数据保存成功')
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
      this.$axios.put(`equipment/equipmentState/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        equipment: self.formItem.equipment,
        desc: self.formItem.desc
      }).then(function (response) {
        alert('数据保存成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  },
  created () {
    this.equipmentType = []
    this.equipmentInfor = []
    var self = this
    this.$axios.get('equipment/equipmentType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
      self.equipmentType = response.data.results
      self.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
        self.userinfor = response.data.results
        self.showListView()
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }).catch(function (err) {
      // 错误提示
      console.log(err)
    })
  },
  mounted () {
    this.attribute_title = this.$store.getters.getConfig.attach_attribute.设备厂商
  },
  computed: {
    username () {
      return this.$store.getters.getLoginInfor.name
    },
    is_superuser () {
      return this.$store.getters.getLoginInfor.is_superuser
    },
    permissions () {
      return this.$store.getters.getLoginInfor.permissions
    },
    canCreate () {
      return 'equipment.add_equipmentstatemodel' in this.permissions
    },
    canRead () {
      return 'equipment.read_equipmentstatemodel' in this.permissions
    }

  },
  watch: {
    formItem: {
      deep: true
    },
    /* 监控用户选择的设备分类变化时,更新设备信息 */
    'formItem.equipmentType': function (newval, oldval) {
      var self = this
      this.equipmentInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      this.$axios.get('equipment/equipmentAccount/?page_size=99999&ordering=-id&state=使用中' +
        '&type=' + newval).then(function (response) {
        self.equipmentInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="scss" >
  .equipmentState {
    position: absolute;
    top: 0;
    width: 98%;
    height: 100%;
    margin-right: 1%;
    margin-left: 1%;
    .list {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      .heard {
        position: absolute;
        top: 1%;
        width: 100%;
        height: 19%;
        background: rgba(255, 255, 255, 0.57);
        .select {
          position: absolute;
          top: 0;
          width: 100%;
          height: 70%;
          div {
            position: relative;
            top: 0;
            width: 20%;
            height: 50%;
            font-family: PingFangSC-Regular;
            font-size: 0.4em;
            color: #151515;
            padding-top: 0.6em;
            float: left;
            select {
              position: absolute;
              width: 10em;
              font-size: 0.8em;
              border: 1px solid #D8D8D8;
              background: #ffffff;
              border-radius: 1em;
              margin-left: 1em;
              padding-left: 1em;
            }
            input {
              position: absolute;
              width: 15em;
              font-size: 0.8em;
              border: 1px solid #D8D8D8;
              background: #ffffff;
              border-radius: 1em;
              margin-left: 1em;
              padding-left: 1em;
            }
            button {
              position: absolute;
              width: 6em;
              border: 1px solid #D8D8D8;
              background: #D8D8D8;
              border-radius: 1em;
            }
          }
          div:nth-child(3) {
            width: 25%;
          }
        }
        .button{
          position: absolute;
          top: 70%;
          width: 100%;
          height: 30%;
          font-family: PingFangSC-Regular;
          color: #151515;
          button{
            position: absolute;
            right: 40%;
            width: 15em;
            font-size: 0.35em;
            line-height: 2em;
            border: 1px solid #D8D8D8;
            background: #D8D8D8;
            border-radius: 1em;
          }
        }
      }
      .content{
        position: absolute;
        top: 22%;
        bottom: 0;
        width: 100%;
        .table{
          height: 90%;
          width: 100%;
          overflow: auto;
          table{
            height: 100%;
            width: 100%;
            table-layout: auto;
            empty-cells:hide;
            word-break : normal;
            th{
              position: sticky;
              top:0;
              height: 1em;
              font-family: PingFangSC-Regular;
              font-size: 0.4em;
              line-height: 2.5em;
              color: #000000;
              text-align: center;
              background: #ffffff;
              border:1px solid rgba(177, 176, 171, 0.89);
              &:nth-child(1){
                width: 3em;
              }
              &:nth-child(2){
                width: 8em;
              }
              &:nth-child(3){
                width: 8em;
              }
              &:nth-child(4){
                width: 5em;
              }
              &:nth-child(5){
                width: 5em;
              }
              &:nth-child(6){
                width: 5em;
              }
              &:nth-child(7){
                width: 5em;
              }
              &:nth-child(8){
                width: 5em;
              }
              &:nth-child(9){
                width: 5em;
              }
              &:nth-child(10){
                width: 8em;
              }
              &:nth-child(11){
                width: 5em;
              }
              &:nth-child(12){
                width: 5em;
              }
            }
            td{
              height: 1em;
              font-family: PingFangSC-Regular;
              font-size: 0.4em;
              color: #191A1E;

              text-align: center;
              background: #ffffff;
              border:1px solid rgba(177, 176, 171, 0.61);
            }
          }
        }
        .page{
          position: absolute;
          right: 5%;
          bottom: 0;
          height: 10%;
          font-size: 0.3em;
          line-height: 2em;
          button{
            position: relative;
            width: 20em;
            font-size: 0.3em;
            line-height: 2em;
            border: 1px solid #363E42;
            border-radius: 1em;
          }
        }
      }
    }
    .detail {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(200, 200, 200,0.8);
      .center {
        position: absolute;
        top:10%;
        left: 20%;
        width: 60%;
        height: 80%;
        background: #ffffff;
        border-radius:0.5em;
        .heard {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 8%;
          background: #123658;
          border-top-right-radius: 0.5em;
          border-top-left-radius: 0.5em;
          span {
            position: absolute;
            height: 100%;
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 0.6em;
            line-height: 1.5em;
            text-align: center;
            color: #ffffff;
            display: inline-block;
          }
          button {
            position: absolute;
            right: 0.25em;
            top: 0.25em;
            height: 0.5em;
            width: 0.5em;
            border: none;
            background-image: url("../../../../../static/icons/close.png");
            background-size: cover;
          }
        }
        .content {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 80%;
          height: 80%;
          overflow: auto;
          .basic{
            position: relative;
            top: 0;
            overflow:hidden;
            width: 100%;
            dt{
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #9ca022;
              text-align: center;
            }
            dd{
              width: 50%;
              display: block;
              float: left;
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #0c0c0c;
            }
          }
          .desc{
            position: relative;
            top: 0;
            overflow:hidden;
            width: 100%;
            dt{
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #9ca022;
              text-align: center;
            }
            dd{
              width: 100%;
              display: block;
              float: left;
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #0c0c0c;
            }
          }
          .other{
            position: relative;
            top: 0;
            overflow:hidden;
            width: 100%;
            dt{
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #9ca022;
              text-align: center;
            }
            dd{
              width: 50%;
              display: block;
              float: left;
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #0c0c0c;
            }
            dd:nth-child(3){
              width: 100%;
              display: block;
              float: left;
            }
            dd:nth-child(4){
              width: 100%;
              display: block;
              float: left;
            }
          }
        }
        .button {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 8%;
          padding-left: 10%;
          button {
            position: relative;
            top: -2em;
            width: 6em;
            font-size: 0.3em;
            line-height: 2em;
            background: #ffffff;
            border: 1px solid #363E42;
            border-radius: 13px;
          }
        }
      }
    }
    .create {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(200, 200, 200,0.8);
      .center {
        position: absolute;
        top:10%;
        left: 20%;
        width: 60%;
        height: 80%;
        background: #ffffff;
        border-radius:0.5em;
        .heard {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 8%;
          background: #123658;
          border-top-right-radius: 0.5em;
          border-top-left-radius: 0.5em;
          span {
            position: absolute;
            height: 100%;
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 0.6em;
            line-height: 1.5em;
            text-align: center;
            color: #ffffff;
            display: inline-block;
          }
          button {
            position: absolute;
            right: 0.25em;
            top: 0.25em;
            height: 0.5em;
            width: 0.5em;
            border: none;
            background-image: url("../../../../../static/icons/close.png");
            background-size: cover;
          }
        }
        .content {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 80%;
          height: 80%;
          overflow: auto;
          form {
            position: absolute;
            top: 5%;
            width: 100%;
            height: 90%;
            font-family: PingFangSC-Regular;
            font-size: 0.5em;
            color: #151515;

            div {
              position: relative;
              width: 50%;
              height: 20%;
              float: left;
              select, input, textarea {
                position: absolute;
                right: 1em;
                width: 10em;
                padding-left: 1em;
                font-family: AppleSystemUIFont;
                font-size: 0.8em;
                border: 1px solid #D8D8D8;
                background: #ffffff;
                border-radius: 1em;
              }
              span {
                position: absolute;
                width: 100%;
                font-family: AppleSystemUIFont;
                font-size: 0.6em;
                color: #f5222d;
                display: block;
                text-align: center;
              }
            }
          }
        }
        .button {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 8%;
          padding-left: 10%;
          button {
            position: relative;
            top: -2em;
            width: 6em;
            font-size: 0.3em;
            line-height: 2em;
            background: #ffffff;
            border: 1px solid #363E42;
            border-radius: 13px;
          }
        }
      }
    }
    .update {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(200, 200, 200,0.8);
      .center {
        position: absolute;
        top:10%;
        left: 20%;
        width: 60%;
        height: 80%;
        background: #ffffff;
        border-radius:0.5em;
        .heard {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 8%;
          background: #123658;
          border-top-right-radius: 0.5em;
          border-top-left-radius: 0.5em;
          span {
            position: absolute;
            height: 100%;
            width: 100%;
            font-family: PingFangSC-Regular;
            font-size: 0.6em;
            line-height: 1.5em;
            text-align: center;
            color: #ffffff;
            display: inline-block;
          }
          button {
            position: absolute;
            right: 0.25em;
            top: 0.25em;
            height: 0.5em;
            width: 0.5em;
            border: none;
            background-image: url("../../../../../static/icons/close.png");
            background-size: cover;
          }
        }
        .content {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 80%;
          height: 80%;
          overflow: auto;
          form {
            position: absolute;
            top: 5%;
            width: 100%;
            height: 90%;
            font-family: PingFangSC-Regular;
            font-size: 0.5em;
            color: #151515;

            div {
              position: relative;
              width: 50%;
              height: 20%;
              float: left;
              select, input, textarea {
                position: absolute;
                right: 1em;
                width: 10em;
                padding-left: 1em;
                font-family: AppleSystemUIFont;
                font-size: 0.8em;
                border: 1px solid #D8D8D8;
                background: #ffffff;
                border-radius: 1em;
              }
              span {
                position: absolute;
                width: 100%;
                font-family: AppleSystemUIFont;
                font-size: 0.6em;
                color: #f5222d;
                display: block;
                text-align: center;
              }
            }
          }
        }
        .button {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 8%;
          padding-left: 10%;
          button {
            position: relative;
            top: -2em;
            width: 6em;
            font-size: 0.3em;
            line-height: 2em;
            background: #ffffff;
            border: 1px solid #363E42;
            border-radius: 13px;
          }
        }
      }
    }
  }
</style>
