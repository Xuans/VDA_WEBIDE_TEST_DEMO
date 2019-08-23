<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm cus-login-container"
  >
    <h3 class="cus-title">赞同管理系统</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>

    <el-form-item prop="identifyCode">
      <div class="cus-code-input">
        <el-input class="input" maxlength="8" placeholder="请输入验证码" v-model="ruleForm.identifyCode"></el-input>
        <div class="cus-identifying-code" @click="getIdentifyingCode(true)">
          <img
            style="height:40px; width: 100px; cursor: pointer;"
            alt="点击更换"
            :src="identifyCodeSrc"
            title="点击更换"
          />
        </div>
      </div>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        class="cus-submit-btn"
        native-type="submit"
        @click.native.prevent="handleSubmit"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
    <!-- <el-form-item style="width:100%;">
      <el-checkbox v-model="checked" class="cus-remember" text-color="#771faa">记住密码</el-checkbox>
      <el-button type="text" class="cus-forget-passWord">忘记密码</el-button>
    </el-form-item>-->
  </el-form>
</template>

<script>
import { requestLogin,verifyImage } from "@/api/api";
import  {mixins} from '@v2-lib/vue.spa.plugin';
export default {
  mixins:[mixins],
  data() {
    return {
      identifyCodeSrc: verifyImage,
      logining: false,
      ruleForm: {
        account: "admin123",
        checkPass: "",
        identifyCode: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ],
        identifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: false
    };
  },
  created() {},
  methods: {
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },
    getIdentifyingCode: function(bRefresh) {
      if (bRefresh) {
        this.identifyCodeSrc = `${verifyImage}?${Math.random()}`;
      }
    },

    getMenu: function(list) {
      var context = this;
      let menus = [],
        menuObj = {},
        menuParent = {},
        result = list || [];

      if (result.length) {
        result
          .sort((a, b) => {
            return parseInt(a.seq, 10) - parseInt(b.seq, 10);
          })
          .map(i => {
            !i.pid && (i.pid = "");
            let p = menuObj[i.pid];
            if (!p) {
              p = menuObj[i.pid] = {
                id: i.pid,
                children: []
              };
            } else {
              !p.children && (p.children = []);
            }
            let item = menuObj[i.id] || {
              id: i.id
            };
            item.pid = i.pid || "";
            item.name = i.id;
            item.path = i.id;
            item.component = i.value;
            item.meta = { title: i.name, icon: i.icon };
            menuObj[i.id] = item;
            p.children.push(item);
          });

        Object.keys(menuObj)
          .filter(e => !menuObj[e].children)
          .map(e => delete menuObj[e]);

        return menuObj[""].children;
      }
    },

    handleSubmit(ev) {
      var _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          var loginParams = {
            username: this.ruleForm.account,
            password: this.ruleForm.checkPass,
            checkCode: this.ruleForm.identifyCode
          };
          this.logining = true;
          requestLogin(loginParams)
            .then(response => {
              this.logining = false;
              if (response.status && response.content) {
                window.localStorage.setItem(
                  "ctoken",
                  response.content.result || ""
                );
                sessionStorage.setItem(
                  "user",
                  JSON.stringify({
                    name: this.ruleForm.account,
                    avatar: "./img/user.png"
                  })
                );
                _this.$store.state.openedTabs = [];
                _this.$router.push({ path: "/" });
  
              } else {
                _this.$notify({
                  title: "登录失败",
                  message: response.errorMsg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.logining = false;
              this.$notify({
                title: "登录失败",
                message: err.errorMsg,
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

 <style lang="less" >
.cus-submit-btn {
  width: 100%;
}
.cus-login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .cus-identifying-code {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
    width: 102px; /*设置图片显示的宽*/
    height: 40px; /*图片显示的高*/
    background: #e2e2e2;
    margin: 0;
  }
  .cus-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .cus-remember {
    float: left;
  }

  .cus-forget-passWord {
    float: right;
  }
}
</style>