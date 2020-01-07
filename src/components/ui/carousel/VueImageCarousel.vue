<template>
  <ul class="hover-active">
    <el-carousel
      ref="carousel"
      height="320px"
      :interval="interval"
      arrow="never"
      indicator-position="none"
      @change="handleImageChange">
      <el-carousel-item v-for="(item,index) in list" :key="index" >
        <a
          href="javascript:void(0)"
          :title="item.title"
          @click="handleOpenUrlClick(item.resourceId)">
          <el-image :src="item.PhotoUrl" :style="imageSize">
            <div slot="placeholder" class="image-slot cdc-image__error" :style="imageSize">
              <i class="el-icon-picture-outline"></i>
            </div>
            <div slot="error" class="image-slot cdc-image__error" :style="imageSize">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
          <div class="title-process">
            <div class="title-text-img">
            <p>
              <span v-if="item.type" class="type">[ {{ item.type }} ]</span>
              <span v-if="item.title.length <=30">{{ item.title.substring(0,30) }}</span>
              <span style="display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;" v-else>{{ item.title.substring(0,30) }}...</span>
            </p>
            </div>
            <i v-if="item.isRead === '0'" class="ayy-icon new-green-icon"></i>
          </div>
        </a>
      </el-carousel-item>
    </el-carousel>
    <ul v-if="list.length >1" class="srcoll-tabs">
      <li
        v-for="(item,index) in list"
        :key="index"
        :class="chooseIndex=== index ? 'img-active':''"
        @click="handleIndicatorClick(index)"></li>
    </ul>
  </ul>
</template>

<script>
  export default {
    name: 'VueImageCarousel',

    props: {
      interval: {
        type: Number,
        default: 5000
      },
      imageWidth: {
        type: Number,
        default: 865
      },
      imageHeight: {
        type: Number,
        default: 134
      },
      containerStyleClass: {
        type: String,
        default: ''
      },
      customClassStyles: {
        type: Object,
        default () {
          return {
            container: '',
            main: '',
            item: '',
            switchMain: ''
          }
        }
      },
      list: {
        type: Array,
        default () {
          return []
        }
      },
      loadStatus: {
        type: Number,
        default: 0
      }
    },

    data () {
      return {
        chooseIndex: 0,
        imageSize: {
          width: `${this.imageWidth}px`,
          height: `${this.imageHeight}px`,
          // margin: '24px auto 0 '
        }
      }
    },

    methods: {
      handleIndicatorClick (index) {
        this.$refs.carousel.activeIndex = index
        this.chooseIndex = index
      },

      handleImageChange () {
        this.chooseIndex = this.$refs.carousel.activeIndex
      },

      handleOpenUrlClick (url) {
        this.$emit('pitch-on', url)
      }
    }
  }
</script>

<style scoped>
  .el-carousel .el-carousel__arrow{
    top: 15% !important;
  }
</style>
