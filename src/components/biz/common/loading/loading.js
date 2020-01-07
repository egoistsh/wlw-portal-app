/**
 * 加载组件，封装了常用的加载样式，无须在每个组件都定义一遍样式
 */
import { Loading } from 'element-ui'

class MyLoading {
  constructor (vm, options) {
    this.vm = vm
    const mergedOptions = Object.assign({}, options)
    this.instance = Loading.service(mergedOptions)
  }

  close () {
    // 以服务的方式调用的 Loading 需要异步关闭
    this.vm.$nextTick(() => {
      this.instance.close()
    })
  }
}

MyLoading.Options = {
  DEFAULT_BLACK_BACKGROUND: {
    background: 'rgba(0, 0, 0, 0.3)'
  },

  DEFAULT_SPINNER_TEXT: {
    text: '正在加载...',
    spinner: 'cdc-loading__spinner--default',
    background: 'rgba(0, 0, 0, 0.3)',
    customClass: 'cdc-loading-text'
  },

  DEFAULT_SPINNER_TEXT_SCROLL: {
    text: '正在加载...正在加载...',
    spinner: 'cdc-loading__spinner--default',
    background: 'rgba(0, 0, 0, 0.3)',
    customClass: 'cdc-loading-text cdc-loading-text--scroll'
  }
}

export default MyLoading
