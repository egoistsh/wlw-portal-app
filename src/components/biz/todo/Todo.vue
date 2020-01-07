<template>
  <!--  -->
  <div class="second-block-item half-side">
    <el-tabs value="oaTodo">
      <el-tab-pane name="oaTodo">
        <span slot="label">待办<span v-if="oaTodoCount > 0 ">[{{oaTodoCount}}]</span></span>
        <div id="oaTodoList" style="height: 212px">
          <ul class="item-data todo-list" v-if="oaTodoCount > 0">
            <li class="flex-box-between" v-for="(item, index) in oaToList" :key="index">
              <div @click="clickItem(item.url)">
                <i class="internet-icon normal-icon"></i><span>{{item.title}}</span>
              </div>
              <span>{{item.recdate | formatDate}}</span>
            </li>
          </ul>
          <div v-else-if="!oaTodoLoadingFlag" style="height: 212px;">
            <EmptyText :text="errorMsg"></EmptyText>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="oaToread">
        <span slot="label">待阅<span v-if="oaToreadCount > 0">[{{oaToreadCount}}]</span></span>
        <div id="oaToreadList" style="height: 212px">
          <ul class="item-data todo-list" v-if="oaToreadCount > 0">
            <li class="flex-box-between" v-for="(item, index) in oaToreadList" :key="index">
              <div @click="clickItem(item.url)">
                <i class="internet-icon normal-icon"></i><span>{{item.title}}</span>
              </div>
              <span>{{item.recdate | formatDate}}</span>
            </li>
          </ul>
          <div v-else-if="!oaToreadLoadingFlag" style="height: 212px;">
            <EmptyText :text="errorMsg"></EmptyText>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="mssTodo">
        <span slot="label">
          MSS待办<span v-if="mssTodoCount > 0">[{{mssTodoCount}}]</span>
        </span>
        <div id="mssTodoList" style="height: 212px">
          <ul class="item-data todo-list" v-if="mssTodoCount > 0">
            <li class="flex-box-between" v-for="(item, index) in mssTodoList" :key="index">
              <div @click="clickItem(item.url)">
                <i class="internet-icon normal-icon"></i><span>[{{item.appName}}]</span><span>{{item.title}}</span>
              </div>
              <span>{{item.createDate | formatDate}}</span>
            </li>
          </ul>
          <div v-else-if="!mssTodoLoadingFlag" style="height: 212px;">
            <EmptyText :text="errorMsg"></EmptyText>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
<!--    <span class="portal-more portal-more-ext" @click="handleMore">更多</span>-->
  </div>
</template>

<script>
  import moment from 'moment'
  import EmptyText from '../../ui/empty-text/EmptyText'
  import Loading from '../common/loading/loading'

  import { listOaTodo, listOaToread, listMssTodo } from '../../../api/todo'

  export default {
    name: 'Todo',
    components: { EmptyText },
    data () {
      return {
        errorMsg: '暂无数据',
        oaTodoLoading: undefined,
        oaTodoLoadingFlag: true,
        oaToreadLoading: undefined,
        oaToreadLoadingFlag: true,
        mssTodoLoading: undefined,
        mssTodoLoadingFlag: true,
        oaTodoCount: '0',
        oaToreadCount: '0',
        mssTodoCount: '0',
        oaToList: [],
        oaToreadList: [],
        mssTodoList: [],
        listOaTodoService: undefined,
        listOaToreadService: undefined
      }
    },
    filters: {
      formatDate (date) { return date ? moment(date).format('YYYY-MM-DD HH:mm') : '' }
    },
    mounted () {
      this.listOaTodoService = new ListOaTodoService(this)
      this.listOaTodoService.execute()

      this.listOaToreadService = new ListOaToreadService(this)
      this.listOaToreadService.execute()

      this.listMssTodoService = new ListMssTodoService(this)
      this.listMssTodoService.execute()
    },
    methods: {
      clickItem (url) {
        window.open(url)
      },
      handleMore () {
        // window.open('http://192.168.200.76:9089/wlwoa/oaMainPage.do?sysName=zqoa')
        // window.open('http://oatest.iot.ctc.com:9089/wlwoa/oaMainPage.do?sysName=zqoa')
        window.open('http://oa.iot.ctc.com:9089/wlwoa/oaMainPage.do?sysName=zqoa')
      }
    }
  }

  class ListOaTodoService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.oaTodoLoading = new Loading(this.vm, { target: '#oaTodoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        pageIndex: 1,
        pageSize: 7
      }
      listOaTodo(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.oaTodoLoading.close()
      this.vm.oaTodoLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.oaTodoLoading.close()
      this.vm.oaTodoLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.oaTodoCount = data.count
      this.vm.oaToList = data.todoItems
      if (this.vm.oaTodoCount === '0') {
        this.vm.errorMsg = '暂无数据'
      }
    }
  }

  class ListOaToreadService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.oaToreadLoading = new Loading(this.vm, { target: '#oaToreadList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        pageIndex: 1,
        pageSize: 7
      }
      listOaToread(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.oaToreadLoading.close()
      this.vm.oaToreadLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.oaToreadLoading.close()
      this.vm.oaToreadLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.oaToreadCount = data.count
      this.vm.oaToreadList = data.todoItems
    }
  }

  class ListMssTodoService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.mssTodoLoading = new Loading(this.vm, { target: '#mssTodoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        pageIndex: 1,
        pageSize: 7
      }
      listMssTodo(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.mssTodoLoading.close()
      this.vm.mssTodoLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.mssTodoLoading.close()
      this.vm.mssTodoLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.mssTodoCount = data.mssResult.count
      this.vm.mssTodoList = data.mssResult.items
    }
  }
</script>

<style scoped>

</style>
