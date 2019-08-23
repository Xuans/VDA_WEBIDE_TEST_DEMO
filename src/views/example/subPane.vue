<template>
    <el-main>
        <el-button>+新增服务</el-button>
        <el-button type="danger">删除</el-button>
        <el-input style="width:150px;"
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
        <el-table ref="multipleTable" :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((page.pageNum-1)*page.pageSize,page.pageNum*page.pageSize)"
            tooltip-effect="dark" style="width: 100%" >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column  prop="name" label="服务名" width="120"> </el-table-column>
            <el-table-column prop="code" label="服务码" width="120"> </el-table-column>
            <el-table-column prop="createID" label="创建人" width="120"> </el-table-column>
            <el-table-column label="创建时间" width="120"> <template>{{ scope.row.createTime }}</template> </el-table-column>
            <el-table-column prop="type" label="类型" show-overflow-tooltip> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button
                  size="mini"
                 >编辑</el-button>
              </template>
            </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[10,20,30,40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="page.totalRecords">
          </el-pagination>
        </div>
    </el-main>
</template>

<script>
import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
    data(){
        return {
        page: {
            pageSize: 10, //每页条数,  默认10条
            totalRecords: 0, //总条数
            totalPages: 0, //总页数
            pageNum:1
          },
        systemClass:[
          {
            name:"zzh",
            children:[
              {
                id:"1",
                name:"zzh1"
              },
              {
                id:"2",
                name:"zzh2"
              }
            ]
          },
          {
            name:"system",
            children:[
              {
                id:"3",
                name:"system1"
              },
              {
                id:"4",
                name:"system2"
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
    methods:{
        handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       // 每页显示多少条数据
      sizeChange(val) {
    
        this.page.pageSize = val;
      },
      //翻页
      currentChange(val) {
        this.$message.info(val);
        this.page.pageNum=val-1;
      }
    },
    mounted(){
      console.log('加载页面、、、')
    }
}
</script>
