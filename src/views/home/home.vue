<template>
  <div class="body">
      <div class="heard">
          <div class="logo">
            MES 制造执行系统
          </div>
          <div class="heard-nav" >
            <span>
              欢迎 {{username}}
            </span>
            <button type="button" @click="logout" >
              退出
            </button>
          </div>
      </div>
      <div class="sliders" >
        <div class="mainSlider" >
          <ul>
            <dl @click="showMenuItem('user')" >
              <dt>
                <img src="../../../static/icons/userManagement_hover.png" v-show ="mainMenuSelect==='user'" />
                <img src="../../../static/icons/userManagement.png" v-show ="mainMenuSelect!=='user'" />
              </dt>
              <dd >
                账号管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('process')" v-show ="function_select['工艺管理'].enable===true">
              <dt>
                <img src="../../../static/icons/processManagement_hover.png" v-show ="mainMenuSelect==='process'" />
                <img src="../../../static/icons/processManagement.png" v-show ="mainMenuSelect!=='process'" />
              </dt>
              <dd >
                工艺管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('warehouse')" v-show ="function_select['仓库管理'].enable===true">
              <dt>
                <img src="../../../static/icons/warehouseManagement_hover.png" v-show ="mainMenuSelect==='warehouse'" />
                <img src="../../../static/icons/warehouseManagement.png" v-show ="mainMenuSelect!=='warehouse'" />
              </dt>
              <dd >
                仓库管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('quality')" v-show ="function_select['品质管理'].enable===true">
              <dt>
                <img src="../../../static/icons/qualityManagement_hover.png" v-show ="mainMenuSelect==='quality'" />
                <img src="../../../static/icons/qualityManagement.png" v-show ="mainMenuSelect!=='quality'" />
              </dt>
              <dd >
                品质管理
              </dd>
            </dl>
            <dl @click="showMenuItem('equipment')" v-show ="function_select['设备管理'].enable===true">
              <dt>
                <img src="../../../static/icons/deviceManagement_hover.png" v-show ="mainMenuSelect==='equipment'" />
                <img src="../../../static/icons/deviceManagement.png" v-show ="mainMenuSelect!=='equipment'" />
              </dt>
              <dd>
                设备管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('production')" v-show ="function_select['生产管理'].enable===true">
              <dt>
                <img src="../../../static/icons/productionManagement_hover.png" v-show ="mainMenuSelect==='production'" />
                <img src="../../../static/icons/productionManagement.png" v-show ="mainMenuSelect!=='production'" />
              </dt>
              <dd >
                生产管理
              </dd>
            </dl>
            <dl  @click="showMenuItem('plan')" v-show ="function_select['计划管理'].enable===true">
              <dt>
                <img src="../../../static/icons/planManagement_hover.png" v-show ="mainMenuSelect==='plan'" />
                <img src="../../../static/icons/planManagement.png" v-show ="mainMenuSelect!=='plan'" />
              </dt>
              <dd >
                计划管理
              </dd >
            </dl>
            <dl   @click="showMenuItem('lean')" v-show ="function_select['精益管理'].enable===true">
              <dt>
                <img src="../../../static/icons/leanManagement_hover.png" v-show ="mainMenuSelect==='lean'" />
                <img src="../../../static/icons/leanManagement.png" v-show ="mainMenuSelect!=='lean'" />
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
              <li :class="childMenuSelect==='unitType'? 'isActive':'isInActive'"  @click="childMenuSelect='unitType'"
                  v-show ="function_select['工艺管理'].计量单位分类===true">
                <router-link to="/home/process/unitType">计量单位分类</router-link>
              </li>
              <li :class="childMenuSelect==='unitInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='unitInfor'"
                  v-show ="function_select['工艺管理'].计量单位信息===true">
                <router-link to="/home/process/unitInfor">计量单位</router-link>
              </li>
              <li :class="childMenuSelect==='materialType'? 'isActive':'isInActive'"  @click="childMenuSelect='materialType'"
                  v-show ="function_select['工艺管理'].物料分类===true">
                <router-link to="/home/process/materialType">物料分类</router-link>
              </li>
              <li :class="childMenuSelect==='materialInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='materialInfor'"
                  v-show ="function_select['工艺管理'].物料信息===true">
                <router-link to="/home/process/materialInfor">物料信息</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedType'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedType'"
                  v-show ="function_select['工艺管理'].半成品分类===true">
                <router-link to="/home/process/semifinishedType">半成品分类</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedInfor'"
                  v-show ="function_select['工艺管理'].半成品信息===true">
                <router-link to="/home/process/semifinishedInfor">半成品信息</router-link>
              </li>
              <li :class="childMenuSelect==='productType'? 'isActive':'isInActive'"  @click="childMenuSelect='productType'"
                  v-show ="function_select['工艺管理'].产品分类===true">
                <router-link to="/home/process/productType">产品分类</router-link>
              </li>
              <li :class="childMenuSelect==='productInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='productInfor'"
                  v-show ="function_select['工艺管理'].产品信息===true">
                <router-link to="/home/process/productInfor">产品信息</router-link>
              </li>
              <li :class="childMenuSelect==='stationType'? 'isActive':'isInActive'"  @click="childMenuSelect='stationType'"
                  v-show ="function_select['工艺管理'].工序分类===true">
                <router-link to="/home/process/stationType">工序分类</router-link>
              </li>
              <li :class="childMenuSelect==='stationInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='stationInfor'"
                  v-show ="function_select['工艺管理'].工序信息===true">
                <router-link to="/home/process/stationInfor">工序信息</router-link>
              </li>
              <li :class="childMenuSelect==='productRouteType'? 'isActive':'isInActive'"  @click="childMenuSelect='productRouteType'"
                  v-show ="function_select['工艺管理'].生产路线分类===true">
                <router-link to="/home/process/productRouteType">生产路线分类</router-link>
              </li>
              <li :class="childMenuSelect==='productRouteInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='productRouteInfor'"
                  v-show ="function_select['工艺管理'].生产路线===true">
                <router-link to="/home/process/productRouteInfor">生产路线</router-link>
              </li>
              <li :class="childMenuSelect==='processBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='processBoard'"
                  v-show ="function_select['工艺管理'].工艺看板===true">
                <router-link to="/home/process/processBoard">工艺看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='warehouse'">
            <ul>
              <li :class="childMenuSelect==='warehouseInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='warehouseInfor'"
                  v-show ="function_select['仓库管理'].仓库信息===true">
                <router-link to="/home/warehouse/warehouseInfor">仓库信息</router-link>
              </li>
              <li :class="childMenuSelect==='positionInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='positionInfor'"
                  v-show ="function_select['仓库管理'].仓位信息===true">
                <router-link to="/home/warehouse/positionInfor">仓位信息</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentManage'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentManage'"
                  v-show ="function_select['仓库管理'].设备管理===true">
                <router-link to="/home/warehouse/equipmentManage">设备管理</router-link>
              </li>
              <li :class="childMenuSelect==='partsManage'? 'isActive':'isInActive'"  @click="childMenuSelect='partsManage'"
                  v-show ="function_select['仓库管理'].备品管理===true">
                <router-link to="/home/warehouse/partsManage">备品管理</router-link>
              </li>
              <li :class="childMenuSelect==='materialManage'? 'isActive':'isInActive'"  @click="childMenuSelect='materialManage'"
                  v-show ="function_select['仓库管理'].物料管理===true">
                <router-link to="/home/warehouse/materialManage">物料管理</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedManage'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedManage'"
                  v-show ="function_select['仓库管理'].半成品管理===true">
                <router-link to="/home/warehouse/semifinishedManage">半成品管理</router-link>
              </li>
              <li :class="childMenuSelect==='productManage'? 'isActive':'isInActive'"  @click="childMenuSelect='productManage'"
                  v-show ="function_select['仓库管理'].产品管理===true">
                <router-link to="/home/warehouse/productManage">产品管理</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentStock'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentStock'"
                  v-show ="function_select['仓库管理'].设备库存===true">
                <router-link to="/home/warehouse/equipmentStock">设备库存</router-link>
              </li>
              <li :class="childMenuSelect==='partsStock'? 'isActive':'isInActive'"  @click="childMenuSelect='partsStock'"
                  v-show ="function_select['仓库管理'].备品库存===true">
                <router-link to="/home/warehouse/partsStock">备品库存</router-link>
              </li>
              <li :class="childMenuSelect==='materialStock'? 'isActive':'isInActive'"  @click="childMenuSelect='materialStock'"
                  v-show ="function_select['仓库管理'].物料库存===true">
                <router-link to="/home/warehouse/materialStock">物料库存</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedStock'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedStock'"
                  v-show ="function_select['仓库管理'].半成品库存===true">
                <router-link to="/home/warehouse/semifinishedStock">半成品库存</router-link>
              </li>
              <li :class="childMenuSelect==='productStock'? 'isActive':'isInActive'"  @click="childMenuSelect='productStock'"
                  v-show ="function_select['仓库管理'].产品库存===true">
                <router-link to="/home/warehouse/productStock">产品库存</router-link>
              </li>
              <li :class="childMenuSelect==='materialWaringRule'? 'isActive':'isInActive'"  @click="childMenuSelect='materialWaringRule'"
                  v-show ="function_select['仓库管理'].物料预警规则===true">
                <router-link to="/home/warehouse/materialWaringRule">物料预警规则</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedWaringRule'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedWaringRule'"
                  v-show ="function_select['仓库管理'].半成品预警规则===true">
                <router-link to="/home/warehouse/semifinishedWaringRule">半成品预警规则</router-link>
              </li>
              <li  :class="childMenuSelect==='productWaringRule'? 'isActive':'isInActive'"  @click="childMenuSelect='productWaringRule'"
                   v-show ="function_select['仓库管理'].产品预警规则===true">
                <router-link to="/home/warehouse/productWaringRule">产品预警规则</router-link>
              </li>
              <li :class="childMenuSelect==='warehouseBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='warehouseBoard'"
                  v-show ="function_select['仓库管理'].仓库看板===true">
                <router-link  to="/home/warehouse/warehouseBoard">仓库看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='quality'">
            <ul >
              <li :class="childMenuSelect==='defectType'? 'isActive':'isInActive'"  @click="childMenuSelect='defectType'"
                  v-show ="function_select['品质管理'].缺陷分类===true">
                <router-link to="/home/quality/defectType">缺陷分类</router-link>
              </li>
              <li :class="childMenuSelect==='defectGrade'? 'isActive':'isInActive'"  @click="childMenuSelect='defectGrade'"
                  v-show ="function_select['品质管理'].缺陷等级===true">
                <router-link to="/home/quality/defectGrade">缺陷等级</router-link>
              </li>
              <li :class="childMenuSelect==='defectInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='defectInfor'"
                  v-show ="function_select['品质管理'].缺陷信息===true">
                <router-link to="/home/quality/defectInfor">缺陷信息</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionStandardType'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionStandardType'"
                  v-show ="function_select['品质管理'].检验标准分类===true">
                <router-link to="/home/quality/inspectionStandardType">检验标准分类</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionStandard'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionStandard'"
                  v-show ="function_select['品质管理'].检验标准信息===true">
                <router-link to="/home/quality/inspectionStandard">检验标准</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionReportType'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionReportType'"
                  v-show ="function_select['品质管理'].检验汇报分类===true">
                <router-link to="/home/quality/inspectionReportType">检验汇报分类</router-link>
              </li>
              <li :class="childMenuSelect==='inspectionReport'? 'isActive':'isInActive'"  @click="childMenuSelect='inspectionReport'"
                  v-show ="function_select['品质管理'].检验汇报===true">
                <router-link to="/home/quality/inspectionReport">检验汇报</router-link>
              </li>
              <li :class="childMenuSelect==='qualityBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='qualityBoard'"
                  v-show ="function_select['品质管理'].品质看板===true">
                <router-link to="/home/quality/qualityBoard">品质看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='equipment'">
            <ul>
              <li :class="childMenuSelect==='equipmentVendor'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentVendor'"
                  v-show ="function_select['设备管理'].设备厂商信息===true">
                <router-link to="/home/equipment/equipmentVendor">设备厂商</router-link>
              </li>
              <li :class="childMenuSelect==='partsType'? 'isActive':'isInActive'"  @click="childMenuSelect='partsType'"
                  v-show ="function_select['设备管理'].备品分类===true">
                <router-link to="/home/equipment/partsType">备品分类</router-link>
              </li>
              <li :class="childMenuSelect==='partsInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='partsInfor'"
                  v-show ="function_select['设备管理'].备品信息===true">
                <router-link to="/home/equipment/partsInfor">备品信息</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentType'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentType'"
                  v-show ="function_select['设备管理'].设备分类===true">
                <router-link to="/home/equipment/equipmentType">设备分类</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentInfor'"
                  v-show ="function_select['设备管理'].设备台账===true">
                <router-link to="/home/equipment/equipmentInfor">设备台账</router-link>
              </li>
              <li :class="childMenuSelect==='partsUseRecord'? 'isActive':'isInActive'"  @click="childMenuSelect='partsUseRecord'"
                  v-show ="function_select['设备管理'].备品消耗记录===true">
                <router-link to="/home/equipment/partsUseRecord">备品消耗</router-link>
              </li>
              <li :class="childMenuSelect==='maintainRecordType'? 'isActive':'isInActive'"  @click="childMenuSelect='maintainRecordType'"
                  v-show ="function_select['设备管理'].维护记录分类===true">
                <router-link to="/home/equipment/maintainRecordType">维护记录分类</router-link>
              </li>
              <li :class="childMenuSelect==='maintainRecord'? 'isActive':'isInActive'"  @click="childMenuSelect='maintainRecord'"
                  v-show ="function_select['设备管理'].维护记录===true">
                <router-link to="/home/equipment/maintainRecord">维护记录</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentState'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentState'"
                  v-show ="function_select['设备管理'].设备状态信息===true">
                <router-link to="/home/equipment/equipmentState">设备状态</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentBoard'"
                  v-show ="function_select['设备管理'].设备看板===true">
                <router-link to="/home/equipment/equipmentBoard">设备看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='production'">
            <ul>
              <li :class="childMenuSelect==='workshopInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='workshopInfor'"
                  v-show ="function_select['生产管理'].车间信息===true">
                <router-link to="/home/production/workshopInfor">车间信息</router-link>
              </li>
              <li :class="childMenuSelect==='teamInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='teamInfor'"
                  v-show ="function_select['生产管理'].班组信息===true">
                <router-link to="/home/production/teamInfor">班组信息</router-link>
              </li>
              <li :class="childMenuSelect==='skillType'? 'isActive':'isInActive'"  @click="childMenuSelect='skillType'"
                  v-show ="function_select['生产管理'].技能分类===true">
                <router-link to="/home/production/skillType">技能分类</router-link>
              </li>
              <li :class="childMenuSelect==='skillInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='skillInfor'"
                  v-show ="function_select['生产管理'].技能信息===true">
                <router-link to="/home/production/skillInfor">技能信息</router-link>
              </li>
              <li :class="childMenuSelect==='personnelInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='personnelInfor'"
                  v-show ="function_select['生产管理'].人员信息===true">
                <router-link to="/home/production/personnelInfor">人员信息</router-link>
              </li>
              <li :class="childMenuSelect==='assessmentType'? 'isActive':'isInActive'"  @click="childMenuSelect='assessmentType'"
                  v-show ="function_select['生产管理'].考核分类===true">
                <router-link to="/home/production/assessmentType">考核分类</router-link>
              </li>
              <li :class="childMenuSelect==='assessmentLevel'? 'isActive':'isInActive'"  @click="childMenuSelect='assessmentLevel'"
                  v-show ="function_select['生产管理'].考核等级===true">
                <router-link to="/home/production/assessmentLevel">考核等级</router-link>
              </li>
              <li :class="childMenuSelect==='assessmentRecord'? 'isActive':'isInActive'"  @click="childMenuSelect='assessmentRecord'"
                  v-show ="function_select['生产管理'].考核记录===true">
                <router-link to="/home/production/assessmentRecord">考核记录</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedDailyReport'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedDailyReport'"
                  v-show ="function_select['生产管理'].半成品生产汇报===true">
                <router-link to="/home/production/semifinishedDailyReport">半成品生产汇报</router-link>
              </li>
              <li :class="childMenuSelect==='productDailyReport'? 'isActive':'isInActive'"  @click="childMenuSelect='productDailyReport'"
                  v-show ="function_select['生产管理'].产品生产汇报===true">
                <router-link to="/home/production/productDailyReport">产品生产汇报</router-link>
              </li>
              <li :class="childMenuSelect==='productDataType'? 'isActive':'isInActive'"  @click="childMenuSelect='productDataType'"
                  v-show ="function_select['生产管理'].产品记录分类===true">
                <router-link to="/home/production/productDataType">产品记录分类</router-link>
              </li>
              <li :class="childMenuSelect==='productData'? 'isActive':'isInActive'"  @click="childMenuSelect='productData'"
                  v-show ="function_select['生产管理'].产品过程数据===true">
                <router-link to="/home/production/productData">产品过程数据</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedDataType'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedDataType'"
                  v-show ="function_select['生产管理'].半成品记录分类===true">
                <router-link to="/home/production/semifinishedDataType">半成品记录分类</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedData'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedData'"
                  v-show ="function_select['生产管理'].半成品过程数据===true">
                <router-link to="/home/production/semifinishedData">半成品过程数据</router-link>
              </li>
              <li :class="childMenuSelect==='productionBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='productionBoard'"
                  v-show ="function_select['生产管理'].生产看板===true">
                <router-link to="/home/production/productionBoard">生产看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='plan'">
            <ul>
              <li :class="childMenuSelect==='clientType'? 'isActive':'isInActive'"  @click="childMenuSelect='clientType'"
                  v-show ="function_select['计划管理'].客户分类===true">
                <router-link to="/home/plan/clientType">客户分类</router-link>
              </li>
              <li :class="childMenuSelect==='clientInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='clientInfor'"
                  v-show ="function_select['计划管理'].客户信息===true">
                <router-link to="/home/plan/clientInfor">客户信息</router-link>
              </li>
              <li :class="childMenuSelect==='vendorType'? 'isActive':'isInActive'"  @click="childMenuSelect='vendorType'"
                  v-show ="function_select['计划管理'].供应商分类===true">
                <router-link to="/home/plan/vendorType">供应商分类</router-link>
              </li>
              <li :class="childMenuSelect==='vendorInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='vendorInfor'"
                  v-show ="function_select['计划管理'].供应商信息===true">
                <router-link to="/home/plan/vendorInfor">供应商信息</router-link>
              </li>
              <li :class="childMenuSelect==='salesOrderCreate'? 'isActive':'isInActive'"  @click="childMenuSelect='salesOrderCreate'"
                  v-show ="function_select['计划管理'].销售订单===true">
                <router-link to="/home/plan/salesOrderCreate">销售订单</router-link>
              </li>
              <li :class="childMenuSelect==='productTaskType'? 'isActive':'isInActive'"  @click="childMenuSelect='productTaskType'"
                  v-show ="function_select['计划管理'].产品生产任务分类===true">
                <router-link to="/home/plan/productTaskType">产品生产分类</router-link>
              </li>
              <li :class="childMenuSelect==='productTaskCreate'? 'isActive':'isInActive'"  @click="childMenuSelect='productTaskCreate'"
                  v-show ="function_select['计划管理'].产品生产任务===true">
                <router-link to="/home/plan/productTaskCreate">产品生产任务</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedTaskType'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedTaskType'"
                  v-show ="function_select['计划管理'].半成品生产任务分类===true">
                <router-link to="/home/plan/semifinishedTaskType">半成品生产分类</router-link>
              </li>
              <li :class="childMenuSelect==='seminishedTaskCreate'? 'isActive':'isInActive'"  @click="childMenuSelect='seminishedTaskCreate'"
                  v-show ="function_select['计划管理'].半成品生产任务===true">
                <router-link to="/home/plan/seminishedTaskCreate">半成品生产任务</router-link>
              </li>
              <li :class="childMenuSelect==='purchaseRequire'? 'isActive':'isInActive'"  @click="childMenuSelect='purchaseRequire'"
                  v-show ="function_select['计划管理'].物料需求===true">
                <router-link to="/home/plan/purchaseRequire">物料需求</router-link>
              </li>
              <li :class="childMenuSelect==='materialManagePlan'? 'isActive':'isInActive'"  @click="childMenuSelect='materialManagePlan'"
                  v-show ="function_select['计划管理'].物料管理计划===true">
                <router-link to="/home/plan/materialManagePlan">物料管理计划</router-link>
              </li>
              <li :class="childMenuSelect==='semifinishedManagePlan'? 'isActive':'isInActive'"  @click="childMenuSelect='semifinishedManagePlan'"
                  v-show ="function_select['计划管理'].半成品管理计划===true">
                <router-link to="/home/plan/semifinishedManagePlan">半成品管理计划</router-link>
              </li>
              <li :class="childMenuSelect==='productManagePlan'? 'isActive':'isInActive'"  @click="childMenuSelect='productManagePlan'"
                  v-show ="function_select['计划管理'].产品管理计划===true">
                <router-link to="/home/plan/productManagePlan">产品管理计划</router-link>
              </li>
              <li :class="childMenuSelect==='equipmentMaintainPlan'? 'isActive':'isInActive'"  @click="childMenuSelect='equipmentMaintainPlan'"
                  v-show ="function_select['计划管理'].设备保养计划===true">
                <router-link to="/home/plan/equipmentMaintainPlan">设备保养计划</router-link>
              </li>
              <li :class="childMenuSelect==='planBoard'? 'isActive':'isInActive'"  @click="childMenuSelect='planBoard'"
                  v-show ="function_select['计划管理'].计划看板===true">
                <router-link to="/home/plan/planBoard">计划看板</router-link>
              </li>
            </ul>
          </div>
          <div  v-show="MenuItem==='lean'">
            <ul>
              <li :class="childMenuSelect==='eventType'? 'isActive':'isInActive'"  @click="childMenuSelect='eventType'"
                  v-show ="function_select['精益管理'].事件分类===true">
                <router-link to="/home/plan/eventType">事件分类</router-link>
              </li>
              <li :class="childMenuSelect==='eventInfor'? 'isActive':'isInActive'"  @click="childMenuSelect='eventInfor'"
                  v-show ="function_select['精益管理'].事件信息===true">
                <router-link to="/home/plan/eventInfor">事件信息</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="certer">
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
      childMenuSelect: '',
      function_select: {}
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
  mounted () {
    this.function_select = this.$store.getters.getConfig.function_select
  },
  computed: {
    username () {
      return this.$store.getters.getLoginInfor.name
    }
  }
}
</script>
<style scoped lang="scss">
  .body{
    position:fixed ;
    top: 0;
    height: 100%;
    width: 100%;
    .heard{
      position: absolute;
      top:0;
      height: 5%;
      width: 100%;
      background: #123658;
      .logo{
        position: absolute;
        top:10%;
        left: 0;
        width: 30%;
        height: 80%;
        font-family: "Microsoft YaHei";
        font-size: 0.6em;
        line-height: 1.25em;
        text-align: center;
        color: #ffffff;
    }
      .heard-nav{
        position: absolute;
        top:10%;
        width: 20%;
        right: 0;
        height: 80%;
        font-family: "Microsoft YaHei";
        font-size: 0.4em;
        line-height: 2.5em;
        color: #ffffff;
        span{
          position: relative;
          height: 100%;
          text-align: center;
          color: #ffffff;
          float: left;
        }
        button{
          position:relative ;
          top: 0;
          height: 100%;
          background: #123658;
          border:none;
          color: #ffffff;
          margin-left: 3em;
        }
      }
    }
    .sliders{
      position: absolute;
      top: 5%;
      height:95% ;
      width: 14%;
      .mainSlider{
        position: absolute;
        top: 0;
        height:100% ;
        width: 45%;
        background: #123658;
        scroll-behavior: auto;
        ul{
          width: 100%;
          height: 100%;
          dl{
            height: 10%;
            width: 100%;
            font-family: "Microsoft YaHei";
            font-size: 0.35em;
            line-height: 2em;
            color: #ffffff;
            text-align: center;
          }
          dt{
            height: 40%;
            width: 100%;
            img{
              height: 100%;
            }
          }
        }
      }
      .childSlider{
        position: absolute;
        top: 0;
        right: 0;
        height:100% ;
        width: 55%;
        background: #ffffff;
        scroll-behavior: auto;
        overflow: auto;
        ul{
          position: relative;
          width: 100%;
          height: 100%;
          li{
            position: relative;
            width: 100%;
            height: 1.2em;
          }
          a{
            position: absolute;
            buttom:30%;
            width: 100%;
            height: 100%;
            font-family: "Microsoft YaHei";
            font-size: 0.3em;
            line-height: 3.4em;
            color: #333333;
            display: block;
            text-align: center;
          }
        }
        .isActive{
          background: #bbb9b0;
        }
        .isInActive{
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
    .certer{
      position: absolute;
      top: 5%;
      left: 14%;
      height:95% ;
      width: 86%;
      background: #f0f0f0;
    }
  }
</style>
