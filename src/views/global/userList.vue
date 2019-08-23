<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="aweb-table-toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="searchForm" size="mini">
        <el-form-item label="用户ID">
          <el-input v-model="searchForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item label="创建用户">
          <el-input v-model="searchForm.creator"></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item>
          <el-button type="primary" v-on:click="searchUsers" size="mini">查询</el-button>
          <el-button type="primary" @click="resetForm" size="mini">重置</el-button>
          <el-button type="primary" v-on:click="addUserVisible = true" size="mini">新增</el-button>
          <el-button type="primary" :disabled="isSelected" @click="showEditModal" size="mini">修改</el-button>
          <el-button type="primary" :disabled="isSelected" v-on:click="delUser" size="mini">删除</el-button>
          <el-button type="primary" :disabled="isSelected" @click="showAssociateRoleModal" size="mini">关联角色</el-button>
          <el-button type="primary" :disabled="isLocked" v-on:click="unlock" size="mini">解锁</el-button>
          <el-button type="primary" :disabled="isSelected" @click="getUserDetail" size="mini">详细信息</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="userList"
      highlight-current-row
      v-loading="listLoading"
      @current-change="selectUser"
      style="width: 100%;"
      max-height="500"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="userId" label="用户ID" width="180" sortable></el-table-column>
      <el-table-column prop="username" label="用户名" width="100" sortable></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" sortable></el-table-column>
      <el-table-column prop="createUser" label="创建用户" width="120" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="180" sortable></el-table-column>
      <el-table-column prop="status" label="状态" min-width="120" sortable></el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="aweb-table-toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="totalUser"
        style="float:right;"
      ></el-pagination>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增用户" :visible.sync="addUserVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" size="mini">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="addForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-radio-group v-model="addForm.userType">
            <el-radio class="radio" :label="0">管理员</el-radio>
            <el-radio class="radio" :label="1">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确认</el-button>
        <el-button @click.native="addUserVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑用户" :visible.sync="editUserVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" size="mini">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-radio-group v-model="editForm.userType">
            <el-radio class="radio" :label="0">管理员</el-radio>
            <el-radio class="radio" :label="1">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="editSubmit" :loading="addLoading">确认</el-button>
        <el-button @click.native="editUserVisible = false">取消</el-button>
      </div>
    </el-dialog>

	<!-- 关联角色 -->
    <el-dialog title="关联角色" :visible.sync="roleModalVisible" :close-on-click-modal="false">
		<el-table
		:data="roleList"
		v-loading="listLoading"
		@selection-change="changeRole"
		style="width: 100%;"
		max-height="500"
    ref ="roleTable"
		>
		<el-table-column type="selection" width="55"></el-table-column>
		<el-table-column type="index" width="60"></el-table-column>
		<el-table-column prop="roleId" label="角色ID" sortable></el-table-column>
		<el-table-column prop="roleName" label="角色名"  sortable></el-table-column>
		<el-table-column prop="remark" label="备注" sortable></el-table-column>
		</el-table>
    <el-col :span="24" class="aweb-table-toolbar">
      <el-pagination
        layout="prev, pager, next"       
        @current-change="getPageRole"
        :current-page = "rolePage"
        :page-size="pageSize"
        :total="totalRole"
        style="float:right;"
      ></el-pagination>
    </el-col>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native="sureAssociateRole" :loading="addLoading">确认</el-button>
        <el-button @click.native="roleModalVisible = false">取消</el-button>
      </div>
    </el-dialog>

	<!--详细信息-->
    <el-dialog title="详细信息" :visible.sync="detailModalVisible" :close-on-click-modal="false">
	    <div class="basic-info-wrap">
			<p class="basic-info-title">基本信息</p>
			<div class="basic-info-ctn">
				<div class="group-item">
					<label class="group-label">用户ID：</label>
					<div class="group-text">{{selectedUser.userId}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">用户名：</label>
					<div class="group-text">{{selectedUser.username}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">昵称：</label>
					<div class="group-text">{{selectedUser.nickname}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">手机：</label>
					<div class="group-text">{{selectedUser.telephone}}</div>
				</div>	
				<div class="group-item">
					<label class="group-label">用户类型：</label>
					<div class="group-text">{{selectedUser.userType==='0'?'管理员':'普通用户'}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">邮箱：</label>
					<div class="group-text">{{selectedUser.email}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">备注：</label>
					<div class="group-text">{{selectedUser.remark}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">创建用户：</label>
					<div class="group-text">{{selectedUser.createUser}}</div>
				</div>	
				<div class="group-item">
					<label class="group-label">创建时间：</label>
					<div class="group-text">{{formatTime(selectedUser.createTime)}}</div>
				</div>											
			</div>
	    </div>

	    <div class="basic-info-wrap">
			<p class="basic-info-title">其他信息</p>
			<div class="basic-info-ctn">
				<div class="group-item">
					<label class="group-label">更新时间：</label>
					<div class="group-text">{{formatTime(selectedUser.updateTime)}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">最后登录成功时间：</label>
					<div class="group-text">{{formatTime(selectedUser.lastLoginTime)}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">最后登录失败时间：</label>
					<div class="group-text">{{formatTime(selectedUser.lastFailedLoginTime)}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">锁定开始时间：</label>
					<div class="group-text">{{selectedUser.lockTime||''}}</div>
				</div>	
				<div class="group-item">
					<label class="group-label">连续登录错误次数：</label>
					<div class="group-text">{{selectedUser.failedLoginCount}}</div>
				</div>
				<div class="group-item">
					<label class="group-label">用户登录IP：</label>
					<div class="group-text">{{selectedUser.lastHostAddress}}</div>
				</div>
												
			</div>
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
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!Number(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };

    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!/\w+.com$/g.test(value)) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!/[a-zA-Z][a-zA-Z0-9_]{5,19}$/g.test(value)) {
        callback(
          new Error(
            "用户名必须字母开头，是字母、数字或下划线中的任两种的组合，长度为6至20位"
          )
        );
      } else {
        callback();
      }
    };
    return {
      searchForm: {
        userId: "",
        username: "",
        creator: ""
      },
      isLocked:true,
	  userList: [],
	  roleList:[],
      totalUser: 0,
      userPage: 1,
      pageSize:10,
      listLoading: false,
      isSelected: true,
      selectedUser:{}, //列表选中列

      editUserVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        name: "",
        nickname: "",
        phone: "",
        email: "",
        userType: -1,
        remark: ""
      },

      addUserVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" }
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        userType: [
          { required: true, message: "请选择用户类型", trigger: "blur" }
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      //新增界面数据
      addForm: {
        name: "",
        nickname: "",
        phone: "",
        email: "",
        userType: "",
        remark: ""
	  },
	  
	  roleModalVisible:false,
    selectedRole:[],
    selectedPageRole:{},
    detailModalVisible:false,
    rolePage:1,
    totalRole:0,
    userRoles:[]
    };
  },
  props: {
    params: String //父组件传过来的参数
  },
  methods: {
    searchUsers:function(){
      this.userPage = 1;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.userPage = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      var _this = this;
      this.listLoading = true;
      this.$get(
        `${this.$axios.server}/springmvc/user/listAllUsers.do`,
        {
          userId:_this.searchForm.userId,
          username:_this.searchForm.username,
          createUser:_this.searchForm.creator,
          pageNum:_this.userPage,
          pageSize:_this.pageSize
        }
      ).then(function(data) {
        var userList = (data && data.content && data.content.data&&data.content.data.userList) || [];
        if (data.status) {
          if (userList) {
            for (let i = 0; i < userList.length; i++) {
              userList[i].createTime = _this.formatTime(userList[i].createTime);
            }
            _this.userList = userList;
            _this.totalUser = data.content.data.totle||0;
          }
        } else {
        }
      });
      this.listLoading = false;
    },

    //重置
    resetForm() {
	   this.searchForm.userId ='';
	   this.searchForm.username ='';
     this.searchForm.creator='';
     this.userPage = 1;
     this.getUsers();
    },

    //删除角色
    delUser: function() {
      var _this = this;
      this.$confirm("确认删除该用户吗?", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.$deleteAxios(
          `${this.$axios.server}/springmvc/user/delete/${_this.selectedUser.userId}`,
          {}
        )
          .then(function(data) {
            if (data.status) {
              _this.$notify({
                title: "删除用户成功",
                type: "success"
              });
              _this.getUsers();
            }
          })
          .catch(function(err) {
            _this.$notify({
              title: "删除用户失败",
              type: "error"
            });
          });
      });
    },
    getRoleList:function(){
        var _this =this;

        this.$get(`${this.$axios.server}/springmvc/role/listAllRoles`, {
          createUser:'',
          roleName:'',
          roleId:'',
          pageNum:_this.rolePage,
          pageSize:_this.pageSize
        })
          .then(function(data) {
            if (data.status) {
				      _this.roleList = data.content&&data.content.data&&data.content.data.roleList||[];
              _this.totalRole = data.content&&data.content.data&&data.content.data.totle||0;
              _this.$refs.roleTable.toggleRowSelection(_this.roleList[0]);
              _this.$nextTick(function(){

                  if(_this.selectedPageRole[_this.rolePage]&&_this.selectedPageRole[_this.rolePage].length){
                    _this.selectedPageRole[_this.rolePage].forEach(item=>{
                      for(let i=0;i<_this.roleList.length;i++){
                        if(_this.roleList[i].roleId===item.roleId){
                          _this.$refs.roleTable.toggleRowSelection(_this.roleList[i]);
                        }
                      }
                      
                    })
                  }else{
                    if(_this.userRoles.length&&_this.totalRole){
                      _this.userRoles.forEach(item=>{
                        for(let i=0;i<_this.roleList.length;i++){
                          if(_this.roleList[i].roleId===item.role.roleId){
                            _this.$refs.roleTable.toggleRowSelection(_this.roleList[i]);
                          }
                        }
                        
                      })
                    }
                  }                 
   
              })

            }
          })
          .catch(function(err) {
            _this.$notify({
              title: err,
              type: "error"
            });
          });
    },
    
    getPageRole:function(val){
      this.selectedPageRole[this.rolePage] = this.selectedRole||[];
      this.rolePage = val;
      this.getRoleList();
    },

    //关联角色
    showAssociateRoleModal: function() {
        var _this =this;

         this.rolePage =1;
        _this.selectedPageRole ={};
         this.$get(`${this.$axios.server}/springmvc/user/listUserRelevanceRoles/${this.selectedUser.userId}`, 
         {})
          .then(function(data) {
            if (data.status) {
              _this.userRoles = data&&data.content&&data.content.userRoles||[];
            }
            _this.getRoleList();
          })
          .catch(function(err) {
            _this.$notify({
              title: err,
              type: "error"
            });
          });       
		    _this.roleModalVisible = true;
	},

	changeRole:function(data){
    this.selectedRole = data;
	},
	
	sureAssociateRole:function(){
		var _this =this,
			userId = this.selectedUser.userId,
			roleIds = [];

    if(Math.ceil(this.totalRole/this.pageSize)===1){
      roleIds = this.selectedRole.map(function(item){
        return item.roleId;
      })
    }else{
      for(var key in this.selectedPageRole){
        if(this.selectedPageRole.hasOwnProperty(key)){
          roleIds = roleIds.concat(this.selectedPageRole[key]);
        }      
      }
      roleIds = roleIds.map(function(item){
        return item.roleId;
      })
    }

    if(roleIds&&roleIds.length){
      this.$putAxios(`${this.$axios.server}/springmvc/user/doUserRelevanceRoles/${userId}`, {
        roleIds:roleIds
      }).then(function(data) {
              if (data.status) {
                _this.$notify({
                title: '关联角色成功',
                type: "success"
                });
                _this.roleModalVisible = false;
              }
      }).catch(function(err) {
              _this.$notify({
                title: err,
                type: "error"
              });
      });
    }else{
              _this.$notify({
                title: "请选择角色",
                type: "error"
              });
    }
	},

    //解锁
    unlock: function() {
      var _this = this;

        _this.$putAxios(
          `${this.$axios.server}/springmvc/user/doUnlockUser/${_this.selectedUser.userId}`,
          {}
        )
          .then(function(data) {
            if (data.status) {
              _this.$notify({
                title: "解锁成功",
                type: "success"
              });
              _this.getUsers();
            }else{
              _this.$notify({
                title: "解锁失败",
                message:data.errorMsg,
                type: "error"
              });             
            }
          })
          .catch(function(err) {
            _this.$notify({
              title: "解锁失败",
              message:err,
              type: "error"
            });
          });      
    },

    //用户详情
    getUserDetail: function() {
		var _this = this;
	  	this.detailModalVisible = true;	  
    },
 	
	//显示修改弹窗
	showEditModal:function(){
		this.editForm.name = this.selectedUser.username;
		this.editForm.nickname = this.selectedUser.nickname;
		this.editForm.phone = this.selectedUser.telephone;
		this.editForm.email = this.selectedUser.email;
		this.editForm.userType = Number(this.selectedUser.userType);
		this.editForm.remark = this.selectedUser.remark;
		this.editUserVisible = true;
	},

    //编辑
    editSubmit: function() {
      	this.$refs.editForm.validate(valid => {
			if (valid) {
				this.addLoading = true;
				let params = {};

				params.userId = this.selectedUser.userId;
				params.nickname = this.editForm.nickname;
				params.remark = this.editForm.remark;
				params.userType = this.editForm.userType;
				params.email = this.editForm.email;
				params.telephone = this.editForm.phone;
				this.$putAxios(
					`${this.$axios.server}/springmvc/user/editUser`,
					params
				).then(res => {
					this.addLoading = false;
					if (res.status) {
						this.$notify({
							title: "修改用户成功",
							type: "success"
						});
						this.$refs["editForm"].resetFields();
						this.editUserVisible = false;
						this.getUsers();
						
					} else {
						this.$notify({
							title: "修改用户失败",
							type: "error"
						});
					}
				});
			}
      	});
    },

    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          let params = {};

          params.username = this.addForm.name;
          params.nickname = this.addForm.nickname;
          params.remark = this.addForm.remark;
          params.userType = this.addForm.userType;
          params.email = this.addForm.email;
          params.telephone = this.addForm.phone;
          this.$post(
            `${this.$axios.server}/springmvc/user/addUser`,
            params
          ).then(res => {
            this.addLoading = false;
            if (res.status) {
              // this.$notify({
              //   title: "创建用户成功",
              //   type: "success"
              // });
              this.$alert('创建用户成功,用户密码为：<span style="font-weight:bold;font-size:14px">'+res.content.password+'</span>', '提示', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true
              });              
              this.$refs["addForm"].resetFields();
              this.addUserVisible = false;
			        this.getUsers();
			  
            } else {
              this.$notify({
                title: res.errorMsg||"创建用户失败",
                type: "error"
              });
            }
          });
        }
      });
    },

    selectUser: function(sels) {
      var _this = this;

      this.selectedUser = sels||{};
      if (sels) {
        this.isSelected = false;
        (sels.status==='正常')&&(this.isLocked=true);
        (sels.status!=='正常')&&(this.isLocked=false);
      } else {
        this.isSelected = true;
        this.isLocked=true;
      }
      this.listLoading = true;
      this.$get(`${this.$axios.server}/springmvc/user/info/${this.selectedUser.userId}`,
        {}
      ).then(function(data) {
        
        if (data.status) {
          _this.selectedUser = (data && data.content && data.content.user) || {};
        }
      });
      this.listLoading = false;
    },

    formatTime: function(data) {
      var date = data&&new Date(data);

      if(data&&date){
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
        (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes())+
        ":"+
        (date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds())
          );
      }else{
        return '';
      }

    }
  },
  mounted() {
    this.getUsers();
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
.basic-info-wrap{
	border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
}
.basic-info-title{
	background: #f7f7f7;
    line-height: 30px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
}
.basic-info-ctn{
	padding:20px;
}
.basic-info-ctn .group-item{
	display: inline-block;
    margin-bottom: 12px;
}
.basic-info-ctn .group-label{
	width: 150px;
    text-align: right;
	display: inline-block;
	margin-left:20px;
}
.basic-info-ctn .group-text{
	display: inline-block;
	width: 200px;
	vertical-align: top;
}
</style>