<template>
  <!-- 菜单栏 -->
  <div class="top-menu">
    <ul class="menu-list flex-box-between">
      <li
        v-for="menu in menus"
        :key="menu.menuid"
        @click="clickNav(menu)"
        :class="menu.menuname === '首页'?'active-menu':''">
        <i class="internet-icon" :class="menu.smallicon"></i>
        <span>{{ menu.menuname }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { listMenu } from '../../../api/menu'
  import { getGroupEmailSsoUrl } from '../../../api/email'

  export default {
    name: 'NavigatorMenu',

    data () {
      return {
        menus: [],
        info: '',
        listNavMenusService: undefined,
        getGroupEmailSsoUrlService: undefined,
        groupEmailSsoUrl: ''
      }
    },

    mounted () {
      this.listNavMenusService = new ListNavMenusService(this)
      this.listNavMenusService.execute()
      this.getGroupEmailSsoUrlService = new GetGroupEmailSsoUrlService(this)
      // this.getGroupEmailSsoUrlService.execute()
    },
    methods: {
      clickNav (menu) {
        if (menu.menuname === '集团邮箱') {
          // menu.refurl = this.groupEmailSsoUrl
          this.getGroupEmailSsoUrlService.execute()
          return
        }
        if (menu.menuname === '员工社区') {
          this.$message({
            message: '该系统正在建设中',
            type: 'warning'
          })
          return
        }
        if (menu.target === 'parent') {
          window.open(menu.refurl, '_parent')
        } else if (menu.target === 'open') {
          window.open(menu.refurl, '_blank')
        }
      }
    }
  }

  class ListNavMenusService {
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
      const params = {
        menuId: this.vm.menuId
      }
      listMenu(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.info = '网路请求错误，请查看网络是否链接！'
      const exception = {
        msg: this.vm.info,
        cause: err
      }
      throw exception
    }

    _resolveData (data) {
      if (data && data.length > 0) {
        this.vm.menus = data
        // this.vm.$store.commit(SET_NAV_MENUS, JSON.stringify(this.vm.menus))
      } else {
        this.vm.info = '你还没有任何导航菜单权限,请联系管理员!!!'
      }
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
</script>

<style scoped>

</style>
