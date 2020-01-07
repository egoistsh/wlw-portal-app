<template>
  <div class="error-block">
    <span class="error-text">{{ text }}</span>
    <a
      v-if="isShowReloadButton"
      class="error-text error-reload-button"
      @click="handleReloadButtonClick">{{ reloadButtonText }}</a>
  </div>
</template>

<script>
  export default {
    name: 'EmptyText',

    props: {
      text: {
        type: String,
        default: '暂无数据'
      },

      isShowReloadButton: {
        type: Boolean,
        default: false
      },

      reloadButtonText: {
        type: String,
        default: '点我重试'
      }
    },

    methods: {
      handleReloadButtonClick () {
        this.$emit('reload-button-click')
      }
    }
  }
</script>

<style scoped>
  .error-block {
    min-height: 16px;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
  }

  .error-text {
    line-height: 16px;
    color: #909399
  }

  .error-reload-button {
    cursor: pointer;
    line-height: 16px;
    margin-left: 4px;
  }

  error-reload-button:hover {
    color: #e10012;
  }
</style>
