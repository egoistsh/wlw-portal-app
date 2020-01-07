import moment from 'moment'
import store from 'store'

// 缓存键前缀
const CACHE_PREFIX = 'portal#cache_'
// 标准工作时间，8小时，即28800秒
const STANDARD_WORKING_TIME = 28800
// 缓存仓库
const Storage = {
  getItem (key) {
    // const serialized = localStorage.getItem(`${CACHE_PREFIX}${key}`)
    // if (serialized === null) {
    //  return undefined
    // }
    // return Serializer.deserialize(serialized)

    const storeValue = store.get(`${CACHE_PREFIX}${key}`)
    if (storeValue === null) {
      return undefined
    }
    return storeValue
  },

  setItem (key, value) {
    // const serialized = Serializer.serialize(value)
    // localStorage.setItem(`${CACHE_PREFIX}${key}`, serialized)

    store.set(`${CACHE_PREFIX}${key}`, value)
  },

  removeItem (key) {
    // localStorage.removeItem(`${CACHE_PREFIX}${key}`)

    store.remove(`${CACHE_PREFIX}${key}`)
  },

  clear () {
    // let keys = []
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i)
    //   if (key && key.startsWith(CACHE_PREFIX)) {
    //     keys.push(key)
    //   }
    // }
    //
    // for (let key of keys) {
    //   localStorage.removeItem(key)
    // }

    const keys = []
    store.each(function (value, key) {
      if (key && key.startsWith(CACHE_PREFIX)) {
        keys.push(key)
      }
    })

    for (const key of keys) {
      store.remove(key)
    }
  }
}

/**
 * 缓存数据
 */
class CacheData {
  constructor (value, expires) {
    this.value = value
    this.expires = expires
  }
}

/**
 * 序列化器，localStorage 只能保存字符串，对象，数组等类型需要通过序列化才能保存
 * @type {{serialize(*=): *}}
 */
/*
const Serializer = {
  serialize (value) {
    return JSON.stringify(value)
  },

  deserialize (value) {
    return JSON.parse(value)
  }
}
 */

/**
 * 缓存
 */
const Cache = {
  /**
   * 获取缓存
   * @param key 键
   */
  get (key) {
    if (!key) {
      return undefined
    }

    try {
      const cacheData = Storage.getItem(key)
      if (cacheData === undefined) {
        return undefined
      }

      // 判断缓存是否过期
      if (moment().isAfter(moment(cacheData.expires))) {
        return undefined
      }
      return cacheData.value
    } catch (e) {
      const args = { key }
      console.error('获取缓存失败，参数：%o，错误原因：%o', args, e)
    }
  },

  /**
   * 设置缓存
   * @param key 键
   * @param value 值
   * @param options 选项
   * @param options.expires 过期时间，格式为 YYYY-MM-DD HH:mm:ss
   * @param options.maxAge 最大生命周期，单位为秒（s），默认值为28800（即8小时）
   */
  set (key, value, { expires, maxAge = STANDARD_WORKING_TIME } = {}) {
    if (!key) {
      return undefined
    }

    // 设置过期时间
    if (!expires && maxAge) {
      expires = moment().add(maxAge, 's').format('YYYY-MM-DD HH:mm:ss')
    }

    try {
      const cacheData = new CacheData(value, expires)
      Storage.setItem(key, cacheData)
      // 判断缓存是否过期
      if (moment().isAfter(moment(expires))) {
        return undefined
      }
      return value
    } catch (e) {
      const args = {
        key,
        value,
        options: {
          expires,
          maxAge
        }
      }
      console.error('设置缓存失败，参数：%o，错误原因：%o', args, e)
    }
  },

  /**
   * 移除缓存
   * @param key 键
   */
  remove (key) {
    if (!key) {
      return
    }

    try {
      Storage.removeItem(key)
    } catch (e) {
      const args = { key }
      console.error('移除缓存失败，参数：%o，错误原因：%o', args, e)
    }
  },

  /**
   * 清除所有缓存
   */
  clear () {
    try {
      Storage.clear()
    } catch (e) {
      console.error('清除所有缓存失败，错误原因：%o', e)
    }
  }
}

export default Cache
