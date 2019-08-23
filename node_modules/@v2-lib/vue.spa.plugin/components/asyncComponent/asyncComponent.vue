<template>
  <keep-alive v-if="keepAlive">
    <component
      :is="AsyncComponent"
      v-bind="$attrs"
      v-on="$listeners"/>
  </keep-alive>
  <component
    v-else
    :is="AsyncComponent"
    v-bind="$attrs"
    v-on="$listeners"/>
</template>

<script>
import factory from './factory.js';

/**
 * 动态文件加载器
 */
export default {
  name:"asyncComponent",
  inheritAttrs: false,
  props: {
    // 文件的路径
    page: {
      type: String,
      default: null
    },
    // 是否保持缓存
    keepAlive: {
      type: Boolean,
      required: false,
      default: true
    },
    // 延迟加载时间
    delay: {
      type: Number,
      default: 20
    },
    // 超时警告时间
    timeout: {
      type: Number,
      default: 2000
    },
    params:{
      type:[Object,Array],
      default:()=>{}
    }
  },
  data () {
    return {
      AsyncComponent: factory(this.page, this.delay, this.timeout)
     
    }
  },
  watch: {
    page () {
      this.AsyncComponent = factory(this.page, this.delay, this.timeout);

    }
  },
  methods: {
    reload (page = this.page) {
      this.AsyncComponent = factory(page, this.delay, this.timeout);
    }
  }

}
</script>