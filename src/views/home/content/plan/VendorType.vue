<template>
  <div class="vendorType">
    <!-- 列表页显示-->
    <div  class="list">
      <div class="heard">
        <span>供应商分类</span>
      </div>
      <div class="content" >
        <div class="tree">
          <Tree :data="treeData"  ref="listTree" expand @on-select-change="getTreeIndex">
          </Tree>
        </div>
      </div>
      <div class="button">
        <button type="button" @click="showCreatView"  v-show="canCreate===true">添加供应商分类</button>
      </div>
    </div>
    <!-- 详情页显示-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="center">
        <div class="heard">
          <span>详情信息</span>
          <button type="button" @click="showListView"></button>
        </div>
        <div class="content">
          <div class="basic">
            <dt>基础信息</dt>
            <dd>{{"名称:"+"&#12288;"+detail.name}}</dd>
            <dd>{{"编码:"+"&#12288;"+detail.code}}</dd>
            <dd>{{"类别:"+"&#12288;"+detail.classes}}</dd>
            <dd>{{"状态:"+"&#12288;"+detail.state}}</dd>
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
          </div>
           <div class="file">
            <dt>文件附件</dt>
            <dd v-for="(value,id) in detail.file" :key="id">
              <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
            </dd>
          </div>
<!--          <div class="item" v-show ="detail.vendorType_item!==undefined && detail.vendorType_item.length > 0">-->
<!--            <dt>包含内容</dt>-->
<!--            <table >-->
<!--              <tr align="center"  type="height:2em">-->
<!--                <th>序号</th>-->
<!--                <th>名称</th>-->
<!--                <th>编码</th>-->
<!--                <th>状态</th>-->
<!--              </tr>-->
<!--              <tr align="center" v-for="(item,index) in detail.vendorType_item" :key="item.id" type="height:1em" >-->
<!--                <td>{{index}}</td>-->
<!--                <td>{{item.name}}</td>-->
<!--                <td>{{item.code}}</td>-->
<!--                <td>{{item.state}}</td>-->
<!--              </tr>-->
<!--              <tr>-->

<!--              </tr>-->
<!--            </table>-->
<!--          </div>-->
        </div>
        <div class="button">
          <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
          <button type="button" @click="changeState('使用中')" v-show="showApprovedBt===true" >通过审核</button>
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
              <span class="message" v-show ="!$v.formItem.code.required">编码不能为空</span>
              <span class="message" v-show ="!$v.formItem.code.minLength">最少长度为2</span>
              <span class="message" v-show ="!$v.formItem.code.maxLength">最大长度位32</span>
            </div>
            <div>类别:
              <select v-model="formItem.classes"  placeholder="请选择类别"   >
                <option value="一级类别">一级类别</option>
                <option value="二级类别">二级类别</option>
                <option value="三级类别">三级类别</option>
                <option value="四级类别">四级类别</option>
              </select>
              <span class="message" v-show ="!$v.formItem.classes.required">请选择类别</span>
            </div>
            <div v-show="formItem.classes==='二级类别'||formItem.classes==='三级类别'||formItem.classes==='四级类别'">上级类别:
              <select v-model="formItem.parent"   placeholder="请选择上级类别" >
                <option v-for="item in list" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.parent.required">请选择父类别</span>
            </div>
            <div v-show="formItem.classes==='一级类别'||formItem.classes===''">
            </div>
            <div>审核账号:
              <select v-model="formItem.auditor"  placeholder="请选择审核账号">
                <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.auditor.required">请选择审核账号</span>
            </div>
            <div>附加属性:
              <select v-model="formItem.attach_attribute"  placeholder="请选择附加属性"  style="height: 90%"  multiple="true">
                <option v-for="(value,key,id) in attach_attributes" :value="key+':'+value" :key="id">{{value}}</option>
              </select>
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
            <div>类别:
              <select v-model="formItem.classes"  placeholder="请选择类别"   >
                <option value="一级类别">一级类别</option>
                <option value="二级类别">二级类别</option>
                <option value="三级类别">三级类别</option>
                <option value="四级类别">四级类别</option>
              </select>
              <span class="message" v-show ="!$v.formItem.classes.required">请选择类别</span>
            </div>
            <div v-show="formItem.classes==='二级类别'||formItem.classes==='三级类别'||formItem.classes==='四级类别'">上级类别:
              <select v-model="formItem.parent"   placeholder="请选择上级类别" >
                <option v-for="item in list" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.parent.required">请选择父类别</span>
            </div>
            <div v-show="formItem.classes==='一级类别'||formItem.classes===''">
            </div>
            <div>审核账号:
              <select v-model="formItem.auditor"  placeholder="请选择审核账号">
                <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.auditor.required">请选择审核账号</span>
            </div>
            <div>附加属性:
              <select v-model="formItem.attach_attribute"  placeholder="请选择附加属性"  style="height: 90%"  multiple="true">
                <option v-for="(value,key,id) in attach_attributes" :value="key+':'+value" :key="id">{{value}}</option>
              </select>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'vendorType',
  components: {

  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      /* 列表页数据 */
      list: [],
      treeData: [],
      /* 详情页数据 */
      detail: [],
      parent: {},
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
        desc: '',
        auditor: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'vendorType'
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
      },
      parent: {
        required
      }
    }
  },
  methods: {
    /* 显示列表视图 */
    showListView: function () {
      this.treeData = []
      var self = this
      this.$axios.get('plan/vendorTypes/').then(function (response) {
        self.transformToTree(response.data)
        self.showViewid = 'list'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 将数据转换成树形结构数据格式 */
    transformToTree (data) {
      /* 遍历第一层,给第一层添加数据 */
      for (let l1 = 0; l1 < data.length; l1++) {
        /* 遍历第二层,给第一层子项添加数据 */
        let children1 = []
        let data2 = data[l1].vendorType_child
        for (let l2 = 0; l2 < data2.length; l2++) {
          /* 遍历第三层,给第二层子项添加数据 */
          let children2 = []
          let data3 = data2[l2].vendorType_child
          for (let l3 = 0; l3 < data3.length; l3++) {
            /* 遍历第四层,给第三层子项添加数据 */
            let children3 = []
            let data4 = data3[l3].vendorType_child
            for (let l4 = 0; l4 < data4.length; l4++) {
              children3.push({
                'id': data4[l4].id,
                expand: true,
                'state': data4[l4].state,
                'auditor': data4[l4].auditor,
                'create_user': data4[l4].create_user,
                'title': data4[l4].name + '(' + data4[l4].code + ')',
                'disableCheckbox': true
              })
            }
            children2.push({
              'id': data3[l3].id,
              expand: true,
              'state': data3[l3].state,
              'auditor': data3[l3].auditor,
              'create_user': data3[l3].create_user,
              'title': data3[l3].name + '(' + data3[l3].code + ')',
              'children': children3,
              'disableCheckbox': true
            })
          }
          children1.push({
            'id': data2[l2].id,
            expand: true,
            'state': data2[l2].state,
            'auditor': data2[l2].auditor,
            'create_user': data2[l2].create_user,
            'title': data2[l2].name + '(' + data2[l2].code + ')',
            'children': children2,
            'disableCheckbox': true
          })
        }
        this.treeData.push({
          'id': data[l1].id,
          expand: true,
          'state': data[l1].state,
          'auditor': data[l1].auditor,
          'create_user': data[l1].create_user,
          'title': data[l1].name + '(' + data[l1].code + ')',
          'children': children1,
          'disableCheckbox': true
        })
      }
    },
    /* 获取树结构id */
    getTreeIndex () {
      var data = this.$refs.listTree.getSelectedNodes()
      if (data.length === 0) {
        return
      }
      if (!(('plan.read_vendortypedefinitionmodel' in this.permissions) || (data[0].auditor === this.username) || (data[0].create_user === this.username))) {
        alert('当前账号不具备查看详情权限')
        return
      }
      this.showDetailView(data[0].id)
    },
    /* 显示详情视图 */
    showDetailView (id) {
      this.detail = [] // 清空详情数据
      this.parent = {}
      var self = this
      this.$axios.get(`plan/vendorType/` + id).then(function (response) {
        self.detail = response.data
        self.parent = self.detail.parent
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
      this.$axios.patch(`plan/vendorType/` + self.detail.id + '/', {
        state: self.formItem.state
      }).then(function (response
      ) {
        self.detail.state = self.formItem.state
        self.formItem.state = ''
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
      this.fileData = []
      var self = this
      this.$axios.get(`plan/vendorType/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.classes = response.data.classes
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        if (response.data.attach_attribute !== null) {
          self.formItem.attach_attribute = response.data.attach_attribute.split(';')
        } else {
          self.formItem.attach_attribute = []
        }
        if (response.data.parent !== null) {
          self.formItem.parent = response.data.parent.id
        } else {
          self.formItem.parent = response.data.parent
        }
        response.data.file.forEach(function (value, i) {
          var obj = {
            'id': value.id,
            'fileName': value.file_name,
            'fileUrl': value.file,
            'desc': value.desc,
            'uri': value.uri
          }
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
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
      this.$axios.post(`plan/file/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {
          'id': response.data.id,
          'fileName': self.fileItem.fileName,
          'fileUrl': response.data.file,
          'desc': response.data.desc,
          'uri': response.data.uri
        }
        self.fileItem.fileName = ''
        self.fileItem.file = null
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
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`plan/vendorType/`, {
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
      this.$axios.put(`plan/vendorType/` + self.formItem.id + '/', {
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
      this.$axios.post(`plan/vendorType/`, {
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
        self.$axios.patch(`plan/vendorType/` + response.data.id + '/', {
          state: '审核中'
        }).then(function (response
        ) {
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
      this.$axios.put(`plan/vendorType/` + self.formItem.id + '/', {
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
        self.$axios.patch(`plan/vendorType/` + response.data.id + '/', {
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
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.showListView()
    }).catch(function (err) {
      // 错误提示
      console.log(err)
    })
  },
  mounted () {
    this.attach_attributes = this.$store.getters.getConfig.attach_attribute.供应商
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
      return 'plan.add_vendortypedefinitionmodel' in this.permissions
    },
    canRead () {
      return 'plan.read_vendortypedefinitionmodel' in this.permissions
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
          this.$axios.get('plan/vendorType/?state=使用中&classes=一级类别&auditor=&create_user=&page_size=99999&ordering=-id').then(function (response) {
            self.list = response.data.results
          }).catch(function (err) {
            // 错误提示
            console.log(err)
          })
          break
        case '三级类别':
          this.$axios.get('plan/vendorType/?state=使用中&classes=二级类别&auditor=&create_user=&page_size=99999&ordering=-id').then(function (response) {
            self.list = response.data.results
          }).catch(function (err) {
            // 错误提示
            console.log(err)
          })
          break
        case '四级类别':
          this.$axios.get('plan/vendorType/?state=使用中&classes=三级类别&auditor=&create_user=&page_size=99999&ordering=-id').then(function (response) {
            self.list = response.data.results
          }).catch(function (err) {
            // 错误提示
            console.log(err)
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
<style scoped lang="scss" >
  .vendorType {
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
      .heard{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 8%;
        span{
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 0.6em;
          line-height: 1.7em;
          display: inline-block;
        }
      }
      .content {
        position: absolute;
        top: 10%;
        width: 100%;
        height: 80%;
        .tree {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
        }
      }
      .button {
        position: absolute;
        bottom: 5%;
        width: 100%;
        height: 8%;
        button {
          width: 12em;
          font-size: 0.3em;
          line-height: 3.3em;
          background: #ffffff;
          border: 1px solid #363E42;
          border-radius: 13px;
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
            dd:nth-child(6){
              width: 100%;
              display: block;
              float: left;
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
