<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="aweb-table-toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="searchForm" size="mini">
        <el-form-item label="角色ID">
          <el-input v-model="searchForm.roleId"></el-input>
        </el-form-item>
        <el-form-item label="角色名">
          <el-input v-model="searchForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="创建用户">
          <el-input v-model="searchForm.createUser"></el-input>
        </el-form-item>
      </el-form>
      <el-form size="mini">
        <el-form-item>
          <el-button type="primary" v-on:click="searchRoleList">查询</el-button>
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" v-on:click="addRoleVisible = true">新建</el-button>
          <el-button type="primary" @click="showEditRoleModal" :disabled="isSingle">修改</el-button>
          <el-button type="primary" v-on:click="delRole" :disabled="isDubble">删除</el-button>
          <el-button type="primary" @click="showLevelModal" :disabled="isSingle">关联权限</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="roleList"
      v-loading="listLoading"
      @selection-change="selectRole"
      style="width: 100%;"
      max-height="500"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="roleId" label="角色ID" width="120" sortable></el-table-column>
      <el-table-column prop="roleName" label="角色名" width="120" sortable></el-table-column>
      <el-table-column prop="createUser" label="创建用户" width="120" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120" sortable></el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="120" sortable></el-table-column>
      <el-table-column prop="remark" label="备注" min-width="180" sortable></el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="aweb-table-toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="getPageRole"
        :page-size="pageSize"
        :total="totalRole"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增角色" :visible.sync="addRoleVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" size="mini">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="surAddRole" :loading="addLoading">确认</el-button>
        <el-button @click.native="addRoleVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑角色" :visible.sync="editRoleVisible" :close-on-click-modal="false">
      <el-form
        :model="editForm"
        label-width="80px"
        :rules="editFormRules"
        ref="editForm"
        size="mini"
      >
        <el-form-item label="角色名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="surEditRole" :loading="editLoading">确认</el-button>
        <el-button @click.native="editRoleVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!--关联权限-->
    <el-dialog title="配置角色" :visible.sync="levelModalVisible" :close-on-click-modal="false">
      <div class="role-tree-wrap">
        <el-tree
          :data="roleMenuTree"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="roleMenuTree"
          highlight-current
          :props="defaultProps"
          @check-change="selectedMenuTree"
          :default-checked-keys="checkedMenu"
          style="max-height:500px;overflow:auto;"
        ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="associateLevel" :loading="addLoading">确认</el-button>
        <el-button @click.native="levelModalVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import {
  getUserListPage,
  removeUser,
  editUser,
  addUser
} from "../../api/api.js";

import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
  data() {
    return {
      searchForm: {
        roleId: "",
        roleName: "",
        createUser: ""
      },
      checkedMenu: [],
      isSingle: true,
      isDubble: true,
      roleList: [],
      totalRole: 0,
      rolePage: 1,
      pageSize: 10,
      listLoading: false,
      selectedRoleList: [], //列表选中列

      editRoleVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "",
        remark: ""
      },

      addRoleVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [{ required: true, message: "请输入角色名", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        remark: ""
      },

      levelModalVisible: false,
      roleMenuTree: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checekdTreeNodes: []
    };
  },
  props: {
    params: String //父组件传过来的参数
  },
  methods: {
    getPageRole(val) {
      this.rolePage = val;
      this.getRoleList();
    },
    searchRoleList: function() {
      this.rolePage = 1;
      this.getRoleList();
    },
    //获取角色列表
    getRoleList() {
      var _this = this;
      this.listLoading = true;
      this.$get(`${this.$axios.server}/springmvc/role/listAllRoles`, {
        createUser: this.searchForm.createUser,
        roleName: this.searchForm.roleName,
        roleId: this.searchForm.roleId,
        pageNum: this.rolePage,
        pageSize: this.pageSize
      }).then(function(data) {
        var roleList =
          (data &&
            data.content &&
            data.content.data &&
            data.content.data.roleList) ||
          [];
        _this.totalRole =
          (data &&
            data.content &&
            data.content.data &&
            data.content.data.totle) ||
          0;

        if (data.status) {
          if (roleList) {
            for (let i = 0; i < roleList.length; i++) {
              roleList[i].createTime = _this.formatTime(roleList[i].createTime);
            }
            _this.roleList = roleList;
          }
        } else {
        }
      });
      this.listLoading = false;
    },

    //重置
    resetForm() {
      this.searchForm.roleId = "";
      this.searchForm.roleName = "";
      this.searchForm.createUser = "";
      this.rolePage = 1;
      this.getRoleList();
    },

    //删除角色
    delRole: function() {
      var roleIds = [];
      var _this = this;

      for (let i = 0; i < this.selectedRoleList.length; i++) {
        roleIds.push(this.selectedRoleList[i].roleId);
      }
      this.$confirm("确认删除该角色吗?", "删除角色", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$deleteAxios(`${this.$axios.server}/springmvc/role/deleteRole`, {
          roleIds: roleIds.join()
        })
          .then(function(data) {
            if (data.status) {
              _this.$notify({
                title: "删除角色成功",
                type: "success"
              });
              _this.resetForm();
            } else {
              this.$notify({
                title: data.errorMsg,
                type: "success"
              });
            }
          })
          .catch(function(err) {
            _this.$notify({
              title: err,
              type: "error"
            });
          });
      });
    },

    showEditRoleModal: function() {
      this.editRoleVisible = true;
      this.editForm.name = this.selectedRoleList[0].roleName;
      this.editForm.remark = this.selectedRoleList[0].remark;
    },
    //编辑
    surEditRole: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          let params = {};
          params.roleId = this.selectedRoleList[0].roleId;
          params.roleName = this.editForm.name;
          params.remark = this.editForm.remark;
          this.$putAxios(
            `${this.$axios.server}/springmvc/role/editRole`,
            params
          ).then(res => {
            this.addLoading = false;
            if (res.status) {
              this.$notify({
                title: "修改角色成功",
                type: "success"
              });
         
              this.editRoleVisible = false;
              this.getRoleList();
            } else {
              this.$notify({
                title: "修改角色失败",
                type: "error"
              });
            }
          });
        }
      });
    },

    //新增角色
    surAddRole: function() {
      var _this = this;
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          let params = {};

          params.roleName = this.addForm.name;
          params.remark = this.addForm.remark;
          this.$post(
            `${this.$axios.server}/springmvc/role/addRole`,
            params
          ).then(res => {
            _this.addLoading = false;
            if (res.status) {
              this.$notify({
                title: "创建角色成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addRoleVisible = false;
              this.resetForm();
            } else {
              this.$notify({
                title: "创建角色失败",
                message: res.errorMsg,
                type: "error"
              });
            }
          });
        }
      });
    },

    selectRole: function(sels) {
      this.selectedRoleList = sels||{};

      if (sels.length > 1) {
        this.isDubble = false;
        this.isSingle = true;
      } else if (sels.length === 1) {
        this.isDubble = false;
        this.isSingle = false;
      } else {
        this.isDubble = true;
        this.isSingle = true;
      }
    },

    getRoleMenu: function() {
      var _this = this;
      let menus = [],
        menuObj = {},
        menuParent = {},
        result = [];
      _this.checekdTreeNodes = [];
      _this.checkedMenu = [];
      this.$get(`${this.$axios.server}/springmvc/role/listAllMenus.do`, {
        roleId: _this.selectedRoleList[0].roleId
      }).then(res => {
        if (res.status) {
          result = (res && res.content && res.content.treeDatas) || [];
          if (result.length) {         
              menus = result.map(function(item, idx) {
                item.pId && (menuParent[item.pId] = 1);
                item.id = item.id
                  ? item.id
                  : item.accCode
                  ? item.pId + item.accCode
                  : item.pId + idx;
                item.pid = item.pId;
                if (item.checked === "true" && item.accCode) {
                  _this.checekdTreeNodes.push(item);
                  _this.checkedMenu.push(item.id);
                }
                return item;
              });

              menus.map(i=>{
                !i.pid&&(i.pid='');
                let p=menuObj[i.pid];
                if(!p){
                  p=menuObj[i.pid]={
                    id:i.pid,
                    disabled:true,
                    children:[]
                  }
                }else{
                  !p.children&&(p.children=[]);
                  p.disabled =true;
                }
                let item=menuObj[i.id]||{id:i.id};
                item.name = i.name;
                item.pid = i.pid;
                item.checked = i.checked;
                i.accCode&&(item.accCode = i.accCode);
                item.type = i.type;
                i.open&&(item.open =i.open);
                menuObj[i.id]=item;
                p.children.push(item);
              });

              Object.keys(menuObj)
                  .filter(e=>!menuObj[e].children)
                  .map(e=>delete menuObj[e]);

               _this.roleMenuTree = menuObj[''].children;
          }
        }
      });
    },
    selectedMenuTree: function(data, ischeck, target) {
      var oldCheckedTree = this.checekdTreeNodes,
          flag = true;
      
      if(data.accCode){
      if (ischeck) {
        for (let i = 0; i < oldCheckedTree.length; i++) {
        var item = oldCheckedTree[i];
        if (item.pid === data.pid) {
          this.checekdTreeNodes.splice(i, 1, data);
          this.$refs.roleMenuTree.setCheckedNodes(this.checekdTreeNodes);
          flag = false;
        }
        }
        if(flag){
          this.checekdTreeNodes = this.$refs.roleMenuTree.getCheckedNodes();
        }

      }else{
          this.checekdTreeNodes = this.$refs.roleMenuTree.getCheckedNodes();
      }
	  }

    },
    showLevelModal: function() {
      this.getRoleMenu();
      this.levelModalVisible = true;
    },

    //关联权限
    associateLevel: function() {
	  var checkedNodes = this.$refs.roleMenuTree.getCheckedNodes(),
	  	  parentNodes = this.$refs.roleMenuTree.getHalfCheckedNodes(),
		  accessIds = [],
		  parentObj = {};

      for (let i = 0; i < checkedNodes.length; i++) {
        var item = checkedNodes[i],
          str = item.pid + "=" + item.accCode;
		
		parentObj[item.pid]=1;
        accessIds.push(str);
	  }
      for (let i = 0; i < parentNodes.length; i++) {
        var item = parentNodes[i],
          str = item.id + "=PARENT_NODE";

		if(!parentObj[item.id]){
			accessIds.push(str);
		}
        
	  }

      this.$putAxios(
        `${this.$axios.server}/springmvc/role/relevanceAccess`,
        {
          roleId: this.selectedRoleList[0].roleId,
          accessIds: accessIds.join()
        }
      ).then(res => {
        if (res.status) {
          this.$notify({
            title: "关联权限成功",
            type: "success"
          });
          this.levelModalVisible = false;
        } else {
          this.$notify({
            title: "关联权限失败",
            message: res.errorMsg,
            type: "error"
          });
        }
      });
    },

    formatTime: function(data) {
      var date = data && new Date(data);

      if (data && date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1)) +
          "-" +
          (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
          " " +
          (date.getHours() > 9 ? date.getHours() : "0" + date.getHours()) +
          ":" +
          (date.getMinutes() > 9
            ? date.getMinutes()
            : "0" + date.getMinutes()) +
          ":" +
          (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds())
        );
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.getRoleList();
    console.log("刷新表格页面,参数", this.params);
  },
  resume() {
    console.log("表格页面resume");
  },
  pause() {
    console.log("表格页面pause");
  }
};
</script>

<style lang="less">
.aweb-table-toolbar {
  padding: 12px;
  text-align: left;
}
</style>