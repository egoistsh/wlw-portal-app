<template>
  <div id="container">
    <Header></Header>
    <!-- Sso加载准备 -->
    <sso-preparation></sso-preparation>
    <!-- 页面内容 -->
    <div id="content">
      <div class="main-content">
        <!-- logo和背景图 -->
        <div class="content-head">
          <img src="../../../public/img/wy_logo.png" alt="背景图片"/>
        </div>
        <NavigatorMenu></NavigatorMenu>
        <News></News>
        <!-- 个人事务-待办+集团公告 -->
        <div class="second-block">
          <div class="block-content flex-box-between">
            <Todo></Todo>
            <GroupInfo></GroupInfo>
          </div>
        </div>
        <!-- 邮件+MSS专区 -->
        <div class="third-block">
          <div class="block-content flex-box-between">
            <Email></Email>
            <AppSystem></AppSystem>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../../components/biz/common/Header'
  import SsoPreparation from '../../components/biz/identity/SsoPreparation'
  import NavigatorMenu from '../../components/biz/menu/NavigatorMenu'
  import News from '../../components/biz/info/News'
  import Todo from '../../components/biz/todo/Todo'
  import GroupInfo from '../../components/biz/info/GroupInfo'
  import Email from '../../components/biz/email/Email'
  import AppSystem from '../../components/biz/app-system/AppSystem'
  import Footer from '../../components/biz/common/Footer'

  export default {
    name: 'Home',

    components: {
      Header,
      SsoPreparation,
      NavigatorMenu,
      News,
      Todo,
      GroupInfo,
      Email,
      AppSystem,
      Footer
    }
  }
</script>

<style scoped>

</style>
