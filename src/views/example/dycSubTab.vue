<template>
   <el-row>
     <el-row class="dyc-tool-bar">
         <el-button  @click="addTab">新增Tab</el-button>
     </el-row>
          <el-tabs
        v-model="activeIndex"
        type="border-card"
        closable
        v-if="openedSubTabs.length"
     
        @tab-remove="tabRemove"
    >

        <el-tab-pane
        :key="item.name"
        v-for="item in openedSubTabs"
        :label="item.name"
        :name="item.id"
        >
        <el-col :span="24" class="aweb-ctt-wrap">
 
    
        <transition name="fade" mode="out-in" > 
            
               <async-component :page="item.page" ></async-component>
            
        </transition>
        </el-col>
    
            </el-tab-pane>
    </el-tabs>
   </el-row>
</template>
<script>
import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
    data(){
        return {
            openedSubTabs:[],
            activeIndex:'12',
            i:0
        }
    },
    methods:{
        tabRemove(tagId){
            
           let indx = this.openedSubTabs.findIndex(item=>item.id === tagId);
           this.openedSubTabs.splice(indx,1);
           this.activeIndex = this.openedSubTabs[this.openedSubTabs.length - 1].route
        },
        addTab(){
      
           this.openedSubTabs.push({
            name:'服务'+(this.i++),
            page:'example/hasSubTab',
            id:this.getUID()
        })
        }
    },
    mounted(){

        this.openedSubTabs=[{
            name:'服务',
            page:'example/rightMenu',
            id:'12'
        },{
            name:'表单',
            page:'form/form',
            id:'232'
        },{
            name:'菜单',
            page:'example/table',
            id:'122'
        }]
    },

    resume(){
      console.log('动态子页面resume')
    },
    pause(){
      console.log('动态子页面pause')
    }
}
</script>
<style lang="less" scoped>
.dyc-tool-bar{
    padding: 2em 1em;
}
</style>
