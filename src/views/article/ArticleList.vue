<template>
  <div id="container">
    <!-- 头部 -->
    <Header></Header>

    <!-- 页面内容 -->
    <div id="content">
      <div class="main-content">
        <!-- logo和背景图 -->
        <div class="content-head">
          <img src="../../../public/img/wy_logo.png" alt="背景图片"/>
        </div>

        <!-- 菜单栏 -->
        <NavigatorMenu></NavigatorMenu>

        <!-- 正文详情 -->
        <BreadcrumbMenu :infoName="this.infoName"></BreadcrumbMenu>
        <div class="second-menu-list flex-box">
          <div class="second-menu-nav">
            <div>
              <div class="flex-box-between block-top">
                <span class="block-title">物联新闻</span>
              </div>
              <ul>
                <li
                  :class="{'now-active':infoName == item.name}"
                  v-for="(item,index) in tabs"
                  :key="index"
                  @click="tab(item,index)">
                  {{item.name}}
                </li>
              </ul>
            </div>
          </div>

          <div class="ul-list">
            <div>
              <div class="current-menu">
                <span>{{this.infoName}}</span>
              </div>
              <ul>
                <li class="flex-box-between" v-for="(item,index) in wlwInfoList" :key="index" @click="handleClick(item.resourceId)">
                  <p><span class="disc-point"></span><span>{{item.title}}</span></p>
                  <p>{{item.publishTime}}</p>
                </li>
              </ul>
              <div class="flex select-show-number">
                <span>共20条</span>
                <div class="change-page flex-box-between">
                  <span><i class="internet-icon to-left-icon"></i></span><span class="page-one selected-page">1</span><span class="page-two">2</span><span><i class="internet-icon to-right-icon"></i></span>
                </div>
                <div class="select-page-number flex-box-between">
                  <span>20条/页</span><span><i class="internet-icon to-bottom-icon"></i></span>
                </div>
              </div>
              <div class="articles-pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  @prev-click="prevClick"
                  @next-click="nextClick"
                  :page-sizes="[10, 20, 30, 50, 100]"
                  :page-size="10"
                  layout="total, prev, pager, next, sizes"
                  :total=this.count>
                </el-pagination>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- 底部 -->
    <Footer></Footer>

  </div>
</template>

<script>
  import Header from '../../components/biz/common/Header'
  import Footer from '../../components/biz/common/Footer'
  import NavigatorMenu from '../../components/biz/menu/NavigatorMenu'
  import BreadcrumbMenu from '../../components/biz/menu/BreadcrumbMenu'
  import { listWlwNews, listWlwMediaInfo, listWlwIntergrityPublicityInfo } from '../../api/info'

  export default {
    name: 'ArticleList',
    components: { BreadcrumbMenu, NavigatorMenu, Footer, Header },
    data () {
      return {
        infoName: this.$route.query.infoName,
        tabs: [
          {
            name: '物联动态'
          },
          {
            name: '媒体关注'
          },
          {
            name: '廉洁宣传'
          }
        ],
        activeTab: 0,
        listWlwNewsService: undefined,
        listWlwMediaInfoService: undefined,
        listWlwIntergrityPublicityInfoService: undefined,
        wlwInfoList: undefined,
        count: 0,
        startNum: 0,
        endNum: 10
      }
    },
    mounted () {
      this.listWlwNewsService = new ListWlwNewsService(this)
      this.listWlwMediaInfoService = new ListWlwMediaInfoService(this)
      this.listWlwIntergrityPublicityInfoService = new ListWlwIntergrityPublicityInfoService(this)
      this.listWlwNewsService.execute()
    },
    methods: {
      tab (item, index) {
        this.activeTab = index
        this.infoName = item.name
        if (item.name === '物联动态') {
          this.listWlwNewsService.execute()
        }
        if (item.name === '媒体关注') {
          this.listWlwMediaInfoService.execute()
        }
        if (item.name === '廉洁宣传') {
          this.listWlwIntergrityPublicityInfoService.execute()
        }
      },
      handleClick (resourceId) {
        this.$router.push({
          path: `/article/${resourceId}`,
          query: {
            infoName: this.infoName,
            isDetail: true
          }
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      prevClick() {

      },
      nextClick() {

      }
    }
  }

  class ListWlwNewsService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      // this.vm.loading = new Loading(this.vm, { target: '#wlwInfoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        startNum: this.vm.startNum,
        endNum: this.vm.endNum
      }
      listWlwNews(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      // this.vm.loading.close()
      // this.vm.loadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      // this.vm.loading.close()
      // this.vm.loadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.wlwInfoList = data
      this.vm.count = Number(data[0].count)
    }
  }

  class ListWlwMediaInfoService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      // this.vm.loading = new Loading(this.vm, { target: '#wlwInfoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        startNum: this.vm.startNum,
        endNum: this.vm.endNum
      }
      listWlwMediaInfo(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      // this.vm.loading.close()
      this.vm.loadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      // this.vm.loading.close()
      this.vm.loadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.wlwInfoList = data
      this.vm.count = Number(data[0].count)
    }
  }

  class ListWlwIntergrityPublicityInfoService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      // this.vm.loading = new Loading(this.vm, { target: '#wlwInfoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        startNum: this.vm.startNum,
        endNum: this.vm.endNum
      }
      listWlwIntergrityPublicityInfo(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      // this.vm.loading.close()
      this.vm.loadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      // this.vm.loading.close()
      this.vm.loadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.wlwInfoList = data
      this.vm.count = Number(data[0].count)
    }
  }
</script>

<style scoped>

</style>
