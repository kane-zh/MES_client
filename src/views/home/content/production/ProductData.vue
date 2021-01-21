<template>
  <div class="productData">
    <!-- 列表页显示-->
    <div  class="list">
      <div class="heard">
        <form class="select">
          <div>创建账号:
            <select v-model="selectItem.create_user" placeholder="请选择创建账号" >
              <option v-for="item in userinfor" :value="item.username" :key="item.username">{{item.username}}</option>
            </select>
          </div>
          <div>任务分类:
            <select v-model="selectItem.taskType" placeholder="请选择任务分类"      >
              <option v-for="item in taskType" :value="item.code" :key="item.id">{{item.code+"("+item.name+")"}}</option>
            </select>
          </div>
          <div>任务:
            <select v-model="selectItem.task" placeholder="请选择任务"      >
              <option v-for="item in taskInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
            </select>
          </div>
          <div>产品分类:
            <select v-model="selectItem.productType" placeholder="请选择产品分类"      >
              <option v-for="item in productType" :value="item.code" :key="item.id">{{item.code+"("+item.name+")"}}</option>
            </select>
          </div>
          <div>产品:
            <select v-model="selectItem.product" placeholder="请选择产品"      >
              <option v-for="item in productInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
            </select>
          </div>
          <div>分类:
            <select v-model="selectItem.type" placeholder="请选择分类"      >
              <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
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
          </div>
          <div>
            <button type="button" @click="select" style="background: #FCC400;border: none;left: 0">搜索</button>
            <button type="button" @click="showListView" style="border: none;right: 0">重置</button>
          </div>
        </form>
        <div class="button" >
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加产品过程数据</button>
        </div>
      </div>
      <div class="content">
        <div class="table">
          <table >
            <tr align="center"  type="height:2em">
              <th>序号</th>
              <th>分类</th>
              <th>任务分类</th>
              <th>任务</th>
              <th>产品分类</th>
              <th>产品</th>
              <th>批次号</th>
              <th>序列号</th>
              <th>数量</th>
              <th>时间</th>
              <th>创建账号</th>
              <th>操作</th>
            </tr>
            <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
              <td>{{index}}</td>
              <td>{{item.type.code+"("+item.type.name+")"}}</td>
              <td>{{item.taskType_code+"("+item.taskType_name+")"}}</td>
              <td>{{item.task_code+"("+item.task_name+")"}}</td>
              <td>{{item.productType_code+"("+item.productType_name+")"}}</td>
              <td>{{item.product_code+"("+item.product_name+")"}}</td>
              <td>{{item.batch}}</td>
              <td>{{item.sn}}</td>
              <td>{{item.sum}}</td>
              <td>{{item.dataTime}}</td>
              <td>{{item.create_user}}</td>
              <td>
                  <span @click="showDetailView(item.id)" v-show ="item.create_user===username ||
                  canRead===true" style="color: #FF1A5EC4">查看</span>
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
            <dd>{{"分类:"+"&#12288;"+type.code+"("+type.name+")"}}</dd>
            <dd>{{"任务分类:"+"&#12288;"+detail.taskType_code+"("+detail.taskType_name+")"}}</dd>
            <dd>{{"任务:"+"&#12288;"+detail.task_code+"("+detail.task_name+")"}}</dd>
            <dd>{{"产品分类:"+"&#12288;"+detail.productType_code+"("+detail.productType_name+")"}}</dd>
            <dd>{{"产品:"+"&#12288;"+detail.product_code+"("+detail.product_name+")"}}</dd>
            <dd>{{"批次号:"+"&#12288;"+detail.batch}}</dd>
            <dd>{{"序列号:"+"&#12288;"+detail.sn}}</dd>
            <dd>{{"数量:"+"&#12288;"+detail.sum}}</dd>
            <dd>{{"人员信息:"+"&#12288;"+detail.personnel}}</dd>
            <dd>{{"设备信息:"+"&#12288;"+detail.equipment}}</dd>
            <dd>{{"物料信息:"+"&#12288;"+detail.material}}</dd>
            <dd>{{"工序信息:"+"&#12288;"+detail.station}}</dd>
            <dd>{{"质检信息:"+"&#12288;"+detail.quality}}</dd>
            <dd v-show ="attribute_title.attribute1!==''">{{attribute_title.attribute1 +":"+"&#12288;"+detail.attribute1}}</dd>
            <dd v-show ="attribute_title.attribute2!==''">{{attribute_title.attribute2 +":"+"&#12288;"+detail.attribute2}}</dd>
            <dd v-show ="attribute_title.attribute3!==''">{{attribute_title.attribute3 +":"+"&#12288;"+detail.attribute3}}</dd>
            <dd v-show ="attribute_title.attribute4!==''">{{attribute_title.attribute4 +":"+"&#12288;"+detail.attribute4}}</dd>
            <dd v-show ="attribute_title.attribute5!==''">{{attribute_title.attribute5 +":"+"&#12288;"+detail.attribute5}}</dd>
            <dd v-show ="attribute_title.attribute6!==''">{{attribute_title.attribute6 +":"+"&#12288;"+detail.attribute6}}</dd>
            <dd v-show ="attribute_title.attribute7!==''">{{attribute_title.attribute7 +":"+"&#12288;"+detail.attribute7}}</dd>
            <dd v-show ="attribute_title.attribute8!==''">{{attribute_title.attribute8 +":"+"&#12288;"+detail.attribute8}}</dd>
            <dd v-show ="attribute_title.attribute9!==''">{{attribute_title.attribute9 +":"+"&#12288;"+detail.attribute9}}</dd>
            <dd v-show ="attribute_title.attribute10!==''">{{attribute_title.attribute10 +":"+"&#12288;"+detail.attribute10}}</dd>
            <dd v-show ="attribute_title.attribute11!==''">{{attribute_title.attribute11 +":"+"&#12288;"+detail.attribute11}}</dd>
            <dd v-show ="attribute_title.attribute12!==''">{{attribute_title.attribute12 +":"+"&#12288;"+detail.attribute12}}</dd>
            <dd v-show ="attribute_title.attribute13!==''">{{attribute_title.attribute13 +":"+"&#12288;"+detail.attribute13}}</dd>
            <dd v-show ="attribute_title.attribute14!==''">{{attribute_title.attribute14 +":"+"&#12288;"+detail.attribute14}}</dd>
            <dd v-show ="attribute_title.attribute15!==''">{{attribute_title.attribute15 +":"+"&#12288;"+detail.attribute15}}</dd>
            <dd v-show ="attribute_title.attribute16!==''">{{attribute_title.attribute16 +":"+"&#12288;"+detail.attribute16}}</dd>
            <dd v-show ="attribute_title.attribute17!==''">{{attribute_title.attribute17 +":"+"&#12288;"+detail.attribute17}}</dd>
            <dd v-show ="attribute_title.attribute18!==''">{{attribute_title.attribute18 +":"+"&#12288;"+detail.attribute18}}</dd>
            <dd v-show ="attribute_title.attribute19!==''">{{attribute_title.attribute19 +":"+"&#12288;"+detail.attribute19}}</dd>
            <dd v-show ="attribute_title.attribute20!==''">{{attribute_title.attribute20 +":"+"&#12288;"+detail.attribute20}}</dd>
          </div>
          <div class="desc" v-show="detail.desc!=''">
            <dt>备注信息</dt>
            <dd>{{detail.desc}}</dd>
          </div>
          <div class="other">
            <dt>其他信息</dt>
            <dd>{{"创建账号:"+"&#12288;"+detail.create_user}}</dd>
            <dd>{{"创建时间:"+"&#12288;"+detail.create_time}}</dd>
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
        </div>
        <div class="button">
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
            <div>分类:
              <select v-model="formItem.type"   placeholder="请选择分类">
                <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.type.required">请选择分类</span>
            </div>
            <div>

            </div>
            <div>任务分类:
              <select v-model="formItem.taskType" >
                <option v-for="item in taskType" :value="item.id" :key="item.id">{{item.code +"("+ item.name+")"}}</option>
              </select>
            </div>
            <div>任务信息:
              <select v-model="formItem.task" >
                <option v-for="item in taskInfor" :value="item.id" :key="item.id">{{item.code +"("+ item.name+")"}}</option>
              </select>
            </div>
            <div>产品分类:
              <select v-model="formItem.productType" >
                <option v-for="item in taskItem_productType" :value="item.productType_code" :key="item.productType_code">{{item.productType_name +"("+ item.productType_name+")"}}</option>
              </select>
            </div>
            <div>产品信息:
              <select v-model="formItem.product" >
                <option v-for="(item,index) in taskItem_product" :value="item.product_id" :key="index">{{item.product_code +"("+ item.product_name+")"}}</option>
              </select>
            </div>
            <div>批次号:
              <input v-model="formItem.batch"  placeholder="请输入批次号...">
            </div>
            <div>序列号:
              <input v-model="formItem.sn"  placeholder="请输入序列号...">
            </div>
            <div>数量:
              <input v-model="formItem.sum"  placeholder="请输入数量...">
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
            <div>分类:
              <select v-model="formItem.type"   placeholder="请选择分类">
                <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
              <span class="message" v-show ="!$v.formItem.type.required">请选择分类</span>
            </div>
            <div>

            </div>
            <div>任务分类:
              <select v-model="formItem.taskType" >
                <option v-for="item in taskType" :value="item.id" :key="item.id">{{item.name +"("+ item.name+")"}}</option>
              </select>
            </div>
            <div>任务信息:
              <select v-model="formItem.task" >
                <option v-for="item in taskInfor" :value="item.id" :key="item.id">{{item.name +"("+ item.name+")"}}</option>
              </select>
            </div>
            <div>产品分类:
              <select v-model="formItem.productType" >
                <option v-for="item in taskItem_productType" :value="item.productType_code" :key="item.productType_code">{{item.productType_name +"("+ item.productType_name+")"}}</option>
              </select>
            </div>
            <div>产品信息:
              <select v-model="formItem.product" >
                <option v-for="(item,index) in taskItem_product" :value="item.product_id" :key="index">{{item.product_name +"("+ item.product_name+")"}}</option>
              </select>
            </div>
            <div>批次号:
              <input v-model="formItem.batch"  placeholder="请输入批次号...">
            </div>
            <div>序列号:
              <input v-model="formItem.sn"  placeholder="请输入序列号...">
            </div>
            <div>数量:
              <input v-model="formItem.sum"  placeholder="请输入数量...">
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
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        type: '',
        productType: '',
        product: '',
        taskType: '',
        task: '',
        batch: '',
        sn: '',
        sum: '',
        personnel: '',
        equipment: '',
        material: '',
        station: '',
        quality: '',
        dataTime: '',
        image: [],
        file: [],
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
      /* 图片项表单 */
      imageItem: {
        image: '',
        imageName: '',
        desc: '',
        uri: 'skillInfor'
      },
      imageData: [],
      /* 创建页文件项表单 */
      fileItem: {
        file: '',
        fileName: '',
        desc: '',
        uri: 'productData'
      },
      fileData: [],
      /* 产品分类信息 */
      productType: [],
      productInfor: [],
      /* 任务分类信息 */
      taskType: [],
      /* 任务信息 */
      taskInfor: [],
      taskItem: [],
      taskItem_productType: [],
      taskItem_product: [],
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
      this.type = {}
      var self = this
      this.$axios.get(`production/productData/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.formItem.type = self.detail.type.id
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
      this.fileData = []
      this.imageData = []
      var self = this
      this.$axios.get(`production/productData/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.state = response.data.state
        self.formItem.type = response.data.type
        self.formItem.product = response.data.product_id
        self.formItem.task = response.data.task_id
        self.formItem.batch = response.data.batch
        self.formItem.sn = response.data.sn
        self.formItem.sum = response.data.sum
        self.formItem.personnel = response.data.personnel
        self.formItem.equipment = response.data.equipment
        self.formItem.material = response.data.material
        self.formItem.station = response.data.station
        self.formItem.quality = response.data.quality
        self.formItem.dataTime = response.data.dataTime
        self.formItem.attribute1 = response.data.attribute1
        self.formItem.attribute2 = response.data.attribute2
        self.formItem.attribute3 = response.data.attribute3
        self.formItem.attribute4 = response.data.attribute4
        self.formItem.attribute5 = response.data.attribute5
        self.formItem.attribute6 = response.data.attribute6
        self.formItem.attribute7 = response.data.attribute7
        self.formItem.attribute8 = response.data.attribute8
        self.formItem.attribute9 = response.data.attribute9
        self.formItem.attribute10 = response.data.attribute10
        self.formItem.attribute11 = response.data.attribute11
        self.formItem.attribute12 = response.data.attribute12
        self.formItem.attribute13 = response.data.attribute13
        self.formItem.attribute14 = response.data.attribute14
        self.formItem.attribute15 = response.data.attribute15
        self.formItem.attribute16 = response.data.attribute16
        self.formItem.attribute17 = response.data.attribute17
        self.formItem.attribute18 = response.data.attribute18
        self.formItem.attribute19 = response.data.attribute19
        self.formItem.attribute20 = response.data.attribute20
        self.formItem.desc = response.data.desc
        if (response.data.type !== null) {
          self.formItem.type = response.data.type.id
        } else { self.formItem.type = response.data.type }
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
    /* 改变数据项状态 */
    changeState (state) {
      var self = this
      if (!confirm('确认提交??')) {
        return
      }
      this.formItem.state = state
      this.$axios.patch(`production/productData/` + self.detail.id + '/', {
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
      this.$axios.post(`production/image/`, formData,
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
      this.$axios.post(`production/file/`, formData,
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
        sum: self.formItem.sum,
        personnel: self.formItem.personnel,
        equipment: self.formItem.equipment,
        material: self.formItem.material,
        station: self.formItem.station,
        quality: self.formItem.quality,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        image: self.formItem.image,
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
    /* 保存并提交表单数据 */
    saveAndSubmit () {
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
        sum: self.formItem.sum,
        personnel: self.formItem.personnel,
        equipment: self.formItem.equipment,
        material: self.formItem.material,
        station: self.formItem.station,
        quality: self.formItem.quality,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        image: self.formItem.image,
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
        self.formItem.image = []
        self.imageData = []
        self.$axios.patch(`production/productData/` + response.data.id + '/', {
          state: '完成'
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
    /* 更新表单数据 */
    update () {
      var self = this
      if (!confirm('确认保存??')) {
        return
      }
      this.$axios.put(`production/productData/` + self.formItem.id + '/', {
        type: self.formItem.type,
        product_id: self.formItem.product,
        task_id: self.formItem.task,
        batch: self.formItem.batch,
        sn: self.formItem.sn,
        sum: self.formItem.sum,
        personnel: self.formItem.personnel,
        equipment: self.formItem.equipment,
        material: self.formItem.material,
        station: self.formItem.station,
        quality: self.formItem.quality,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        image: self.formItem.image,
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
        alert('数据保存成功')
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
      this.$axios.put(`production/productData/` + self.formItem.id + '/', {
        type: self.formItem.type,
        product_id: self.formItem.product,
        task_id: self.formItem.task,
        batch: self.formItem.batch,
        sn: self.formItem.sn,
        sum: self.formItem.sum,
        personnel: self.formItem.personnel,
        equipment: self.formItem.equipment,
        material: self.formItem.material,
        station: self.formItem.station,
        quality: self.formItem.quality,
        dataTime: self.formItem.dataTime,
        file: self.formItem.file,
        image: self.formItem.image,
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
        self.formItem.image = []
        self.imageData = []
        self.$axios.patch(`production/productData/` + response.data.id + '/', {
          state: '完成'
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
    this.typeInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.$axios.get('production/productDataType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
        self.$axios.get('plan/productTaskType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.taskType = response.data.results
          self.$axios.get('process/productType/?page_size=99999&ordering=-id').then(function (response) {
            self.productType = response.data.results
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
    selectItem: {
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
        // 错误提示
        console.log(err)
      })
    },
    'formItem.taskType': function (newval, oldval) {
      var self = this
      this.taskInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      this.$axios.get('plan/productTaskCreate/?page_size=99999&ordering=-id&state=使用中' +
        '&type=' + newval).then(function (response) {
        self.taskInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    'formItem.task': function (newval, oldval) {
      var self = this
      this.taskItem = []
      this.taskItem_productType = []
      if (newval === undefined || newval === '') {
        return
      }
      this.$axios.get(`plan/productTaskCreate/` + newval).then(function (response) {
        response.data.child.forEach(function (value, i) {
          self.taskItem.push(value.salesOrderItem)
        })
        var productType = []
        self.taskItem.forEach(function (value, i) {
          var obj
          obj = {
            productType_code: value.productType_code,
            productType_name: value.productType_name
          }
          productType.push(obj)
        })
        let hash = {}
        self.taskItem_productType = productType.reduce((item, next) => {
          // eslint-disable-next-line no-unused-expressions
          hash[next.productType_code] ? '' : hash[next.productType_code] = true && item.push(next)
          return item
        }, [])
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    'formItem.productType': function (newval, oldval) {
      this.taskItem_product = []
      if (newval === undefined || newval === '') {
        return
      }
      var self = this
      var productInfor = []
      this.taskItem.forEach(function (value, i) {
        if (newval === value.productType_code) {
          var obj
          obj = {
            product_id: value.product_id,
            product_code: value.product_code,
            product_name: value.product_name
          }
          productInfor.push(obj)
        }
      })
      let hash = {}
      self.taskItem_product = productInfor.reduce((item, next) => {
        // eslint-disable-next-line no-unused-expressions
        hash[next.product_id] ? '' : hash[next.product_id] = true && item.push(next)
        return item
      }, [])
    },
    'selectItem.taskType': function (newval, oldval) {
      var self = this
      this.taskInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      // eslint-disable-next-line camelcase
      var taskType_id = ''
      this.taskType.forEach(function (value, i) {
        if (newval === value.code) {
          // eslint-disable-next-line camelcase
          taskType_id = value.id
        }
      })
      this.$axios.get('plan/productTaskCreate/?page_size=99999&ordering=-id&state=使用中' +
        // eslint-disable-next-line camelcase
        '&type=' + taskType_id).then(function (response) {
        self.taskInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    'selectItem.productType': function (newval, oldval) {
      var self = this
      this.productInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      // eslint-disable-next-line camelcase
      var productType_id = ''
      this.productType.forEach(function (value, i) {
        if (newval === value.code) {
          // eslint-disable-next-line camelcase
          productType_id = value.id
        }
      })
      this.$axios.get('process/productInfor/?page_size=99999&ordering=-id&state=使用中' +
        // eslint-disable-next-line camelcase
        '&type=' + productType_id).then(function (response) {
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
  .productData {
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
          div:nth-child(7) {
            width: 25%;
          }
          div:nth-child(8) {
            width: 25%;
          }
          div:nth-child(9) {
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
                width: 8em;
              }
              &:nth-child(5){
                width: 8em;
              }
              &:nth-child(6){
                width: 8em;
              }
              &:nth-child(7){
                width: 5em;
              }
              &:nth-child(8){
                width: 5em;
              }
              &:nth-child(9){
                width: 3em;
              }
              &:nth-child(10){
                width: 8em;
              }
              &:nth-child(11){
                width: 5em;
              }
              &:nth-child(12){
                width: 6em;
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
              width: 100%;
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
                  width: 10em;
                }
                &:nth-child(5){
                  width: 5em;
                }
                &:nth-child(6){
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
