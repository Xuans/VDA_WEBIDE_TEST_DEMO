  <template>
<el-container style="border: 1px solid #eee;position: absolute;bottom: 0; top: 0;width: 100%;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="[]" >
      <el-submenu v-for="(systemClass,index) in systemClass" :key="index" :index="index+''">
        <template slot="title">{{systemClass.name}}</template>
        <el-menu-item v-for="children in systemClass.children" :key="children.id" :index="children.id">
          {{children.name}}
        </el-menu-item>
      </el-submenu>
      <el-button class="systemBut">+新增系统</el-button>
    </el-menu>
    
  </el-aside>
  
  <el-main>
    <el-header style="text-align: right; font-size: 12px">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="服务" name="first"> <async-component page="example/table" :keepAlive="false" ref="tablepage" ></async-component> </el-tab-pane>
        <el-tab-pane label="持续集成配置" name="second"> <async-component page="spa/newPage" :params="subPageParams"></async-component></el-tab-pane>
      </el-tabs>
    </el-header>
  </el-main>
</el-container>
</template>

<script>

import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
    data() {
      return {
        subPageParams:{title:'老参数'},//传递的页面参数必须封装为对象或数组，不能为字符串
        page: {
            pageSize: 10, //每页条数,  默认10条
            totalRecords: 0, //总条数
            totalPages: 0, //总页数
            pageNum:1
          },
        systemClass:[
          {
            name:"父节点",
            children:[
              {
                id:"1",
                name:"节点页面1"
              },
              {
                id:"2",
                name:"节点页面2"
              }
            ]
          },
          {
            name:"系统",
            children:[
              {
                id:"3",
                name:"系统1"
              },
              {
                id:"4",
                name:"系统2"
              }
            ]
          }
        ],
        tableData: [{
          id:"1",
          name:"zzh1",
          code:"zzh1",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        },
        {
          id:"2",
          name:"zzh2",
          code:"zzh2",
          createID:"admin",
          createTime:"2019-01-01",
          type:"zzh"
        }],
        multipleSelection: [],
        search:'',
        activeName: 'first'
      }
    },
    mounted(){
      this.initTab();
      console.log('tabpage',this.$refs.tablepage);
     
    },
    methods: {
    
      handleClick(tab, event) {
        // this.$message.info(tab+event);
        //手动调用子页面的reload重载方法
        this.$refs.tablepage.reload();
      },
      handleEdit(index, row) {
        this.$message.info(index+row);
      },
      initTab(){
        this.page.totalRecords = this.tableData.length;
      }
    },

      resume(){
      console.log('子tab页面resume')
    },
    pause(){
      console.log('子tab页面pause')
    }
  };
</script>
<style lang="less">
  .systemBut{
    width:100%;
    position:absolute;
    bottom:0px;
  }
</style>
