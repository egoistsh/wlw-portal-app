<template>
  <div id="container">
    <Header></Header>
    <div id="content">
      <div class="main-content">
        <!-- logo和背景图 -->
        <div class="content-head">
          <img src="../../../public/img/wy_logo.png" alt="背景图片"/>
        </div>
        <NavigatorMenu></NavigatorMenu>
        <!-- 正文详情 -->
        <BreadcrumbMenu :infoName="this.infoName" :isDetail="this.isDetail"></BreadcrumbMenu>
        <ArticleContent :articleId="articleId"></ArticleContent>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../../components/biz/common/Header'
  import Footer from '../../components/biz/common/Footer'
  import NavigatorMenu from '../../components/biz/menu/NavigatorMenu'
  import ArticleContent from '../../components/biz/article/ArticleContent'
  import BreadcrumbMenu from '../../components/biz/menu/BreadcrumbMenu'
  export default {
    name: 'ArticleView',
    components: { BreadcrumbMenu, ArticleContent, Footer, NavigatorMenu, Header },
    props: {
      articleId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        infoName: this.$route.query.infoName,
        isDetail: Boolean(this.$route.query.isDetail)
      }
    }
  }
</script>

<style scoped>

</style>
