import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/home'
import Login from '@/views/login/login'
import Register from '@/views/register/register'
import Content from '@/views/home/content/content'

Vue.use(Router)
export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      // 主界面
      path: '/home',
      name: 'Home', //
      component: Home,
      children: [
        {
          // 用户管理模块
          path: 'user',
          name: 'user',
          component: Content,
          children: [
            {
              // 用户信息设置
              path: 'userconfig',
              name: 'userconfig',
              component: () => import('@/views/home/content/user/UserConfig')
            },
            {
              // 用户授权管理
              path: 'userAdmin',
              name: 'userAdmin',
              component: () => import('@/views/home/content/user/UserAdmin')
            }
          ]
        },
        {
          // 工艺管理模块
          path: 'process',
          name: 'process',
          component: Content,
          children: [
            {
              // 计量单位类型
              path: 'unitType',
              name: 'unitType',
              component: () => import('@/views/home/content/process/UnitType')
            },
            {
              // 计量单位信息
              path: 'unitInfor',
              name: 'unitInfor',
              component: () => import('@/views/home/content/process/UnitInfor')
            },
            {
              // 物料类型
              path: 'materialType',
              name: 'materialType',
              component: () => import('@/views/home/content/process/MaterialType')
            },
            {
              // 物料信息
              path: 'materialInfor',
              name: 'materialInfor',
              component: () => import('@/views/home/content/process/MaterialInfor')
            },
            {
              // 半成品类型
              path: 'semifinishedType',
              name: 'semifinishedType',
              component: () => import('@/views/home/content/process/SemifinishedType')
            },
            {
              // 半成品信息
              path: 'semifinishedInfor',
              name: 'semifinishedInfor',
              component: () => import('@/views/home/content/process/SemifinishedInfor')
            },
            {
              // 产品类型
              path: 'productType',
              name: 'productType',
              component: () => import('@/views/home/content/process/ProductType')
            },
            {
              // 产品定义
              path: 'productInfor',
              name: 'productInfor',
              component: () => import('@/views/home/content/process/ProductInfor')
            },
            {
              // 工序类型
              path: 'stationType',
              name: 'stationType',
              component: () => import('@/views/home/content/process/StationType')
            },
            {
              // 工序信息
              path: 'stationInfor',
              name: 'stationInfor',
              component: () => import('@/views/home/content/process/StationInfor')
            },
            {
              // 生产路径类型
              path: 'productRouteType',
              name: 'productRouteType',
              component: () => import('@/views/home/content/process/ProductRouteType')
            },
            {
              // 生产路径信息
              path: 'productRouteInfor',
              name: 'productRouteInfor',
              component: () => import('@/views/home/content/process/ProductRouteInfor')
            },
            {
              // 工艺看板信息
              path: 'processBoard',
              name: 'processBoard',
              component: () => import('@/views/home/content/process/ProcessBoard')
            }
          ]
        },
        {
          // 仓库管理模块
          path: 'warehouse',
          name: 'warehouse',
          component: Content,
          children: [
            {
              // 仓库信息
              path: 'warehouseInfor',
              name: 'warehouseInfor',
              component: () => import('@/views/home/content/warehouse/WarehouseInfor')
            },
            {
              // 仓位信息
              path: 'positionInfor',
              name: 'positionInfor',
              component: () => import('@/views/home/content/warehouse/PositionInfor')
            },
            {
              // 设备管理
              path: 'equipmentManage',
              name: 'equipmentManage',
              component: () => import('@/views/home/content/warehouse/EquipmentManage')
            },
            {
              // 配件管理
              path: 'partsManage',
              name: 'partsManage',
              component: () => import('@/views/home/content/warehouse/PartsManage')
            },
            {
              // 原材料管理
              path: 'materialManage',
              name: 'materialManage',
              component: () => import('@/views/home/content/warehouse/MaterialManage')
            },
            {
              // 半成品管理
              path: 'semifinishedManage',
              name: 'semifinishedManage',
              component: () => import('@/views/home/content/warehouse/SemifinishedManage')
            },
            {
              // 产品管理
              path: 'productManage',
              name: 'productManage',
              component: () => import('@/views/home/content/warehouse/ProductManage')
            },
            {
              // 设备库存查询
              path: 'equipmentStock',
              name: 'equipmentStock',
              component: () => import('@/views/home/content/warehouse/EquipmentStock')
            },
            {
              // 配件库存查询
              path: 'partsStock',
              name: 'partsStock',
              component: () => import('@/views/home/content/warehouse/PartsStock')
            },
            {
              // 原材料库存查询
              path: 'materialStock',
              name: 'materialStock',
              component: () => import('@/views/home/content/warehouse/MaterialStock')
            },
            {
              // 半成品库存查询
              path: 'semifinishedStock',
              name: 'semifinishedStock',
              component: () => import('@/views/home/content/warehouse/SemifinishedStock')
            },
            {
              // 产品库存查询录
              path: 'productStock',
              name: 'productStock',
              component: () => import('@/views/home/content/warehouse/ProductStock')
            },
            {
              // 原材料预警规则
              path: 'materialWaringRule',
              name: 'materialWaringRule',
              component: () => import('@/views/home/content/warehouse/MaterialWaringRule')
            },
            {
              // 半成品预警规则
              path: 'semifinishedWaringRule',
              name: 'semifinishedWaringRule',
              component: () => import('@/views/home/content/warehouse/SemifinishedWaringRule')
            },
            {
              // 产品预警规则
              path: 'productWaringRule',
              name: 'productWaringRule',
              component: () => import('@/views/home/content/warehouse/ProductWaringRule')
            },
            {
              // 仓库看板信息
              path: 'warehouseBoard',
              name: 'warehouseBoard',
              component: () => import('@/views/home/content/warehouse/WarehouseBoard')
            }
          ]
        },
        {
          // 品质管理模块
          path: 'quality',
          name: 'quality',
          component: Content,
          children: [
            {
              // 缺陷类型
              path: 'defectType',
              name: 'defectType',
              component: () => import('@/views/home/content/quality/DefectType')
            },
            {
              // 缺陷等级
              path: 'defectGrade',
              name: 'defectGrade',
              component: () => import('@/views/home/content/quality/DefectGrade')
            },
            {
              // 缺陷信息
              path: 'defectInfor',
              name: 'defectInfor',
              component: () => import('@/views/home/content/quality/DefectInfor')
            },

            {
              // 检验标准类型
              path: 'inspectionStandardType',
              name: 'inspectionStandardType',
              component: () => import('@/views/home/content/quality/InspectionStandardType')
            },
            {
              // 检验标准信息
              path: 'inspectionStandard',
              name: 'inspectionStandard',
              component: () => import('@/views/home/content/quality/InspectionStandard')
            },
            {
              // 检验汇报类型
              path: 'inspectionReportType',
              name: 'inspectionReportType',
              component: () => import('@/views/home/content/quality/InspectionReportType')
            },
            {
              // 检验汇报
              path: 'inspectionReport',
              name: 'inspectionReport',
              component: () => import('@/views/home/content/quality/InspectionReport')
            },
            {
              // 品质看板
              path: 'qualityBoard',
              name: 'qualityBoard',
              component: () => import('@/views/home/content/quality/QualityBoard')
            }
          ]
        },
        {
          // 设备管理模块
          path: 'equipment',
          name: 'equipment',
          component: Content,
          children: [
            {
              // 设备厂商信息
              path: 'equipmentVendor',
              name: 'equipmentVendor',
              component: () => import('@/views/home/content/equipment/EquipmentVendor')
            },
            {
              // 配件类型
              path: 'partsType',
              name: 'partsType',
              component: () => import('@/views/home/content/equipment/PartsType')
            },
            {
              // 配件信息
              path: 'partsInfor',
              name: 'partsInfor',
              component: () => import('@/views/home/content/equipment/PartsInfor')
            },
            {
              // 设备类型
              path: 'equipmentType',
              name: 'equipmentType',
              component: () => import('@/views/home/content/equipment/EquipmentType')
            },
            {
              // 设备信息
              path: 'equipmentInfor',
              name: 'equipmentInfor',
              component: () => import('@/views/home/content/equipment/EquipmentInfor')
            },
            {
              // 维护记录类型
              path: 'maintainRecordType',
              name: 'maintainRecordType',
              component: () => import('@/views/home/content/equipment/MaintainRecordType')
            },
            {
              // 维护记录
              path: 'maintainRecord',
              name: 'maintainRecord',
              component: () => import('@/views/home/content/equipment/MaintainRecord')
            },
            {
              // 备品消耗记录
              path: 'partsUseRecord',
              name: 'partsUseRecord',
              component: () => import('@/views/home/content/equipment/PartsUseRecord')
            },
            {
              // 设备状态信息
              path: 'equipmentState',
              name: 'equipmentState',
              component: () => import('@/views/home/content/equipment/EquipmentState')
            },

            {
              // 设备看板信息
              path: 'equipmentBoard',
              name: 'equipmentBoard',
              component: () => import('@/views/home/content/equipment/EquipmentBoard')
            }

          ]
        },
        {
          // 生产管理模块
          path: 'production',
          name: 'production',
          component: Content,
          children: [
            {
              // 车间信息
              path: 'workshopInfor',
              name: 'workshopInfor',
              component: () => import('@/views/home/content/production/WorkshopInfor')
            },
            {
              // 班组信息
              path: 'teamInfor',
              name: 'teamInfor',
              component: () => import('@/views/home/content/production/TeamInfor')
            },
            {
              // 技能类型
              path: 'skillType',
              name: 'skillType',
              component: () => import('@/views/home/content/production/SkillType')
            },
            {
              // 技能信息
              path: 'skillInfor',
              name: 'skillInfor',
              component: () => import('@/views/home/content/production/SkillInfor')
            },
            {
              // 人员信息
              path: 'personnelInfor',
              name: 'personnelInfor',
              component: () => import('@/views/home/content/production/PersonnelInfor')
            },
            {
              // 考核类型
              path: 'assessmentType',
              name: 'assessmentType',
              component: () => import('@/views/home/content/production/AssessmentType')
            },
            {
              // 产品过程数据类型
              path: 'productDataType',
              name: 'productDataType',
              component: () => import('@/views/home/content/production/ProductDataType')
            },
            {
              // 半成品品过程数据类型
              path: 'semifinishedDataType',
              name: 'semifinishedDataType',
              component: () => import('@/views/home/content/production/SemifinishedDataType')
            },
            {
              // 考核等级
              path: 'assessmentLevel',
              name: 'assessmentLevel',
              component: () => import('@/views/home/content/production/AssessmentLevel')
            },
            {
              // 考核记录
              path: 'assessmentRecord',
              name: 'assessmentRecord',
              component: () => import('@/views/home/content/production/AssessmentRecord')
            },
            {
              // 半成品日报
              path: 'semifinishedDailyReport',
              name: 'semifinishedDailyReport',
              component: () => import('@/views/home/content/production/SemifinishedDailyReport')
            },
            {
              // 产品日报
              path: 'productDailyReport',
              name: 'productDailyReport',
              component: () => import('@/views/home/content/production/ProductDailyReport')
            },
            {
              // 产品过程数据
              path: 'productData',
              name: 'productData',
              component: () => import('@/views/home/content/production/ProductData')
            },
            {
              // 半成品过程数据
              path: 'semifinishedData',
              name: 'semifinishedData',
              component: () => import('@/views/home/content/production/SemifinishedData')
            },
            {
              // 生产看板信息
              path: 'productionBoard',
              name: 'productionBoard',
              component: () => import('@/views/home/content/production/ProductionBoard')
            }

          ]
        },
        {
          // 计划管理模块
          path: 'plan',
          name: 'plan',
          component: Content,
          children: [
            {
              // 供应商类型
              path: 'vendorType',
              name: 'vendorType',
              component: () => import('@/views/home/content/plan/VendorType')
            },
            {
              // 供应商信息
              path: 'vendorInfor',
              name: 'vendorInfor',
              component: () => import('@/views/home/content/plan/VendorInfor')
            },
            {
              // 客户类型
              path: 'clientType',
              name: 'clientType',
              component: () => import('@/views/home/content/plan/ClientType')
            },
            {
              // 客户信息
              path: 'clientInfor',
              name: 'clientInfor',
              component: () => import('@/views/home/content/plan/ClientInfor')
            },
            {
              // 销售订单创建
              path: 'salesOrderCreate',
              name: 'salesOrderCreate',
              component: () => import('@/views/home/content/plan/SalesOrderCreate')
            },
            {
              // 产品生产任务类型
              path: 'productTaskType',
              name: 'productTaskType',
              component: () => import('@/views/home/content/plan/ProductTaskType')
            },
            {
              // 产品生产任务单创建
              path: 'productTaskCreate',
              name: 'productTaskCreate',
              component: () => import('@/views/home/content/plan/ProductTaskCreate')
            },
            {
              // 半成品生产任务类型
              path: 'semifinishedTaskType',
              name: 'semifinishedTaskType',
              component: () => import('@/views/home/content/plan/SemifinishedTaskType')
            },
            {
              // 半成品生产任务单创建
              path: 'seminishedTaskCreate',
              name: 'seminishedTaskCreate',
              component: () => import('@/views/home/content/plan/SeminishedTaskCreate')
            },
            {
              // 采购需求
              path: 'purchaseRequire',
              name: 'purchaseRequire',
              component: () => import('@/views/home/content/plan/PurchaseRequire')
            },
            {
              // 原材料仓库管理计划
              path: 'materialManagePlan',
              name: 'materialManagePlan',
              component: () => import('@/views/home/content/plan/MaterialManagePlan')
            },
            {
              // 半成品仓库管理计划
              path: 'semifinishedManagePlan',
              name: 'semifinishedManagePlan',
              component: () => import('@/views/home/content/plan/SemifinishedManagePlan')
            },
            {
              // 产品仓库管理计划
              path: 'productManagePlan',
              name: 'productManagePlan',
              component: () => import('@/views/home/content/plan/ProductManagePlan')
            },
            {
              // 设备维护计划
              path: 'equipmentMaintainPlan',
              name: 'equipmentMaintainPlan',
              component: () => import('@/views/home/content/plan/EquipmentMaintainPlan')
            },
            {
              // 计划看板信息
              path: 'planBoard',
              name: 'planBoard',
              component: () => import('@/views/home/content/plan/PlanBoard')
            },
            {
              // 事件类型
              path: 'eventType',
              name: 'eventType',
              component: () => import('@/views/home/content/lean/EventType')
            },
            {
              // 事件信息
              path: 'eventInfor',
              name: 'eventInfor',
              component: () => import('@/views/home/content/lean/EventInfor')
            }

          ]
        }

      ]
    },
    {
      // 登录界面
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // 注册界面
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
