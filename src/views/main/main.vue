<template>
  <div class="app-container">
    <div class="welcome-wrapper">
      <div class="welcome-ctn">
        <img src="../../img/custom-aweb-logo.png" />
        <h1 class="example-header">欢迎使用 AWEB！</h1>
      </div>
      <ul data-role="exampleLinkList" class="example-link-list">
        <li class="example-link-item" v-for="(item,index) in mainList" :key="index">
          <a target="_blank" :href="item.href" :title="item.name">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
  data() {
    return {
      mainList: [
        {
          name: "AWEB 社区",
          href: "https://www.awebide.com/"
        },
        {
          name: "AWEB 开发者中心",
          href: "https://docs.awebide.com"
        },
        {
          name: "资源市场",
          href: "https://market.awebide.com"
        },
        {
          name: "桌面示例",
          href: "https://pc.awebide.com"
        },
        {
          name: "监控示例",
          href: "https://monitor.awebide.com"
        },
        {
          name: "移动示例",
          href: "https://mobile.awebide.com"
        }
      ]
    };
  },
  methods: {
    closeCurrentPage() {
      this.close();
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.app-container {
  text-align: center;
}
.welcome-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.example-link-list {
  margin: 0;
  padding: 0;
  // display:flex;
  width: 100%;
  margin: 10px 0;
  list-style: none;
  text-align: center;
  margin-top: 50px;
}
.example-link-item {
  display: inline-block;
  list-style: none;
  padding: 2em;
  margin: 1em;
  border-radius: 6px;
  box-shadow: 0px 0px 6px #efefef;
}
.example-link-item a {
  text-decoration: none;
  color: #04bebd;
}
.example-link-item a:hover {
  text-decoration: underline;
}
</style>
