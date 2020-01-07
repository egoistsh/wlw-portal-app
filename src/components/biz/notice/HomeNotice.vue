<template>
  <div>
    <div class="home-notice__item">
        <span class="home-notice__item-text">
          <a
            v-for="(notice, index) in noticeList"
            :key="index"
            href=""
            @click.prevent="handleClick(notice.resourceId)"> {{notice.title}} </a>
    </span>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import vuecookies from 'vue-cookies'

  import { listWlwNotice } from '../../../api/info'

  export default {
    name: 'HomeNotice',
    data () {
      return {
        noticeList: undefined,
        listWlwNoticeService: undefined,
        interval: undefined
      }
    },
    mounted () {
      this.listWlwNoticeService = new ListWlwNoticeService(this)
      this.listWlwNoticeService.execute()
    },
    beforeDestroy () {
      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    methods: {
      handleClick (resourceId) {
        this.$router.push({
          path: `/article/${resourceId}`,
          query: {
            infoName: '物联新闻',
            isDetail: true
          }
        })
      },
      marquee () {
        if (!this.interval) {
          const scrollWidth = $('.home-notice__item').width()
          const textWidth = $('.home-notice__item-text').width()
          let i = scrollWidth
          this.interval = setInterval(() => {
            if (!vuecookies.get('WLWPORTALTOKEN')) {
              clearInterval(this.interval)
              return
            }
            i = i - 1
            if (i < -textWidth) {
              i = scrollWidth
            }
            $('.home-notice__item-text').animate({ left: `${i}px` }, 5)
          }, 5)
        }
      }
    }
  }

  class ListWlwNoticeService {
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
        startNum: 0,
        endNum: 15
      }
      listWlwNotice(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
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
      this.vm.noticeList = data
      setTimeout(this.vm.marquee, 1000)
    }
  }
</script>

<style scoped>
  /***** 公告样式 *****/
  .home-notice__item {
    display: block;
    float: left;
    overflow: hidden;

    position: relative;

    width: 650px;
    height: 40px;
  }

  .home-notice__item-text {
    display: block;

    position: absolute;
    left: 100%;

    line-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }

  .home-notice__item-text > a {
    margin-right: 30px;
    color: #ffffff;
  }
</style>
