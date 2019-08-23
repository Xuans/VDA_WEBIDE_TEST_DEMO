<template>
<div>
     <transition name="fade-in-linear" @after-leave="destroyed">
     <div v-if="showMenu" class="aweb-right-menu" ref="rightClickMenu">
        <el-menu
            class="el-menu-vertical"
            @select="handleRightSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#04bebd"
             >
            <template v-for="(mItem,idx) in menuData">
            <el-menu-item :index="mItem.key" class="menuItem" :key="idx">
            <span slot="title">{{mItem.name}}</span>
                </el-menu-item>
            </template>           
        </el-menu>          
    </div>
    </transition>
      <slot name="reference"></slot>
</div>
      
</template>
<script>
import { on, off } from 'element-ui/src/utils/dom';

export default {
   name:'rightMenu',
    props:{
        menuData:Array,
        // show:Boolean,
        eventHandler:MouseEvent

    },
    data(){
        return {
           triggerElement:null,
           showMenu: false,
        }
    },
    watch:{
       eventHandler(e){
          if(e){   
            this.showMenu = true;    
            this.$nextTick(() => {
            this.$refs.rightClickMenu.style.left = e.clientX +'px';
            this.$refs.rightClickMenu.style.top = e.clientY +'px';
            this.triggerElement = e.target;
            })    
          
          }
          
         on(document, 'click', this.handleDocumentClick);
       
      }
    },
    methods:{
        handleRightSelect(key, keyPath){
            
          this.$emit('handleSelect',key)
           this.showMenu = false;    
        },
        handleDocumentClick(e){
             let reference = this.reference || this.$refs.reference || this.triggerElement;
             const menu = this.$refs.rightClickMenu;

            if (!reference && this.$slots.reference && this.$slots.reference[0]) {
                    reference = this.referenceElm = this.$slots.reference[0].elm;
                }
       
                if (!this.$el ||
                    !reference ||
                    this.$el.contains(e.target) ||
                    reference.contains(e.target) ||
                    !menu ||
                    menu.contains(e.target)) return;
                this.showMenu = false;
        },
        destroyed() {
         off(document, 'click', this.handleDocumentClick);
        },
       createdMenu(e){

           this.showMenu = true;    
            this.$nextTick(() => {
            this.$refs.rightClickMenu.style.left = e.clientX +'px';
            this.$refs.rightClickMenu.style.top = e.clientY +'px';
            })    
       } 
    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
 .aweb-right-menu{
    position: fixed;
    top: 0;
    left: 0;
     z-index: 1050;
     .el-menu-vertical{
         border:1px solid transparent;
        border-radius: 4px;
        z-index: 100;
    }
  
    .menuItem{
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
  }
</style>
