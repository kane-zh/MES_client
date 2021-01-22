<template>
    <div class="SemifinishedStationReport">
      <!-- 列表页显示-->
      <div  class="list">
        <div class="heard">
          <form class="select">
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
            <div>半成品分类:
              <select v-model="selectItem.semifinishedType" placeholder="请选择半成品分类"      >
                <option v-for="item in semifinishedType" :value="item.code" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>半成品:
              <select v-model="selectItem.semifinished" placeholder="请选择半成品"      >
                <option v-for="item in semifinishedInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
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
            <div>工序分类:
              <select v-model="selectItem.stationType" placeholder="请选择工序分类"      >
                <option v-for="item in stationType" :value="item.code" :key="item.id">{{item.code+"("+item.name+")"}}</option>
              </select>
            </div>
            <div>工序:
              <select v-model="selectItem.station" placeholder="请选择工序"      >
                <option v-for="item in stationInfor" :value="item.id" :key="item.id">{{item.code+"("+item.name+")"}}</option>
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
        </div>
        <div class="content">
          <div class="table">
            <table >
              <tr align="center"  type="height:2em">
                <th>序号</th>
                <th>任务类型</th>
                <th>任务</th>
                <th>半成品类型</th>
                <th>半成品</th>
                <th>工序类型</th>
                <th>工序</th>
                <th>时间</th>
                <th>批次</th>
                <th>数量</th>
              </tr>
              <tr align="center" v-for="(item,index) in list" :key="item.id" type="height:1em" >
                <td>{{index}}</td>
                <td>{{item.taskType_code+"("+item.taskType_name+")"}}</td>
                <td>{{item.task_code+"("+item.task_name+")"}}</td>
                <td>{{item.semifinishedType_code+"("+item.semifinishedType_name+")"}}</td>
                <td>{{item.semifinished_code+"("+item.semifinished_name+")"}}</td>
                <td>{{item.stationType_code+"("+item.stationType_name+")"}}</td>
                <td>{{item.station_code+"("+item.station_name+")"}}</td>
                <td>{{item.update_time}}</td>
                <td>{{item.batch}}</td>
                <td>{{item.sum}}</td>
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
    </div>
</template>
<script>
export default {
  name: 'SemifinishedStationReport',
  components: {},
  data () {
    return {
      /* 列表页数据 */
      list: [],
      listCount: 0,
      listPreUrl: '',
      listNextUrl: '',
      /* 列表查询参数 */
      selectItem: {
        state: '',
        ordering: '',
        semifinishedType: '',
        taskType: '',
        stationType: '',
        semifinished: '',
        task: '',
        station: '',
        searchValue: '',
        start_time: '',
        stop_time: ''
      },
      /* 任务信息 */
      taskType: [],
      taskInfor: [],
      /* 半成品信息 */
      semifinishedType: [],
      semifinishedInfor: [],
      /* 工序信息 */
      stationType: [],
      stationInfor: [],
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
      this.$axios.get('production/semifinishedStationReport/?ordering=' + self.selectItem.ordering).then(function (response) {
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
      this.$axios.get('production/semifinishedStationReport/?semifinishedType_code=' + self.selectItem.semifinishedType +
        '&taskType_code=' + self.selectItem.taskType +
        '&stationType_code=' + self.selectItem.stationType +
        '&semifinished_id=' + self.selectItem.semifinished +
        '&task_id=' + self.selectItem.task +
        '&station_id=' + self.selectItem.station +
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
    }
  },
  created () {
    this.userinfor = []
    this.typeInfor = []
    var self = this
    this.$axios.get('user/userInfor/?page_size=99999&ordering=-id').then(function (response) {
      self.userinfor = response.data.results
      self.$axios.get('production/semifinishedDataType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
        self.typeInfor = response.data.results
        self.$axios.get('plan/semifinishedTaskType/?page_size=99999&ordering=-id&state=使用中').then(function (response) {
          self.taskType = response.data.results
          self.$axios.get('process/semifinishedType/?page_size=99999&ordering=-id').then(function (response) {
            self.semifinishedType = response.data.results
            self.$axios.get('process/stationType/?page_size=99999&ordering=-id').then(function (response) {
              self.stationType = response.data.results
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
    }).catch(function (err) {
      // 错误提示
      console.log(err)
    })
  },
  mounted () {
    this.attribute_title = this.$store.getters.getConfig.attach_attribute.半成品工序报工
  },
  watch: {
    selectItem: {
      deep: true
    },
    'selectItem.taskType': function (newval, oldval) {
      var self = this
      this.taskInfor = []
      // for (let key in this.selectItem) {
      //   this.selectItem[key] = ''
      // }
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
      this.$axios.get('plan/semifinishedTaskCreate/?page_size=99999&ordering=-id&state=使用中' +
        // eslint-disable-next-line camelcase
        '&type=' + taskType_id).then(function (response) {
        self.taskInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    'selectItem.semifinishedType': function (newval, oldval) {
      var self = this
      this.semifinishedInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      // eslint-disable-next-line camelcase
      var semifinishedType_id = ''
      this.semifinishedType.forEach(function (value, i) {
        if (newval === value.code) {
          // eslint-disable-next-line camelcase
          semifinishedType_id = value.id
        }
      })
      this.$axios.get('process/semifinishedInfor/?page_size=99999&ordering=-id&state=使用中' +
        // eslint-disable-next-line camelcase
        '&type=' + semifinishedType_id).then(function (response) {
        self.semifinishedInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    },
    'selectItem.stationType': function (newval, oldval) {
      var self = this
      this.stationInfor = []
      if (newval === undefined || newval === '') {
        return
      }
      // eslint-disable-next-line camelcase
      var stationType_id = ''
      this.stationType.forEach(function (value, i) {
        if (newval === value.code) {
          // eslint-disable-next-line camelcase
          stationType_id = value.id
        }
      })
      this.$axios.get('process/stationInfor/?page_size=99999&ordering=-id&state=使用中' +
        // eslint-disable-next-line camelcase
        '&type=' + stationType_id).then(function (response) {
        self.stationInfor = response.data.results
      }).catch(function (err) {
        // 错误提示
        console.log(err)
      })
    }
  }
}
</script>
<style scoped lang="scss" >
  .SemifinishedStationReport {
    position: relative;
    top: 0;
    width: 100%;
    height: 100%;
    .list {
      position: absolute;
      top: 0%;
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
          height: 100%;
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
          div:nth-child(8) {
            width: 25%;
          }
          div:nth-child(9) {
            width: 25%;
          }
        }
      }
      .content {
        position: absolute;
        top: 22%;
        bottom: 0;
        width: 100%;
        .table {
          height: 90%;
          width: 100%;
          overflow: auto;
          table {
            height: 100%;
            width: 100%;
            table-layout: auto;
            empty-cells: hide;
            word-break: normal;
            th {
              position: sticky;
              top: 0;
              height: 1em;
              font-family: PingFangSC-Regular;
              font-size: 0.4em;
              line-height: 2.5em;
              color: #000000;
              text-align: center;
              background: #ffffff;
              border: 1px solid rgba(177, 176, 171, 0.89);
              &:nth-child(1) {
                width: 3em;
              }
            }
            td {
              height: 1em;
              font-family: PingFangSC-Regular;
              font-size: 0.4em;
              color: #191A1E;
              text-align: center;
              background: #ffffff;
              border: 1px solid rgba(177, 176, 171, 0.61);
            }
          }
        }

        .page {
          position: absolute;
          right: 5%;
          bottom: 0;
          height: 10%;
          font-size: 0.3em;
          line-height: 2em;

          button {
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
  }
</style>
