<template>
  <div class="maintainRecord">
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
          <div>分类:
            <select v-model="selectItem.type">
              <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
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
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加维护记录</button>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <table >
            <tr align="center"  type="height:2em">
              <th>序号</th>
              <th>名称</th>
              <th>编码</th>
              <th>分类</th>
              <th>状态</th>
              <th>操作者</th>
              <th>操作时间</th>
              <th>创建账号</th>
              <th>审核账号</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.name}}</td>
              <td>{{item.code}}</td>
              <td>{{item.type.code+"("+item.type.name+")"}}</td>
              <td>{{item.state}}</td>
              <td>{{item.handler}}</td>
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
            <dt>基础信息</dt>
            <dd>{{"名称:"+"&#12288;"+detail.name}}</dd>
            <dd>{{"编码:"+"&#12288;"+detail.code}}</dd>
            <dd>{{"状态:"+"&#12288;"+detail.state}}</dd>
            <dd>{{"分类:"+"&#12288;"+type.code+"("+type.name+")"}}</dd>
            <dd>{{"设备:"+"&#12288;"+equipment.code+"("+equipment.name+")"}}</dd>
            <dd>{{"维护结果:"+"&#12288;"+detail.result}}</dd>
            <dd>{{"维护人员:"+"&#12288;"+detail.handler}}</dd>
            <dd>{{"维护耗时:"+"&#12288;"+detail.time_consuming}}</dd>
            <dd>{{"维护时间:"+"&#12288;"+detail.dataTime}}</dd>
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
          <div class="image">
            <dt>图片附件</dt>
            <dd v-for="(value,id) in detail.image" :key="id">
              <a target='_black' v-bind:key="id" :href="value.image"> <img :src="value.image" width="50px"></a>
            </dd>
          </div>
          <div class="child">
            <dt>子部件</dt>
            <table v-show="list_child.length>0">
              <tr align="center">
                <th>序号</th>
                <th>部件</th>
                <th>方法</th>
                <th>说明</th>
              </tr>
              <tr align="center" v-for="(item,index) in list_child" :key="item.id" >
                <td>{{index}}</td>
                <td>{{item.compoment}}</td>
                <td>{{item.method}}</td>
                <td>{{item.desc}}</td>
              </tr>
              <tr>

              </tr>
            </table>
          </div>
          <div class="child">
            <dt>备品消耗</dt>
            <table v-show="parts_use.length>0">
              <tr align="center">
                <th>序号</th>
                <th>名称</th>
                <th>编码</th>
                <th>数量</th>
                <th>操作者</th>
                <th>状态</th>
                <th>时间</th>
                <th>说明</th>
              </tr>
              <tr align="center" v-for="(item,index) in parts_use" :key="item.id" >
                <td>{{index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.code}}</td>
                <td>{{item.sum}}</td>
                <td>{{item.handler}}</td>
                <td>{{item.state}}</td>
                <td>{{item.dataTime}}</td>
                <td>{{item.desc}}</td>
              </tr>
              <tr>

              </tr>
            </table>
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
            <div>分类:
              <select v-model="formItem.type"   placeholder="请选择分类">
                <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.type.required">请选择分类</span>
            </div>
            <div>维护者:
              <input v-model="formItem.handler"  placeholder="请输入维护者...">
            </div>
            <div>设备分类:
              <select v-model="formItem.equipmentType"   placeholder="请选择设备分类">
                <option v-for="item in equipmentType" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>设备:
              <select v-model="formItem.equipment"   placeholder="请选择设备">
                <option v-for="item in equipmentInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.equipment.required">请选择设备</span>
            </div>
            <div>备品消耗:
              <select v-model="formItem.parts_use"   placeholder="请选择备品消耗"  style="height: 90%"  multiple="true">
                <option v-for="item in partsUse" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>维护结果:
              <input v-model="formItem.result"  placeholder="请输入维护结果...">
            </div>
            <div>维护时间:
              <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间" >
              <span class="message" v-show ="!$v.formItem.dataTime.required">请选择日期</span>
            </div>
            <div>维护耗时:
              <input v-model="formItem.time_consuming"  placeholder="请输入维护耗时...">
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
            <div class="image">图片:
              <span>
                  选择图片
                  <input type="file"  @change="imageBeforeUpload"/>
               </span>
              <ul>
                <li v-for="value in imageData" v-bind:key="value.id"  @click="removeImage(value.id)">
                  <img :src="value.imageUrl">
                </li>
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
                    <th>部件</th>
                    <th>方法</th>
                    <th>说明</th>
                    <th>操作</th>
                  </tr>
                  <tr align="center" v-for="(item,index) in list_child" :key="item.id" >
                    <td>{{index}}</td>
                    <td>{{item.compoment}}</td>
                    <td>{{item.method}}</td>
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
            </div>
            <div>分类:
              <select v-model="formItem.type"   placeholder="请选择分类">
                <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.type.required">请选择分类</span>
            </div>
            <div>维护者:
              <input v-model="formItem.handler"  placeholder="请输入维护者...">
            </div>
            <div>设备分类:
              <select v-model="formItem.equipmentType"   placeholder="请选择设备分类">
                <option v-for="item in equipmentType" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>设备:
              <select v-model="formItem.equipment"   placeholder="请选择设备">
                <option v-for="item in equipmentInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.equipment.required">请选择设备</span>
            </div>
            <div>备品消耗:
              <select v-model="formItem.parts_use"   placeholder="请选择备品消耗"  style="height: 90%"  multiple="true">
                <option v-for="item in partsUse" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>维护结果:
              <input v-model="formItem.result"  placeholder="请输入维护结果...">
            </div>
            <div>维护时间:
              <input v-model="formItem.dataTime"  type="datetime-local" placeholder="选择日期和时间" >
              <span class="message" v-show ="!$v.formItem.dataTime.required">请选择日期</span>
            </div>
            <div>维护耗时:
              <input v-model="formItem.time_consuming"  placeholder="请输入维护耗时...">
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
            <div class="image">图片:
              <span>
                  选择图片
                  <input type="file"  @change="imageBeforeUpload"/>
               </span>
              <ul>
                <li v-for="value in imageData" v-bind:key="value.id"  @click="removeImage(value.id)">
                  <img :src="value.imageUrl">
                </li>
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
                    <th>部件</th>
                    <th>方法</th>
                    <th>说明</th>
                    <th>操作</th>
                  </tr>
                  <tr align="center" v-for="(item,index) in list_child" :key="item.id" >
                    <td>{{index}}</td>
                    <td>{{item.compoment}}</td>
                    <td>{{item.method}}</td>
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
            <div>部件:
              <input v-model="formItem_child.compoment"  placeholder="请输入维护部件...">
            </div>
            <div>方法:
              <textarea v-model="formItem_child.method"  placeholder="请输入维护方法..."></textarea>
            </div>
            <div>备注信息:
              <textarea v-model="formItem_child.desc"  placeholder="请输入当前部件说明信息..."></textarea>
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
import {required} from 'vuelidate/lib/validators'
export default {
  name: 'maintainRecord',
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
        type: '',
        searchValue: '',
        start_time: '',
        stop_time: ''
      },

      /* 详情页数据 */
      detail: [],
      type: {},
      equipment: {},
      parts_use: [],
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'maintainRecord'
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
        type: '',
        child: [],
        equipmentType: '',
        equipment: '',
        parts_use: [],
        image: [],
        file: [],
        alter: [],
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        desc: '',
        auditor: ''
      },
      formItem_child: {
        id: '',
        compoment: '',
        method: '',
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        desc: ''
      },
      /* 图片项表单 */
      imageItem: {
        image: '',
        imageName: '',
        desc: '',
        uri: 'maintainRecord'
      },
      imageData: [],
      /* 创建页文件项表单 */
      fileItem: {
        file: '',
        fileName: '',
        desc: '',
        uri: 'maintainRecord'
      },
      fileData: [],
      /* 维护记录分类信息 */
      typeInfor: [],
      /* 设备分类信息 */
      equipmentType: [],
      /* 设备信息 */
      equipmentInfor: [],
      /* 备品消耗信息 */
      partsUse: [],
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
      auditor: {
        required
      },
      type: {
        required
      },
      equipment: {
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
      this.$axios.get('equipment/maintainRecord/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('equipment/maintainRecord/?state=' + self.selectItem.state +
              '&auditor=' + self.selectItem.auditor +
              '&create_user=' + self.selectItem.create_user +
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
      this.type = {}
      var self = this
      this.$axios.get(`equipment/maintainRecord/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.equipment = self.detail.equipment
        self.parts_use = self.detail.parts_use
        self.formItem.type = self.detail.type.id
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'compoment': value.compoment,
            'method': value.method,
            'attribute1': value.attribute1,
            'attribute2': value.attribute2,
            'attribute3': value.attribute3,
            'attribute4': value.attribute4,
            'attribute5': value.attribute5,
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
      this.$axios.patch(`equipment/maintainRecord/` + self.detail.id + '/', {
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
      this.imageData = []
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
      this.imageData = []
      var self = this
      this.$axios.get(`equipment/maintainRecord/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.state = response.data.state
        self.formItem.code = response.data.code
        self.formItem.dataTime = response.data.dataTime
        self.formItem.handler = response.data.handler
        self.formItem.time_consuming = response.data.time_consuming
        self.formItem.result = response.data.result
        self.formItem.attribute1 = response.data.attribute1
        self.formItem.attribute2 = response.data.attribute2
        self.formItem.attribute3 = response.data.attribute3
        self.formItem.attribute4 = response.data.attribute4
        self.formItem.attribute5 = response.data.attribute5
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.alterList = response.data.alter
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'compoment': value.compoment,
            'method': value.method,
            'attribute1': value.attribute1,
            'attribute2': value.attribute2,
            'attribute3': value.attribute3,
            'attribute4': value.attribute4,
            'attribute5': value.attribute5,
            'desc': value.desc}
          self.formItem.child.push(value.id)
          self.list_child.push(obj1)
        })
        if (response.data.type !== null) {
          self.formItem.type = response.data.type.id
        } else { self.formItem.type = response.data.type }
        if (response.data.equipment !== null) {
          self.formItem.equipment = response.data.equipment.id
          self.formItem.equipmentType = response.data.equipment.type.id
        } else { self.formItem.equipment = response.data.equipment }
        response.data.parts_use.forEach(function (value, i) {
          self.formItem.parts_use.push(value.id)
        })
        response.data.file.forEach(function (value, i) {
          var obj = {'id': value.id, 'fileName': value.file_name, 'fileUrl': value.file, 'desc': value.desc, 'uri': value.uri}
          self.formItem.file.push(value.id)
          self.fileData.push(obj)
        })
        response.data.image.forEach(function (value, i) {
          var obj1 = {'id': value.id, 'imageName': value.image_name, 'imageUrl': value.image, 'desc': value.desc, 'uri': value.uri}
          self.formItem.image.push(value.id)
          self.imageData.push(obj1)
        })
        self.showViewid = 'update'
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    /* 提交图片项 */
    uploadImage () {
      if (!confirm('确认提交??')) {
        return
      }
      let formData = new FormData()
      // 下面是表单绑定的data 数据
      formData.append('uri', this.imageItem.uri)
      formData.append('desc', this.imageItem.desc)
      formData.append('image', this.imageItem.image)
      var self = this
      this.$axios.post(`equipment/image/`, formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
      ).then(function (response) {
        var obj = {'id': response.data.id,
          'imageName': self.imageItem.imageName,
          'imageUrl': response.data.image,
          'desc': response.data.desc,
          'uri': response.data.uri}
        self.imageItem.image = ''
        self.imageItem.desc = ''
        self.formItem.image.push(response.data.id)
        self.imageData.push(obj)
        alert(self.imageItem.imageName + '图片提交成功')
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },

    imageBeforeUpload (event) {
      this.imageItem.image = event.target.files[0]
      this.imageItem.imageName = event.target.files[0].name
      this.uploadImage()
    },
    removeImage: function (id) {
      var self = this
      if (!confirm('是否要删除当前数据' + id)) {
        // 当用户点击的取消按钮的时候，应该阻断这个方法中的后面代码的继续执行
        return
      }
      for (var i = 0; i < self.formItem.image.length; i++) {
        if (self.formItem.image[i] === id) {
          self.formItem.image.splice(i, 1)
        }
      }
      for (var j = 0; j < self.imageData.length; j++) {
        if (self.imageData[j].id === id) {
          self.imageData.splice(j, 1)
        }
      }
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
        // 错误提示
        console.log(err)
      })
    },
    /* 提交子项物料项 */
    uploadChild () {
      var self = this
      this.$axios.post(`equipment/maintainRecordItem/`, {
        compoment: self.formItem_child.compoment,
        method: self.formItem_child.method,
        attribute1: self.formItem_child.attribute1,
        attribute2: self.formItem_child.attribute2,
        attribute3: self.formItem_child.attribute3,
        attribute4: self.formItem_child.attribute4,
        attribute5: self.formItem_child.attribute5,
        desc: self.formItem_child.desc
      }).then(function (response) {
        self.showChildForm = ''
        var obj = {
          'compoment': response.data.compoment,
          'method': response.data.method,
          'attribute1': response.data.attribute1,
          'attribute2': response.data.attribute2,
          'attribute3': response.data.attribute3,
          'attribute4': response.data.attribute4,
          'attribute5': response.data.attribute5,
          'desc': response.data.desc
        }
        self.list_child.push(obj)
        self.formItem.child.push(response.data.id)
        self.formItem_child.compoment = ''
        self.formItem_child.method = ''
        self.formItem_child.attribute1 = ''
        self.formItem_child.attribute2 = ''
        self.formItem_child.attribute3 = ''
        self.formItem_child.attribute4 = ''
        self.formItem_child.attribute5 = ''
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
      this.$axios.post(`equipment/maintainRecord/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        dataTime: self.formItem.dataTime,
        handler: self.formItem.handler,
        time_consuming: self.formItem.time_consuming,
        result: self.formItem.result,
        equipment: self.formItem.equipment,
        parts_use: self.formItem.parts_use,
        file: self.formItem.file,
        image: self.formItem.image,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.formItem.image = []
        self.imageData = []
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
      this.$axios.put(`equipment/maintainRecord/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        dataTime: self.formItem.dataTime,
        handler: self.formItem.handler,
        time_consuming: self.formItem.time_consuming,
        result: self.formItem.result,
        equipment: self.formItem.equipment,
        parts_use: self.formItem.parts_use,
        file: self.formItem.file,
        image: self.formItem.image,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
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
      this.$axios.post(`equipment/maintainRecord/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        dataTime: self.formItem.dataTime,
        handler: self.formItem.handler,
        time_consuming: self.formItem.time_consuming,
        result: self.formItem.result,
        equipment: self.formItem.equipment,
        parts_use: self.formItem.parts_use,
        file: self.formItem.file,
        image: self.formItem.image,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.formItem.image = []
        self.imageData = []
        self.$axios.patch(`equipment/maintainRecord/` + response.data.id + '/', {
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
      this.$axios.put(`equipment/maintainRecord/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        child: self.formItem.child,
        dataTime: self.formItem.dataTime,
        handler: self.formItem.handler,
        time_consuming: self.formItem.time_consuming,
        result: self.formItem.result,
        equipment: self.formItem.equipment,
        parts_use: self.formItem.parts_use,
        file: self.formItem.file,
        image: self.formItem.image,
        attribute1: self.formItem.attribute1,
        attribute2: self.formItem.attribute2,
        attribute3: self.formItem.attribute3,
        attribute4: self.formItem.attribute4,
        attribute5: self.formItem.attribute5,
        desc: self.formItem.desc,
        auditor: self.formItem.auditor
      }).then(function (response) {
        self.formItem.file = []
        self.fileData = []
        self.formItem.image = []
        self.imageData = []
        self.$axios.patch(`equipment/maintainRecord/` + response.data.id + '/', {
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
    this.equipmentType = []
    this.equipmentInfor = []
    this.partsUse = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.$axios.get('equipment/maintainRecordType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
        self.$axios.get('equipment/equipmentType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.equipmentType = response.data.results
          self.$axios.get('equipment/partsUseRecord/?page_size=99999&ordering=-id&state=完成').then(function (response) {
            self.partsUse = response.data.results
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
    }).catch(function (err) {
      // 错误提示
      console.log(err)
    })
  },
  mounted () {
    this.attribute_title_child = this.$store.getters.getConfig.attach_attribute.维护记录子项
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
      return 'equipment.add_maintainrecordmodel' in this.permissions
    },
    canRead () {
      return 'equipment.read_maintainrecordmodel' in this.permissions
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
      if (newval === undefined || newval === '') {
        return
      }
      this.$axios.get(`equipment/maintainRecordType/` + newval).then(function (response) {
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
        // 错误提示
        console.log(err)
      })
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
  .maintainRecord {
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
          div:nth-child(7) {
            width: 25%;
          }
          div:nth-child(8) {
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
            dd:nth-child(10){
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
          .image{
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
              position: relative;
              width: 50%;
              height: 5em;
              float: left;
              font-family: PingFangSC-Regular;
              font-size: 0.5em;
              line-height: 2em;
              color: #0c0c0c;
              a{
                position: absolute;
                width: 100%;
                height: 100%;
                img{
                  position: absolute;
                  height: 90%;
                  width: 90%;
                }
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
                  width: 5em;
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
            .image {
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
                  width: 50%;
                  height: 10em;
                  color: #2b85e4;
                  overflow:hidden;
                  font-family: AppleSystemUIFont;
                  font-size: 0.8em;
                  line-height: 1.25em;
                  float: left;
                  img{
                    position: absolute;
                    height: 90%;
                    width: 90%;
                  }
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
                      width: 20em;
                    }
                    &:nth-child(4){
                      width: 20em;
                    }
                    &:nth-child(5){
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
            .image {
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
                  width: 50%;
                  height: 10em;
                  color: #2b85e4;
                  overflow:hidden;
                  font-family: AppleSystemUIFont;
                  font-size: 0.8em;
                  line-height: 1.25em;
                  float: left;
                  img{
                    position: absolute;
                    height: 90%;
                    width: 90%;
                  }
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
                      width: 20em;
                    }
                    &:nth-child(4){
                      width: 20em;
                    }
                    &:nth-child(5){
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
        height: 30%;
        background: #ffffff;
        border-radius:0.5em;
        .heard {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 20%;
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
          top: 25%;
          left: 10%;
          width: 80%;
          height: 70%;
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
              height: 50%;
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
            .image {
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
                  width: 50%;
                  height: 10em;
                  color: #2b85e4;
                  overflow:hidden;
                  font-family: AppleSystemUIFont;
                  font-size: 0.8em;
                  line-height: 1.25em;
                  float: left;
                  img{
                    position: absolute;
                    height: 90%;
                    width: 90%;
                  }
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
