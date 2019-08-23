<template>
  <section>
    <!--工具条-->
    <!-- <el-col
      :span="24"
      class="aweb-table-toolbar"
      style="padding-bottom: 0px; width:500px;margin-left:calc((100% - 500px)/2); text-align:center;"
    >
      <el-form
        :model="changePwdForm"
        label-width="120px"
        :rules="changePwdFormRules"
        ref="changePwdForm"
        size="mini"
      >
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input
            placeholder="请输入旧密码"
            v-model="changePwdForm.oldPwd"
            auto-complete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input
            placeholder="请输入新密码"
            v-model="changePwdForm.newPwd"
            auto-complete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="repeatPwd">
          <el-input
            placeholder="请重复新密码"
            v-model="changePwdForm.repeatPwd"
            auto-complete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="changePassword">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>-->
    <el-col :span="24">
      <div class="vda-ctn">
        <el-tree :data="tree" :props="treeProps" @node-click="selectItem" class="vda-api-list"></el-tree>
        <div class="vda-config-ctn">
          <div class="vda-config-ctt"></div>
          <div class="vda-preview-ctn" ref="echartsCtn"></div>
        </div>
      </div>
    </el-col>
  </section>
</template>

<script>
import { mixins } from "@v2-lib/vue.spa.plugin";
import vda from "@/api/pipe.vda.js";
import echarts from "echarts";
// import tree from "./tree/tree.vue";
// import node from "./tree/node.vue";
export default {
  mixins: [mixins],
  components: {
    // tree,
    // node
  },
  data() {
    var _this = this;
    var validatePwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
          //(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[~!#@&%\\^\\$_\\(\\)\\*\\.]+$)(.{6,30})
        } else if (
          !/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[~!#@&%\\^\\$_\\(\\)\\*\\.]+$)(.{6,30})/g.test(
            value
          )
        ) {
          callback(new Error("密码长度需在6-30之间，并且包含数字、字母和符号"));
        } else {
          callback();
        }
      },
      validateRepeatPwd = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (_this.changePwdForm.newPwd !== value) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      };
    return {
      changePwdForm: {
        oldPwd: "",
        newPwd: "",
        repeatPwd: ""
      },

      changePwdFormRules: {
        oldPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePwd, trigger: "blur" }
        ],
        repeatPwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validateRepeatPwd, trigger: "blur" }
        ]
      },
      tree: [],
      treeProps: {
        children: "children",
        label: "tree_node_desc",
        id: "tree_node_name"
      },
      data: {},
      echarts: null
    };
  },
  props: {
    params: String //父组件传过来的参数
  },
  methods: {
    changePassword: function() {
      this.$refs.changePwdForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          let params = {};

          params.oldPassword = this.changePwdForm.oldPwd;
          params.newPassword = this.changePwdForm.newPwd;
          params.repeatNewPassword = this.changePwdForm.repeatPwd;
          this.$axios
            .put(
              `${
                this.$axios.server
              }/changePassword.do?ctoken=${localStorage.getItem(
                "ctoken"
              )}&oldPassword=${params.oldPassword}&newPassword=${
                params.newPassword
              }&repeatNewPassword=${params.repeatNewPassword}`
            )
            .then(res => {
              this.addLoading = false;
              if (res.status) {
                this.$notify({
                  title: "修改密码成功",
                  type: "success"
                });
                this.$refs.changePwdForm.resetFields();
              } else {
                this.$notify({
                  title: "修改密码失败",
                  message: res.errorMsg,
                  type: "error"
                });
              }
            });
          // this.$putAxios(
          // 	`${this.$axios.server}/changePassword.do`,
          // 	params
          // ).then(res => {
          // 	this.addLoading = false;
          // 	if (res.status) {
          // 		this.$notify({
          // 			title: "修改密码成功",
          // 			type: "success"
          // 		});
          // 		this.$refs.changePwdForm.resetFields();
          // 	} else {
          // 		this.$notify({
          // 			title: "修改密码失败",
          // 			message:res.errorMsg,
          // 			type: "error"
          // 		});
          // 	}
          // });
        }
      });
    },
    selectItem(node) {
      if (node.children && node.children.length) {
      } else {
        vda.data(node[this.treeProps.id]).then(res => {

          const option = {
            legend: 1,//显示指标
            x: 0,//x维度
            y: 2,//y维度
			countUp: true,//指标是否汇总
			interval:10000,//轮询间隔
          };
          const data = res.content.data;

          let echartsOption = {
            legend: option.countUp
              ? ["下载量"]
              : Array.from(new Set(data.map(e => e[option.legend]))),
            xAxis: Array.from(new Set(data.map(e => e[option.x]))),
            yAxis: {}
		  };
		  
		  const yAxis=echartsOption.yAxis;
          data.forEach(e => {
            if (option.countUp) {
              yAxis[e[option.x]] = yAxis[e[option.x]] || 0;

              yAxis[e[option.x]] += e[option.y];
            } else {
              yAxis[e[option.legend]] =
                yAxis[e[option.legend]] || {};
              yAxis[e[option.legend]][e[option.x]] = e[option.y];
            }
          });
          debugger;

          this.data = {
            title: {
              text: "折线图堆叠"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: echartsOption.legend //["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: echartsOption.xAxis
            },
            yAxis: {
              type: "value"
            },
			series: option.countUp?[{
				name:echartsOption.legend[0],
				type:'line',
				data:echartsOption.xAxis.map(x => yAxis[x] || 0)
			}]:
			echartsOption.legend.map(l => {
              const legend = yAxis[l] || {};
              return {
                name: l,
                type: "line",
                data: echartsOption.xAxis.map(x => legend[x] || 0)
              };
            })
          };
        });
      }
    }
  },
  mounted() {
    console.log("刷新表格页面,参数", this.params);

    vda.ready().then(() =>
      vda.list().then(r => {
        const ret = r.content.ret || [];
        this.tree = ret.filter(e => e[this.treeProps.label] === "数据源模型");
      })
    );
  },
  resume() {
    console.log("表格页面resume");
  },
  pause() {
    console.log("表格页面pause");
  },
  watch: {
    data: {
      handler(n, o) {
        debugger;
        if (this.echarts) {
          this.echarts.setOption(this.data);
        } else {
          this.echarts = echarts.init(this.$refs.echartsCtn);

          this.echarts.setOption(this.data);

          window.eee = this.echarts;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less">
.aweb-table-toolbar {
  padding: 12px;
  text-align: left;
}
.vda-ctn {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.el-tree.vda-api-list {
  width: 200px;
  overflow: auto;
}

.vda-config-ctn {
  flex: 1;
  overflow: auto;
  height: 100%;
}
.vda-preview-ctn {
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>