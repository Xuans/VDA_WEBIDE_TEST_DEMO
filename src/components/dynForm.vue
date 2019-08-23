<template>
   <el-form  v-bind="$attrs" v-on="$listeners">
    <el-form-item  v-for="item in fData" :key="item.desp" :label="item.desp" >
        <component :is="item.component" v-model="$attrs.model[item.value]" v-bind="item.$attrs" v-on="item.$listeners">
             <!-- 处理像下拉选、单选框组、复选框组 -->
            <component  v-for="(subItem,idx) in item.dpsData" :key="idx" :is="subComponent(item.component)" v-bind="subItem"></component> 
        </component>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
     name:'dyn-form',
     props:{
        formData:Array,
     },
     data(){
       return {
           fData:this.formData,
           testVal:'hahah'
       }
     },
     watch:{ //props传参容易出现父组件数据变化，子组件数据没更新的问题，这里可以这样做优化
        formData:{
            immediate:true,
            deep:true,
            handler(val){
                this.fData = val;
            
            
                this.$emit('getDataFromSub',this.testVal);
            }
        }
     },
     computed:{
       subComponent(component){
           return (component)=>{
               let subType=""
               switch(component){
                   case 'el-select':
                   subType = 'el-option';
                   break;
                   case 'el-radio-group':
                   subType = 'el-radio';
                   break;
                   case 'el-checkbox-group':
                    subType = 'el-checkbox';
                   break; 
               }
               return subType;
           }
       }
     },
     mounted(){
        
     
     }
}
</script>
