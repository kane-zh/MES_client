<template>
  <div class="body">
      <div class="heard">
          <div class="heard-logo" :style ="{'background-image':
          'url('+require('../../../static/icons/logo.png')+')'}">
          </div>
          <div class="heard-nav" >
            <div> {{username}}
            </div>
            <div>
                <button type="button" @click="logout" >
                <img  height=90% src="../../../static/icons/set-up.png"/>
              </button>
            </div>
            <div>
              <router-link to="/register">
                <img  height=90% src="../../../static/icons/login.jpg"/>
              </router-link>
            </div>
          </div>
      </div>
      <div class="sliders" >
        <div class="mainSlider" >
          <ul>
            <dl @click="showMenuItem('user')">
              <dt>
                <img src="../../../static/icons/userManagement_hover.png" v-if="mainMenuSelect==='user'" />
                <img src="../../../static/icons/userManagement.png" v-if="mainMenuSelect!=='user'" />
              </dt>
              <dd >
                账号管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('process')">
              <dt>
                <img src="../../../static/icons/processManagement_hover.png" v-if="mainMenuSelect==='process'" />
                <img src="../../../static/icons/processManagement.png" v-if="mainMenuSelect!=='process'" />
              </dt>
              <dd >
                工艺管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('warehouse')">
              <dt>
                <img src="../../../static/icons/warehouseManagement_hover.png" v-if="mainMenuSelect==='warehouse'" />
                <img src="../../../static/icons/warehouseManagement.png" v-if="mainMenuSelect!=='warehouse'" />
              </dt>
              <dd >
                仓库管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('quality')">
              <dt>
                <img src="../../../static/icons/qualityManagement_hover.png" v-if="mainMenuSelect==='quality'" />
                <img src="../../../static/icons/qualityManagement.png" v-if="mainMenuSelect!=='quality'" />
              </dt>
              <dd >
                品质管理
              </dd>
            </dl>
            <dl @click="showMenuItem('equipment')">
              <dt>
                <img src="../../../static/icons/deviceManagement_hover.png" v-if="mainMenuSelect==='equipment'" />
                <img src="../../../static/icons/deviceManagement.png" v-if="mainMenuSelect!=='equipment'" />
              </dt>
              <dd>
                设备管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('production')" >
              <dt>
                <img src="../../../static/icons/productionManagement_hover.png" v-if="mainMenuSelect==='production'" />
                <img src="../../../static/icons/productionManagement.png" v-if="mainMenuSelect!=='production'" />
              </dt>
              <dd >
                生产管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('plan')" >
              <dt>
                <img src="../../../static/icons/planManagement_hover.png" v-if="mainMenuSelect==='plan'" />
                <img src="../../../static/icons/planManagement.png" v-if="mainMenuSelect!=='plan'" />
              </dt>
              <dd >
                计划管理
              </dd >
            </dl>
            <dl   @click="showMenuItem('lean')">
              <dt>
                <img src="../../../static/icons/leanManagement_hover.png" v-if="mainMenuSelect==='lean'" />
                <img src="../../../static/icons/leanManagement.png" v-if="mainMenuSelect!=='lean'" />
              </dt>
              <dd>
                精益管理
              </dd >
            </dl>
          </ul>
        </div>
        <div class="childSlider">
          <div  v-show="MenuItem==='user'">
            <ul >
              <li :class="childMenuSelect==='userConfig'? 'isActive':'isInActive'"  @click="childMenuSelect='userConfig'">
                <router-link to="/home/user/userConfig">账号设置</router-link>
              </li>
              <li :class="childMenuSelect==='userAdmin'? 'isActive':'isInActive'"  @click="childMenuSelect='userAdmin'">
                <router-link to="/home/user/userAdmin">授权管理</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='process'">
            <ul>
              <li :class="childMenuSelect==='unitType'? 'isActive':'isInActive'"  @click="childMenuSelect='unitType'">
                <router-link to="/home/process/unitType">计量单位类型</router-link>
              </li>
              <li :class="childMenuSelect==='unitInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='unitInfor'">
                <router-link to="/home/process/unitInfor">计量单位信息</router-link>
              </li>
              <li :class="childMenuSelect==='materialType'? 'isActive':'isInActive'"  @click="childMenuSelect='materialType'">
                <router-link to="/home/process/materialType">物料类型</router-link>
              </li>
              <li :class="childMenuSelect==='materialInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='materialInfor'">
                <router-link to="/home/process/materialInfor">物料信息</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedType'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedType'">
                <router-link to="/home/process/semifinishedType">半成品类型</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedInfor'">
                <router-link to="/home/process/semifinishedInfor">半成品信息</router-link>
              </li>
              <li :class="childMenuSelect==='productType'? 'isActive':'isInActive'"  @click="childMenuSelect='productType'">
                <router-link to="/home/process/productType">产品类型</router-link>
              </li>
              <li :class="childMenuSelect==='productInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='productInfor'">
                <router-link to="/home/process/productInfor">产品信息</router-link>
              </li>
              <li :class="childMenuSelect==='stationType'? 'isActive':'isInActive'"  @click="childMenuSelect='stationType'">
                <router-link to="/home/process/stationType">工位类型</router-link>
              </li>
              <li :class="childMenuSelect==='stationInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='stationInfor'">
                <router-link to="/home/process/stationInfor">工位信息</router-link>
              </li>
              <li :class="childMenuSelect==='productRouteType'? 'isActive':'isInActive'"  @click="childMenuSelect='productRouteType'">
                <router-link to="/home/process/productRouteType">生产路线类型</router-link>
              </li>
              <li :class="childMenuSelect==='productRouteInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='productRouteInfor'">
                <router-link to="/home/process/productRouteInfor">生产路线</router-link>
              </li>
              <li :class="childMenuSelect==='processBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='processBoard'">
                <router-link to="/home/process/processBoard">工艺看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='warehouse'">
            <ul>
              <li :class="childMenuSelect==='warehouseInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='warehouseInfor'">
                <router-link to="/home/warehouse/warehouseInfor">仓库信息</router-link>
              </li>
              <li :class="childMenuSelect==='positionInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='positionInfor'">
                <router-link to="/home/warehouse/positionInfor">仓位信息</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentManage'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentManage'">
                <router-link to="/home/warehouse/equipmentManage">设备管理</router-link>
              </li>
              <li :class="childMenuSelect==='partsManage'? 'isActive':'isInActive'"  @click="childMenuSelect='partsManage'">
                <router-link to="/home/warehouse/partsManage">备品管理</router-link>
              </li>
              <li :class="childMenuSelect==='materialManage'? 'isActive':'isInActive'"  @click="childMenuSelect='materialManage'">
                <router-link to="/home/warehouse/materialManage">物料管理</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedManage'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedManage'">
                <router-link to="/home/warehouse/semifinishedManage">半成品管理</router-link>
              </li>
              <li :class="childMenuSelect==='productManage'? 'isActive':'isInActive'"  @click="childMenuSelect='productManage'">
                <router-link to="/home/warehouse/productManage">产品管理</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentStock'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentStock'">
                <router-link to="/home/warehouse/equipmentStock">设备库存</router-link>
              </li>
              <li :class="childMenuSelect==='partsStock'? 'isActive':'isInActive'"  @click="childMenuSelect='partsStock'">
                <router-link to="/home/warehouse/partsStock">备品库存</router-link>
              </li>
              <li :class="childMenuSelect==='materialStock'? 'isActive':'isInActive'"  @click="childMenuSelect='materialStock'">
                <router-link to="/home/warehouse/materialStock">物料库存</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedStock'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedStock'">
                <router-link to="/home/warehouse/semifinishedStock">半成品库存</router-link>
              </li>
              <li :class="childMenuSelect==='productStock'? 'isActive':'isInActive'"  @click="childMenuSelect='productStock'">
                <router-link to="/home/warehouse/productStock">产品库存</router-link>
              </li>
              <li :class="childMenuSelect==='materialWaringRule'? 'isActive':'isInActive'"  @click="childMenuSelect='materialWaringRule'">
                <router-link to="/home/warehouse/materialWaringRule">物料预警规则</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedWaringRule'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedWaringRule'">
                <router-link to="/home/warehouse/semifinishedWaringRule">半成品预警规则</router-link>
              </li>
              <li  :class="childMenuSelect==='productWaringRule'? 'isActive':'isInActive'"  @click="childMenuSelect='productWaringRule'">
                <router-link to="/home/warehouse/productWaringRule">产品预警规则</router-link>
              </li>
              <li :class="childMenuSelect==='warehouseBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='warehouseBoard'">
                <router-link  to="/home/warehouse/warehouseBoard">仓库看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='quality'">
            <ul >
              <li :class="childMenuSelect==='defectType'? 'isActive':'isInActive'"  @click="childMenuSelect='defectType'">
                <router-link to="/home/quality/defectType">缺陷类型</router-link>
              </li>
              <li :class="childMenuSelect==='defectGrade'? 'isActive':'isInActive'"  @click="childMenuSelect='defectGrade'">
                <router-link to="/home/quality/defectGrade">缺陷等级</router-link>
              </li>
              <li :class="childMenuSelect==='defectInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='defectInfor'">
                <router-link to="/home/quality/defectInfor">缺陷信息</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionStandardType'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionStandardType'">
                <router-link to="/home/quality/inspectionStandardType">检验标准类型</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionStandard'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionStandard'">
                <router-link to="/home/quality/inspectionStandard">检验标准信息</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionReportType'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionReportType'">
                <router-link to="/home/quality/inspectionReportType">检验汇报类型</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionReport'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionReport'">
                <router-link to="/home/quality/inspectionReport">检验汇报</router-link>
              </li>
              <li :class="childMenuSelect==='qualityBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='qualityBoard'">
                <router-link to="/home/quality/qualityBoard">品质看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='equipment'">
            <ul>
              <li :class="childMenuSelect==='equipmentVendor'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentVendor'">
                <router-link to="/home/equipment/equipmentVendor">设备厂商信息</router-link>
              </li>
              <li :class="childMenuSelect==='partsType'? 'isActive':'isInActive'"  @click="childMenuSelect='partsType'">
                <router-link to="/home/equipment/partsType">备品类型</router-link>
              </li>
              <li :class="childMenuSelect==='partsInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='partsInfor'">
                <router-link to="/home/equipment/partsInfor">备品信息</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentType'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentType'">
                <router-link to="/home/equipment/equipmentType">设备类型</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentInfor'">
                <router-link to="/home/equipment/equipmentInfor">设备台账</router-link>
              </li>
              <li :class="childMenuSelect==='maintainRecordType'? 'isActive':'isInActive'"  @click="childMenuSelect='maintainRecordType'">
                <router-link to="/home/equipment/maintainRecordType">维护记录类型</router-link>
              </li>
              <li :class="childMenuSelect==='maintainRecord'? 'isActive':'isInActive'"  @click="childMenuSelect='maintainRecord'">
                <router-link to="/home/equipment/maintainRecord">维护记录</router-link>
              </li>
              <li :class="childMenuSelect==='partsUseRecord'? 'isActive':'isInActive'"  @click="childMenuSelect='partsUseRecord'">
                <router-link to="/home/equipment/partsUseRecord">备品消耗记录</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentState'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentState'">
                <router-link to="/home/equipment/equipmentState">设备状态信息</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentBoard'">
                <router-link to="/home/equipment/equipmentBoard">设备看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='production'">
            <ul>
              <li :class="childMenuSelect==='workshopInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='workshopInfor'">
                <router-link to="/home/production/workshopInfor">车间信息</router-link>
              </li>
              <li :class="childMenuSelect==='teamInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='teamInfor'">
                <router-link to="/home/production/teamInfor">班组信息</router-link>
              </li>
              <li :class="childMenuSelect==='skillType'? 'isActive':'isInActive'"  @click="childMenuSelect='skillType'">
                <router-link to="/home/production/skillType">技能类型</router-link>
              </li>
              <li :class="childMenuSelect==='skillInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='skillInfor'">
                <router-link to="/home/production/skillInfor">技能信息</router-link>
              </li>
              <li :class="childMenuSelect==='personnelInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='personnelInfor'">
                <router-link to="/home/production/personnelInfor">人员信息</router-link>
              </li>
              <li :class="childMenuSelect==='assessmentType'? 'isActive':'isInActive'"  @click="childMenuSelect='assessmentType'">
                <router-link to="/home/production/assessmentType">考核类型</router-link>
              </li>
              <li :class="childMenuSelect==='assessmentLevel'? 'isActive':'isInActive'"  @click="childMenuSelect='assessmentLevel'">
                <router-link to="/home/production/assessmentLevel">考核等级</router-link>
              </li>
              <li :class="childMenuSelect==='assessmentRecord'? 'isActive':'isInActive'"  @click="childMenuSelect='assessmentRecord'">
                <router-link to="/home/production/assessmentRecord">考核记录</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedDailyReport'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedDailyReport'">
                <router-link to="/home/production/semifinishedDailyReport">半成品生产汇报</router-link>
              </li>
              <li :class="childMenuSelect==='productDailyReport'? 'isActive':'isInActive'"  @click="childMenuSelect='productDailyReport'">
                <router-link to="/home/production/productDailyReport">产品生产汇报</router-link>
              </li>
              <li :class="childMenuSelect==='productionBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='productionBoard'">
                <router-link to="/home/production/productionBoard">生产看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='plan'">
            <ul>
              <li :class="childMenuSelect==='clientType'? 'isActive':'isInActive'"  @click="childMenuSelect='clientType'">
                <router-link to="/home/plan/clientType">客户类型</router-link>
              </li>
              <li :class="childMenuSelect==='clientInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='clientInfor'">
                <router-link to="/home/plan/clientInfor">客户信息</router-link>
              </li>
              <li :class="childMenuSelect==='vendorType'? 'isActive':'isInActive'"  @click="childMenuSelect='vendorType'">
                <router-link to="/home/plan/vendorType">供应商类型</router-link>
              </li>
              <li :class="childMenuSelect==='vendorInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='vendorInfor'">
                <router-link to="/home/plan/vendorInfor">供应商信息</router-link>
              </li>
              <li :class="childMenuSelect==='salesOrderCreate'? 'isActive':'isInActive'"  @click="childMenuSelect='salesOrderCreate'" >
                <router-link to="/home/plan/salesOrderCreate">销售订单</router-link>
              </li>
              <li :class="childMenuSelect==='productTaskCreate'? 'isActive':'isInActive'"  @click="childMenuSelect='productTaskCreate'">
                <router-link to="/home/plan/productTaskCreate">产品生产任务</router-link>
              </li>
              <li :class="childMenuSelect==='seminishedTaskCreate'? 'isActive':'isInActive'"  @click="childMenuSelect='seminishedTaskCreate'">
                <router-link to="/home/plan/seminishedTaskCreate">半成品生产任务</router-link>
              </li>
              <li :class="childMenuSelect==='purchaseRequire'? 'isActive':'isInActive'"  @click="childMenuSelect='purchaseRequire'">
                <router-link to="/home/plan/purchaseRequire">物料需求</router-link>
              </li>
              <li :class="childMenuSelect==='materialManagePlan'? 'isActive':'isInActive'"  @click="childMenuSelect='materialManagePlan'">
                <router-link to="/home/plan/materialManagePlan">物料管理计划</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedManagePlan'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedManagePlan'">
                <router-link to="/home/plan/semifinishedManagePlan">半成品管理计划</router-link>
              </li>
              <li :class="childMenuSelect==='productManagePlan'? 'isActive':'isInActive'"  @click="childMenuSelect='productManagePlan'">
                <router-link to="/home/plan/productManagePlan">产品管理计划</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentMaintainPlan'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentMaintainPlan'">
                <router-link to="/home/plan/equipmentMaintainPlan">设备保养计划</router-link>
              </li>
              <li :class="childMenuSelect==='planBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='planBoard'">
                <router-link to="/home/plan/planBoard">计划看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='lean'">
            <ul>
              <li :class="childMenuSelect==='option1'? 'isActive':'isInActive'"  @click="childMenuSelect='option1'">
                <router-link >option1</router-link>
              </li>
              <li :class="childMenuSelect==='option2'? 'isActive':'isInActive'"  @click="childMenuSelect='option2'">
                <router-link >option2</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      MenuItem: '',
      mainMenuSelect: '',
      childMenuSelect: ''
    }
  },
  methods: {
    logout () {
      this.$store.commit({type: 'saveLoginInfor', name: '', id: '', token: ''})
      localStorage.removeItem('loginInfor')
      this.$router.push({name: 'login'})
    },
    showMenuItem (key) {
      this.MenuItem = key
      this.mainMenuSelect = key
    }
  },
  computed: {
    username () {
      return this.$store.getters.getLoginInfor.name
    }
  }
}
</script>
<style scoped>
  .body{
    position:fixed ;
    top: 0;
    height: 100%;
    width: 100%;
  }
  .heard{
    position: absolute;
    top:0;
    height: 8%;
    width: 100%;
    background: #22272A;
  }
  .heard-logo{
    position: absolute;
    bottom:10%;
    left: 5%;
    width: 20%;
    padding-top: 1em;
    background-size: 100%;
    background-size: cover;
    background-position: center;
  }
  .heard-nav{
    position: absolute;
    top:0;
    width: 40%;
    right: 10%;
    height: 100%;
    font-family: GurmukhiMN;
    font-size: 0.4em;
    line-height: 4em;
    letter-spacing: 0.1em;
    color: #FCC400 ;
  }
  .heard-nav div{
    position: relative;
    height: 100%;
    margin-right: 3em;
    text-align: center;
    float: right;

  }
  .heard-nav button{
    position:relative ;
    top: 10%;
    height: 90%;
    background: #22272A;
    border:none;
    color: #FCC400 ;
  }
  .heard-nav a{
    position:relative ;
    top: 10%;
    height: 90%;
    display: block;
    color: #FCC400 ;
  }
  .sliders{
    position: absolute;
    top: 8%;
    height:92% ;
    width: 14%;
  }
  .mainSlider{
    position: absolute;
    top: 0;
    height:100% ;
    width: 45%;
    background: #22272A;
  }
  .childSlider{
    position: absolute;
    top: 0;
    left: 45%;
    height:100% ;
    width: 55%;
    background: rgba(255, 255, 255, 0.57);
  }
  .mainSlider ul{
    width: 100%;
    height: 100%;
  }
  .mainSlider dl{
    height: 10%;
    width: 100%;
    font-family: "Microsoft YaHei";
    font-size: 0.35em;
    line-height: 2em;
    color: #ffffff;
    text-align: center;
  }
  .mainSlider dt{
    height: 40%;
    width: 100%;
  }
  .mainSlider dt img{
    height: 100%;
  }
  .childSlider ul{
    position: relative;
    width: 100%;
    height: 100%;
   }
  .childSlider li{
    position: relative;
    width: 100%;
    height: 1.2em;
  }
  .childSlider a{
    position: absolute;
    buttom:30%;
    width: 100%;
    height: 100%;
    font-family: "Microsoft YaHei";
    padding: 1em;
    font-size: 0.3em;
    line-height: 2em;
    color: #333333;
    display: block;
    text-align: center;
  }
  .content{
    position: absolute;
    top: 8%;
    left: 14%;
    height:92% ;
    width: 86%;
    background: #f0f0f0;
  }
  .isActive{
    background:#FCC400 ;
  }
  .isInActive{
    background: rgba(255, 255, 255, 0.57);
  }
</style>
