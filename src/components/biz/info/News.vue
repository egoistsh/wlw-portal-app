<template>
  <!-- 物联新闻 -->
  <div class="first-block">
    <div class="block-content">
      <div class="flex-box-between block-top">
        <span class="block-title">物联新闻</span>
        <span class="portal-more" @click="handleMore">更多</span>
      </div>

      <div class="flex-box-between">
        <ul class="news-tab">
          <li :class="{'active-tab': activeTab == index}" v-for="(item,index) in tabs" :key="index" @click="tab(item,index)">
            <i class="internet-icon" :class="item.iconClass"></i>
            <span>{{item.name}}</span>
            <p :class="{'arrow-right': activeTab == index}"></p>
          </li>
          <li @click="handleMore">
            <i class="internet-icon li-more-icon"></i>
            <span>更多...</span>
          </li>
        </ul>
        <PhotoNews></PhotoNews>

        <div class="tab-content" id="wlwInfoList" v-if="wlwInfoList && wlwInfoList.length > 0">
          <div class="hot-news" v-for="(item, index) in wlwInfoList.slice(0,1)" :key="index">
            <p>{{item.title}}</p>
            <div class="flex-box-between part-box">
              <div class="part-desc">
                {{topContent}}
              </div>
              <span class="check-detail" @click="handleClick(item.resourceId)">【查看详情】</span>
            </div>
          </div>

          <div class="flex-box-between">
            <ul class="news-list">
              <li v-for="(item, index) in wlwInfoList.slice(1,8)" :key="index" @click="handleClick(item.resourceId)">
                <i class="point-icon"></i>
                {{item.title}}
              </li>
            </ul>

            <!--<ul class="half-side news-list">
              <li v-for="(item, index) in wlwInfoList.slice(8,15)" :key="index" @click="handleClick(item.resourceId)">
                {{item.title}}
              </li>
            </ul>-->
          </div>
        </div>
        <div class="tab-content" v-else>
          <EmptyText></EmptyText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EmptyText from '../../ui/empty-text/EmptyText'
  import Loading from '../common/loading/loading'
  import PhotoNews from './PhotoNews'
  import { listWlwNews, listWlwMediaInfo, listWlwIntergrityPublicityInfo } from '../../../api/info'

  export default {
    name: 'News',
    components: {
      EmptyText,
      PhotoNews
    },
    data () {
      return {
        tabs: [
          {
            name: '物联动态',
            iconClass: 'trends-icon'
          },
          {
            name: '媒体关注',
            iconClass: 'foucs-icon'
          },
          {
            name: '廉洁宣传',
            iconClass: 'publicity-icon'
          }
        ],
        activeTab: 0,
        activeName: '物联动态',
        loading: undefined,
        loadingFlag: true,
        listWlwNewsService: undefined,
        listWlwMediaInfoService: undefined,
        listWlwIntergrityPublicityInfoService: undefined,
        wlwInfoList: undefined,
        topContent: '',
        moreUrl: ''
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
        this.activeName = item.name
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
            infoName: this.activeName,
            isDetail: true
          }
        })
      },
      handleMore () {
        this.$router.push({
          path: '/articles',
          query: {
            infoName: this.activeName
          }
        })
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
        startNum: 0,
        endNum: 8
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
      if (data && data.length > 0) {
        this.vm.moreUrl = data[0].more
        this.vm.topContent = data[0].content.replace(/<[^>]+>/g, '')
        this.vm.topContent = this.vm.topContent.replace(/&nbsp;/ig, '')
        this.vm.topContent = this.vm.topContent.replace(/&#65279;/ig, '')
      }
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
        startNum: 0,
        endNum: 8
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
      if (data && data.length > 0) {
        this.vm.moreUrl = data[0].more
        this.vm.topContent = data[0].content.replace(/<[^>]+>/g, '')
        this.vm.topContent = this.vm.topContent.replace(/&nbsp;/ig, '')
        this.vm.topContent = this.vm.topContent.replace(/&#65279;/ig, '')
      }
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
        startNum: 0,
        endNum: 8
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
      if (data && data.length > 0) {
        this.vm.moreUrl = data[0].more
        this.vm.topContent = data[0].content.replace(/<[^>]+>/g, '')
        this.vm.topContent = this.vm.topContent.replace(/&nbsp;/ig, '')
        this.vm.topContent = this.vm.topContent.replace(/&#65279;/ig, '')
      }
    }
  }
</script>

<style scoped>

</style>
