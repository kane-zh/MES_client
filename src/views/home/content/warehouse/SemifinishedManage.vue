<template>
  <div class="semifinishedManage">
    <!-- 列表页显示-->
    <div  class="list">
      <div class="heard">
        <form class="select">
          <div>创建账号:
            <select v-model="selectItem.create_user" placeholder="请选择创建账号" >
              <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>审核账号:
            <select v-model="selectItem.auditor" placeholder="请选择审核账号"      >
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
          <div>状态:
            <select v-model="selectItem.state"  placeholder="请选择状态"    >
              <option value="新建">新建</option>
              <option value="审核中">审核中</option>
              <option value="完成">完成</option>
            </select>
          </div>
          <div>仓库:
            <select v-model="selectItem.warehouse" placeholder="请选择编码" >
              <option v-for="item in warehouse" :value="item.code" :key="item.code">{{item.code+"("+item.name+")"}}</option>
            </select>
          </div>
          <div>操作分类:
            <select v-model="selectItem.type"  placeholder="请选择操作分类"    >
              <option value="增加操作">增加操作</option>
              <option value="入库操作">入库操作</option>
              <option value="退库操作">退库操作</option>
              <option value="出库操作">出库操作</option>
              <option value="盘点操作">盘点管理</option>
            </select>
          </div>
          <div>开始时间:
            <input v-model="selectItem.start_time"  type="datetime-local" placeholder="选择日期和时间">
          </div>
          <div>结束时间:
            <input v-model="selectItem.stop_time"  type="datetime-local" placeholder="选择日期和时间">
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
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加半成品管理</button>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <table >
            <tr align="center"  type="height:2em">
              <th>序号</th>
              <th>名称</th>
              <th>编码</th>
              <th>状态</th>
              <th>仓库</th>
              <th>仓位</th>
              <th>半成品分类</th>
              <th>半成品</th>
              <th>操作者</th>
              <th>数量</th>
              <th>操作分类</th>
              <th>操作时间</th>
              <th>创建账号</th>
              <th>审核账号</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.code}}</td>
              <td>{{item.state}}</td>
              <td>{{item.warehouse_code+"("+item.warehouse_name+")"}}</td>
              <td>{{item.position_code+"("+item.position_name+")"}}</td>
              <td>{{item.semifinishedType_code+"("+item.semifinishedType_name+")"}}</td>
              <td>{{item.semifinished_code+"("+item.semifinished_name+")"}}</td>
              <td>{{item.handler}}</td>
              <td>{{item.sum}}</td>
              <td>{{item.type}}</td>
              <td>{{item.dataTime}}</td>
              <td>{{item.create_user}}</td>
              <td>{{item.auditor}}</td>
              <td>
                  <span @click="showDetailView(item.id)" v-show ="item.create_user===username ||
                  item.auditor===username||canRead===true" style="color: #FF1A5EC4">查看</span>
                <span @click="showUpdateView(item.id)" v-show ="item.state==='新建'" style="color: #52c41a">更改</span>
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
            <dd>{{"名称:"+"&#12288;"+detail.name}}</dd>
            <dd>{{"编码:"+"&#12288;"+detail.code}}</dd>
            <dd>{{"状态:"+"&#12288;"+detail.state}}</dd>
            <dd>{{"分类:"+"&#12288;"+detail.type}}</dd>
            <dd>{{"仓库:"+"&#12288;"+detail.warehouse_code+"("+detail.warehouse_name+")"}}</dd>
            <dd>{{"仓位:"+"&#12288;"+detail.position_code+"("+detail.position_name+")"}}</dd>
            <dd>{{"半成品分类:"+"&#12288;"+detail.semifinishedType_code+"("+detail.semifinishedType_name+")"}}</dd>
            <dd>{{"半成品:"+"&#12288;"+detail.semifinished_code+"("+detail.semifinished_name+")"}}</dd>
            <dd>{{"批次:"+"&#12288;"+detail.batch}}</dd>
            <dd>{{"操作者:"+"&#12288;"+detail.handler}}</dd>
            <dd>{{"数量:"+"&#12288;"+detail.sum}}</dd>
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
            <dd>{{"审核账号:"+"&#12288;"+detail.auditor}}</dd>
            <dd>{{"创建时间:"+"&#12288;"+detail.create_time}}</dd>
            <dd>{{"更新时间:"+"&#12288;"+detail.update_time}}</dd>
            <dd>{{"操作时间:"+"&#12288;"+detail.dataTime}}</dd>
          </div>
          <div class="file">
            <dt>文件附件</dt>
            <dd v-for="(value,id) in detail.file" :key="id">
              <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
            </dd>
          </div>
        </div>
        <div class="button">
          <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
          <button type="button" @click="changeState('完成')" v-show="showApprovedBt===true" >通过审核</button>
          <button type="button" @click="changeState('新建')" v-show="showReturnBt===true">驳回信息</button>
          <button type="button" @click="changeState('作废')" v-show="showDeleteBt===true">删除数据</button>
          <button type="button" @click="showUpdateView(detail.id)" v-show ="detail.state==='新建'">更改</button>
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
            </div>
            <div>操作分类:
              <select v-model="formItem.type"  placeholder="请选择操作分类"   >
                <option value="增加操作">增加操作</option>
                <option value="入库操作">入库操作</option>
                <option value="退库操作">退库操作</option>
                <option value="出库操作">出库操作</option>
                <option value="盘点操作">盘点管理</option>
              </select>
              <span class="message" v-show ="!$v.formItem.type.required">请选择分类</span>
            </div>
            <div>数量:
              <input v-model="formItem.sum" type="number" placeholder="请输入操作数量..." >
              <span class="message" v-show ="!$v.formItem.sum.required">请输入数量值</span>
            </div>
            <div>仓库:
              <select v-model="formItem.warehouse"   placeholder="请选择仓库">
                <option v-for="item in warehouse" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>仓位:
              <select v-model="formItem.position"   placeholder="请选择仓位">
                <option v-for="item in positionInfor" :value="item.id" :key="item.id" >{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.position.required">请选择仓位</span>
            </div>
            <div>半成品分类:
              <select v-model="formItem.semifinishedType"   placeholder="请选择半成品分类"      :disabled="inputDisable">
                <option v-for="item in semifinishedType" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>半成品:
              <select v-model="formItem.semifinished"   placeholder="请选择半成品"     :disabled="inputDisable">
                <option v-for="item in semifinishedInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.semifinished.required">请选择半成品</span>
            </div>
            <div>批次:
              <input v-model="formItem.batch"  placeholder="请输入批次.." :disabled="inputDisable">
            </div>
            <div>操作者:
              <input v-model="formItem.handler"  placeholder="请输入操作者...">
            </div>
            <div>操作时间:
              <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
              <span class="message" v-show ="!$v.formItem.dataTime.required">请选择日期</span>
            </div>
            <div v-show="attribute_title.attribute1!==''">{{attribute_title.attribute1}}
              <input v-model="formItem.attribute1"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute2!==''">{{attribute_title.attribute2}}
              <input v-model="formItem.attribute2"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute3!==''">{{attribute_title.attribute3}}
              <input v-model="formItem.attribute3"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute4!==''">{{attribute_title.attribute4}}
              <input v-model="formItem.attribute4"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute5!==''">{{attribute_title.attribute5}}
              <input v-model="formItem.attribute5"  placeholder="...">
            </div>
            <div>审核账号:
              <select v-model="formItem.auditor"  placeholder="请选择审核账号">
                <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.auditor.required">请选择审核账号</span>
            </div>
            <div >备注信息:
              <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息"></textarea>
            </div>
            <div class="file">文件:
              <span>
                选择文件
                <input type="file"  @change="fileBeforeUpload"/>
              </span>
              <ul>
                <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
              </ul>
            </div>
          </form>
        </div>
        <div class="button">
          <button type="button" @click="save">保存数据</button>
          <button type="button" @click="saveAndSubmit">保存并提交</button>
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
            </div>
            <div>操作分类:
              <select v-model="formItem.type"  placeholder="请选择操作分类"   >
                <option value="增加操作">增加操作</option>
                <option value="入库操作">入库操作</option>
                <option value="退库操作">退库操作</option>
                <option value="出库操作">出库操作</option>
                <option value="盘点操作">盘点管理</option>
              </select>
              <span class="message" v-show ="!$v.formItem.type.required">请选择分类</span>
            </div>
            <div>数量:
              <input v-model="formItem.sum" type="number" placeholder="请输入操作数量..." >
              <span class="message" v-show ="!$v.formItem.sum.required">请输入数量值</span>
            </div>
            <div>仓库:
              <select v-model="formItem.warehouse"   placeholder="请选择仓库">
                <option v-for="item in warehouse" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>仓位:
              <select v-model="formItem.position"   placeholder="请选择仓位">
                <option v-for="item in positionInfor" :value="item.id" :key="item.id" >{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.position.required">请选择仓位</span>
            </div>
            <div>半成品分类:
              <select v-model="formItem.semifinishedType"   placeholder="请选择半成品分类"      :disabled="inputDisable">
                <option v-for="item in semifinishedType" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>半成品:
              <select v-model="formItem.semifinished"   placeholder="请选择半成品"     :disabled="inputDisable">
                <option v-for="item in semifinishedInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.semifinished.required">请选择半成品</span>
            </div>
            <div>批次:
              <input v-model="formItem.batch"  placeholder="请输入批次.." :disabled="inputDisable">
            </div>
            <div>操作者:
              <input v-model="formItem.handler"  placeholder="请输入操作者...">
            </div>
            <div>操作时间:
              <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
              <span class="message" v-show ="!$v.formItem.dataTime.required">请选择日期</span>
            </div>
            <div v-show="attribute_title.attribute1!==''">{{attribute_title.attribute1}}
              <input v-model="formItem.attribute1"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute2!==''">{{attribute_title.attribute2}}
              <input v-model="formItem.attribute2"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute3!==''">{{attribute_title.attribute3}}
              <input v-model="formItem.attribute3"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute4!==''">{{attribute_title.attribute4}}
              <input v-model="formItem.attribute4"  placeholder="...">
            </div>
            <div v-show="attribute_title.attribute5!==''">{{attribute_title.attribute5}}
              <input v-model="formItem.attribute5"  placeholder="...">
            </div>
            <div>审核账号:
              <select v-model="formItem.auditor"  placeholder="请选择审核账号">
                <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.auditor.required">请选择审核账号</span>
            </div>
            <div >备注信息:
              <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息"></textarea>
            </div>
            <div class="file">文件:
              <span>
                选择文件
                <input type="file"  @change="fileBeforeUpload"/>
              </span>
              <ul>
                <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
              </ul>
            </div>
          </form>
        </div>
        <div class="button">
          <button type="button" @click="update">保存数据</button>
          <button type="button" @click="updateAndSubmit">保存并提交</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {required} from 'vuelidate/lib/validators'
export default {
  name: 'semifinishedManage',
  components: {
  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      inputDisable: false,
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listPreUrl: '',
      listNextUrl: '',
      /* 列表页查询参数 */
      selectItem: {
        warehouse: '',
        state: '',
        type: '',
        create_user: '',
        auditor: '',
        searchValue: '',
        start_time: '',
        stop_time: ''
      },

      /* 详情页数据 */
      detail: [],
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'semifinishedManage'
      },
      alterList: [],
      alterData: [],
      /* 详情页按钮显示控制 */
      showSubmitBt: false,
      showReturnBt: false,
      showApprovedBt: false,
      showDeleteBt: false,
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        name: '',
        code: '',
        type: '',
        warehouse: '',
        position: '',
        semifinishedType: '',
        semifinished: '',
        batch: '',
        handler: '',
        sum: '',
        dataTime: '',
        state: '',
        file: [],
        alter: [],
        desc: '',
        auditor: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: '',
        fileName: '',
        desc: '',
        uri: 'semifinishedManage'
      },
      fileData: [],
      /* 仓库信息 */
      warehouse: [],
      /* 仓位信息 */
      positionInfor: [],
      /* 半成品分类信息 */
      semifinishedType: [],
      /* 半成品信息 */
      semifinishedInfor: [],
      /* 具有审核权限的账号信息 */
      userinfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '检验汇报编码',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: ''
      },
      /* 仓位下拉框显示条件(根据不同的操作) */
      showKey: ''
    }
  },
  validations: {
    formItem: {
      auditor: {
        required
      },
      type: {
        required
      },
      position: {
        required
      },
      sum: {
        required
      },
      semifinished: {
        required
      },
      dataTime: {
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
      this.$axios.get('warehouse/semifinishedManage/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('warehouse/semifinishedManage/?state=' + self.selectItem.state +
              '&warehouse_code=' + self.selectItem.warehouse +
              '&type=' + self.selectItem.type +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
              '&search=' + self.selectItem.searchValue +
              '&start_time=' + self.selectItem.start_time +
              '&stop_time=' + self.selectItem.stop_time +
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
      this.alterData = []// 清空审核数据
      var self = this
      this.$axios.get(`warehouse/semifinishedManage/` + id).then(function (response) {
        self.detail = response.data
        self.showViewid = 'detail'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 改变数据项状态 */
    changeState (state) {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.formItem.state = state
      this.$axios.patch(`warehouse/semifinishedManage/` + self.detail.id + '/', {
        state: self.formItem.state,
        alter: self.formItem.alter
      }).then(function (response
      ) {
        self.detail.state = self.formItem.state
        self.formItem.state = ''
        self.formItem.alter = []
        if (self.detail.state === '作废') {
          self.showListView()
        }
        alert('数据提交成功')
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
      this.fileData = []
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
      this.alterList = []
      this.fileData = []
      var self = this
      this.$axios.get(`warehouse/semifinishedManage/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.type = response.data.type
        self.formItem.batch = response.data.batch
        self.formItem.handler = response.data.handler
        self.formItem.sum = response.data.sum
        self.formItem.dataTime = response.data.dataTime
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.alterList = response.data.alter
        self.formItem.position = parseInt(response.data.position_id)
        self.formItem.semifinished = parseInt(response.data.semifinished_id)
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
        for (var i = 0; i < self.semifinishedType.length; i++) {
          if (self.semifinishedType[i].code === response.data.semifinishedType_code) {
            self.formItem.semifinishedType = self.semifinishedType[i].id
            break
          }
        }
        for (var j = 0; j < self.warehouse.length; j++) {
          if (self.warehouse[j].code === response.data.warehouse_code) {
            self.formItem.warehouse = self.warehouse[j].id
            break
          }
        }
        self.showViewid = 'update'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 提交文件项 */
    uploadFile () {
      if (!confirm('确认提交??')) {
        return
      }
      let formData = new FormData()
      // 下面是表单绑定的data 数据
      formData.append('uri', this.fileItem.uri)
      formData.append('desc', this.fileItem.desc)
      formData.append('file', this.fileItem.file)
      var self = this
      this.$axios.post(`warehouse/file/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {'id': response.data.id,
          'fileName': self.fileItem.fileName,
          'fileUrl': response.data.file,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.fileItem.file = ''
        self.fileItem.desc = ''
        self.formItem.file.push(response.data.id)
        self.fileData.push(obj)
        alert(self.fileItem.fileName + '文件提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },

    fileBeforeUpload (event) {
      this.fileItem.file = event.target.files[0]
      this.fileItem.fileName = event.target.files[0].name
      this.uploadFile()
    },
    removeFile: function (id) {
      var self = this
      if (!confirm('是否要删除当前数据')) {
        // 当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
        return
      }
      for (var i = 0; i < self.formItem.file.length; i++) {
        if (self.formItem.file[i] === id) {
          self.formItem.file.splice(i, 1)
        }
      }
      for (var j = 0; j < self.fileData.length; j++) {
        if (self.fileData[j].id === id) {
          self.fileData.splice(j, 1)
        }
      }
    },
    /* 提交审核记录项 */
    uploadAlter () {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.$axios.post(`warehouse/alterRecord/`, {
        desc: self.alterItem.desc,
        uri: self.alterItem.uri
      }).then(function (response) {
        var obj = {'id': response.data.id,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.alterItem.desc = ''
        self.formItem.alter.push(response.data.id)
        self.alterData.push(obj)
        alert('审核记录提交成功')
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
      this.$axios.post(`warehouse/semifinishedManage/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        batch: self.formItem.batch,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        semifinished_id: self.formItem.semifinished,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.formItem.id = response.data.id
        self.formItem.state = '新建'
        if (self.formItem.type === '入库操作') {
          for (var i = 0; i < self.positionInfor.length; i++) {
            if (self.positionInfor[i].id === self.formItem.position) {
              self.positionInfor.splice(i, 1)
              break
            }
          }
        }
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
      this.$axios.put(`warehouse/semifinishedManage/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        batch: self.formItem.batch,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        semifinished_id: self.formItem.semifinished,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        alert('数据保存成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 保存并提交表单数据 */
    saveAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`warehouse/semifinishedManage/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        batch: self.formItem.batch,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        semifinished_id: self.formItem.semifinished,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/semifinishedManage/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          if (self.formItem.type === '入库操作') {
            for (var i = 0; i < self.positionInfor.length; i++) {
              if (self.positionInfor[i].id === self.formItem.position) {
                self.positionInfor.splice(i, 1)
                break
              }
            }
          }
          alert('数据提交成功')
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 更新并提交表单数据 */
    updateAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`warehouse/semifinishedManage/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        batch: self.formItem.batch,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        semifinished_id: self.formItem.semifinished,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/semifinishedManage/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          alert('数据提交成功')
          self.showViewid = 'list'
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  },
  created () {
    this.userinfor = []
    this.warehouse = []
    this.positionInfor = []
    this.semifinishedType = []
    this.semifinishedInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=半成品库&state=使用中').then(function (response) {
        self.warehouse = response.data.results
        self.$axios.get('process/semifinishedType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.semifinishedType = response.data.results
          self.showListView()
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }).catch(function (err) {
      console.log(err)
    })
  },
  mounted () {
    this.attribute_title = this.$store.getters.getConfig.attach_attribute.半成品管理
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
      return 'warehouse.add_semifinishedmanagemodel' in this.permissions
    },
    canRead () {
      return 'warehouse.read_semifinishedmanagemodel' in this.permissions
    }

  },
  watch: {
    formItem: {
      deep: true
    },
    /* 监控用户选择的仓库变化时,更新仓位信息 */
    'formItem.warehouse': function (newval, oldval) {
      var self = this
      if (newval === undefined || newval === '') {
        return
      }
      this.positionInfor = []
      this.formItem.position = ''
      if ((this.formItem.type === '入库操作') || (this.formItem.type === '退库操作')) {
        this.$axios.get('warehouse/position/?page_size=99999&ordering=-id&state=闲置' +
          '&type=' + newval).then(function (response) {
          self.positionInfor = response.data.results
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      } else if ((this.formItem.type === '增加操作') || (this.formItem.type === '出库操作') || (this.formItem.type === '盘点操作')) {
        this.$axios.get('warehouse/position/?page_size=99999&ordering=-id&state=使用中' +
          '&type=' + newval).then(function (response) {
          self.positionInfor = response.data.results
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }
    },
    /* 监控用户选择的半成品分类变化时,更新半成品信息 */
    'formItem.semifinishedType': function (newval, oldval) {
      console.log(newval)
      if (this.formItem.type !== '入库操作' && this.formItem.type !== '退库操作') {
        return
      }
      if (newval === undefined || newval === '') {
        return
      }
      var self = this
      this.semifinishedInfor = []
      this.formItem.semifinished = ''
      this.$axios.get('process/semifinishedInfor/?page_size=99999&ordering=-id&state=使用中' +
        '&type=' + newval).then(function (response) {
        self.semifinishedInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 监控用户选择的操作分类变化时,更新仓位下拉框显示条件 */
    'formItem.type': function (newval, oldval) {
      if (newval !== oldval) {
        this.formItem.warehouse = ''
        this.formItem.position = ''
        this.formItem.semifinishedType = ''
        this.formItem.semifinished = ''
        this.formItem.batch = ''
      }
      if ((newval === '入库操作') || (newval === '退库操作')) {
        this.inputDisable = false
      } else if ((newval === '增加操作') || (newval === '出库操作') || (newval === '盘点操作')) {
        this.inputDisable = true
        var self = this
        this.$axios.get('process/semifinishedInfor/?page_size=99999&ordering=-id').then(function (response) {
          self.semifinishedInfor = response.data.results
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      } else {
        this.inputDisable = true
      }
    },
    /* 监控用户选择的操作分类变化时,更新仓位下拉框显示条件 */
    'formItem.position': function (newval, oldval) {
      var self = this
      var warehouseCode = ''
      if (this.formItem.type !== '入库操作' && this.formItem.type !== '退库操作') {
        for (var l = 0; l < this.warehouse.length; l++) {
          if (this.warehouse[l].id === this.formItem.warehouse) {
            warehouseCode = this.warehouse[l].code
            break
          }
        }
        this.$axios.get('warehouse/semifinishedStockDetail/?warehouse_code=' + warehouseCode +
                        '&page_size=99999&ordering=-id').then(function (response) {
          response.data.results.forEach(function (value, i) {
            if (newval === parseInt(value.position_id) && (value.state === '使用中')) {
              for (var j = 0; j < self.semifinishedType.length; j++) {
                if (self.semifinishedType[j].code === value.semifinishedType_code) {
                  self.formItem.semifinishedType = self.semifinishedType[j].id
                  self.formItem.semifinished = parseInt(value.semifinished_id)
                  self.formItem.batch = value.batch
                  break
                }
              }
            }
          })
        }).catch(function (err) {
          // 错误提示
          console.log(err)
        })
      }
    },
    /* 监控状态信息变化,控制操作按钮的显示 */
    'detail.state': function (newval, oldval) {
      var self = this
      self.showSubmitBt = false
      self.showDeleteBt = false
      self.showReturnBt = false
      self.showApprovedBt = false
      if (self.detail.state === '审核中' && ((self.detail.auditor === self.username) || (self.is_superuser === true))) {
        self.showApprovedBt = true
        self.showReturnBt = true
      }
      if (self.detail.state === '新建' && ((self.detail.create_user === self.username) || (self.is_superuser === true))) {
        self.showSubmitBt = true
        self.showDeleteBt = true
      }
    }
  }
}
</script>
<style scoped lang="scss" >
  .semifinishedManage {
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
        height: 24%;
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
            height: 33%;
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
          div:nth-child(7){
            width: 25%;
          }
          div:nth-child(8){
            width: 25%;
          }
          div:nth-child(9){
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
        top: 25%;
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
                width: 8em;
              }
              &:nth-child(6){
                width: 8em;
              }
              &:nth-child(7){
                width: 8em;
              }
              &:nth-child(8){
                width: 8em;
              }
              &:nth-child(9){
                width: 5em;
              }
              &:nth-child(10){
                width: 5em;
              }
              &:nth-child(11){
                width: 5em;
              }
              &:nth-child(12){
                width: 8em;
              }
              &:nth-child(13){
                width: 5em;
              }
              &:nth-child(14){
                width: 5em;
              }
              &:nth-child(15){
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
            dd:nth-child(4){
              width: 100%;
              display: block;
              float: left;
            }
            dd:nth-child(5){
              width: 100%;
              display: block;
              float: left;
            }
            dd:nth-child(6){
              width: 100%;
              display: block;
              float: left;
            }
          }
          .file{
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
              a{
                color: #0c0c0c;
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
        left: 15%;
        width: 70%;
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
            .file {
              position: relative;
              width: 50%;
              height: 30%;
              span{
                position: absolute;
                width: 40%;
                height: 20%;
                right: 30%;
                top: 0;
                font-family: AppleSystemUIFont;
                color: black;
                font-size: 0.3em;
                line-height: 3.3em;
                background: #ffffff;
                border: 1px solid #363E42;
                border-radius: 13px;
                input {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  opacity: 0%;
                }
              }
              ul {
                position: absolute;
                bottom: 5%;
                left: 0;
                width: 100%;
                height: 65%;
                background: #ffffff;
                overflow: auto;
                li {
                  position: relative;
                  width: 100%;
                  height: 1.4em;
                  color: #2b85e4;
                  overflow:hidden;
                  font-family: AppleSystemUIFont;
                  font-size: 0.8em;
                  line-height: 1.25em;
                }
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
        left: 15%;
        width: 70%;
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
            .file {
              position: relative;
              width: 50%;
              height: 30%;
              span{
                position: absolute;
                width: 40%;
                height: 20%;
                right: 30%;
                top: 0;
                font-family: AppleSystemUIFont;
                color: black;
                font-size: 0.3em;
                line-height: 3.3em;
                background: #ffffff;
                border: 1px solid #363E42;
                border-radius: 13px;
                input {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  left: 0;
                  top: 0;
                  opacity: 0%;
                }
              }
              ul {
                position: absolute;
                bottom: 5%;
                left: 0;
                width: 100%;
                height: 65%;
                background: #ffffff;
                overflow: auto;
                li {
                  position: relative;
                  width: 100%;
                  height: 1.4em;
                  color: #2b85e4;
                  overflow:hidden;
                  font-family: AppleSystemUIFont;
                  font-size: 0.8em;
                  line-height: 1.25em;
                }
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
