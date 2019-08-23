<template>
  <div>
    <dyn-form :model="taskAddM" :formData="formData" label-width="100px" ref="taskAddM0" style="width:600px;margin:0 auto;"></dyn-form>
    <!-- <el-input v-model="taskAddM.title"></el-input> -->

    
  </div>
</template>
<script>
import dynForm from '@/components/dynForm.vue'
import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
    data(){
        return {
          taskAddM:{
              name:'hahha',
              title:'',
              desp:[]
          },
          formData:[
            {
                value:'title',
                desp:'标题',
                dpsData:[],//辅助数据项，如下拉项，单选复选项
                component:'el-inputNumber',//['el-input','el-inputNumber','el-radio','el-radio-group','el-checkbox','el-checkbox-group','el-switch','el-select','el-datePicker','el-time-select','el-time-picker']                   
                $attrs:{
                    min:1,
                    max:11
                },
                $listeners:{
                     "change":()=>{
                         this.handleChange()
                    }
                }
            },
            {
                value:'name',
                desp:'标题',
                dpsData:[{//辅助数据项，如下拉项，单选复选项
                    label:'选1',
                    value:'1',
                },{
                    label:'选2',
                    value:'2',
                }],
                component:'el-select',          
                $attrs:{

                   
                },
                $listeners:{
                    "change":()=>{
                         this.handleChange()
                    }
                }
            },
            {
                value:'desp',
                desp:'标题',
                dpsData:[{//辅助数据项，如下拉项，单选复选项
                    label:'选1',
                    value:'1',
                },{
                    label:'选2',
                    value:'2',
                }],
                component:'el-checkbox-group',
                $attrs:{
                   
                },
                $listeners:{
                 
                }
            }
        ]
        }
    },
    methods:{
        handleChange(){
           console.log('dochange',this);
        //    this.taskAddM.title = 'hahahhahdddd';
        },
        getDataFromSub(val){
       
          console.log('val',val);

        }
    },
    mounted(){
     this.$refs.taskAddM0.$on('getDataFromSub',this.getDataFromSub);
    window.A = this;
    },
    components:{
       dynForm
    }
}
</script>
