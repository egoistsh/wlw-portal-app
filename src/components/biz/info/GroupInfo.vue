<template>
  <div class="second-block-item half-side">
    <!--<ul class="second-block-ul">
      <li class="item-active-tab">
        <span>集团公告</span>
      </li>
      <li>
        <span>集团新闻</span>
      </li>
      <li>
        <span>集团信息</span>
      </li>
    </ul>
    <span class="portal-more">更多</span>
  </div>
  <ul class="item-data">
    <li class="flex-box-between">
      <div>
        <span>关于2019年春节放假的通知</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
    <li class="flex-box-between">
      <div>
        <span>关于2019年天翼物联公司元旦放假及值班安排的通知</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
    <li class="flex-box-between">
      <div>
        <span>天翼物联启动开展2019年“安全生产月“的通知</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
    <li class="flex-box-between">
      <div>
        <span>关于2019年春节放假的通知</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
    <li class="flex-box-between">
      <div>
        <span>关于2019年元旦放假及值班安排..</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
    <li class="flex-box-between">
      <div>
        <span>天翼物联启动开展2018年“安全...</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
    <li class="flex-box-between">
      <div>
        <span>天翼物联2019年元旦放假及值班安排...</span>
      </div>
      <span>2018-10-10  12:00</span>
    </li>
  </ul>-->
    <el-tabs value="groupNotice" @tab-click="tabClick">
      <el-tab-pane name="groupNotice">
        <span slot="label">集团公告</span>
        <div id="groupNoticeList" style="height: 212px">
          <ul class="item-data todo-list" v-if="groupNoticeList && groupNoticeList.length > 0">
            <li class="flex-box-between" v-for="(item, index) in groupNoticeList" :key="index" @click="clickItem(item.url)">
              <div>
                <span>{{item.title}}</span>
              </div>
              <span>{{item.createTime | formatDate}}</span>
            </li>
          </ul>
          <div v-else-if="!groupNoticeLoadingFlag" style="height: 212px;">
            <EmptyText :text="errorMsg"></EmptyText>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="groupNews">
        <span slot="label">集团新闻</span>
        <div id="groupNewsList" style="height: 212px;">
          <ul class="item-data todo-list" v-if="groupNewsList && groupNewsList.length > 0">
            <li class="flex-box-between" v-for="(item, index) in groupNewsList" :key="index" @click="clickItem(item.url)">
              <div>
                <span>{{item.title}}</span>
              </div>
              <span>{{item.createTime | formatDate}}</span>
            </li>
          </ul>
          <div v-else-if="!groupNewsLoadingFlag" style="height: 212px;">
            <EmptyText :text="errorMsg"></EmptyText>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="groupInfo">
        <span slot="label">集团信息</span>
        <div id="groupInfoList" style="height: 212px">
          <ul class="item-data todo-list" v-if="groupInfoList && groupInfoList.length > 0">
            <li class="flex-box-between" v-for="(item, index) in groupInfoList" :key="index" @click="clickItem(item.url)">
              <div>
                <span>{{item.title}}</span>
              </div>
              <span>{{item.createTime | formatDate}}</span>
            </li>
          </ul>
          <div v-else-if="!groupInfoLoadingFlag" style="height: 212px;">
            <EmptyText :text="errorMsg"></EmptyText>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <span class="portal-more portal-more-ext" @click="handleMore">更多</span>
  </div>
</template>

<script>
  import moment from 'moment'
  import EmptyText from '../../ui/empty-text/EmptyText'
  import Loading from '../common/loading/loading'
  import { listGroupNotice, listGroupNews, listGroupInfo } from '../../../api/info'

  export default {
    name: 'GroupInfo',
    components: { EmptyText },
    data () {
      return {
        errorMsg: '暂无数据',
        groupNoticeLoading: undefined,
        groupNewsLoading: undefined,
        groupInfoLoading: undefined,
        groupNoticeLoadingFlag: true,
        groupNewsLoadingFlag: true,
        groupInfoLoadingFlag: true,
        listGroupNoticeService: undefined,
        listGroupNewsService: undefined,
        listGroupInfoService: undefined,
        groupNoticeList: [],
        groupNewsList: [],
        groupInfoList: [],
        moreUrl: ''
      }
    },
    filters: {
      formatDate (date) { return date ? moment(date).format('YYYY-MM-DD HH:mm') : '' }
    },
    mounted () {
      this.listGroupNoticeService = new ListGroupNoticeService(this)
      this.listGroupNoticeService.execute()
      this.listGroupNewsService = new ListGroupNewsService(this)
      // this.listGroupNewsService.execute()
      this.listGroupInfoService = new ListGroupInfoService(this)
      // this.listGroupInfoService.execute()
    },
    methods: {
      clickItem (url) {
        window.open(url)
      },
      tabClick (tab, event) {
        this.moreMethod = tab.name
        if (tab.name === 'groupNotice') {
          this.listGroupNoticeService.execute()
        }
        if (tab.name === 'groupNews') {
          this.listGroupNewsService.execute()
        }
        if (tab.name === 'groupInfo') {
          this.listGroupInfoService.execute()
        }
      },
      handleMore () {
        window.open(this.moreUrl)
      }
    }
  }

  class ListGroupNoticeService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.groupNoticeLoading = new Loading(this.vm, { target: '#groupNoticeList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        count: 7
      }
      listGroupNotice(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.groupNoticeLoading.close()
      this.vm.groupNoticeLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.groupNoticeLoading.close()
      this.vm.groupNoticeLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      const ssoUrl = data.ssoUrl
      const moreUrl = data.data[0].moreUrl
      this.vm.moreUrl = `${ssoUrl}/${moreUrl}`
      this.vm.groupNoticeList = data.data[0].data
      for (let i = 0; i < this.vm.groupNoticeList.length; i++) {
        this.vm.groupNoticeList[i].url = `${ssoUrl}/${this.vm.groupNoticeList[i].url}`
      }
    }
  }

  class ListGroupNewsService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.groupNewsLoading = new Loading(this.vm, { target: '#groupNewsList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        count: 7
      }
      listGroupNews(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.groupNewsLoading.close()
      this.vm.groupNewsLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.groupNewsLoading.close()
      this.vm.groupNewsLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      const ssoUrl = data.ssoUrl
      const moreUrl = data.data[0].moreUrl
      this.vm.moreUrl = `${ssoUrl}/${moreUrl}`
      this.vm.groupNewsList = data.data[0].data
      for (let i = 0; i < this.vm.groupNewsList.length; i++) {
        this.vm.groupNewsList[i].url = `${ssoUrl}/${this.vm.groupNewsList[i].url}`
      }
    }
  }

  class ListGroupInfoService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.groupInfoLoading = new Loading(this.vm, { target: '#groupInfoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        count: 7
      }
      listGroupInfo(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.groupInfoLoading.close()
      this.vm.groupInfoLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.groupInfoLoading.close()
      this.vm.groupInfoLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      const ssoUrl = data.ssoUrl
      const moreUrl = data.data[0].moreUrl
      this.vm.moreUrl = `${ssoUrl}/${moreUrl}`
      this.vm.groupInfoList = data.data[0].data
      for (let i = 0; i < this.vm.groupInfoList.length; i++) {
        this.vm.groupInfoList[i].url = `${ssoUrl}/${this.vm.groupInfoList[i].url}`
      }
    }
  }
</script>

<style scoped>

</style>
