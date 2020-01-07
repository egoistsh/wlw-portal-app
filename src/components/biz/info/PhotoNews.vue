<template>
  <!-- 轮播 -->
  <div class="scroll-content">

    <!-- 轮播内容 -->
    <!--<ul class="scroll-box">
      <li class="scroll-item">
        <img src="../../../../public/img/scrollimg.jpg" alt="轮播图"/>
        <p class="scroll-title">【战略导航】 读懂2019年目标</p>
      </li>
    </ul>

    &lt;!&ndash; 分页器 &ndash;&gt;
    <ul class="pagination">
      <li></li>
      <li class="active-page"></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>-->
    <vue-image-carousel
      :interval="carousel.interval"
      :image-width="carousel.imageWidth"
      :image-height="carousel.imageHeight"
      :list="imageList"
      @pitch-on="handleOpenUrlClick"></vue-image-carousel>
  </div>
</template>

<script>
  import VueImageCarousel from '../../ui/carousel/VueImageCarousel'
  import { listWlwPhotoNews } from '../../../api/info'

  export default {
    name: 'PhotoNews',
    components: { VueImageCarousel },
    data () {
      return {
        carousel: {
          interval: 5000,
          imageWidth: 565,
          imageHeight: 297,
          distances: -135
        },
        listWlwPhotoNewsService: undefined,
        errorMsg: '暂无数据',
        imageList: []
      }
    },
    mounted () {
      this.listWlwPhotoNewsService = new ListWlwPhotoNewsService(this)
      this.listWlwPhotoNewsService.execute()
    },
    methods: {
      handleOpenUrlClick (resourceId) {
        this.$router.push({
          path: `/article/${resourceId}`,
          query: {
            infoName: '物联新闻',
            isDetail: true
          }
        })
      }
    }
  }

  class ListWlwPhotoNewsService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      // this.vm.loading = new Loading(this.vm, { target: '#wlwInfoList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      const params = {
        startNum: 0,
        endNum: 5
      }
      listWlwPhotoNews(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      // this.vm.loading.close()
      this.vm.loadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      // this.vm.loading.close()
      this.vm.loadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.imageList = data
    }
  }
</script>

<style scoped>

</style>
