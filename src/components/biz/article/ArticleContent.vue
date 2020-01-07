<template>
  <div class="doc-container">
    <div class="doc-content">
      <div v-if="this.articleContent" class="doc-detail">
        <div class="detail-head">
          <p class="doc-title">
            {{ articleContent.title }}
          </p>
          <div class="flex text-detail">
            <div><span>发表时间：</span><span>{{ articleContent.publishTime | formatDate }}</span></div>
            <div><span>阅读数：</span><span>{{ articleContent.readNum }}</span></div>
            <div><span>供稿部门：</span><span>{{ articleContent.planDraftDep }}</span></div>
          </div>
        </div>
        <div class="text-main" v-html="articleContent.content">
          <!--<p>
            2018年6月29日，由天翼物联管理局主办的广东省信息通信行业第二届网络安全技能大赛 在广州圆满落下帷幕，中国通服广东公司的"安全无界"团队获得团队赛二等奖，广东公司也收获了大赛宣传组织奖。
          </p>
          <p>
            本届大赛汇聚了广东电信、广东移动、广东联通、广东铁塔、广东通服5家通信企业和腾讯、网易、中移互联网等17家互联网 企业的网络安全精英，共128人参加了个人赛、32支队伍参加了团队赛。本次大赛的个人赛包括理论答题和CTF实操两部分，团队 赛采用“攻防对抗”模式，不但充分体现了选手在网络安全领域上的知识和技能积累，还体现了团队的智慧和合作精神。
          </p>
          <div>
            <img src="../../../../public/img/doc-img.png" ref=""/><span>以赛促学，以赛促训</span>
          </div>
          <p>
            大赛当天，各路网络安全能手齐聚一堂、同台竞技，历 经近7小时的精彩角逐，对网站安全、数据库安全维护、网络入侵防护和网络安全审计等内容进行了真刀真枪实力比拼。在现场 观摩室内的直播大屏上，参赛选手和团队的成绩和排名实时刷新，整个过程紧张激烈、异彩纷呈。
          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import { getWlwInfoDetail } from '../../../api/info'

  export default {
    name: 'ArticleContent',
    filters: {
      formatDate (date) { return date ? moment(date).format('YYYY-MM-DD HH:mm') : '' }
    },
    props: {
      articleId: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        articleContent: undefined,
        getArticleContentService: undefined
      }
    },
    watch: {
      articleId () {
        this.getArticleContentService.execute()
      }
    },
    mounted () {
      this.getArticleContentService = new GetArticleContentService(this)
      this.getArticleContentService.execute()
    },
    methods: {
    }
  }

  class GetArticleContentService {
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
        resourceId: this.vm.articleId
      }
      getWlwInfoDetail(params).then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      // this.vm.loading.close()
      // this.vm.loadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      // this.vm.loading.close()
      // this.vm.loadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.articleContent = data.data
    }
  }
</script>

<style scoped>

</style>
