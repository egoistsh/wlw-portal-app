<template>
  <div class="second-block-item half-side">
    <div class="flex-box-between block-top">
      <span class="block-title">MSS专区</span>
<!--      <span class="portal-more">更多</span>-->
    </div>
    <div class="mss-ul-box" id="mssSystemList">
      <!--<ul class="flex-box-between mss-ul">
        <li>
          <i class="internet-icon data-analyse-icon"></i>
          <p>数据分析</p>
        </li>
        <li>
          <i class="internet-icon data-apply-icon"></i>
          <p>主数据申请</p>
        </li>
        <li>
          <i class="internet-icon product-manager-icon"></i>
          <p>产品管理平台</p>
        </li>
        <li>
          <i class="internet-icon three-one-icon"></i>
          <p>三重一大系统</p>
        </li>
        <li>
          <i class="internet-icon legal-aid-icon"></i>
          <p>法律援助</p>
        </li>
        <li class="center-block">
          <ul class="flex-box-around">
            <li>
              <i class="internet-icon self-help-icon"></i>
              <p>人力自助</p>
            </li>
            <li>
              <i class="internet-icon self-assist-icon"></i>
              <p>人力辅助</p>
            </li>
            <li>
              <i class="internet-icon money-assist-icon"></i>
              <p>财务辅助</p>
            </li>
          </ul>
        </li>
        <li>
          <i class="internet-icon develop-project-icon"></i>
          <p>研发项目管理</p>
        </li>
        <li>
          <i class="internet-icon itsm-icon"></i>
          <p>ITSM</p>
        </li>
        <li>
          <i class="internet-icon opex-icon"></i>
          <p>运维成本</p>
        </li>
        <li>
          <i class="internet-icon contract-manager-icon"></i>
          <p>合同管理</p>
        </li>
        <li>
          <i class="internet-icon  physical-distribution-icon"></i>
          <p>物流管理</p>
        </li>
      </ul>-->
      <!--<ul class="flex-box-between mss-ul">
        <li v-for="(item, index) in mssSystemList" :key="index" @click="handleClick(item.url)">
          <i class="internet-icon" :class="item.iconClass"></i>
          <p>{{item.sysName}}</p>
        </li>
        <li v-for="(item, index) in mssSystemList" :key="index" @click="handleClick(item.url)">
          <i class="internet-icon" :class="item.iconClass"></i>
          <p>{{item.sysName}}</p>
        </li>
      </ul>

      <i class="internet-icon prev-btn left-or-right"></i>
      <i class="internet-icon next-btn left-or-right"></i>-->
      <el-carousel indicator-position="none" :autoplay="false" arrow="always">
        <!--<el-carousel-item v-for="(item,index) in parseInt(this.mssSystemList.length / 13 + 1)" :key="index">
          <ul class="flex-box-between mss-ul">
            <li v-for="item in mssSystemList.slice(index*13,(index+1)*13+1-9)" :key="item.sysName" @click="handleClick(item.url)">
              <i class="internet-icon" :class="item.iconClass"></i>
              <p>{{item.sysName}}</p>
            </li>
            <li class="center-block">
              <ul class="flex-box-around">
                <li v-for="item in mssSystemList.slice(index*13+5,(index+1)*13+1-6)" :key="item.sysName" @click="handleClick(item.url)">
                  <i class="internet-icon" :class="item.iconClass"></i>
                  <p>{{item.sysName}}</p>
                </li>
              </ul>
            </li>
            <li v-for="item in mssSystemList.slice(index*13+9,(index+1)*13+1)" :key="item.sysName" @click="handleClick(item.url)">
              <i class="internet-icon" :class="item.iconClass"></i>
              <p>{{item.sysName}}</p>
            </li>
          </ul>
        </el-carousel-item>-->
        <el-carousel-item>
          <ul class="flex-box-between mss-ul">
            <li v-for="item in mssSystemList.slice(0,5)" :key="item.sysName" @click="handleClick(item.url)">
              <i class="internet-icon" :class="item.iconClass"></i>
              <p>{{item.sysName}}</p>
            </li>
            <li class="center-block">
              <ul class="flex-box-around">
                <li v-for="item in mssSystemList.slice(5,8)" :key="item.sysName" @click="handleClick(item.url)">
                  <i class="internet-icon" :class="item.iconClass"></i>
                  <p>{{item.sysName}}</p>
                </li>
              </ul>
            </li>
            <li v-for="item in mssSystemList.slice(8,13)" :key="item.sysName" @click="handleClick(item.url)">
              <i class="internet-icon" :class="item.iconClass"></i>
              <p>{{item.sysName}}</p>
            </li>
          </ul>
        </el-carousel-item>
        <el-carousel-item v-for="(item,index) in parseInt((this.mssSystemList.length-13) / 12 + 1)" :key="index">
          <ul class="flex-box-between mss-ul">
            <li v-for="item in mssSystemList.slice(index*12+13,(index+1)*12+1+13)" :key="item.sysName" @click="handleClick(item.url)">
              <i class="internet-icon" :class="item.iconClass"></i>
              <p>{{item.sysName}}</p>
            </li>
          </ul>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  import EmptyText from '../../ui/empty-text/EmptyText'
  import Loading from '../common/loading/loading'
  import { listMssSystem } from '../../../api/appSystem'

  export default {
    name: 'AppSystem',
    components: { EmptyText },
    data () {
      return {
        errorMsg: '暂无数据',
        mssSystemLoading: undefined,
        mssSystemLoadingFlag: true,
        mssSystemList: [],
        listMssSystemService: undefined
      }
    },
    mounted () {
      this.listMssSystemService = new ListMssSystemService(this)
      this.listMssSystemService.execute()
    },
    methods: {
      handleClick (url) {
        window.open(url)
      }
    }
  }

  class ListMssSystemService {
    constructor (vm) {
      this.vm = vm
    }

    execute () {
      this._getDataBefore()
      this._getData()
    }

    _getDataBefore () {
      this.vm.mssSystemLoading = new Loading(this.vm, { target: '#mssSystemList', background: 'rgba(0, 0, 0, 0)' })
    }

    _getData () {
      listMssSystem().then((resp) => this._getDataSuccess(resp)).catch((err) => this._getDataFail(err))
    }

    _getDataSuccess (resp) {
      this.vm.mssSystemLoading.close()
      this.vm.mssSystemLoadingFlag = false
      this._resolveData(resp.data.data)
    }

    _getDataFail (err) {
      this.vm.mssSystemLoading.close()
      this.vm.mssSystemLoadingFlag = false
      console.error(err)
      if (err.code) {
        this.vm.errorMsg = `服务异常,请联系管理员（${err.code}）`
      } else {
        this.vm.errorMsg = '服务异常,请联系管理员'
      }
    }

    _resolveData (data) {
      this.vm.mssSystemList = data
    }
  }
</script>

<style scoped>

</style>
