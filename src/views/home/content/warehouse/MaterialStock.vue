<template>
  <div class="materialStock">
    <div class="modelSelect" v-show="showViewid!=='create'">
      <button type="button" @click="changeMode">{{btTitle}}</button>
    </div>
    <!-- 列表页显示-->
    <div  class="list"  v-if="showViewid==='list'">
        <div class="listHead">
          <form class="select">
            <div>仓库:
              <select v-model="selectItem.warehouse" placeholder="请选择仓库"      >
                <option v-for="item in warehouseInfor" :value="item.code" :key="item.code">{{item.name}}</option>
              </select>
            </div>
            <div>物料类型:
              <select v-model="selectItem.materialType" placeholder="请选择物料类型"      >
                <option v-for="item in materialTypeInfor" :value="item.code" :key="item.code">{{item.name}}</option>
              </select>
            </div>
            <div>关键字:
              <input v-model="selectItem.searchValue" type="text" placeholder="  请输入要搜索的信息...">
            </div>
            <div>
              <button type="button" @click="select_list" >搜索</button>
            </div>
            <div>
              <button type="button" @click="showListView" style="background: #FCC400;border: none;left: 0">重置</button>
            </div>
          </form>
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
                <th>仓库名称</th>
                <th>仓库编码</th>
                <th>物料类型名称</th>
                <th>物料类型编码</th>
                <th>物料名称</th>
                <th>物料编码</th>
                <th>数量</th>
              </tr>
              <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
                <td>{{index}}</td>
                <td>{{item.warehouse_name}}</td>
                <td>{{item.warehouse_code}}</td>
                <td>{{item.materialType_name}}</td>
                <td>{{item.materialType_code}}</td>
                <td>{{item.material_name}}</td>
                <td>{{item.material_code}}</td>
                <td>{{item.sum}}</td>
              </tr>
              <tr>

              </tr>
            </table>
          </div>
          <div class="page">
            <div>总共：{{listCount}}</div>
            <button type="button" @click="listPre" v-if="listPreUrl!==''">上一页</button>
            <button type="button" @click="listNext" v-if="listNextUrl!==''">下一页</button>
          </div>
        </div>
      </div>
    <!-- 详情页显示-->
    <div  class="detail"  v-if="showViewid==='detail'">
      <div class="listHead">
        <form class="select">
          <div>仓库:
            <select v-model="selectItem.warehouse" placeholder="请选择仓库"      >
              <option v-for="item in warehouseInfor" :value="item.code" :key="item.code">{{item.name}}</option>
            </select>
          </div>
          <div>物料类型:
            <select v-model="selectItem.materialType" placeholder="请选择物料类型"      >
              <option v-for="item in materialTypeInfor" :value="item.code" :key="item.code">{{item.name}}</option>
            </select>
          </div>
          <div>状态:
            <select v-model="selectItem.state"  placeholder="请选择状态"    >
              <option value="使用中">使用中</option>
              <option value="完成">完成</option>
            </select>
          </div>
          <div>关键字:
            <input v-model="selectItem.searchValue" type="text" placeholder="  请输入要搜索的信息...">
          </div>
          <div>
            <button type="button" @click="select_detail" >搜索</button>
          </div>
          <div>
            <button type="button" @click="showListView" style="background: #FCC400;border: none;left: 0">重置</button>
          </div>
        </form>
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
              <th>仓库名称</th>
              <th>仓库编码</th>
              <th>仓位名称</th>
              <th>仓位编码</th>
              <th>物料类型名称</th>
              <th>物料类型编码</th>
              <th>物料名称</th>
              <th>物料编码</th>
              <th>数量</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.warehouse_name}}</td>
              <td>{{item.warehouse_code}}</td>
              <td>{{item.position_name}}</td>
              <td>{{item.position_code}}</td>
              <td>{{item.materialType_name}}</td>
              <td>{{item.materialType_code}}</td>
              <td>{{item.material_name}}</td>
              <td>{{item.material_code}}</td>
              <td>{{item.sum}}</td>
              <td>{{item.state}}</td>
              <td>
                <button type="button" @click="showCreatView(item)">管理</button>
              </td>
            </tr>
            <tr>

            </tr>
          </table>
        </div>
        <div class="page">
          <div>总共：{{listCount}}</div>
          <button type="button" @click="listPre" v-if="listPreUrl!==''">上一页</button>
          <button type="button" @click="listNext" v-if="listNextUrl!==''">下一页</button>
        </div>
      </div>
    </div>
    <!--    /*创建页显示*/-->
    <div  class="create"  v-show="showViewid==='create'">
      <form >
        <div>物料管理名称:
          <input v-model="formItem.name"  placeholder="请输入物料管理名称...">
        </div>
        <div>物料管理编码:
          <input v-model="formItem.code"  placeholder="请输入物料管理编码...">
          <span class="message" v-if="!$v.formItem.code.required">编码不能为空</span>
          <span class="message" v-if="!$v.formItem.code.minLength">最少长度为2</span>
          <span class="message" v-if="!$v.formItem.code.maxLength">最大长度位32</span>
        </div>
        <div>操作类型:
          <select v-model="formItem.type"  placeholder="请选择操作类型"   >
            <option value="增加操作">增加操作</option>
            <option value="退库操作">退库操作</option>
            <option value="出库操作">出库操作</option>
            <option value="盘点操作">盘点管理</option>
          </select>
          <span class="message" v-if="!$v.formItem.type.required">请选择类型</span>
        </div>
        <div>数量:
          <input v-model="formItem.sum" type="number" placeholder="请输入操作数量..." >
          <span class="message" v-if="!$v.formItem.sum.required">请输入数量值</span>
        </div>
        <div>操作者:
          <input v-model="formItem.handler"  placeholder="请输入操作者...">
        </div>
        <div>操作时间:
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
        <div>审核账号:
          <select v-model="formItem.auditor"  placeholder="请选择审核账号">
            <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
          </select>
          <span class="message" v-if="!$v.formItem.auditor.required">请选择审核账号</span>
        </div>
        <div >备注信息:
          <textarea v-model="formItem.desc" placeholder="请输入当前的备注信息..."></textarea>
        </div>
        <div class="annex">文件附件:
          <ul>
            <li v-for="value in fileData" v-bind:key="value.id"  @click="removeFile(value.id)">{{value.fileName}}</li>
          </ul>
          <input type="file"  @change="fileBeforeUpload"/>
          <textarea  v-model="fileItem.desc"  placeholder="请输入当前的备注信息..."></textarea>
          <button type="button" @click="uploadFile">上传</button>
        </div>
      </form>
      <div class="button">
        <button type="button" @click="save">保存数据</button>
        <button type="button" @click="saveAndSubmit">保存并提交</button>
        <button type="button" @click="showViewid='detail'">返回列表页</button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'materialStock',
  components: {},
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'detail',
      showCreate: false,
      btTitle: '列表模式',
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listPreUrl: '',
      listNextUrl: '',
      /* 列表查询参数 */
      selectItem: {
        warehouse: '',
        materialType: '',
        state: '',
        searchValue: ''
      },
      /* 列表页数据排序 */
      ordering: '-id',
      /* 详情页数据 */
      detail: [],
      warehouseInfor: [],
      materialTypeInfor: [],
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        name: '',
        code: '',
        type: '',
        position: null,
        material: null,
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
        file: null,
        fileName: '',
        desc: '',
        uri: 'materialManage'
      },
      fileData: [],
      /* 具有审核权限的账号信息 */
      userinfor: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: ''
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
      type: {
        required
      },
      sum: {
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
      this.$axios.get('warehouse/materialStockInfor/?ordering=' + self.ordering).then(function (response) {
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
    select_list () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listPreUrl = ''
      this.listNextUrl = ''
      var self = this
      this.$axios.get('warehouse/materialStockInfor/?warehouse_code=' + self.selectItem.warehouse +
              '&materialType_code=' + self.selectItem.materialType +
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
    /* 显示详情视图 */
    showDetailView: function () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listPreUrl = ''
      this.listNextUrl = ''
      for (let key in this.selectItem) {
        this.selectItem[key] = ''
      }
      var self = this
      this.$axios.get('warehouse/materialStockDetail/?ordering=' + self.ordering).then(function (response) {
        self.list = response.data.results
        self.listCount = response.data.count
        if (response.data.next !== null) {
          self.listNextUrl = response.data.next.replace(self.$axios.defaults.baseURL, '')
        }
        if (response.data.previous !== null) {
          self.listPreUrl = response.data.previous.replace(self.$axios.defaults.baseURL, '')
        }
        self.showViewid = 'detail'
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    /* 列表查询数据 */
    select_detail () {
      this.list = [] // 清空列表数据
      this.listCount = 0
      this.listPreUrl = ''
      this.listNextUrl = ''
      var self = this
      this.$axios.get('warehouse/materialStockDetail/?warehouse_code=' + self.selectItem.warehouse +
              '&materialType_code=' + self.selectItem.materialType +
              '&state=' + self.selectItem.state +
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
    /* 改变列表显示模式 */
    changeMode () {
      if (this.showViewid === 'detail') {
        this.btTitle = '详情模式'
        this.showListView()
      } else if (this.showViewid === 'list') {
        this.btTitle = '列表模式'
        this.showDetailView()
      }
    },
    /* 显示创建视图 */
    showCreatView (value) {
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
      this.formItem.batch = value.batch
      this.formItem.material = parseInt(value.material_id)
      this.formItem.position = parseInt(value.position_id)
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
      this.$axios.post(`warehouse/file/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {
          'id': response.data.id,
          'fileName': self.fileItem.fileName,
          'fileUrl': response.data.file,
          'desc': response.data.desc,
          'uri': response.data.uri
        }
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
      this.$axios.post(`warehouse/materialManage/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        batch: self.formItem.batch,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        material_id: self.formItem.material,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.showViewid = ''
        alert('数据保存成功')
      }).catch(function (error) {
        if (error.request) {
          alert(error.request.response)
        } else {
          console.log('Error', error.message)
        }
      })
    },
    /* 保存并提交表单数据 */
    saveAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`warehouse/materialManage/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        batch: self.formItem.batch,
        handler: self.formItem.handler,
        sum: self.formItem.sum,
        dataTime: self.formItem.dataTime,
        position_id: self.formItem.position,
        material_id: self.formItem.material,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/materialManage/` + response.data.id + '/', {
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
    }
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
      return 'warehouse.add_equipmentmanagemodel' in this.permissions
    },
    canRead () {
      return 'warehouse.add_equipmentmanagemodel' in this.permissions
    }

  },
  created () {
    var self = this
    this.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=物料库&state=使用中').then(function (response) {
      self.warehouseInfor = response.data.results
      self.$axios.get('process/materialType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.materialTypeInfor = response.data.results
        self.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
          self.userinfor = response.data.results
          self.showDetailView()
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
  mounted () {
    this.attribute_title = this.$store.getters.getConfig.attach_attribute.物料库存
  }
}
</script>
<style scoped>
  .materialStock{
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .modelSelect{
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
  .modelSelect button{
    position: absolute;
    top: 10%;
    width: 8%;
    height: 80%;
    border: 1px solid #363E42;
    border-radius: 1em;
  }
  .list{
    position: absolute;
    top: 5%;
    width: 100%;
    height: 95%;
  }
  .list .listHead{
    position: absolute;
    top: 0;
    width: 100%;
    height: 15%;
    background: rgba(255, 255, 255, 0.57);
  }
  .list .listHead .select{
    position: absolute;
    top: 0;
    width: 100%;
    height: 60%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #151515;
    letter-spacing: -0.45px;
  }
  .list .listHead .select div{
    position: relative;
    top: 0;
    width: 18%;
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
  .list .ordering{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 20%;
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
  .list .listTable{
    position: absolute;
    top: 15%;
    width: 100%;
    height: 85%;
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
  .list .listTable .page button{
    position: relative;
    width: 20em;
    font-size: 0.3em;
    line-height: 2em;
    border: 1px solid #363E42;
    border-radius: 1em;
  }
  .detail{
    position: absolute;
    top: 5%;
    width: 100%;
    height: 95%;
  }
  .detail .listHead{
    position: absolute;
    top: 0;
    width: 100%;
    height: 15%;
    background: rgba(255, 255, 255, 0.57);
  }
  .detail .listHead .select{
    position: absolute;
    top: 0;
    width: 100%;
    height: 40%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #151515;
    letter-spacing: -0.45px;
  }
  .detail .listHead .select div{
    position: relative;
    top: 0;
    width: 25%;
    height: 100%;
    margin-right: 2%;
    font-family: AppleSystemUIFont;
    float: left;
  }
  .detail .listHead .select select{
    position: absolute;
    width: 60%;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .detail .listHead .select input{
    position: absolute;
    width: 90%;
    border: 1px solid #D8D8D8;
    background: #ffffff;
    border-radius: 1em;
  }
  .detail .listHead .select button{
    position: absolute;
    right: 0;
    width: 40%;
    border-radius: 1em;
    border: none;
    border: 1px solid #D8D8D8;
    background: #D8D8D8;
    border-radius: 1em;
  }
  .detail .ordering{
    position: absolute;
    top: 80%;
    width: 100%;
    height: 20%;
    font-family: PingFangSC-Regular;
    font-size: 0.3em;
    line-height: 2em;
    color: #ffffff;
    letter-spacing: -0.45px;
    background: #dcdcdc;
  }
  .detail .listHead  .ordering div{
    position: relative;
    top: 0;
    width: 10%;
    height: 100%;
    float: left;
  }
  .detail .listTable{
    position: absolute;
    top: 15%;
    width: 100%;
    height: 85%;
  }
  .detail .listTable .table{
    height: 90%;
    width: 100%;
    overflow: auto;
  }
  .detail .listTable .table table{
    height: 100%;
    width: 100%;
    /*table-layout: fixed;*/
    empty-cells:hide;
  }
  .detail .listTable .table  th{
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
  .detail .listTable .table  td{
    height: 1em;
    font-family: PingFangSC-Regular;
    font-size: 0.4em;
    color: #191A1E;
    letter-spacing: -0.45px;
    text-align: center;
    background: #ffffff;
    border:1px solid #999;
  }
  .detail .listTable .page{
    position: absolute;
    right: 5%;
    bottom: 0;
    height: 10%;
    font-size: 0.3em;
    line-height: 2em;
  }
  .detail .listTable .page button{
    position: relative;
    width: 20em;
    font-size: 0.3em;
    line-height: 2em;
    border: 1px solid #363E42;
    border-radius: 1em;
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
