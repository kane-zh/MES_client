<template>
  <div class="productTaskCreate">
    <!-- 列表页显示-->
    <div  class="list"  v-if="showViewid==='list'">
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
          <div>分类:
            <select v-model="selectItem.type" placeholder="请选择分类"      >
              <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
            </select>
          </div>
          <div>状态:
            <select v-model="selectItem.state"  placeholder="请选择状态"    >
              <option value="新建">新建</option>
              <option value="审核中">审核中</option>
              <option value="使用中">使用中</option>
              <option value="挂起">挂起</option>
              <option value="终止">终止</option>
              <option value="完成">完成</option>
            </select>
          </div>
          <div>优先级:
            <select v-model="selectItem.priority"  placeholder="请选择优先级"    >
              <option value="正常">正常</option>
              <option value="优先">优先</option>
              <option value="紧急">紧急</option>
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
          <button type="button" @click="showCreatView"  v-show="canCreate===true">添加生产任务</button>
        </div>

      </div>
      <div class="listTable">
          <div class="table">
            <table >
              <tr align="center"  type="height:2em">
                <th>序号</th>
                <th>名称</th>
                <th>编码</th>
                <th>分类</th>
                <th>状态</th>
                <th>优先级</th>
                <th>交期</th>
                <th>更新日期</th>
                <th>创建账号</th>
                <th>审核账号</th>
                <th>操作</th>
              </tr>
              <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
                <td>{{index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.code}}</td>
                <td>{{item.type.name+"("+item.type.code+")"}}</td>
                <td>{{item.state}}</td>
                <td>{{item.priority}}</td>
                <td>{{item.delivery_time}}</td>
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
    <!--   /*详情页显示*/-->
    <div  class="detail"  v-show="showViewid==='detail'">
      <div class="content">
        <ul>
          <li>{{"名称:"+"&#12288;"+detail.name}}</li>
          <li>{{"编码:"+"&#12288;"+detail.code}}</li>
          <li>{{"分类:"+"&#12288;"+type.name+"("+type.code+")"}}</li>
          <li>{{"状态:"+"&#12288;"+detail.state}}</li>
          <li>{{"优先级:"+"&#12288;"+detail.priority}}</li>
          <li>{{"交付日期:"+"&#12288;"+detail.delivery_time}}</li>
          <li v-if="attribute_title.attribute1!==''">{{attribute_title.attribute1 +":"+"&#12288;"+detail.attribute1}}</li>
          <li v-if="attribute_title.attribute2!==''">{{attribute_title.attribute2 +":"+"&#12288;"+detail.attribute2}}</li>
          <li v-if="attribute_title.attribute3!==''">{{attribute_title.attribute3 +":"+"&#12288;"+detail.attribute3}}</li>
          <li v-if="attribute_title.attribute4!==''">{{attribute_title.attribute4 +":"+"&#12288;"+detail.attribute4}}</li>
          <li v-if="attribute_title.attribute5!==''">{{attribute_title.attribute5 +":"+"&#12288;"+detail.attribute5}}</li>
          <li>{{"创建账号:"+"&#12288;"+detail.create_user}}</li>
          <li>{{"审核账号:"+"&#12288;"+detail.auditor}}</li>
          <li>{{"创建时间:"+"&#12288;"+detail.create_time}}</li>
          <li>{{"更新时间:"+"&#12288;"+detail.update_time}}</li>
          <li>{{"备注信息:"+"&#12288;"+detail.desc}}</li>
        </ul>
        <Collapse active-key="3" accordion v-if="list_child!==undefined && list_child.length > 0">
          产品生产任务单子项:
          <Panel >
            <div  slot="content">
              <table >
                <tr align="center"  type="height:2em">
                  <th>序号</th>
                  <th>订单</th>
                  <th>产品分类</th>
                  <th>产品</th>
                  <th>批次</th>
                  <th>生产线路分类</th>
                  <th>生产线路</th>
                  <th>状态</th>
                  <th>数量</th>
                  <th>说明</th>
                  <th>操作</th>
                </tr>
                <tr align="center" v-for="(item,index) in list_child" :key="item.id" type="height:1em" >
                  <td>{{index}}</td>
                  <td>{{item.salesOrder_name+"("+item.salesOrder_code+")"}}</td>
                  <td>{{item.productType_name+"("+item.productType_code+")"}}</td>
                  <td>{{item.product_name+"("+item.product_code+")"}}</td>
                  <td>{{item.batch}}</td>
                  <td>{{item.routeType_name+"("+item.routeType_code+")"}}</td>
                  <td>{{item.route_name+"("+item.route_code+")"}}</td>
                  <td>{{item.state}}</td>
                  <td>{{item.sum}}</td>
                  <td>{{item.desc}}</td>
                  <td>
                    <button type="button" @click="endChild(item.id)" v-show="item.state!=='完成'">终止</button>
                    <button type="button" @click="pendingChild(item.id)" v-show="item.state==='等待'">挂起</button>
                    <button type="button" @click="pendingFreedChild(item.id)" v-show="item.state==='挂起'">解挂</button>
                  </td>
                </tr>
                <tr>

                </tr>
              </table>
            </div>
          </Panel>
        </Collapse>
        <dl>
          <dt>文件附件:</dt>
          <template v-for="(value,id) in detail.file">
            <a target='_black' v-bind:key="id" :href="value.file">{{value.file_name}}</a>
          </template>
        </dl>
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
      <div class="alter" v-if="detail.state!=='使用中'&&detail.state!=='完成'">
        审核信息:
        <textarea v-model="alterItem.desc"  placeholder="请输入当前信息的审核记录..."></textarea>
        <button type="button" @click="uploadAlter">提交记录</button>
      </div>
      <div class="button">
        <button type="button" @click="changeState('审核中')" v-show="showSubmitBt===true">提交数据</button>
        <button type="button" @click="changeState('使用中')" v-show="showApprovedBt===true" >通过审核</button>
        <button type="button" @click="changeState('新建')" v-show="showReturnBt===true">驳回信息</button>
        <button type="button" @click="changeState('作废')" v-show="showDeleteBt===true">删除数据</button>
        <button type="button" @click="changeState('挂起')" v-show="showPendingBt===true" >挂起</button>
        <button type="button" @click="changeState('使用中')" v-show="showPendingFreedBt===true" >解除挂起</button>
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
        <div>分类:
          <select v-model="formItem.type"   placeholder="请选择分类">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
          <span class="message" v-if="!$v.formItem.type.required">请选择分类</span>
        </div>
        <div>优先级:
          <select  v-model="formItem.priority" placeholder="请选择优先级"     >
            <option value="正常">正常</option>
            <option value="优先">优先</option>
            <option value="紧急">紧急</option>
          </select>
          <span class="message" v-if="!$v.formItem.priority.required">请选择优先级</span>
        </div>
        <div>交付日期:
          <input v-model="formItem.delivery_time"  type="datetime-local" placeholder="选择日期和时间" >
          <span class="message" v-if="!$v.formItem.delivery_time.required">请选择日期</span>
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
        <div>

        </div>
        <div>

        </div>
        <div>
          <button type="button" @click="showChildForm='true'" >添加子项</button>
        </div>
        <div v-show="showChildForm==='true'" class="child">
          <form>
            <div>销售订单:
              <select v-model="formItem_child.salesOrder" >
                <option v-for="item in salesOrder" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>销售订单子项:
              <select v-model="formItem_child.salesOrderItem" >
                <option v-for="item in salesOrderItem" :value="item.id" :key="item.id">{{item.product_name +"("+ item.product_code+")"+"["+ item.batch+"]"}}</option>
              </select>
            </div>
            <div>生产线路分类:
              <select v-model="formItem_child.productRouteType" >
                <option v-for="item in productRouteType" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>生产线路:
              <select v-model="formItem_child.productRoute" >
                <option v-for="item in productRoute" :value="item.id" :key="item.id">{{item.name + item.code}}</option>
              </select>
            </div>
            <div>总数量:
              <input type="number" v-model="formItem_child.sum">
            </div>
            <div v-show="attribute_title_child.attribute1!==''" >{{attribute_title_child.attribute1}}
              <input v-model="formItem.attribute1"  type="datetime-local" placeholder="选择日期和时间">
            </div>
            <div v-show="attribute_title_child.attribute2!==''" >{{attribute_title_child.attribute2}}
              <input v-model="formItem_child.attribute2"  placeholder="...">
            </div>
            <div v-show="attribute_title_child.attribute3!==''" >{{attribute_title_child.attribute3}}
              <input v-model="formItem_child.attribute3"  placeholder="...">
            </div>
            <div v-show="attribute_title_child.attribute4!==''" >{{attribute_title_child.attribute4}}
              <input v-model="formItem_child.attribute4"  placeholder="...">
            </div>
            <div v-show="attribute_title_child.attribute5!==''" >{{attribute_title_child.attribute5}}
              <input v-model="formItem_child.attribute5"  placeholder="...">
            </div>
            <div>备注信息:
              <textarea v-model="formItem_child.desc" placeholder="请输入当前产品说明信息..."></textarea>
            </div>
            <div>
              <button type="button" @click="uploadChild">添加</button>
              <button type="button" @click="showChildForm='false'">取消</button>
            </div>
          </form>
        </div>
        <table v-show="list_child.length>0">
          <caption align="top">已添加子项:</caption>
          <tr align="center"  type="height:2em">
            <th>序号</th>
            <th>订单</th>
            <th>产品分类</th>
            <th>产品</th>
            <th>批次</th>
            <th>生产线路分类</th>
            <th>生产线路</th>
            <th>数量</th>
            <th>说明</th>
            <th>操作</th>
          </tr>
          <tr align="center" v-for="(item,index) in list_child" :key="item.id" type="height:1em" >
            <td>{{index}}</td>
            <td>{{item.salesOrder_name+"("+item.salesOrder_code+")"}}</td>
            <td>{{item.productType_name+"("+item.productType_code+")"}}</td>
            <td>{{item.product_name+"("+item.product_code+")"}}</td>
            <td>{{item.batch}}</td>
            <td>{{item.routeType_name+"("+item.routeType_code+")"}}</td>
            <td>{{item.route_name+"("+item.route_code+")"}}</td>
            <td>{{item.sum}}</td>
            <td>{{item.desc}}</td>
            <td>
              <button type="button" @click="removeChild(item.id)">移除</button>
            </td>
          </tr>
          <tr>

          </tr>
        </table>
      </form>
      <div class="button">
        <button type="button" @click="save">保存数据</button>
        <button type="button" @click="saveAndSubmit">保存并提交</button>
        <button type="button" @click="showViewid='list'">返回列表页</button>
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
        <div>分类:
          <select v-model="formItem.type"   placeholder="请选择分类">
            <option v-for="item in typeInfor" :value="item.id" :key="item.id">{{item.name+"("+item.code+")"}}</option>
          </select>
          <span class="message" v-if="!$v.formItem.type.required">请选择分类</span>
        </div>
        <div>优先级:
          <select  v-model="formItem.priority" placeholder="请选择优先级"     >
            <option value="正常">正常</option>
            <option value="优先">优先</option>
            <option value="紧急">紧急</option>
          </select>
          <span class="message" v-if="!$v.formItem.priority.required">请选择优先级</span>
        </div>
        <div>交付日期:
          <input v-model="formItem.delivery_time"  type="datetime-local" placeholder="选择日期和时间" >
          <span class="message" v-if="!$v.formItem.delivery_time.required">请选择日期</span>
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
        <div>

        </div>
        <div>

        </div>
        <div>
          <button type="button" @click="showChildForm='true'" >添加子项</button>
        </div>
        <div v-show="showChildForm==='true'" class="child">
          <form>
            <div>销售订单:
              <select v-model="formItem_child.salesOrder" >
                <option v-for="item in salesOrder" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>销售订单子项:
              <select v-model="formItem_child.salesOrderItem" >
                <option v-for="item in salesOrderItem" :value="item.id" :key="item.id">{{item.product_name +"("+ item.product_code+")"+"["+ item.batch+"]"}}</option>
              </select>
            </div>
            <div>生产线路分类:
              <select v-model="formItem_child.productRouteType" >
                <option v-for="item in productRouteType" :value="item.id" :key="item.id">{{item.name +"("+ item.code+")"}}</option>
              </select>
            </div>
            <div>生产线路:
              <select v-model="formItem_child.productRoute" >
                <option v-for="item in productRoute" :value="item.id" :key="item.id">{{item.name + item.code}}</option>
              </select>
            </div>
            <div>总数量:
              <input type="number" v-model="formItem_child.sum">
            </div>
            <div v-show="attribute_title_child.attribute1!==''" >{{attribute_title_child.attribute1}}
              <input v-model="formItem.attribute1"  type="datetime-local" placeholder="选择日期和时间">
            </div>
            <div v-show="attribute_title_child.attribute2!==''" >{{attribute_title_child.attribute2}}
              <input v-model="formItem_child.attribute2"  placeholder="...">
            </div>
            <div v-show="attribute_title_child.attribute3!==''" >{{attribute_title_child.attribute3}}
              <input v-model="formItem_child.attribute3"  placeholder="...">
            </div>
            <div v-show="attribute_title_child.attribute4!==''" >{{attribute_title_child.attribute4}}
              <input v-model="formItem_child.attribute4"  placeholder="...">
            </div>
            <div v-show="attribute_title_child.attribute5!==''" >{{attribute_title_child.attribute5}}
              <input v-model="formItem_child.attribute5"  placeholder="...">
            </div>
            <div>备注信息:
              <textarea v-model="formItem_child.desc" placeholder="请输入当前产品说明信息..."></textarea>
            </div>
            <div>
              <button type="button" @click="uploadChild">添加</button>
              <button type="button" @click="showChildForm='false'">取消</button>
            </div>
          </form>
        </div>
        <table v-show="list_child.length>0">
          <caption align="top">已添加子项:</caption>
          <tr align="center"  type="height:2em">
            <th>序号</th>
            <th>订单</th>
            <th>产品分类</th>
            <th>产品</th>
            <th>批次</th>
            <th>生产线路分类</th>
            <th>生产线路</th>
            <th>数量</th>
            <th>说明</th>
            <th>操作</th>
          </tr>
          <tr align="center" v-for="(item,index) in list_child" :key="item.id" type="height:1em" >
            <td>{{index}}</td>
            <td>{{item.salesOrder_name+"("+item.salesOrder_code+")"}}</td>
            <td>{{item.productType_name+"("+item.productType_code+")"}}</td>
            <td>{{item.product_name+"("+item.product_code+")"}}</td>
            <td>{{item.batch}}</td>
            <td>{{item.routeType_name+"("+item.routeType_code+")"}}</td>
            <td>{{item.route_name+"("+item.route_code+")"}}</td>
            <td>{{item.sum}}</td>
            <td>{{item.desc}}</td>
            <td>
              <button type="button" @click="removeChild(item.id)">移除</button>
            </td>
          </tr>
          <tr>

          </tr>
        </table>
        <div>历史审核记录:
          <ul>
            <li v-for="value in alterList" v-bind:key="value.id" >
              {{value.desc+value.create_time+value.create_user}}
            </li>
          </ul>
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
  name: 'productTaskcreate',
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
        type: '',
        priority: '',
        create_user: '',
        auditor: '',
        searchValue: '',
        start_time: '',
        stop_time: ''
      },

      /* 详情页数据 */
      detail: [],
      type: {},
      /* 详情页审核记录项表单 */
      alterItem: {
        desc: '',
        uri: 'productTaskcreate'
      },
      alterList: [],
      alterData: [],
      /* 详情页按钮显示控制 */
      showSubmitBt: false,
      showReturnBt: false,
      showApprovedBt: false,
      showDeleteBt: false,
      showPendingBt: false,
      showPendingFreedBt: false,
      showEndBt: false,
      /* 创建页表单项数据 */
      formItem: {
        id: '',
        name: '',
        code: '',
        type: null,
        state: '',
        priority: '',
        delivery_time: '',
        child: [],
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
        salesOrder: null,
        salesOrderItem: null,
        productRouteType: null,
        productRoute: null,
        sum: 0,
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: '',
        desc: ''
      },
      /* 创建页文件项表单 */
      fileItem: {
        file: null,
        fileName: '',
        desc: '',
        uri: 'productTaskcreate'
      },
      fileData: [],
      typeInfor: [],
      /* 具有审核权限的账号信息 */
      userinfor: [],
      /* 销售订单信息 */
      salesOrder: [],
      /* 订单子项 */
      salesOrderItem: [],
      /* 工艺路线分类 */
      productRouteType: [],
      productRoute: [],
      /* 附加属性标题 */
      attribute_title: {
        attribute1: '',
        attribute2: '',
        attribute3: '',
        attribute4: '',
        attribute5: ''
      },
      /* 子项附加属性标题 */
      attribute_title_child: {
        attribute1: ':',
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
      type: {
        required
      },
      auditor: {
        required
      },
      priority: {
        required
      },
      delivery_time: {
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
      this.$axios.get('plan/productTaskCreate/?ordering=' + self.ordering).then(function (response) {
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
      this.$axios.get('plan/productTaskCreate/?state=' + self.selectItem.state +
              '&type=' + self.selectItem.type +
              '&priority=' + self.selectItem.priority +
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
      this.list_child = []
      this.type = {}
      var self = this
      this.$axios.get(`plan/productTaskCreate/` + id).then(function (response) {
        self.detail = response.data
        self.type = self.detail.type
        self.formItem.type = self.detail.type.id
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'state': value.state,
            'salesOrder_code': value.salesOrderItem.salesOrderItem_parent[0].code,
            'salesOrder_name': value.salesOrderItem.salesOrderItem_parent[0].name,
            'productType_code': value.salesOrderItem.productType_code,
            'productType_name': value.salesOrderItem.productType_name,
            'product_name': value.salesOrderItem.product_name,
            'product_code': value.salesOrderItem.product_code,
            'batch': value.salesOrderItem.batch,
            'routeType_code': value.routeType_code,
            'routeType_name': value.routeType_name,
            'route_code': value.route_code,
            'route_name': value.route_name,
            'sum': value.sum,
            'assigned': value.assigned,
            'attribute1': value.attribute1,
            'attribute2': value.attribute2,
            'attribute3': value.attribute3,
            'attribute4': value.attribute4,
            'attribute5': value.attribute5,
            'desc': value.desc
          }
          self.formItem.child.push(value.id)
          self.list_child.push(obj1)
        })
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
      this.$axios.patch(`plan/productTaskCreate/` + self.detail.id + '/', {
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
        if (self.detail.state === '使用中' || self.detail.state === '终止' || self.detail.state === '挂起') {
          self.showDetailView(self.detail.id)
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
    /* 改变数据项状态 */
    endChild (id) {
      var self = this
      this.$axios.patch(`plan/productTaskItemCreate/` + id + '/', {
        state: '终止'
      }).then(function (response
      ) {
        self.showDetailView(self.detail.id)
        alert('数据提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    pendingFreedChild (id) {
      var self = this
      this.$axios.patch(`plan/productTaskItemCreate/` + id + '/', {
        state: '等待'
      }).then(function (response
      ) {
        self.showDetailView(self.detail.id)
        alert('数据提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    pendingChild (id) {
      var self = this
      this.$axios.patch(`plan/productTaskItemCreate/` + id + '/', {
        state: '挂起'
      }).then(function (response
      ) {
        self.showDetailView(self.detail.id)
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
      /* 清空子项表单数据 */
      for (let key in this.formItem_child) {
        if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Array]') {
          this.formItem_child[key] = []
        } else if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Object]') {
          var obj1 = this.formItem_child[key]
          for (let key1 in obj1) {
            if (Object.prototype.toString.call(obj1[key1]) === '[object Array]') {
              obj1[key1] = []
            } else {
              obj1[key1] = ''
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
          this.formItem_pchild[key] = []
        } else if (Object.prototype.toString.call(this.formItem_child[key]) === '[object Object]') {
          var obj1 = this.formItem_child[key]
          for (let key1 in obj1) {
            if (Object.prototype.toString.call(obj1[key1]) === '[object Array]') {
              obj1[key1] = []
            } else {
              obj1[key1] = ''
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
      this.$axios.get(`plan/productTaskCreate/` + id).then(function (response) {
        self.formItem.id = response.data.id
        self.formItem.name = response.data.name
        self.formItem.code = response.data.code
        self.formItem.state = response.data.state
        self.formItem.priority = response.data.priority
        self.formItem.delivery_time = response.data.delivery_time
        self.formItem.attribute1 = response.data.attribute1
        self.formItem.attribute2 = response.data.attribute2
        self.formItem.attribute3 = response.data.attribute3
        self.formItem.attribute4 = response.data.attribute4
        self.formItem.attribute5 = response.data.attribute5
        self.formItem.desc = response.data.desc
        self.formItem.auditor = response.data.auditor
        self.alterList = response.data.alter
        if (response.data.type !== null) {
          self.formItem.type = response.data.type.id
        } else { self.formItem.type = response.data.type }
        response.data.child.forEach(function (value, i) {
          var obj1 = {'id': value.id,
            'state': value.state,
            'salesOrder_code': value.salesOrderItem.salesOrderItem_parent[0].code,
            'salesOrder_name': value.salesOrderItem.salesOrderItem_parent[0].name,
            'productType_code': value.salesOrderItem.productType_code,
            'productType_name': value.salesOrderItem.productType_name,
            'product_name': value.salesOrderItem.product_name,
            'product_code': value.salesOrderItem.product_code,
            'batch': value.salesOrderItem.batch,
            'routeType_code': value.routeType_code,
            'routeType_name': value.routeType_name,
            'route_code': value.route_code,
            'route_name': value.route_name,
            'sum': value.sum,
            'attribute1': value.attribute1,
            'attribute2': value.attribute2,
            'attribute3': value.attribute3,
            'attribute4': value.attribute4,
            'attribute5': value.attribute5,
            'desc': value.desc
          }
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
      this.$axios.post(`plan/file/`, formData,
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
      this.$axios.post(`plan/alterRecord/`, {
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
    /* 提交子项产品项 */
    uploadChild () {
      var self = this
      this.$axios.post(`plan/productTaskItemCreate/`, {
        state: self.formItem_child.state,
        salesOrderItem: self.formItem_child.salesOrderItem,
        route_id: self.formItem_child.productRoute,
        sum: self.formItem_child.sum,
        attribute1: self.formItem_child.attribute1,
        attribute2: self.formItem_child.attribute2,
        attribute3: self.formItem_child.attribute3,
        attribute4: self.formItem_child.attribute4,
        attribute5: self.formItem_child.attribute5,
        desc: self.formItem_child.desc
      }).then(function (response) {
        self.showChildForm = ''
        var index = 0
        for (var i = 0; i < self.salesOrderItem.length; i++) {
          if (self.salesOrderItem[i].id === response.data.salesOrderItem) {
            index = i
            break
          }
        }
        var index1 = 0
        for (var j = 0; j < self.salesOrder.length; j++) {
          if (self.salesOrder[j].id === self.formItem_child.salesOrder) {
            index1 = j
            break
          }
        }
        // var index2 = 0
        // if (response.data.route_id !=='') {
        //   for (var k = 0; k < self.productRoute.length; k++) {
        //     if (self.productRoute[k].id === parseInt(response.data.route_id)) {
        //       index2 = k
        //       break
        //     }
        //   }
        // }
        // var index3 = 0
        // for (var l = 0; l < self.productRouteType.length; l++) {
        //   if (self.productRouteType[l].id === self.formItem_child.productRouteType) {
        //     index3 = l
        //     break
        //   }
        // }
        var obj = {
          'id': response.data.id,
          'salesOrder_code': self.salesOrder[index1].code,
          'salesOrder_name': self.salesOrder[index1].name,
          'productType_code': self.salesOrderItem[index].productType_code,
          'productType_name': self.salesOrderItem[index].productType_name,
          'product_name': self.salesOrderItem[index].product_name,
          'product_code': self.salesOrderItem[index].product_code,
          // 'route_code': self.productRoute[index2].code,
          // 'route_name': self.productRoute[index2].name,
          // 'routeType_code': self.productRouteType[index3].code,
          // 'routeType_name': self.productRouteType[index3].name,
          'sum': response.data.sum,
          'attribute1': response.data.attribute1,
          'attribute2': response.data.attribute2,
          'attribute3': response.data.attribute3,
          'attribute4': response.data.attribute4,
          'attribute5': response.data.attribute5,
          'desc': response.data.desc
        }
        self.list_child.push(obj)
        self.formItem.child.push(response.data.id)
        self.formItem_child.productRouteType = ''
        self.formItem_child.productRoute = ''
        self.formItem_child.salesOrder = ''
        self.formItem_child.salesOrderItem = ''
        self.formItem_child.sum = ''
        self.formItem_child.attribute1 = ''
        self.formItem_child.attribute2 = ''
        self.formItem_child.attribute3 = ''
        self.formItem_child.attribute4 = ''
        self.formItem_child.attribute5 = ''
        self.formItem_child.desc = ''
        alert('记录提交成功')
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
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
      this.$axios.post(`plan/productTaskCreate/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        priority: self.formItem.priority,
        delivery_time: self.formItem.delivery_time,
        child: self.formItem.child,
        file: self.formItem.file,
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
      this.$axios.put(`plan/productTaskCreate/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        priority: self.formItem.priority,
        delivery_time: self.formItem.delivery_time,
        child: self.formItem.child,
        file: self.formItem.file,
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
      this.$axios.post(`plan/productTaskCreate/`, {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        priority: self.formItem.priority,
        delivery_time: self.formItem.delivery_time,
        child: self.formItem.child,
        file: self.formItem.file,
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
        self.$axios.patch(`plan/productTaskCreate/` + response.data.id + '/', {
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
      this.$axios.put(`plan/productTaskCreate/` + self.formItem.id + '/', {
        name: self.formItem.name,
        code: self.formItem.code,
        type: self.formItem.type,
        priority: self.formItem.priority,
        delivery_time: self.formItem.delivery_time,
        child: self.formItem.child,
        file: self.formItem.file,
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
        self.$axios.patch(`plan/productTaskCreate/` + response.data.id + '/', {
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
      self.$axios.get('process/productRouteType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.productRouteType = response.data.results
        self.$axios.get('plan/salesOrderCreate/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.salesOrder = response.data.results
          self.$axios.get('plan/productTaskType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
            self.typeInfor = response.data.results
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
  mounted () {
    this.attribute_title_child = this.$store.getters.getConfig.attach_attribute.产品生产任务单子项
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
      return 'plan.add_producttaskcreatemodel' in this.permissions
    },
    canRead () {
      return 'plan.read_producttaskcreatemodel' in this.permissions
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
      this.$axios.get(`plan/productTaskType/` + newval).then(function (response) {
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
    /* 监控状态信息变化,控制操作按钮的显示 */
    /* 监控信息状态改变时,更新操作按钮状态 */
    'detail.state': function (newval, oldval) {
      var self = this
      self.showSubmitBt = false
      self.showDeleteBt = false
      self.showReturnBt = false
      self.showApprovedBt = false
      self.showEndBt = false
      self.showPendingBt = false
      self.showPendingFreedBt = false
      if (self.detail.state === '审核中' && ((self.detail.auditor === self.username) || (self.is_superuser === true))) {
        self.showApprovedBt = true
        self.showReturnBt = true
      }
      if (self.detail.state === '审核中' && ((self.detail.auditor === self.username) || (self.is_superuser === true))) {
        self.showApprovedBt = true
        self.showReturnBt = true
      }
      if (self.detail.state === '使用中' && (('plan.deal_producttaskcreatemodel' in this.permissions) || (self.is_superuser === true))) {
        self.showEndBt = true
        self.showPendingBt = true
      }
      if (self.detail.state === '挂起' && (('plan.deal_producttaskcreatemodel' in this.permissions) || (self.is_superuser === true))) {
        self.showPendingFreedBt = true
      }
      if (self.detail.state === '新建' && ((self.detail.create_user === self.username) || (self.is_superuser === true))) {
        self.showSubmitBt = true
        self.showDeleteBt = true
      }
    },
    formItem_child: {
      deep: true
    },
    'formItem_child.salesOrder': function (newval, oldval) {
      var self = this
      this.salesOrderItem = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`plan/salesOrderCreate/` + newval).then(function (response) {
        self.salesOrderItem = response.data.child
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    },
    'formItem_child.productRouteType': function (newval, oldval) {
      var self = this
      this.productRoute = []
      if (newval === undefined) {
        return
      }
      this.$axios.get(`process/productRouteType/` + newval).then(function (response) {
        self.productRoute = response.data.productRouteType_item
      }).catch(function (err) {
        if (err.request) {
          alert(err.request.response)
        } else {
          console.log('Error', err.message)
        }
      })
    }
  }
}
</script>
<style scoped>
  .productTaskCreate{
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
