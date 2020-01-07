<template>
  <div class="second-block-item half-side">
    <div class="flex-box-between block-top email-top">
      <span class="block-title">邮件<span v-if="groupEmailCount > 0">[{{groupEmailCount}}]</span></span>
      <span class="portal-more" @click="handleMore">更多</span>
    </div>
    <div id="groupEmail" style="height: 212px">
      <ul class="item-data" v-if="groupEmailList && groupEmailList.length > 0">
        <li class="flex-box-between" v-for="(item, index) in groupEmailList" :key="index" @click="handleItem(item.messageId)">
          <div>
            <span>{{item.subject}}</span>
          </div>
          <span>{{item.sendDate | formatDate}}</span>
        </li>
      </ul>
      <div v-else-if="!groupEmailLoadingFlag" style="height: 212px;">
        <EmptyText :text="errorMsg"></EmptyText>
      </div>
    </div>

  </div>
</template>

<script>
  import { listGroupEmail, getGroupEmailSsoUrl, getGroupEmailDetailsSsoUrl } from '../../../api/email'
  import moment from 'moment'
  import EmptyText from '../../ui/empty-text/EmptyText'
  import Loading from '../common/loading/loading'

  export default {
    name: 'Email',
    components: { EmptyText },
    data () {
      return {
        errorMsg: '暂无数据',
        groupEmailList: [],
        groupEmailCount: '0',
        groupEmailLoading: undefined,
        groupEmailLoadingFlag: true,
        messageId: '',
        groupEmailSsoUrl: '',
        groupEmailDetailsSsoUrl: '',
        listGroupEmailService: undefined,
        getGroupEmailSsoUrlService: undefined,
        getGroupEmailDetailsSsoUrlService: undefined
      }
    },
    filters: {
      formatDate (date) {
        date = date.substring(0, date.length - 3) // 去除日期
        return date ? moment(date).format('YYYY-MM-DD HH:mm') : ''
      }
    },
    mounted () {
      this.listGroupEmailService = new ListGroupEmailService(this)
      this.listGroupEmailService.execute()
      this.getGroupEmailSsoUrlService = new GetGroupEmailSsoUrlService(this)
      // this.getGroupEmailSsoUrlService.execute()
      this.getGroupEmailDetailsSsoUrlService = new GetGroupEmailDetailsSsoUrlService(this)
    },
    methods: {
      handleMore () {
        this.getGroupEmailSsoUrlService.execute()
      },
      handleItem (messageId) {
        this.messageId = messageId
        this.getGroupEmailDetailsSsoUrlService.execute()
      }
    }
  }

  class ListGroupEmailService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.groupEmailLoading = new Loading(this.vm, { target: '#groupEmail', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        count: 7
      }
      listGroupEmail(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.groupEmailLoading.close()
      this.vm.groupEmailLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.groupEmailLoading.close()
      this.vm.groupEmailLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.groupEmailList = data.emailItemList.mailList
      this.vm.groupEmailCount = data.emailItemList.noneReadNum
    }
  }

  class GetGroupEmailSsoUrlService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
    }

    _getData () {
      getGroupEmailSsoUrl().then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.groupEmailSsoUrl = data
      window.open(this.vm.groupEmailSsoUrl)
    }
  }

  class GetGroupEmailDetailsSsoUrlService {
    constructor (vm) {
      this.vm = vm
    }

    async execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
    }

    _getData () {
      const params = {
        messageId: this.vm.messageId
      }
      getGroupEmailDetailsSsoUrl(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.groupEmailDetailsSsoUrl = data
      window.open(this.vm.groupEmailDetailsSsoUrl)
    }
  }
</script>

<style scoped>

</style>
