<template>
  <div class="app-container">
     	<el-row class="aweb-app-info">
		<h3>子弹窗页面传参</h3>
	     <pre>

			let id = this.id  //从this中获取传递的参数


		</pre>
		</el-row>

    <el-row class="aweb-app-btn-ctn" >
     	<el-button type="success" @click="closeCurrentPage">关闭当前页</el-button>    <span>参数结果:{{id}}</span>
    </el-row>
  </div>
</template>

<script>
import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],

  data() {
    return {
    }
  },
  created() {
  },
  methods: {

   closeCurrentPage(e){

			 this.close();
			 
   }
  },
  mounted(){
      
   console.log('当前弹窗页面参数',this.id);

	},
	resume(){
	console.log('子页面resume')
		console.log('子页面resume',this)
	},
	pause(){
	console.log('子页面pause')
		console.log('子页面pause',this)
	}
}
</script>
<style lang="less" scoped>
	.aweb-app-info{
	
		padding: 20px;
		width: 100%;
		margin: 20px 0;
		>h3{
			margin-bottom:12px;
		}
		
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
	.aweb-app-btn-ctn{
		padding-left: 20px;
		&.last{
			padding-bottom: 20px;
		}
	}
</style>
