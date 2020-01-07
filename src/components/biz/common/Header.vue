<template>
  <!-- 头部 -->
  <div id="header">
    <div class="header-content flex-box-between">
      <CurrentDate></CurrentDate>
      <HomeNotice></HomeNotice>
      <ul class="flex flex-item-center">
        <li class="mail-list">
          <el-dropdown>
      <span class="el-dropdown-link">
                  <i class="internet-icon mail-list-icon"></i>通讯录
      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="handleGroupAddressBook">集团通讯录</span></el-dropdown-item>
              <el-dropdown-item ><span @click="handleOaAddressBook">内部通讯录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="email">
          <i class="internet-icon email-icon"></i>
          <span @click="handle189Email">189邮箱</span>
        </li>
        <li class="name">
          <span>{{username}}</span>
        </li>
        <li class="exit" @click="handleUserLogoutClick">
          <span>退出</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import vueCookies from 'vue-cookies'

  import CurrentDate from './CurrentDate'
  import { INIT_STATE_AND_CACHE } from '../../../store/action-types'
  import HomeNotice from '../notice/HomeNotice'

  export default {
    name: 'Header',
    data () {
      return {
      }
    },
    computed: {
      username () {
        return this.$store.state.user.userInfo ? this.$store.state.user.userInfo.username : ''
      }
    },
    components: {
      HomeNotice,
      CurrentDate
    },
    methods: {
      handleUserLogoutClick () {
        this.$store.dispatch(INIT_STATE_AND_CACHE)
        vueCookies.remove('WLWPORTALTOKEN')
        this.$router.replace({ name: 'login' })
      },
      handleGroupAddressBook () {
        window.open('http://eiac-hq.iot.ctc.com/uap/sso2.do?appCode=UAP_ADDRESS&provinceCode=70')
      },
      handleOaAddressBook () {
        // window.open('http://192.168.200.76:9089/wlwoa/oa/addressbook/UserAddressBookFrame.jsp')
        // window.open('http://oatest.iot.ctc.com:9089/wlwoa/oa/addressbook/UserAddressBookFrame.jsp')
        window.open('http://oa.iot.ctc.com:9089/wlwoa/oa/addressbook/UserAddressBookFrame.jsp')
      },
      handle189Email () {
        window.open('https://webmail30.189.cn/w2/')
      }
    }
  }
</script>

<style scoped>

</style>
