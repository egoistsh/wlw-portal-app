<template>
  <!--<div style="display: flex;justify-content: center;margin-top: 150px">
    <el-card style="width: 400px">
      <div slot="header" class="clearfix">
        <span>登录</span>
        <span></span>
      </div>
      <el-form ref="user" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="loginId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="handleUserLoginClick">登录</el-button>
        <el-button type="primary" @click="handleUserLogoutClick">退出登录</el-button>
      </el-form>
    </el-card>
  </div>-->
  <!-- 首页 -->
  <div id="login-container">
    <!-- 头部 -->
    <div id="login-header">
      <img src="../../../public/img/wl_logo2.png"/>
    </div>

    <!-- 页面内容 -->
    <div id="login-content">
      <div class="login-box">
        <div class="login-main">
          <div class="login-main-container">
            <div class="verify-and-acount">
              <el-tabs value="accountTab" stretch>
                <el-tab-pane name="accountTab">
                  <span slot="label" class="acount-switch login-tab">账号登录</span>
                  <div class="acount-container login-form-box">
                    <form>
                      <div>
                        <div class="grey-bg flex-box-between">
                          <i class="label-name acount-label internet-icon"></i>
                          <input
                            type=""
                            name="acount"
                            placeholder="请输入账号"
                            v-model="loginId"/>
                        </div>
                        <div class="grey-bg flex-box-between">
                          <i class="label-name code-label internet-icon"></i>
                          <input
                            type="password"
                            name="psd"
                            placeholder="请输入密码"
                            v-model="password"
                            @keyup.enter="handleUserLoginClick"/>
                        </div>
                      </div>
<!--                      <button class="login-btn" @click="handleUserLoginClick">登录</button>-->
                      <el-button class="login-btn" @click="handleUserLoginClick" >登录</el-button>

                      <p class="flex-box-between">
                        <span @click="ieSetup">IE一键设置</span><span @click="forgetPassword">忘记密码?</span>
                      </p>
                    </form>
                  </div>
                </el-tab-pane>
                <!--<el-tab-pane name="phoneTab">
                  <span slot="label" class="verify-switch login-tab">手机登录</span>
                  <div class="login-form-box verify-container">
                    <form>
                      <div>
                        <div class="grey-bg flex-box-between">
                          <i class="label-name acount-label internet-icon"></i>
                          <input type="" name="phone" placeholder="请输入手机号"/>
                        </div>
                        <div class="grey-bg flex-box-between">
                          <i class="label-name code-label internet-icon"></i>
                          <input type="" name="verifyCode" placeholder="请输入验证码"/>
                          <span class="obtain input-code">2NSFL</span>
                        </div>
                        <div class="grey-bg flex-box-between">
                          <i class="label-name message-label internet-icon"></i>
                          <input type="" name="messageCode" placeholder="请输入短信验证码"/>
                          <span class="obtain send-code">发送验证码</span>
                        </div>
                      </div>
                      <button class="login-btn">登录</button>

                      <p class="flex-box-between">
                        <span>IE一键设置</span><span>忘记密码?</span>
                      </p>
                    </form>
                  </div>
                </el-tab-pane>-->
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div id="login-footer">
      <p class="copyright">@2019版权属于 天翼物联统一工作平台</p>
    </div>
  </div>
</template>

<script>
  import Loading from '../../components/biz/common/loading/loading'
  import { LOGIN, GET_USER_INFO_SYNC, INIT_STATE_AND_CACHE } from '../../store/action-types'
  import { SET_TOKEN, DEL_TOKEN, DEL_USER_INFO } from '../../store/mutation-types'
  import { ApiResultCodes } from '../../consts/app'
  import vueCookies from 'vue-cookies'
  import router from '../../router'

  export default {
    name: 'Login',
    data () {
      return {
        loading: undefined,
        loginId: '',
        password: '',
        historyAddress: ''
      }
    },
    mounted () {
      this.loginService = new LoginService(this)
    },
    methods: {
      checkLogin () {
        let flag = false
        if (this.loginId === '') {
          this.$message({
            message: '请输入账户',
            type: 'warning'
          })
        } else if (this.password === '') {
          this.$message({
            message: '请输入密码',
            type: 'warning'
          })
        } else {
          flag = true
        }
        return flag
      },
      handleUserLoginClick () {
        if (this.checkLogin()) {
          this.$store.commit(DEL_TOKEN)
          this.$store.commit(DEL_USER_INFO)
          this.loginService.execute()
        }
      },
      afterLoginSuccess () {
        const params = {
          userId: this.userId
        }
        this.$store.dispatch(GET_USER_INFO_SYNC, params).then(() => this.afterGetUserInfoSuccess()).catch((err) => this.afterGetUserInfoFail(err))
      },
      afterGetUserInfoSuccess () {
        this.loading.close()
        if (this.historyAddress) {
          window.location.href = this.historyAddress
        } else {
          router.replace({ name: 'home' })
        }
      },
      afterGetUserInfoFail (err) {
        this.loading.close()
        const msg = '获取用户信息错误'
        this.$message({
          message: msg,
          type: 'error',
          showClose: true
        })
        console.error('%s, 错误原因：%o', msg, err)
      },
      handleUserLogoutClick () {
        this.$store.dispatch(INIT_STATE_AND_CACHE)
        vueCookies.remove('WLWPORTALTOKEN')
        this.$router.replace({ name: 'login' })
      },
      forgetPassword () {
        // window.open('http://localhost:8081/wlw_portal/forgetPwd.jsp')//本地
        // window.open('http://oatest.iot.ctc.com:7796/ydcms_web/forgetPwd.jsp')
        window.open('http://oa.iot.ctc.com:7796/ydcms_web/forgetPwd.jsp')
      },
      ieSetup () {
        this.$confirm('请先退出杀毒软件，运行脚本', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.open('http://oa.iot.ctc.com:9089/wlwoa/downloadCon.do?fileName=IE.bat')
        }).catch(() => {
        })
      }
    }
  }

  /**
   * 登录
   */
  class LoginService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.loading = new Loading(this.vm, { background: 'rgba(0, 0, 0, 0.5)' })
    }

    _getData () {
      const params = {
        loginId: this.vm.loginId,
        password: this.vm.password
      }
      this.vm.$store.dispatch(LOGIN, params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.loading.close()
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.loading.close()
      this.vm.$message.error(err.error.message)
    }

    _resolveData (data) {
      // data = {token: '123', tokenExpired: '100000', userId: 'admin'}
      if (data) {
        const vm = this.vm
        if (data.token) {
          vm.$store.commit(SET_TOKEN, {
            value: data.token,
            expires: data.tokenExpired
          })
          vueCookies.set('WLWPORTALTOKEN', data.token, { expires: data.tokenExpired })
          vm.userId = data.userId
          if (data.loginStatus && data.loginStatus.spuser) {
            window.location.href = `${data.loginStatus.url}`
          } else {
            vm.afterLoginSuccess()
          }
        }
        /* if (data.warnMessages && data.warnMessages.length > 0) {
          this._warnMessages(data)
        } */
      }
    }

    _warnMessages (data) {
      const isPasswordInit = data.warnMessages.find(
        (value, index, arr) => value.code === ApiResultCodes.PASSWORD_IS_INITIALIZE)
      const isPasswordExpire = data.warnMessages.find(
        (value, index, arr) => value.code === ApiResultCodes.PASSWORD_EXPIRE)
      const isPasswordAboutToExpire = data.warnMessages.find(
        (value, index, arr) => value.code === ApiResultCodes.PASSWORD_ABOUT_TO_EXPIRE)
      if (isPasswordInit) {
        this.vm.$confirm('密码为初始化密码需修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          // window.location.href = 'http://localhost:8081/wlw_portal/forcemodpwd.jsp'
          window.location.href = 'http://oa.iot.ctc.com:7796/ydcms_web/forcemodpwd.jsp'
        }).catch(() => {
          this.vm.afterLoginSuccess()
        })
      } else if (isPasswordExpire) {
        this.vm.$confirm('密码已过期，请修改密码', {
          confirmButtonText: '确定',
          center: true
        }).then(() => {
          // window.location.href = 'http://localhost:8081/wlw_portal/userpwd/pwdtoken.jsp'
          window.location.href = 'http://oa.iot.ctc.com:7796/ydcms_web/userpwd/pwdtoken.jsp'
        }).catch(() => {
        })
      } else if (isPasswordAboutToExpire) {
        this.vm.$confirm('密码即将过期，请确认是否需要修改密码', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // window.location.href = 'http://localhost:8081/wlw_portal/userpwd/pwdtoken.jsp'
          window.location.href = 'http://oa.iot.ctc.com:7796/ydcms_web/userpwd/pwdtoken.jsp'
        }).catch(() => {
          this.vm.afterLoginSuccess()
        })
      }
    }
  }
</script>
<style scoped>

</style>
