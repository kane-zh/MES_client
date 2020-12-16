<template>
  <div class="productData">
    <!-- 列表页显示-->
    <div  class="list"  v-if="showViewid==='list'">
      <div class="listHead">
        <form class="select">
          <div>创建账号:
            <select v-model="selectItem.create_user" placeholder="请选择创建账号" >
              <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>分类:
            <select v-model="selectItem.type" placeholder="请选择分类"      >
              <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
            </select>
          </div>
          <div>任务分类:
            <select v-model="selectItem.taskType" placeholder="请选择任务分类"      >
              <option v-for="item in taskType" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
            </select>
          </div>
          <div>产品分类:
            <select v-model="selectItem.productType" placeholder="请选择产品分类"      >
              <option v-for="item in productType" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
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
               <button type="button" @click="select" >搜索</button>
            </div>
            <div>
              <button type="button" @click="showListView" style="background: #FCC400;border: none;left: 0">重置</button>
            </div>
        </form>
        <div class="button" >
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加过程数据</button>
        </div>

      </div>
      <div class="listTable">
          <div class="table">
            <table >
              <tr align="center"  type="height:2em">
                <th>序号</th>
                <th>分类</th>
                <th>产品分类</th>
                <th>产品</th>
                <th>任务分类</th>
                <th>任务</th>
                <th>批次号</th>
                <th>序列号</th>
                <th>时间</th>
                <th>创建账号</th>
                <th>操作</th>
              </tr>
              <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
                <td>{{index}}</td>
                <td>{{item.type.name+"("+item.type.code+")"}}</td>
                <td>{{item.productType_name+"("+item.productType_code+")"}}</td>
                <td>{{item.product_name+"("+item.product_code+")"}}</td>
                <td>{{item.taskType_name+"("+item.taskType_code+")"}}</td>
                <td>{{item.task_name+"("+item.task_code+")"}}</td>
                <td>{{item.batch}}</td>
                <td>{{item.sn}}</td>
                <td>{{item.dataTime}}</td>
                <td>{{item.create_user}}</td>
                <td>
                  <button type="button" @click="showDetailView(item.id)" v-if="item.create_user===username ||
                  canRead===true">详情</button>
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
    <!--   /*详情页显示*/-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="content">
        <ul>
          <li>{{"分类:"+"&#12288;"+type.name+"("+type.code+")"}}</li>
          <li>{{"产品分类:"+"&#12288;"+detail.productType_name+"("+detail.productType_code+")"}}</li>
          <li>{{"产品:"+"&#12288;"+detail.product_name+"("+detail.product_code+")"}}</li>
          <li>{{"任务分类:"+"&#12288;"+detail.taskType_name+"("+detail.taskType_code+")"}}</li>
          <li>{{"任务:"+"&#12288;"+detail.task_name+"("+detail.task_code+")"}}</li>
          <li>{{"批次号:"+"&#12288;"+detail.batch}}</li>
          <li>{{"序列号:"+"&#12288;"+detail.sn}}</li>
          <li>{{"人员信息:"+"&#12288;"+detail.personnel}}</li>
          <li>{{"设备信息:"+"&#12288;"+detail.equipment}}</li>
          <li>{{"物料信息:"+"&#12288;"+detail.material}}</li>
          <li>{{"工序信息:"+"&#12288;"+detail.station}}</li>
          <li>{{"质检信息:"+"&#12288;"+detail.quality}}</li>
          <li v-if="attribute_title.attribute1!==''">{{attribute_title.attribute1 +":"+"&#12288;"+detail.attribute1}}</li>
          <li v-if="attribute_title.attribute2!==''">{{attribute_title.attribute2 +":"+"&#12288;"+detail.attribute2}}</li>
          <li v-if="attribute_title.attribute3!==''">{{attribute_title.attribute3 +":"+"&#12288;"+detail.attribute3}}</li>
          <li v-if="attribute_title.attribute4!==''">{{attribute_title.attribute4 +":"+"&#12288;"+detail.attribute4}}</li>
          <li v-if="attribute_title.attribute5!==''">{{attribute_title.attribute5 +":"+"&#12288;"+detail.attribute5}}</li>
          <li v-if="attribute_title.attribute6!==''">{{attribute_title.attribute6 +":"+"&#12288;"+detail.attribute6}}</li>
          <li v-if="attribute_title.attribute7!==''">{{attribute_title.attribute7 +":"+"&#12288;"+detail.attribute7}}</li>
          <li v-if="attribute_title.attribute8!==''">{{attribute_title.attribute8 +":"+"&#12288;"+detail.attribute8}}</li>
          <li v-if="attribute_title.attribute9!==''">{{attribute_title.attribute9 +":"+"&#12288;"+detail.attribute9}}</li>
          <li v-if="attribute_title.attribute10!==''">{{attribute_title.attribute10 +":"+"&#12288;"+detail.attribute10}}</li>
          <li v-if="attribute_title.attribute11!==''">{{attribute_title.attribute11 +":"+"&#12288;"+detail.attribute11}}</li>
          <li v-if="attribute_title.attribute12!==''">{{attribute_title.attribute12 +":"+"&#12288;"+detail.attribute12}}</li>
          <li v-if="attribute_title.attribute13!==''">{{attribute_title.attribute13 +":"+"&#12288;"+detail.attribute13}}</li>
          <li v-if="attribute_title.attribute14!==''">{{attribute_title.attribute14 +":"+"&#12288;"+detail.attribute14}}</li>
          <li v-if="attribute_title.attribute15!==''">{{attribute_title.attribute15 +":"+"&#12288;"+detail.attribute15}}</li>
          <li v-if="attribute_title.attribute16!==''">{{attribute_title.attribute16 +":"+"&#12288;"+detail.attribute16}}</li>
          <li v-if="attribute_title.attribute17!==''">{{attribute_title.attribute17 +":"+"&#12288;"+detail.attribute17}}</li>
          <li v-if="attribute_title.attribute18!==''">{{attribute_title.attribute18 +":"+"&#12288;"+detail.attribute18}}</li>
          <li v-if="attribute_title.attribute19!==''">{{attribute_title.attribute19 +":"+"&#12288;"+detail.attribute19}}</li>
          <li v-if="attribute_title.attribute20!==''">{{attribute_title.attribute20 +":"+"&#12288;"+detail.attribute20}}</li>
          <li>{{"创建账号:"+"&#12288;"+detail.create_user}}</li>
          <li>{{"记录时间:"+"&#12288;"+detail.dataTime}}</li>
          <li>{{"创建时间:"+"&#12288;"+detail.create_time}}</li>
          <li>{{"备注信息:"+"&#12288;"+detail.desc}}</li>
        </ul>
        <dl>
          <dt>文件附件:</dt>
          <template v-for="(value,id) in detail.file">
            <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
          </template>
        </dl>
      </div>
       <div class="button">
         <button type="button" @click="removeData(detail.id)" v-if="is_superuser===true||canRead===true" >删除</button>
        <button type="button" @click="showViewid='list'">返回列表页</button>
      </div>
    </div>
    <!--    /*创建页显示*/-->
    <div  class="create"  v-show="showViewid==='create'">
      <form >
        <div>分类:
          <select v-model="formItem.type"   placeholder="请选择分类">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
          <span class="message" v-if="!$v.formItem.type.required">请选择分类</span>
        </div>
        <div>任务分类:
          <select v-model="formItem.taskType" >
            <option v-for="item in taskType" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
          </select>
        </div>
        <div>任务信息:
          <select v-model="formItem.task" >
            <option v-for="item in taskInfor" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
          </select>
        </div>
<!--        <div>产品分类:-->
<!--          <select v-model="formItem.productType" >-->
<!--            <option v-for="item in productType" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div>产品信息:-->
<!--          <select v-model="formItem.product" >-->
<!--            <option v-for="item in productInfor" :value="item.id" :key="item.id">{{item.name + item.code}}</option>-->
<!--          </select>-->
        <div>产品信息:
          <select v-model="formItem.product" >
            <option v-for="(item,index) in productInfor1" :value="item.product_id" :key="index">{{item.product_name +"("+ item.product_code+")"}}</option>
          </select>
        </div>
        <div>批次号:
          <input v-model="formItem.batch"  placeholder="请输入批次号...">
        </div>
        <div>序列号:
          <input v-model="formItem.sn"  placeholder="请输入序列号...">
        </div>
        <div >人员信息:
          <textarea v-model="formItem.personnel" placeholder="请输入当前的人员信息..."></textarea>
        </div>
        <div >设备信息:
          <textarea v-model="formItem.equipment" placeholder="请输入当前的设备信息..."></textarea>
        </div>
        <div >物料信息:
          <textarea v-model="formItem.material" placeholder="请输入当前的物料信息..."></textarea>
        </div>
        <div >工序信息:
          <textarea v-model="formItem.station" placeholder="请输入当前的工序信息..."></textarea>
        </div>
        <div >质检信息:
          <textarea v-model="formItem.quality" placeholder="请输入当前的质检信息..."></textarea>
        </div>
        <div>记录时间:
          <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间">
          <span class="message" v-if="!$v.formItem.dataTime.required">请选择日期</span>
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
        <div v-show="attribute_title.attribute6!==''">{{attribute_title.attribute6}}
          <input v-model="formItem.attribute6"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute7!==''">{{attribute_title.attribute7}}
          <input v-model="formItem.attribute7"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute8!==''">{{attribute_title.attribute8}}
          <input v-model="formItem.attribute8"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute9!==''">{{attribute_title.attribute9}}
          <input v-model="formItem.attribute9"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute10!==''">{{attribute_title.attribute10}}
          <input v-model="formItem.attribute10"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute11!==''">{{attribute_title.attribute11}}
          <input v-model="formItem.attribute11"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute12!==''">{{attribute_title.attribute12}}
          <input v-model="formItem.attribute12"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute13!==''">{{attribute_title.attribute13}}
          <input v-model="formItem.attribute13"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute14!==''">{{attribute_title.attribute14}}
          <input v-model="formItem.attribute14"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute15!==''">{{attribute_title.attribute15}}
          <input v-model="formItem.attribute15"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute16!==''">{{attribute_title.attribute16}}
          <input v-model="formItem.attribute16"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute17!==''">{{attribute_title.attribute17}}
          <input v-model="formItem.attribute17"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute18!==''">{{attribute_title.attribute18}}
          <input v-model="formItem.attribute18"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute19!==''">{{attribute_title.attribute19}}
          <input v-model="formItem.attribute19"  placeholder="...">
        </div>
        <div v-show="attribute_title.attribute20!==''">{{attribute_title.attribute20}}
          <input v-model="formItem.attribute20"  placeholder="...">
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
        <button type="button" @click="showViewid='list'">返回列表页</button>
      </div>
    </div>
  </div>
</template>
<script>
import {required} from 'vuelidate/lib/validators'
export default {
  name: 'productData',
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
        state: '',
        ordering: '',
        productType: '',
        taskType: '',
        product: '',
        task: '',
        create_user: '',
        type: '',
        searchValue: '',
        start_time: '',
        stop_time: ''
      },

      /* 详情页数据 */
      detail: [],
      type: {},
      personnel: {},
      level: {},
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'productData'
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
        type: null,
        productType: null,
        product: null,
        taskType: null,
        task: null,
        batch: '',
        sn: '',
        personnel: '',
        equipment: '',
        material: '',
        station: '',
        quality: '',
        dataTime: '',
        file: [],
        alter: [],
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        attribute6: '',
        attribute7: '',
        attribute8: '',
        attribute9: '',
        attribute10: '',
        attribute11: '',
        attribute12: '',
        attribute13: '',
        attribute14: '',
        attribute15: '',
        attribute16: '',
        attribute17: '',
        attribute18: '',
        attribute19: '',
        attribute20: '',
        desc: '',
        auditor: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'productData'
      },
      fileData: [],
      /* 产品分类信息 */
      productType: [],
      /* 产品信息 */
      productInfor: [],
      productInfor1: [],
      /* 任务分类信息 */
      taskType: [],
      /* 任务信息 */
      taskInfor: [],
      /* 过程数据分类信息 */
      typeInfor: [],
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
        attribute10: '',
        attribute11: '',
        attribute12: '',
        attribute13: '',
        attribute14: '',
        attribute15: '',
        attribute16: '',
        attribute17: '',
        attribute18: '',
        attribute19: '',
        attribute20: ''
      }

    }
  },
  validations: {
    formItem: {
      type: {
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
      this.$axios.get('production/productData/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('production/productData/?create_user=' + self.selectItem.create_user +
              '&productType_code=' + self.selectItem.productType +
              '&taskType_code=' + self.selectItem.taskType +
              '&product_id=' + self.selectItem.product +
              '&task_id=' + self.selectItem.task +
              '&type=' + self.selectItem.type +
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
    /* 显示详情视图 */
    showDetailView (id) {
      this.detail = [] // 清空详情数据
      this.alterData = []// 清空审核数据
      this.type = {}
      var self = this
      this.$axios.get(`production/productData/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.formItem.type = self.detail.type.id
        self.showViewid = 'detail'
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
      this.$axios.post(`production/file/`, formData,
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
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`production/productData/`, {
        type: self.formItem.type,
        product_id: self.formItem.product,
        task_id: self.formItem.task,
        batch: self.formItem.batch,
        sn: self.formItem.sn,
        personnel: self.formItem.personnel,
        equipment: self.formItem.equipment,
        material: self.formItem.material,
        station: self.formItem.station,
        quality: self.formItem.quality,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        attribute6: self.formItem.attribute6,
        attribute7: self.formItem.attribute7,
        attribute8: self.formItem.attribute8,
        attribute9: self.formItem.attribute9,
        attribute10: self.formItem.attribute10,
        attribute11: self.formItem.attribute11,
        attribute12: self.formItem.attribute12,
        attribute13: self.formItem.attribute13,
        attribute14: self.formItem.attribute14,
        attribute15: self.formItem.attribute15,
        attribute16: self.formItem.attribute16,
        attribute17: self.formItem.attribute17,
        attribute18: self.formItem.attribute18,
        attribute19: self.formItem.attribute19,
        attribute20: self.formItem.attribute20,
        desc: self.formItem.desc
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
    /* 保存表单数据 */
    removeData (id) {
      if (!confirm('确认删除??')) {
        return
      }
      var self = this
      this.$axios.delete((`production/productData/` + id), {
      }).then(function (response) {
        self.showListView()
        alert('数据删除成功')
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
    this.userinfor = []
    this.typeInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.$axios.get('production/productDataType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
        self.$axios.get('process/productType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.productType = response.data.results
          self.$axios.get('plan/productTaskType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
            self.taskType = response.data.results
            self.showListView()
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
      return 'production.add_productdatadefinitionmodel' in this.permissions
    },
    canRead () {
      return 'production.read_productdatadefinitionmodel' in this.permissions
    },
    canDelete () {
      return 'production.delete_productdatadefinitionmodel' in this.permissions
    }

  },
  watch: {
    formItem: {
      deep: true
    },
    /* 监控用户选择的类别变化时,更新附加属性标题 */
    'formItem.type': function (newval, oldval) {
      var self = this
      for (let key in self.attribute_title) {
        self.attribute_title[key] = ''
      }
      if (newval === undefined) {
        return
      }
      this.$axios.get(`production/productDataType/` + newval).then(function (response) {
        if (response.data.attach_attribute !== null) {
          var result = response.data.attach_attribute.split(';')
          if (result.length > 0) {
            result.forEach(function (value, i) {
              var data = value.split(':')
              if (data.length === 2) {
                self.attribute_title[data[0]] = data[1]
              }
            })
          }
        }
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /**/
    'formItem.productType': function (newval, oldval) {
      var self = this
      this.productInfor = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`process/productType/` + newval).then(function (response) {
        self.productInfor = response.data.productType_item
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    'formItem.taskType': function (newval, oldval) {
      var self = this
      this.taskInfor = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`plan/productTaskType/` + newval).then(function (response) {
        self.taskInfor = response.data.productTaskType_item
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    'formItem.task': function (newval, oldval) {
      var self = this
      this.productInfor1 = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`plan/productTaskCreate/` + newval).then(function (response) {
        response.data.child.forEach(function (value, i) {
          var obj
          obj = {
            batch: value.salesOrderItem.batch,
            id: value.salesOrderItem.id,
            productType_code: value.salesOrderItem.productType_code,
            productType_name: value.salesOrderItem.productType_name,
            product_code: value.salesOrderItem.product_code,
            product_id: value.salesOrderItem.product_id,
            product_name: value.salesOrderItem.product_name
          }
          self.productInfor1.push(obj)
        })
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    'formItem.product': function (newval, oldval) {
      var self = this
      if (newval === undefined) {
        return
      }
      this.productInfor1.forEach(function (value, i) {
        if (newval === value.product_id) {
          self.formItem.batch = value.batch
        }
      })
    }
  }
}
</script>
<style scoped>
  .productData{
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
  .list .listHead{
    position: absolute;
    top: 0;
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
  .list .listHead  .button{
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
  .list .listHead  .ordering{
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

  .list .button button{
    width: 15em;
    background: #ffffff;
    border: 1px solid #363E42;
    border-radius: 13px;
  }
  .list .listTable{
    position: absolute;
    top: 25%;
    width: 100%;
    height: 75%;
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
</style>
