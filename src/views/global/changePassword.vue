<template>
  <iframe :src="src" class="vda-config" ref="vdaCtn"></iframe>
</template>

<script>
import { mixins } from "@v2-lib/vue.spa.plugin";
import vda from "@/api/pipe.vda.js";
import { setInterval, clearInterval } from "timers";
export default {
  mixins: [mixins],
  components: {
    // tree,
    // node
  },
  data() {
    return {
      src: ""
    };
  },
  props: {
    params: String //父组件传过来的参数
  },
  methods: {},
  mounted() {
    const context = this;
    const frame = this.$refs.vdaCtn;

    const loading = this.$loading({
      target: this.$el.parentElement,
      customClass: "vda-shelter"
    });
    vda.ready().then(res => {
      if (res) {
        window.localStorage.setItem("token", res);
        console.log(res);
        this.src = "./v1/ds/dvms//index.html#/dataBoard/echarts-demo/AWEB测试";
        frame.onload = function() {
          const frameContext = this;
          const waitForPageHandler = setInterval(() => {
            const $ = frameContext.contentWindow.$;
            const $el = frameContext.contentDocument;
            if ($ && $(".container-panel.active", $el).length) {

              const $header=$('.vda-header-wraper',$el);

              $header.hide();

              const $page = $("#app", $el);
              $page.css({
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                overflow: "auto",
                height:'100%',
                width:'100%',
                zIndex: 1
              });

              loading.close();
              clearInterval(waitForPageHandler);
            }
          }, 100);
        };
      }
    }).catch(e=>{
      this.$notify.error({
          title: '加载编辑器失败',
          message: e
        });
    })

    window.ts = this;
  }
};
</script>

<style lang="less">
.aweb-ctt-wrap {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.vda-config {
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: none;
  outline: 0;
}
.vda-shelter {
}
</style>