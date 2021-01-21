<template>
  <div class="productWaringRule">
    <!-- 列表页显示-->
    <div  class="list">
      <div class="heard">
        <form class="select">
          <div>创建账号:
            <select v-model="selectItem.create_user">
              <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>审核账号:
            <select v-model="selectItem.auditor">
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
            <select v-model="selectItem.state">
              <option value="新建">新建</option>
              <option value="审核中">审核中</option>
              <option value="使用中">使用中</option>
            </select>
          </div>
          <div>

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
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加产品库存预警</button>
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
              <th>创建账号</th>
              <th>审核账号</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.code}}</td>
              <td>{{item.state}}</td>
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
            <dt>基础信息</dt>
            <dd>{{"名称:"+"&#12288;"+detail.name}}</dd>
            <dd>{{"编码:"+"&#12288;"+detail.code}}</dd>
            <dd>{{"状态:"+"&#12288;"+detail.state}}</dd>
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
          </div>
          <div class="file">
            <dt>文件附件</dt>
            <dd v-for="(value,id) in detail.file" :key="id">
              <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
            </dd>
          </div>
          <div class="child">
            <dt>子项</dt>
            <table v-show="list_child.length>0">
              <tr align="center">
                <th>序号</th>
                <th>仓库</th>
                <th>产品分类</th>
                <th>产品</th>
                <th>批次</th>
                <th>最大量</th>
                <th>最少量</th>
                <th>高阀值</th>
                <th>低阀值</th>
                <th>说明</th>
              </tr>
              <tr align="center" v-for="(item,index) in list_child" :key="item.id" >
                <td>{{index}}</td>
                <td>{{item.warehouseCode+"("+item.warehouseName+")"}}</td>
                <td>{{item.productTypeCode+"("+item.productTypeName+")"}}</td>
                <td>{{item.productCode+"("+item.productName+")"}}</td>
                <td>{{item.batch}}</td>
                <td>{{item.maximum}}</td>
                <td>{{item.minimum}}</td>
                <td>{{item.highthreshold}}</td>
                <td>{{item.lowthreshold}}</td>
                <td>{{item.desc}}</td>
              </tr>
              <tr>

              </tr>
            </table>
          </div>
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
            <div v-show="attribute_title.attribute1!==''" >{{attribute_title.attribute1}}
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
            <div class="child">子项:
              <span @click="showChildForm='true'">
                  添加
              </span>
              <div>
                <table v-show="list_child.length>0">
                  <tr align="center">
                    <th>序号</th>
                    <th>仓库</th>
                    <th>产品分类</th>
                    <th>产品</th>
                    <th>批次</th>
                    <th>最大量</th>
                    <th>最少量</th>
                    <th>高阀值</th>
                    <th>低阀值</th>
                    <th>说明</th>
                    <th>操作</th>
                  </tr>
                  <tr align="center" v-for="(item,index) in list_child" :key="item.id" >
                    <td>{{index}}</td>
                    <td>{{item.warehouseCode+"("+item.warehouseName+")"}}</td>
                    <td>{{item.productTypeCode+"("+item.productTypeName+")"}}</td>
                    <td>{{item.productCode+"("+item.productName+")"}}</td>
                    <td>{{item.batch}}</td>
                    <td>{{item.maximum}}</td>
                    <td>{{item.minimum}}</td>
                    <td>{{item.highthreshold}}</td>
                    <td>{{item.lowthreshold}}</td>
                    <td>{{item.desc}}</td>
                    <td>
                      <button type="button" @click="removeChild(item.id)">移除</button>
                    </td>
                  </tr>
                  <tr>

                  </tr>
                </table>
              </div>
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
              <span class="message" v-show ="!$v.formItem.code.required">编码不能为空</span>
              <span class="message" v-show ="!$v.formItem.code.minLength">最少长度为2</span>
              <span class="message" v-show ="!$v.formItem.code.maxLength">最大长度位32</span>
            </div>
            <div v-show="attribute_title.attribute1!==''" >{{attribute_title.attribute1}}
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
            <div class="child">子项:
              <span @click="showChildForm='true'">
                  添加
              </span>
              <div>
                <table v-show="list_child.length>0">
                  <tr align="center">
                    <th>序号</th>
                    <th>仓库</th>
                    <th>产品分类</th>
                    <th>产品</th>
                    <th>批次</th>
                    <th>最大量</th>
                    <th>最少量</th>
                    <th>高阀值</th>
                    <th>低阀值</th>
                    <th>说明</th>
                    <th>操作</th>
                  </tr>
                  <tr align="center" v-for="(item,index) in list_child" :key="item.id" >
                    <td>{{index}}</td>
                    <td>{{item.warehouseCode+"("+item.warehouseName+")"}}</td>
                    <td>{{item.productTypeCode+"("+item.productTypeName+")"}}</td>
                    <td>{{item.productCode+"("+item.productName+")"}}</td>
                    <td>{{item.batch}}</td>
                    <td>{{item.maximum}}</td>
                    <td>{{item.minimum}}</td>
                    <td>{{item.highthreshold}}</td>
                    <td>{{item.lowthreshold}}</td>
                    <td>{{item.desc}}</td>
                    <td>
                      <button type="button" @click="removeChild(item.id)">移除</button>
                    </td>
                  </tr>
                  <tr>

                  </tr>
                </table>
              </div>
            </div>
          </form>
        </div>
        <div class="button">
          <button type="button" @click="update">保存数据</button>
          <button type="button" @click="updateAndSubmit">保存并提交</button>
        </div>
      </div>
    </div>
    <!--    /*子项添加对话框*/-->
    <div class="dialog" v-show ="showChildForm==='true'">
      <div class="center">
        <div class="heard">
          <span>子项添加</span>
          <button type="button" @click="showChildForm='false'"></button>
        </div>
        <div class="content">
          <form>
              <div>仓库:
                <select v-model="formItem_child.warehouse" >
                  <option v-for="item in warehouseInfor" :value="item.code" :key="item.id">{{item.name +"("+ item.name+")"}}</option>
                </select>
              </div>
              <div>产品分类:
                <select v-model="formItem_child.productType" >
                  <option v-for="item in productType" :value="item.id" :key="item.id">{{item.name +"("+ item.name+")"}}</option>
                </select>
              </div>
              <div>产品信息:
                <select v-model="formItem_child.product" >
                  <option v-for="item in productInfor" :value="item.id" :key="item.id">{{item.name +"("+ item.name+")"}}</option>
                </select>
              </div>
              <div>批次:
                <input v-model="formItem.batch"  placeholder="请输入物料批次...">
              </div>
              <div>最大数量:
                <input  type="number"  v-model="formItem_child.maximum" >
              </div>
              <div>最少数量:
                <input  type="number" v-model="formItem_child.minimum" >
              </div>
              <div>高阀值:
                <input  type="number" v-model="formItem_child.highthreshold" >
              </div>
              <div>低阀值:
                <input  type="number" v-model="formItem_child.lowthreshold"  >
              </div>
              <div>备注信息:
                <textarea v-model="formItem_child.desc" placeholder="请输入当前物料说明信息..."></textarea>
              </div>
              <div>
                <button type="button" @click="uploadChild">添加</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'productWaringRule',
  components: {
  },
  data () {
    return {
      /* 视图显示控制 */
      showViewid: 'list',
      showChildForm: '',
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listPreUrl: '',
      listNextUrl: '',
      /* 子项列表数据 */
      list_child: [],
      /* 列表页查询参数 */
      selectItem: {
        state: '',
        ordering: '',
        create_user: '',
        auditor: '',
        searchValue: ''
      },

      /* 详情页数据 */
      detail: [],
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'productWaringRule'
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
        child: [],
        file: [],
        alter: [],
        desc: '',
        auditor: ''
      },
      formItem_child: {
        id: '',
        warehouse: '',
        productType: '',
        product: '',
        batch: '',
        minimum: '',
        maximum: '',
        lowthreshold: '',
        highthreshold: '',
        desc: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: '',
        fileName: '',
        desc: '',
        uri: 'productWaringRule'
      },
      fileData: [],
      /* 具有审核权限的账号信息 */
      userinfor: [],
      /* 产品分类信息 */
      productType: [],
      /* 产品信息 */
      productInfor: [],
      /* 仓库信息 */
      warehouseInfor: [],
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
      this.$axios.get('warehouse/productWaringRule/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('warehouse/productWaringRule/?state=' + self.selectItem.state +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
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
      this.alterData = []// 清空审核数据
      this.list_child = []
      var self = this
      this.$axios.get(`warehouse/productWaringRule/` + id).then(function (response) {
        self.detail = response.data
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'warehouseCode': value.warehouse_code,
            'warehouseName': value.warehouse_name,
            'productTypeCode': value.productType_code,
            'productTypeName': value.productType_name,
            'productCode': value.product_code,
            'productName': value.product_name,
            'batch': value.batch,
            'minimum': value.minimum,
            'maximum': value.maximum,
            'lowthreshold': value.lowthreshold,
            'highthreshold': value.highthreshold,
            'desc': value.desc}
          self.formItem.child.push(value.id)
          self.list_child.push(obj1)
        })
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
      this.$axios.patch(`warehouse/productWaringRule/` + self.detail.id + '/', {
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
      /* 清空子项表单数据 */
      for (let key in this.formItem_child) {
        if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Array]') {
          this.formItem_child[key] = []
        } else if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Object]') {
          var obj2 = this.formItem_child[key]
          for (let key1 in obj2) {
            if (Object.prototype.toString.call(obj2[key1]) === '[object Array]') {
              obj2[key1] = []
            } else {
              obj2[key1] = ''
            }
          }
        } else {
          this.formItem_child[key] = ''
        }
      }
      this.list_child = []
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
      /* 清空子项表单数据 */
      for (let key in this.formItem_child) {
        if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Array]') {
          this.formItem_child[key] = []
        } else if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Object]') {
          var obj2 = this.formItem_child[key]
          for (let key1 in obj2) {
            if (Object.prototype.toString.call(obj2[key1]) === '[object Array]') {
              obj2[key1] = []
            } else {
              obj2[key1] = ''
            }
          }
        } else {
          this.formItem_child[key] = ''
        }
      }
      this.list_child = []
      this.alterList = []
      this.fileData = []
      var self = this
      this.$axios.get(`warehouse/productWaringRule/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.alterList = response.data.alter
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'warehouseCode': value.warehouse_code,
            'warehouseName': value.warehouse_name,
            'productTypeCode': value.productType_code,
            'productTypeName': value.productType_name,
            'productCode': value.product_code,
            'productName': value.product_name,
            'batch': value.batch,
            'minimum': value.minimum,
            'maximum': value.maximum,
            'lowthreshold': value.lowthreshold,
            'highthreshold': value.highthreshold,
            'desc': value.desc}
          self.formItem.child.push(value.id)
          self.list_child.push(obj1)
        })
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
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
    /* 提交子项物料项 */
    uploadChild () {
      var self = this
      this.$axios.post(`warehouse/productWaringRuleItem/`, {
        warehouse_code: self.formItem_child.warehouse,
        product_id: self.formItem_child.product,
        batch: self.formItem_child.batch,
        minimum: self.formItem_child.minimum,
        maximum: self.formItem_child.maximum,
        lowthreshold: self.formItem_child.lowthreshold,
        highthreshold: self.formItem_child.highthreshold,
        desc: self.formItem_child.desc
      }).then(function (response) {
        self.showChildForm = ''
        var index = 0
        for (var i = 0; i < self.productInfor.length; i++) {
          if (self.productInfor[i].id === parseInt(response.data.product_id)) {
            index = i
            break
          }
        }
        var index1 = 0
        for (var j = 0; j < self.productType.length; j++) {
          if (self.productType[j].id === self.formItem_child.productType) {
            index1 = j
            break
          }
        }
        var index2 = 0
        for (var k = 0; k < self.warehouseInfor.length; k++) {
          if (self.warehouseInfor[k].code === self.formItem_child.warehouse) {
            index2 = k
            break
          }
        }
        var obj = {
          'id': response.data.id,
          'warehouseCode': self.warehouseInfor[index2].code,
          'warehouseName': self.warehouseInfor[index2].name,
          'productTypeCode': self.productType[index1].code,
          'productTypeName': self.productType[index1].name,
          'productCode': self.productInfor[index].code,
          'productName': self.productInfor[index].name,
          'batch': response.data.batch,
          'minimum': response.data.minimum,
          'maximum': response.data.maximum,
          'lowthreshold': response.data.lowthreshold,
          'highthreshold': response.data.highthreshold,
          'desc': response.data.desc
        }
        self.list_child.push(obj)
        self.formItem.child.push(response.data.id)
        self.formItem_child.warehouse = ''
        self.formItem_child.productType = ''
        self.formItem_child.product = ''
        self.formItem_child.batch = ''
        self.formItem_child.minimum = ''
        self.formItem_child.maximum = ''
        self.formItem_child.lowthreshold = ''
        self.formItem_child.highthreshold = ''
        self.formItem_child.desc = ''
        alert('记录提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    removeChild: function (id) {
      var self = this
      if (!confirm('是否要删除当前数据' + id)) {
        // 当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
        return
      }
      for (var i = 0; i < self.formItem.child.length; i++) {
        if (self.formItem.child[i] === id) {
          self.formItem.child.splice(i, 1)
        }
      }
      for (var j = 0; j < self.list_child.length; j++) {
        if (self.list_child[j].id === id) {
          self.list_child.splice(j, 1)
        }
      }
    },
    /* 保存表单数据 */
    save () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`warehouse/productWaringRule/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        child: self.formItem.child,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
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
      this.$axios.put(`warehouse/productWaringRule/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        child: self.formItem.child,
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
    /* 保存表单数据 */
    saveAndSubmit () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.post(`warehouse/productWaringRule/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        child: self.formItem.child,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/productWaringRule/` + response.data.id + '/', {
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
      this.$axios.put(`warehouse/productWaringRule/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        child: self.formItem.child,
        file: self.formItem.file,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.$axios.patch(`warehouse/productWaringRule/` + response.data.id + '/', {
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
      self.$axios.get('process/productType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.productType = response.data.results
        self.$axios.get('warehouse/warehouse/?page_size=99999&ordering=-id&type=产品库&state=使用中').then(function (response) {
          self.warehouseInfor = response.data.results
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
      // 错误提示
      console.log(err)
    })
  },
  mounted () {
    this.attribute_title = this.$store.getters.getConfig.attach_attribute.半成品库存预警规则
    this.attribute_title_child = this.$store.getters.getConfig.attach_attribute.半成品库存预警规则子项
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
      return 'warehouse.add_productwaringrulemodel' in this.permissions
    },
    canRead () {
      return 'warehouse.read_productwaringrulemodel' in this.permissions
    }

  },
  watch: {
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
    },
    formItem_child: {
      deep: true
    },
    /* 监控用户选择的类别变化时,更新附加属性标题 */
    'formItem_child.productType': function (newval, oldval) {
      var self = this
      this.productInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      this.$axios.get('process/productInfor/?page_size=99999&ordering=-id&state=使用中' +
        '&type=' + newval).then(function (response) {
        self.productInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="scss" >
  .productWaringRule {
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
          div:nth-child(6) {
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
                width: 10em;
              }
              &:nth-child(3){
                width: 10em;
              }
              &:nth-child(4){
                width: 10em;
              }
              &:nth-child(5){
                width: 5em;
              }
              &:nth-child(6){
                width: 5em;
              }
              &:nth-child(7){
                width: 10em;
              }
              &:nth-child(8){
                width: 5em;
              }
              &:nth-child(9){
                width: 5em;
              }
              &:nth-child(10){
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
          .child{
            position: relative;
            top: 0;
            width: 100%;
            overflow: auto;
            dt{
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #9ca022;
              text-align: center;
            }
            table{
              height: 100%;
              width: 100%;
              table-layout: auto;
              empty-cells:hide;
              word-break : normal;
              font-size: 0.6em;
              th{
                position: sticky;
                top:0;
                height: 1em;
                font-family: PingFangSC-Regular;
                font-size: 0.6em;
                line-height: 1.6em;
                color: #000000;
                text-align: center;
                background: #999494;
                border:1px solid rgba(177, 176, 171, 0.89);
                &:nth-child(1){
                  width: 3em;
                }
                &:nth-child(2){
                  width: 10em;
                }
                &:nth-child(3){
                  width: 10em;
                }
                &:nth-child(4){
                  width: 10em;
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
                  width: 10em;
                }
                &:nth-child(11){
                  width: 5em;
                }
              }
              td{
                height: 1em;
                font-family: PingFangSC-Regular;
                font-size: 0.5em;
                line-height: 2em;
                color: #191A1E;
                text-align: center;
                background: #eeeaea;
                border:1px solid rgba(177, 176, 171, 0.61);
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
            .child {
              position: relative;
              width: 100%;
              height: 40%;
              span{
                position: absolute;
                width: 20%;
                height: 15%;
                left: 15%;
                top: 0;
                font-family: AppleSystemUIFont;
                color: black;
                font-size: 0.3em;
                line-height: 3.3em;
                background: #ffffff;
                border: 1px solid #363E42;
                border-radius: 13px;
              }
              div{
                position: absolute;
                top: 20%;
                width: 100%;
                height: 75%;
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
                    font-size: 0.6em;
                    line-height: 1.6em;
                    color: #000000;
                    text-align: center;
                    background: #999494;
                    border:1px solid rgba(177, 176, 171, 0.89);
                    &:nth-child(1){
                      width: 3em;
                    }
                    &:nth-child(2){
                      width: 10em;
                    }
                    &:nth-child(3){
                      width: 10em;
                    }
                    &:nth-child(4){
                      width: 10em;
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
                      width: 10em;
                    }
                    &:nth-child(11){
                      width: 5em;
                    }
                  }
                  td{
                    height: 1em;
                    font-family: PingFangSC-Regular;
                    font-size: 0.5em;
                    line-height: 2em;
                    color: #191A1E;
                    text-align: center;
                    background: #eeeaea;
                    border:1px solid rgba(177, 176, 171, 0.61);
                  }
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
            .child {
              position: relative;
              width: 100%;
              height: 40%;
              span{
                position: absolute;
                width: 20%;
                height: 15%;
                left: 15%;
                top: 0;
                font-family: AppleSystemUIFont;
                color: black;
                font-size: 0.3em;
                line-height: 3.3em;
                background: #ffffff;
                border: 1px solid #363E42;
                border-radius: 13px;
              }
              div{
                position: absolute;
                top: 20%;
                width: 100%;
                height: 75%;
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
                    font-size: 0.6em;
                    line-height: 1.6em;
                    color: #000000;
                    text-align: center;
                    background: #999494;
                    border:1px solid rgba(177, 176, 171, 0.89);
                    &:nth-child(1){
                      width: 3em;
                    }
                    &:nth-child(2){
                      width: 10em;
                    }
                    &:nth-child(3){
                      width: 10em;
                    }
                    &:nth-child(4){
                      width: 10em;
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
                      width: 10em;
                    }
                    &:nth-child(11){
                      width: 5em;
                    }
                  }
                  td{
                    height: 1em;
                    font-family: PingFangSC-Regular;
                    font-size: 0.5em;
                    line-height: 2em;
                    color: #191A1E;
                    text-align: center;
                    background: #eeeaea;
                    border:1px solid rgba(177, 176, 171, 0.61);
                  }
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
    .dialog {
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(200, 200, 200,0.8);
      .center {
        position: absolute;
        top:20%;
        left: 15%;
        width: 70%;
        height: 70%;
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
          height: 90%;
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
            .child {
              position: relative;
              width: 100%;
              height: 30%;
              span{
                position: absolute;
                width: 20%;
                height: 20%;
                left: 15%;
                top: 0;
                font-family: AppleSystemUIFont;
                color: black;
                font-size: 0.3em;
                line-height: 3.3em;
                background: #ffffff;
                border: 1px solid #363E42;
                border-radius: 13px;
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
