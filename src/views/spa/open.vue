<template>
  <div class="aweb-open-page">
    <h3>打开指定页面</h3>
    <el-row class="aweb-open-page-form">
      <el-form ref="form" :model="form" label-width="100px">
         <el-form-item label="页面标题">
          <el-input placeholder="请输入" v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="页面路径">
          <el-input placeholder="请输入views文件夹往下的页面路径" v-model="form.page" clearable></el-input>
        </el-form-item>
         <el-form-item label="自定义路由">
          <el-input placeholder="请输入自定义路由（相当于页面实例ID）" v-model="form.path" clearable></el-input>
        </el-form-item>
         <el-form-item label="是否其他项目">
    
        <el-switch
            v-model="form.other"
            active-color="#13ce66"
            inactive-color="#dcdfe6">
          </el-switch>

     
        </el-form-item>
        <el-form-item label="传参">
          <el-input placeholder="请输入JSON字符串" v-model="form.params" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="form.type">
            <el-radio label="BLANK">新页面</el-radio>
            <el-radio label="SUB">子页面</el-radio>
            <el-radio label="SELF">自身页面</el-radio>
            <el-radio label="WINDOW">新窗口页面</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openPage">打开</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>

import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
    data(){
        return {
            form:{
                page:'',
                type:'BLANK',
                path:'',
                params:'',
                title:'',
                other:false
            }
        }
    },
    methods:{
        beforeClose(){
          console.log("open")
         return  true;
           
        },
        openPage(){
            let config = this.form;
             
            this.open({
                status:true,
                title:config.title,
                page:config.page,
                path:config.path,
                type:config.type,
                other:config.other,
                params:config.params ? JSON.parse(config.params):'',
                confirmCallback:() => {
                  console.log('点击确定')
                },
                cancelCallback:(e) => {
                  console.log('点击取消')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.aweb-open-page {
  padding: 12px;
}

.aweb-open-page-form {
  padding: 20px;
  margin: 0 20px;
  // padding: 12px;
 // border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  form {
    width: 600px;
  }
}
</style>
