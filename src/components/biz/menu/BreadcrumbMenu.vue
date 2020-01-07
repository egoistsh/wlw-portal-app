<template>
  <div class="nav-order">
<!--    <span>首页</span> > <span>物联新闻</span> > <span>正文</span>-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/articles',query:{infoName: this.infoName}}">{{infoName}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="isDetail">正文</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'BreadcrumbMenu',
    props: {
      infoName: {
        type: String,
        default: ''
      },
      isDetail: {
        type: Boolean,
        default: false
      }
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
