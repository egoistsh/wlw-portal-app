<template>
  <div>
    <div style="display: none;" v-if="encodedUserName != ''">
      <!--生成 mssPortalPreLogin Cookie-->
      <!--SSO 集团MSS系统生产-->
      <iframe src="http://tyrz-hq.iot.ctc.com/uap/sso2.do?appCode=mssPortal&provinceCode=70&preLogin=true"></iframe>
      <!--oa 预登录-->
<!--      <iframe :src="'http://192.168.200.76:9089/wlwoa/indexsso.jsp?logonId=' + encodedUserName + '&identity=1'"></iframe>-->
      <iframe :src="'http://oatest.iot.ctc.com:9089/wlwoa/indexsso.jsp?logonId=' + encodedUserName + '&identity=1'"></iframe>
      <iframe :src="'http://oa.iot.ctc.com:9089/wlwoa/indexsso.jsp?logonId=' + encodedUserName + '&identity=1'"></iframe>
    </div>
  </div>
</template>

<script>
  import vueCookies from 'vue-cookies'

  import { setMssCookiet } from '../../../api/identity'
  import { getEncodedUserName } from '../../../api/user'

  export default {
    name: 'SsoPreparation',

    data () {
      return {
        ssoCookie: undefined,
        setSsoCookiesService: undefined,
        encodedUserName: '',
        getEncodedUserNameService: undefined
      }
    },

    computed: {
      hasSsoCookie () {
        return vueCookies.get('MssSsoToken') || this.ssoCookie
      }
    },

    mounted () {
      this.setSsoCookiesService = new SetSsoCookiesService(this)
      this.setSsoCookiesService.execute()
      this.getEncodedUserNameService = new GetEncodedUserNameService(this)
      this.getEncodedUserNameService.execute()
    }
  }

  /**
   * 设置单点Cookie
   */
  class SetSsoCookiesService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getData()
    }

    _getData () {
      setMssCookiet().then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      const msg = '服务异常，请联系管理员'
      if (err && err.code) {
        console.error(`${msg}（${err.code}）`)
      } else {
        console.error(msg)
      }
    }

    _resolveData (data) {
      const vm = this.vm
      if (data) {
        vm.ssoCookie = data
      }
    }
  }

  /**
   * 获取加密用户名
   */
  class GetEncodedUserNameService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getData()
    }

    _getData () {
      getEncodedUserName().then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      const msg = '服务异常，请联系管理员'
      if (err && err.code) {
        console.error(`${msg}（${err.code}）`)
      } else {
        console.error(msg)
      }
    }

    _resolveData (data) {
      const vm = this.vm
      if (data) {
        vm.encodedUserName = data
      }
    }
  }
</script>

<style scoped>

</style>
