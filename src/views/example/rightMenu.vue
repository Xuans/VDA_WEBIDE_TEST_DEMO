<template>
  <div class="app-container">
    <el-row class="aweb-demo-title">
      <h2>平台通用组件</h2>
    </el-row>
    
      <el-row  class="aweb-component-info">
         <h4>右键菜单</h4>
         <p>某个DOM元素被click、dbclick、右键等触发弹出菜单</p>
      </el-row>
        


    <el-row>
      <el-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 1" @contextmenu.native.prevent = "rightClick">
    <el-card shadow="hover"  >
      <!-- <img src="http://localhost:8086/img/user.png" class="aweb-card-image"> -->
      <div style="padding: 10px;">
        <span>好看的标题</span>
        <div class="aweb-card-bottom clearfix">
          <time class="aweb-card-text">{{ text }}</time>
        </div>
      </div>
    </el-card>     
  </el-col>
    </el-row>
    <el-row>
          
      <p class="aweb-code-title">使用代码如下:</p>

   <pre>
     //在页面尾部插入组件
    &lt right-menu :menuData="rightMenuData"  :eventHandler=rightClickHandler  v-on:handleSelect= "handleRightSelect"&gt &lt/right-menu&gt

     //在事件触发节点绑定事件 
   &ltel-col :span="4" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 1" @contextmenu.native.prevent = "rightClick"&gt卡片代码&lt/el-col&gt


  
    export default {
      data() {
        return {
          rightClickHandler:null,
          rightMenuData:[{
            name:'打开详情',
            key:'btn1'
          },{
            name:'关联权限',
            key:'btn2'
          }]
        }
      },
      methods: {
        rightClick(e){
          this.rightClickHandler = e;
        },
        handleRightSelect(key){
            console.log(key);
        }
      }
    
    }

		</pre>
    </el-row>
      <el-row  class="aweb-component-info">
         <h4>树组件添加右键菜单</h4>
         <p>树节点右键等触发弹出菜单</p>
      </el-row>
      <el-row class="aweb-demo-ctn">
        <el-tree :data="treeData"  @node-contextmenu="handleNodeClick"   node-key="id" default-expand-all></el-tree>
      </el-row>           
      <p class="aweb-code-title">使用代码如下:</p>
   <pre>
      &ltel-tree :data="treeData"  @node-contextmenu="handleNodeClick"   node-key="id" default-expand-all&gt &lt/el-tree&gt
   </pre>
      <el-row  class="aweb-component-info">
         <h4>按钮添加右键菜单</h4>
         <p>采用嵌入方式调用组件</p>
      </el-row>
    <el-row class="aweb-demo-ctn" style="margin-bottom:30px">
      <el-button type="primary" @contextmenu.native.prevent = "rightClick">请右键</el-button>
    </el-row>
    <!-- <el-row class="aweb-demo-ctn" style="margin-bottom:30px">
       <right-menu :menuData="rightMenuData"  v-on:handleSelect= "handleRightSelect">
           <el-button type="primary" slot="reference">请右键吧</el-button>
        </right-menu> 
    </el-row> -->

<right-menu :menuData="rightMenuData"  :eventHandler="rightClickHandler"  v-on:handleSelect="handleRightSelect"></right-menu> 
<right-menu :menuData="rightMenuData"  :eventHandler="treeRightClickHandler"  v-on:handleSelect= "treeRightSelect"></right-menu> 
  </div>
</template>

<script>

import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
  data() {
    return {
      text:'一段美丽的描述，记录美丽的故事。请右键试试。。。',
      rightClickHandler:null,
      treeRightClickHandler:null,
      rightMenuData:[{
        name:'打开详情',
        key:'btn1'
      },{
        name:'关联权限',
        key:'btn2'
      }],
      treeData:[{
          label: '一级 1',
           id: 1,
          children: [{
            label: '二级 1-1',
             id: 2,
            children: [{
               id: 3,
              label: '三级 1-1-1'
            }]
          }]
        }]
    }
  },
  created() {
  },
  methods: {
   rightClick(e){
     this.rightClickHandler = e;
   },
   handleNodeClick(e){

     this.treeRightClickHandler = e;
   },
   handleRightSelect(key){
      console.log(key);
   },
   treeRightSelect(){

   }
  },

      resume(){
      console.log('右键菜单页面resume')
    },
    pause(){
      console.log('右键菜单页面pause')
    }
}
</script>
<style lang="less" scoped>
.aweb-demo-title{
   padding: 20px;
  width: 100%;
}
.aweb-component-info{
  height: 100px;
  padding: 20px;
  width: 100%;
  margin: 0;
  >h4{
    margin-bottom:12px;
  }
}
  .aweb-code-title{
    color: #04bebd;
    padding: 12px;
  }
  .aweb-card-text {
    font-size: 13px;
    color: #999;
  }
  
  .aweb-card-bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .aweb-card-image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

  pre{
    color: #666;
		padding: 12px;
		border: 1px dashed #ddd;
		border-left: 4px solid #bbb;
		background: #fafafa;
		white-space: pre-wrap;
		word-wrap: break-word;
		letter-spacing: 1.5px;
		font: 14px/25px 'Comic Sans MS','courier new';
		line-height: 22px;
		background-size: 100% 44px;
  }
  .aweb-demo-ctn{
    padding: 12px;
  }

</style>



