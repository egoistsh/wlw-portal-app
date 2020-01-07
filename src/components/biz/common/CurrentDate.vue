<template>
  <div>
    {{currentDate}}
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'CurrentDate',

    computed: {
      currentDate () {
        moment.locale('zh-cn')
        return moment().format('今天是YYYY年MM月DD日 dddd')
      }
    }
  }
</script>

<style scoped>

</style>
