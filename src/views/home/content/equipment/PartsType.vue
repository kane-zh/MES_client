<template>
  <div class="partsType">
    <!-- 列表页显示-->
    <div  class="list"  v-if="showViewid==='list'">
      <div class="modelSelect">
        <button type="button" @click="changeMode">{{btTitle}}</button>
      </div>
      <div v-if="showTree===false">
        <div class="listHead">
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
            <div>类别:
              <select v-model="selectItem.classes"  placeholder="请选择类别"    >
                <option value="一级类别">一级类别</option>
                <option value="二级类别">二级类别</option>
                <option value="三级类别">三级类别</option>
                <option value="四级类别">四级类别</option>
              </select>
            </div>
            <div>状态:
              <select v-model="selectItem.state"  placeholder="请选择状态"    >
                <option value="新建">新建</option>
                <option value="审核中">审核中</option>
                <option value="使用中">使用中</option>
              </select>
            </div>
            <div>关键字:
              <input v-model="selectItem.searchValue" type="text" placeholder="  请输入要搜索的信息...">
            </div>
             <div>
               <button type="button" @click="select" >搜索</button>
            </div>
            <div>
              <button type="button" @click="showListView" style="background: #FCC400;border: none;left: 0">重置</button>
            </div>
          </form>
          <div class="button" >

            <button type="button" @click="showCreatView"  v-show="canCreate===true">添加备品类型</button>
          </div>
          <div class="ordering">
            <div>
              <input value="id" type="radio" name ="ordering" v-model="ordering">
              添加时间-正排序
            </div>
            <div>
              <input value="-id" type="radio" name ="ordering" v-model="ordering">
              添加时间-倒排序
            </div>
            <div>
              <input value="update_time" type="radio" name ="ordering" v-model="ordering">
              更新时间-正排序
            </div>
            <div>
              <input value="-update_time" type="radio" name ="ordering" v-model="ordering">
              更新时间-倒排序
            </div>
          </div>
        </div>
        <div class="listTable">
            <div class="table">
            <table >
              <tr align="center"  type="height:2em">
                <th>序号</th>
                <th>名称</th>
                <th>编码</th>
                <th>类别</th>
                <th>状态</th>
                <th>更新时间</th>
                <th>创建账号</th>
                <th>审核账号</th>
                <th>操作</th>
              </tr>
              <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
                <td>{{index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.code}}</td>
                <td>{{item.classes}}</td>
                <td>{{item.state}}</td>
                <td>{{item.update_time}}</td>
                <td>{{item.create_user}}</td>
                <td>{{item.auditor}}</td>
                <td>
                  <button type="button" @click="showDetailView(item.id)" v-if="item.create_user===username ||
                  item.auditor===username||canRead===true">详情</button>
                  <button type="button" @click="showUpdateView(item.id)" v-if="item.state==='新建'">更改</button>
                </td>
              </tr>
              <tr>

              </tr>
            </table>
          </div><div class="page">
            <div>总共：{{listCount}}</div>
            <button type="button" @click="listPre" v-if="listPreUrl!==''">上一页</button>
            <button type="button" @click="listNext" v-if="listNextUrl!==''">下一页</button>
          </div>
        </div>
      </div>
      <div class="listTree" v-if="showTree===true">
        <div class="tree">
          <Tree :data="treeData"  ref="listTree" expand></Tree>
        </div>
        <div class="button">
          <button type="button" @click="getTreeIndex">查看详情</button>
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加备品类型</button>
        </div>
      </div>
    </div>
    <!--   /*详情页显示*/-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="content">
        <ul>
          <li>{{"名称:"+"&#12288;"+detail.name}}</li>
          <li>{{"编码:"+"&#12288;"+detail.code}}</li>
          <li>{{"类别:"+"&#12288;"+detail.classes}}</li>
          <li>{{"状态:"+"&#12288;"+detail.state}}</li>
          <li v-if="parent!==null">{{"父类别:"+"&#12288;"+parent.name+"("+parent.code+")"}}</li>
          <li>{{"创建账号:"+"&#12288;"+detail.create_user}}</li>
          <li>{{"审核账号:"+"&#12288;"+detail.auditor}}</li>
          <li>{{"创建时间:"+"&#12288;"+detail.create_time}}</li>
          <li>{{"更新时间:"+"&#12288;"+detail.update_time}}</li>
          <li>{{"备注信息:"+"&#12288;"+detail.desc}}</li>
        </ul>
        <dl>
          <dt>文件附件:</dt>
          <template v-for="(value,id) in detail.file">
            <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
          </template>
        </dl>
        <Collapse active-key="2" accordion v-if="detail.partsType_child!==undefined && detail.partsType_child.length > 0">
          子类别:
          <Panel >
            <div  slot="content">
              <table >
                <tr align="center"  type="height:2em">
                  <th>序号</th>
                  <th>名称</th>
                  <th>编码</th>
                  <th>类别</th>
                  <th>状态</th>
                </tr>
                <tr align="center" v-for="(item,index) in detail.partsType_child" :key="item.id" type="height:1em" >
                  <td>{{index}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.code}}</td>
                  <td>{{item.classes}}</td>
                  <td>{{item.state}}</td>
                <tr>

                </tr>
              </table>
            </div>
          </Panel>
        </Collapse>
        <Collapse active-key="3" accordion v-if="detail.partsType_item!==undefined && detail.partsType_item.length > 0">
          包含内容:
          <Panel >
            <div  slot="content">
              <table >
                <tr align="center"  type="height:2em">
                  <th>序号</th>
                  <th>名称</th>
                  <th>编码</th>
                  <th>状态</th>
                </tr>
                <tr align="center" v-for="(item,index) in detail.partsType_item" :key="item.id" type="height:1em" >
                  <td>{{index}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.code}}</td>
                  <td>{{item.state}}</td>
                </tr>
                <tr>

                </tr>
              </table>
            </div>
          </Panel>
        </Collapse>
        <dl>
          <dt>历史审核记录:</dt>
          <template v-for="(value,id) in detail.alter">
            <dd v-bind:key="id">
              {{"&#12288;&#12288;&#12288;"+value.desc+"&#12288;" +value.create_user+"&#12288;"+value.create_time}}
            </dd>
          </template>
        </dl>
        <dl>
          <dt>新添加记录:</dt>
          <template v-for="(value,id) in alterData">
            <dd v-bind:key="id">
              {{"&#12288;&#12288;&#12288;"+value.desc}}
            </dd>
          </template>
        </dl>
      </div>
      <div class="alter" v-if="detail.state!=='使用中'">
        审核信息:
        <textarea v-model="alterItem.desc"  placeholder="请输入当前信息的审核记录..."></textarea>
        <button type="button" @click="uploadAlter">提交记录</button>
      </div>
       <div class="button">
        <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
        <button type="button" @click="changeState('使用中')" v-show="showApprovedBt===true" >通过审核</button>
        <button type="button" @click="changeState('新建')" v-show="showReturnBt===true">驳回信息</button>
        <button type="button" @click="changeState('作废')" v-show="showDeleteBt===true">删除数据</button>
        <button type="button" @click="showViewid='list'">返回列表页</button>
      </div>
    </div>
    <!--    /*创建页显示*/-->
    <div  class="create"  v-show="showViewid==='create'">
      <form >
        <div>名称:
          <input v-model="formItem.name"  placeholder="请输入名称">
        </div>
        <div>编码:
          <input v-model="formItem.code"  placeholder="请输入编码">
          <span class="message" v-if="!$v.formItem.code.required">编码不能为空</span>
          <span class="message" v-if="!$v.formItem.code.minLength">最少长度为2</span>
          <span class="message" v-if="!$v.formItem.code.maxLength">最大长度位32</span>
        </div>
          <div>类别:
            <select v-model="formItem.classes"  placeholder="请选择类别">
              <option value="一级类别">一级类别</option>
              <option value="二级类别">二级类别</option>
              <option value="三级类别">三级类别</option>
              <option value="四级类别">四级类别</option>
            </select>
            <span class="message" v-if="!$v.formItem.classes.required">请选择类别</span>
          </div>
          <div>上级类别:
            <select v-model="formItem.parent"   placeholder="请选择上级类别">
              <option v-for="item in list" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
            </select>
          </div>
          <div>备品附加属性:
            <select v-model="formItem.attach_attribute"  placeholder="请选择附加属性"  style="height: 90%"  multiple="true">
              <option v-for="(value,key,id) in attach_attributes" :value="key+':'+value" :key="id">{{value}}</option>
            </select>
          </div>
        <div>审核账号:
          <select v-model="formItem.auditor"  placeholder="请选择审核账号">
            <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
          </select>
          <span class="message" v-if="!$v.formItem.auditor.required">请选择审核账号</span>
        </div>
        <div >备注信息:
          <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息"></textarea>
        </div>
           <div class="annex">文件附件:
          <ul>
            <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
          </ul>
          <input type="file"  @change="fileBeforeUpload"/>
          <textarea  v-model="fileItem.desc"  placeholder="请输入当前的备注信息"></textarea>
          <button type="button" @click="uploadFile">上传</button>
        </div>
      </form>
      <div class="button">
        <button type="button" @click="save">保存数据</button>
        <button type="button" @click="saveAndSubmit">保存并提交</button>
        <button type="button" @click="showViewid='list'">返回列表页</button><button type="button" @click="showViewid='list'">返回列表页</button>
      </div>
    </div>
    <!--    /*更新页显示*/-->
    <div  class="update"  v-show="showViewid==='update'">
      <form >
        <div>名称:
          <input v-model="formItem.name"  placeholder="请输入名称">
        </div>
        <div>编码:
          <input v-model="formItem.code"  placeholder="请输入编码">
          <span class="message" v-if="!$v.formItem.code.required">编码不能为空</span>
          <span class="message" v-if="!$v.formItem.code.minLength">最少长度为2</span>
          <span class="message" v-if="!$v.formItem.code.maxLength">最大长度位32</span>
        </div>
        <div>类别:
          <select v-model="formItem.classes"  placeholder="请选择类别"   >
            <option value="一级类别">一级类别</option>
            <option value="二级类别">二级类别</option>
            <option value="三级类别">三级类别</option>
            <option value="四级类别">四级类别</option>
          </select>
          <span class="message" v-if="!$v.formItem.classes.required">请选择类别</span>
        </div>
        <div>上级类别:
          <select v-model="formItem.parent"   placeholder="请选择上级类别">
            <option v-for="item in list" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
        </div>
        <div>备品附加属性:
          <select v-model="formItem.attach_attribute"  placeholder="请选择附加属性"  style="height: 90%"  multiple="true">
            <option v-for="(value,key,id) in attach_attributes" :value="key+':'+value" :key="id">{{value}}</option>
          </select>
        </div>
        <div>审核账号:
          <select v-model="formItem.auditor"  placeholder="请选择审核账号">
            <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
          </select>
          <span class="message" v-if="!$v.formItem.auditor.required">请选择审核账号</span>
        </div>
        <div >备注信息:
          <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息"></textarea>
        </div>
          <div class="annex">文件附件:
          <ul>
            <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
          </ul>
          <input type="file"  @change="fileBeforeUpload"/>
          <textarea  v-model="fileItem.desc"  placeholder="请输入当前的备注信息"></textarea>
          <button type="button" @click="uploadFile">上传</button>
        </div>
      </form>
      <div class="button">
        <button type="button" @click="update">保存数据</button>
        <button type="button" @click="updateAndSubmit">保存并提交</button>
        <button type="button" @click="showViewid='list'">返回列表页</button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'partsType',
  components: {
  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      showTree: false,
      btTitle: '树状模式',
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listPreUrl: '',
      listNextUrl: '',
      treeData: [],
      /* 列表页查询参数 */
      selectItem: {
        state: '',
        classes: '',
        create_user: '',
        auditor: '',
        searchValue: ''
      },
      /* 列表页数据排序 */
      ordering: '-id',
      /* 详情页数据 */
      detail: [],
      parent: {},
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'partsType'
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
        state: '',
        classes: null,
        parent: null,
        attach_attribute: [],
        file: [],
        alter: [],
        desc: '',
        auditor: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'partsType'
      },
      fileData: [],
      /* 具有审核权限的账号信息 */
      userinfor: [],
      attach_attributes: {
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
      classes: {
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
      this.$axios.get('equipment/partsType/?ordering=' + self.ordering).then(function (response) {
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 列表查询数据 */
    select () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listPreUrl = ''
      this.listNextUrl = ''
      var self = this
      this.$axios.get('equipment/partsType/?state=' + self.selectItem.state +
          '&classes=' + self.selectItem.classes +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
              '&search=' + self.selectItem.searchValue +
              '&ordering=' + self.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        if (response.data.previous !== null) {
          self.listPreUrl = response.data.previous.replace(self.$axios.defaults.baseURL, '')
        }
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 显示列表树状视图 */
    showListTreeView: function () {
      this.treeData = []
      var self = this
      this.$axios.get('equipment/partsTypes/').then(function (response) {
        self.transformToTree(response.data)
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 将数据转换成树形结构数据格式 */
    transformToTree (data) {
      /* 遍历第一层,给第一层添加数据 */
      for (let l1 = 0; l1 < data.length; l1++) {
        /* 遍历第二层,给第一层子项添加数据 */
        let data2 = data[l1].partsType_child
        let children1 = []
        for (let l2 = 0; l2 < data2.length; l2++) {
          /* 遍历第三层,给第二层子项添加数据 */
          let data3 = data2[l2].partsType_child
          let children2 = []
          for (let l3 = 0; l3 < data3.length; l3++) {
            /* 遍历第四层,给第三层子项添加数据 */
            let data4 = data3[l3].partsType_child
            let children3 = []
            for (let l4 = 0; l4 < data4.length; l4++) {
              children3.push({'id': data4[l4].id,
                expand: true,
                'state': data4[l4].state,
                'auditor': data4[l4].auditor,
                'create_user': data4[l4].create_user,
                'title': data4[l4].name + '(' + data4[l4].code + ')',
                'disableCheckbox': true})
            }
            children2.push({'id': data3[l3].id,
              expand: true,
              'state': data3[l3].state,
              'auditor': data3[l3].auditor,
              'create_user': data3[l3].create_user,
              'title': data3[l3].name + '(' + data3[l3].code + ')',
              'children': children3,
              'disableCheckbox': true})
          }
          children1.push({'id': data2[l2].id,
            expand: true,
            'state': data2[l2].state,
            'auditor': data2[l2].auditor,
            'create_user': data2[l2].create_user,
            'title': data2[l2].name + '(' + data2[l2].code + ')',
            'children': children2,
            'disableCheckbox': true})
        }
        this.treeData.push({'id': data[l1].id,
          expand: true,
          'state': data[l1].state,
          'auditor': data[l1].auditor,
          'create_user': data[l1].create_user,
          'title': data[l1].name + '(' + data[l1].code + ')',
          'children': children1,
          'disableCheckbox': true})
      }
    },
    /* 获取树结构id */
    getTreeIndex () {
      var data = this.$refs.listTree.getSelectedNodes()
      if (data.length === 0) {
        alert('请选择要查看的信息')
        return
      }
      /* 如果不是创建账号/审核账号/具有查看详情权限 */
      if (!(('equipment.read_partstypedefinitionmodel' in this.permissions) || (data[0].auditor === this.username) || (data[0].create_user === this.username))) {
        alert('当前账号不具备查看详情权限')
        return
      }
      if (data[0].state !== '使用中') {
        alert('当前信息不可查看详情,如需查看过请转至(列表模式)')
        return
      }
      this.showDetailView(data[0].id)
    },
    /* 改变列表显示模式 */
    changeMode () {
      if (this.showTree === false) {
        this.showTree = true
        this.btTitle = '列表模式'
        this.showListTreeView()
      } else {
        this.showTree = false
        this.btTitle = '树状模式'
        this.showListView()
      }
    },
    /* 显示详情视图 */
    showDetailView (id) {
      this.detail = [] // 清空详情数据
      this.alterData = []// 清空审核数据
      this.parent = {}
      var self = this
      this.$axios.get(`equipment/partsType/` + id).then(function (response) {
        self.detail = response.data
        self.parent = self.detail.parent
        self.showViewid = 'detail'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 改变数据项状态 */
    changeState (state) {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.formItem.state = state
      this.$axios.patch(`equipment/partsType/` + self.detail.id + '/', {
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
      this.$axios.get(`equipment/partsType/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.classes = response.data.classes
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.alterList = response.data.alter
        if (response.data.attach_attribute !== null) {
          self.formItem.attach_attribute = response.data.attach_attribute.split(';')
        } else { self.formItem.attach_attribute = [] }
        if (response.data.parent !== null) {
          self.formItem.parent = response.data.parent.id
        } else { self.formItem.parent = response.data.parent }
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
        self.showViewid = 'update'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
      this.$axios.post(`equipment/file/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {'id': response.data.id,
          'fileName': self.fileItem.fileName,
          'fileUrl': response.data.file,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.fileItem.file = null
        self.fileItem.desc = ''
        self.formItem.file.push(response.data.id)
        self.fileData.push(obj)
        alert(self.fileItem.fileName + '文件提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },

    fileBeforeUpload (event) {
      this.fileItem.file = event.target.files[0]
      this.fileItem.fileName = event.target.files[0].name
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
      this.$axios.post(`equipment/alterRecord/`, {
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
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`equipment/partsType/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        classes: self.formItem.classes,
        parent: self.formItem.parent,
        attach_attribute: self.formItem.attach_attribute.join(';'),
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        alert('数据保存成功')
      }).catch(function (error) {
        if (error.request) {
          alert(error.request.response)
        } else {
          console.log('Error', error.message)
        }
      })
    },
    /* 更新表单数据 */
    update () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`equipment/partsType/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        classes: self.formItem.classes,
        parent: self.formItem.parent,
        attach_attribute: self.formItem.attach_attribute.join(';'),
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        alert('数据保存成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 保存并提交表单数据 */
    saveAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`equipment/partsType/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        classes: self.formItem.classes,
        parent: self.formItem.parent,
        attach_attribute: self.formItem.attach_attribute.join(';'),
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`equipment/partsType/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          alert('数据提交成功')
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      }).catch(function (error) {
        if (error.request) {
          alert(error.request.response)
        } else {
          console.log('Error', error.message)
        }
      })
    },
    /* 更新并提交表单数据 */
    updateAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`equipment/partsType/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        classes: self.formItem.classes,
        parent: self.formItem.parent,
        attach_attribute: self.formItem.attach_attribute.join(';'),
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`equipment/partsType/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
          alert('数据提交成功')
          self.showViewid = 'list'
        }).catch(function (err) {
          if (err.request) {
            alert(err.request.response)
          } else {
            console.log('Error', err.message)
          }
        })
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    }
  },
  created () {
    this.userinfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.showListView()
    }).catch(function (err) {
      if (err.request) {
        alert(err.request.response)
      } else {
        console.log('Error', err.message)
      }
    })
  },
  mounted () {
    this.attach_attributes = this.$store.getters.getConfig.attach_attribute.配件信息
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
      return 'equipment.add_partstypedefinitionmodel' in this.permissions
    },
    canRead () {
      return 'equipment.read_partstypedefinitionmodel' in this.permissions
    }

  },
  watch: {
    formItem: {
      deep: true
    },
    /* 监控用户选择的类别变化时,更新父类信息 */
    'formItem.classes': function (newval, oldval) {
      var self = this
      switch (newval) {
        case '一级类别':
          self.list = []
          self.formItem.parent = ''
          break
        case '二级类别':
          this.$axios.get('equipment/partsType/?state=使用中&classes=一级类别&auditor=&create_user=&page_size=99999&ordering=-id').then(function (response) {
            self.list = response.data.results
          }).catch(function (err) {
            if (err.request) {
              alert(err.request.response)
            } else {
              console.log('Error', err.message)
            }
          })
          break
        case '三级类别':
          this.$axios.get('equipment/partsType/?state=使用中&classes=二级类别&auditor=&create_user=&page_size=99999&ordering=-id').then(function (response) {
            self.list = response.data.results
          }).catch(function (err) {
            if (err.request) {
              alert(err.request.response)
            } else {
              console.log('Error', err.message)
            }
          })
          break
        case '四级类别':
          this.$axios.get('equipment/partsType/?state=使用中&classes=三级类别&auditor=&create_user=&page_size=99999&ordering=-id').then(function (response) {
            self.list = response.data.results
          }).catch(function (err) {
            if (err.request) {
              alert(err.request.response)
            } else {
              console.log('Error', err.message)
            }
          })
          break
      }
    },
    /* 监控信息状态改变时,更新操作按钮状态 */
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
<style scoped>
  .partsType{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .list{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .list .modelSelect{
    position: absolute;
    top: 0;
    width: 100%;
    height: 5%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #151515;
    letter-spacing: -0.45px;
  }
  .list .modelSelect button{
    position: absolute;
    top: 10%;
    width: 8%;
    height: 80%;
    border: 1px solid #363E42;
    border-radius: 1em;
  }
  .list .listHead{
    position: absolute;
    top: 5%;
    width: 100%;
    height: 25%;
    background: rgba(255, 255, 255, 0.57);
  }
  .list .listHead .select{
    position: absolute;
    top: 0;
    width: 100%;
    height: 33%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #151515;
    letter-spacing: -0.45px;
  }
  .list .listHead .select div{
    position: relative;
    top: 0;
    width: 20%;
    height: 100%;
    margin-right: 2%;
    font-family: AppleSystemUIFont;
    float: left;
  }
  .list .listHead .select select{
    position: absolute;
    width: 60%;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .list .listHead .select input{
    position: absolute;
    width: 90%;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .list .listHead .select button{
    position: absolute;
    right: 0;
    width: 40%;
    border-radius: 1em;
    border: none;
    border: 1px solid #D8D8D8;
    background: #D8D8D8;
    border-radius: 1em;
  }
  .list .button{
    position: absolute;
    top: 66%;
    width: 100%;
    height: 20%;
    margin-left: 30%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #151515;
    letter-spacing: -0.45px;
  }
  .list .ordering{
    position: absolute;
    top: 86%;
    width: 100%;
    height: 14%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #ffffff;
    letter-spacing: -0.45px;
    background: #dcdcdc;
  }
  .list .listHead  .ordering div{
    position: relative;
    top: 0;
    width: 10%;
    height: 100%;
    float: left;
  }
  .list .button button{
    width: 15em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .list .listTable{
    position: absolute;
    top: 30%;
    width: 100%;
    height: 70%;
  }
  .list .listTable .table{
    height: 90%;
    width: 100%;
    overflow: auto;
  }
  .list .listTable .table table{
    height: 100%;
    width: 100%;
        /*table-layout: fixed;*/
    empty-cells:hide;
  }
  .list .listTable .table  th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.45px;
    background: #191A1E;
  }
  .list .listTable .table  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.4em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }

  .list .listTable .page{
    position: absolute;
    right: 5%;
    bottom: 0;
    height: 10%;
    font-size: 0.3em;
    line-height: 2em;
  }
  .list .listTable button{
    position: relative;
    width: 20em;
    font-size: 0.3em;
    line-height: 2em;
    border: 1px solid #363E42;
    border-radius: 1em;
  }
  .list .listTree{
    position: absolute;
    top: 10%;
    width: 100%;
    height: 90%;
  }
  .list .listTree .tree{
    position: absolute;
    top: 0;
    width: 100%;
    height: 70%;
    overflow: auto;
  }
  .list .listTree .button{
    position: absolute;
    top: 75%;
    width: 100%;
    height: 20%;
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
    letter-spacing: -0.45px;
    overflow: auto;
    background: rgba(255, 255, 255, 0.57);
  }
  .detail table{
    height: 30%;
    width: 100%;
        /*table-layout: fixed;*/
    empty-cells:hide;
  }
  .detail  th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.45px;
    background: #191A1E;
  }
  .detail  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.4em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }
  .detail .alter{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 10%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    line-height: 2em;
    color: #000000;
    letter-spacing: -0.45px;
    background: #4d5669;
  }
  .detail .alter textarea{
    position: absolute;
    width: 60%;
    height: 100%;
    left: 5em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .detail .alter button{
    position: absolute;
    bottom: 40%;
    right: 15%;
    width: 6em;
    font-size: 0.5em;
    line-height: 2em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
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
  .create{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .create form{
    position: absolute;
    top: 0;
    left: 2%;
    width: 80%;
    height: 90%;
    font-family: PingFangSC-Regular;
    font-size: 0.5em;
    color: #151515;
    letter-spacing: -0.45px;
    overflow: auto;
  }
  .create form div{
    position: relative;
    width: 50%;
    height: 12%;
    float: left;
  }
  .create form div select,.create form div input,.create form div textarea{
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
  .create form div span{
    position: absolute;
    width: 15em;
    right: 6em;
    font-family: AppleSystemUIFont;
    padding-left: 2em;
    font-size: 0.6em;
    color: #f5222d;
    display: block;
  }
 .create .child {
    position: relative;
    width: 100%;
    height: 20%;
    float: left;
    background: #4d5669;
  }
  .create .child form{
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 1%;
    overflow: auto;
  }
  .create .child div{
    position: relative;
    width: 50%;
    height: 30%;
    font-size: 1.5em;
    float: left;
  }
  .create .child select,.create .child input,.create .child textarea{
    position: absolute;
    width: 60%;
    height: 80%;
    right: 4em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .create .annex{
    position: relative;
    width: 45%;
    height: 30%;
    margin-right: 5%;
    background: #4d5669;
    float: left;
  }
  .create .annex ul{
    position: absolute;
    top: 5%;
    left: 2.5em;
    right: 10%;
    height: 35%;
    margin-left: 2em;
    background: #ffffff;
    overflow: auto;
  }
  .create .annex ul li{
    position: relative;
    width: 80%;
    height: 2em;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1em;
  }
  .create .annex input{
    position: absolute;
    top: 45%;
    left: 10%;
    width: 80%;
    height: 15%;
    margin: 0;
    padding: 0;
    border: none;
    background: #ffffff;
    border-radius: 1em;
  }
  .create .annex textarea {
    position: absolute;
    top: 65%;
    left: 10%;
    width: 80%;
    height: 15%;
    padding-left: 2em;
    background: #ffffff;
    overflow: auto;
  }
  .create .annex button{
    position: absolute;
    bottom: 0.2em;
    width: 6em;
    margin: 0.2em;
    font-size: 0.8em;
    line-height: 2em;
    background: #2d59ff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .create table{
    width: 100%;
        /*table-layout: fixed;*/
    empty-cells:hide;
  }
  .create  th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 1em;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.45px;
    background: #191A1E;
  }
  .create  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.8em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }
  .create .button{
    position: absolute;
    top: 90%;
    width: 100%;
    height: 10%;
    float: left;
  }
  .create .button button{
    width: 12em;
    margin: 0.2em;
    font-size: 0.4em;
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
    letter-spacing: -0.45px;
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
 .update .child {
    position: relative;
    width: 100%;
    height: 20%;
    float: left;
    background: #4d5669;
  }
  .update .child form{
    position: absolute;
    width: 100%;
    height: 100%;
    padding-top: 1%;
    overflow: auto;
  }
  .update .child div{
    position: relative;
    width: 50%;
    height: 30%;
    font-size: 1.5em;
    float: left;
  }
  .update .child select,.update .child input,.update .child textarea{
    position: absolute;
    width: 60%;
    height: 80%;
    right: 4em;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .update .annex{
    position: relative;
    width: 45%;
    height: 30%;
    margin-right: 5%;
    background: #4d5669;
    float: left;
  }
  .update .annex ul{
    position: absolute;
    top: 5%;
    left: 2.5em;
    right: 10%;
    height: 35%;
    margin-left: 2em;
    background: #ffffff;
    overflow: auto;
  }
  .update .annex ul li{
    position: relative;
    width: 80%;
    height: 2em;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1em;
  }
  .update .annex input{
    position: absolute;
    top: 45%;
    left: 10%;
    width: 80%;
    height: 15%;
    margin: 0;
    padding: 0;
    border: none;
    background: #ffffff;
    border-radius: 1em;
  }
  .update .annex textarea {
    position: absolute;
    top: 65%;
    left: 10%;
    width: 80%;
    height: 15%;
    padding-left: 2em;
    background: #ffffff;
    overflow: auto;
  }
  .update .annex button{
    position: absolute;
    bottom: 0.2em;
    width: 6em;
    margin: 0.2em;
    font-size: 0.8em;
    line-height: 2em;
    background: #2d59ff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .update table{
    width: 100%;
        /*table-layout: fixed;*/
    empty-cells:hide;
  }
  .update  th{
    position: sticky;
    top:0;
    height: 2em;
    font-family: PingFangSC-Regular;
    font-size: 1em;
    color: #ffffff;
    text-align: center;
    letter-spacing: -0.45px;
    background: #191A1E;
  }
  .update  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.8em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
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
</style>
