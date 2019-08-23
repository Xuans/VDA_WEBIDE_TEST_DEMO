<template>
  <div style="height:500px">
<markdown 
:mdValuesP="msg" 
:fullPageStatusP="false" 
:editStatusP="false" 
:previewStatusP="false"
:navStatusP="true"  
:icoStatusP="true"  
@childevent="childEventHandler">
</markdown>
<!--变量后面的大写P表示是从父组件中传入的参数-->
<!--:mdValuesP="msg" 表示需要初始化传入编辑器的内容-->
<!--:fullPageStatusP="false" 加载时是否全屏（true全屏/false跟随父容器）-->
<!--:editStatusP="false" 加载时是否显示编辑容器（true显示/false不显示）-->
<!--:previewStatusP="false" 加载时是否显示预览容器（true全屏/false不显示）-->
<!--:navStatusP="false" 加载时是否显示顶部快速标签栏（true显示/false不显示）-->
<!--:icoStatusP="false" 加载时是否显示版权标志（true显示/false不显示）,如果取消掉，请勿忘挖井人，谢谢！-->
<!--@childevent="childEventHandler" 监听组件的$.emit()方法传回父组件的值，便于父容器保存获取-->
  </div>
</template>
<script>
import markdown from '@/components/markdown/markdown.vue'
import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
    data(){
        return {
         msg:'hello world'
        }
    },
    methods:{
         // 监听事件，接收子组件传过来的数据
        childEventHandler:function(res){
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
            this.msg=res;
        }
    },
    components:{
       markdown
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
}
}
</script>
