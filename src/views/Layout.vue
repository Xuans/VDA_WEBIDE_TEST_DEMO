	<template>
  <el-row class="aweb-container"  ref="layout" name="layout">
    <el-col :span="24" class="aweb-header">
      <el-col
        :span="10"
        class="aweb-logo"
        :class="collapsed?'logo-collapse-width':'logo-width'"
      >{{collapsed?'':sysName}}</el-col>
      <el-col :span="10">
        <div class="aweb-tools" @click.prevent="collapse">
          <i class="el-icon-menu"></i>
        </div>
      
      </el-col>

      <el-col :span="6" class="aweb-userinfo">

        <el-tooltip  effect="dark" content="下载后端案例" placement="top">
            <el-button icon="el-icon-sold-out" circle class="aweb-download-btn" @click="openMarket('end')"></el-button>
        </el-tooltip>

        <el-tooltip  effect="dark" content="下载前端案例" placement="top">
            <el-button icon="el-icon-sold-out" circle class="aweb-download-btn" @click="openMarket('font')"></el-button>
        </el-tooltip>

        <el-tooltip  effect="dark" content="后台接口文档" placement="top">
            <el-button icon="el-icon-sold-out" circle class="aweb-download-btn" @click="openMarket('endDoc')"></el-button>
        </el-tooltip>


        <el-dropdown trigger="hover">
          <span class="el-dropdown-link aweb-userinfo-inner">
            <img :src="sysUserAvatar">
            {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <el-col :span="24" class="aweb-body">
 <!-- 侧边导航 -->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">

        <el-menu        
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#152028"
          text-color="#fff"
          :collapse="collapsed"
          @select="handleSelectMenu"
        >

          <template v-for="item in routerData" v-if="!item.hidden">
            
              <el-submenu  v-if="item.children && item.children.length && !item.isLeaf || (item.isLeaf && item.isRedirect)" :index="item.path+'#'+item.componentUrl+'#'+(item.meta && item.meta.title && item.meta.title)" :key="item.path">
                <template slot="title">
                  <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
                  <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">

                      <el-submenu  v-if="child.children" :index="item.path+'/'+child.path+'#'+child.componentUrl+'#'+(child.meta && child.meta.title && child.meta.title)" :key="item.path+'/'+child.path">
                              
                                    <template slot="title">
                                      <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                                      <span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
                                    </template>

                                    <template v-for="child3 in child.children" v-if="!child3.hidden">

                                            <el-submenu  v-if="child3.children" :index="item.path+'/'+child.path+'/'+child3.path+'#'+child3.componentUrl+'#'+(child3.meta && child3.meta.title && child3.meta.title)" :key="item.path+'/'+child.path+'/'+child3.path">                              
                                                    <template slot="title">
                                                      <i v-if="child3.meta && child3.meta.icon" :class="child3.meta.icon"></i>
                                                      <span v-if="child3.meta && child3.meta.title">{{child3.meta.title}}</span>
                                                    </template>

                                                    <template v-for="child4 in child3.children" v-if="!child4.hidden">                                         
                                                          <el-menu-item :index="item.path+'/'+child.path+'/'+child3.path+'/'+child4.path+'#'+child4.componentUrl+'#'+(child4.meta && child4.meta.title && child4.meta.title)" :key="item.path+'/'+child.path+'/'+child3.path+'/'+child4.path">
                                                            <i v-if="child4.meta && child4.meta.icon" :class="child4.meta.icon"></i>
                                                            <span v-if="child4.meta&&child4.meta.title">{{child4.meta.title}}</span>
                                                          </el-menu-item>
                                                    </template>                             
                                              </el-submenu>


                                          <el-menu-item v-else :index="item.path+'/'+child.path+'/'+child3.path+'#'+child3.componentUrl+'#'+(child3.meta && child3.meta.title && child3.meta.title)" :key="item.path+'/'+child.path+'/'+child3.path">
                                            <i v-if="child3.meta && child3.meta.icon" :class="child3.meta.icon"></i>
                                            <span v-if="child3.meta&&child3.meta.title">{{child3.meta.title}}</span>
                                          </el-menu-item>


                                    </template>
                              
                      </el-submenu>


                    <el-menu-item v-else  :index="item.path+'/'+child.path+'#'+child.componentUrl+'#'+(child.meta && child.meta.title && child.meta.title)" :key="item.path+'/'+child.path">
                      <i v-if="child.meta && child.meta.icon" :class="child.meta.icon"></i>
                      <span v-if="child.meta && child.meta.title" :data-role="item.path+'/'+child.path">{{child.meta.title}}</span>
                    </el-menu-item>
            
                </template>
              </el-submenu>

             
                <el-menu-item  v-else-if="item.isLeaf && !item.children[0].children"  :index="item.children[0].path+'#'+item.children[0].componentUrl+'#'+(item.children[0].meta && item.children[0].meta.title && item.children[0].meta.title)" :key="item.path+'/'+item.children[0].path" >  
                  <i v-if="item.children[0].meta && item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>          
                    <span v-if="item.children[0].meta && item.children[0].meta.title">{{item.children[0].meta.title}}</span>
                  </el-menu-item>

                 <el-menu-item  v-else  :index="item.path+'#'+item.componentUrl+'#'+(item.meta && item.meta.title && item.meta.title)" :key="item.path" >  
                  <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>          
                    <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
                  </el-menu-item>


            </template>        
        </el-menu>
      </aside>
 <!-- 侧边导航-->
      <section class="aweb-ctt">
        <div class="grid-content bg-purple-light">
          <div>
  
            <el-tabs
              v-model="activeIndex"
              type="border-card"
              closable

              v-if="openedTabs.length"
              @tab-click="tabClick"
              @tab-remove="tabRemove"

              @contextmenu.native="tabRightClick"
            >
   
              <el-tab-pane
                :key="item.name"
                v-for="item in openedTabs"
                :label="item.name"
                :name="item.route"
                :route="item.route"
              >
              <el-col :span="24" class="aweb-ctt-wrap" >
        
                <transition name="fade" mode="out-in"> 
                 
                      <!-- <router-view  ></router-view> -->
                     <keep-alive v-if="isRouterAlive">                           
                          <router-view  v-if="(activeIndex===item.route)"></router-view>
                      </keep-alive>
                                            
                      <router-view  v-else-if="!isRouterAlive && activeIndex===item.route"></router-view>
                      
                 
                </transition>
              </el-col>
          
			        </el-tab-pane>
            </el-tabs>

          </div>
              <!-- 子页面容器 -->
              <el-dialog   :title="subPageTitle" :visible.sync='subDialogVisible' @close="closeDialog" ref="_op_dialog_ctn">
                <transition name="fade" mode="out-in"  v-if="subDialogVisible">                  
                  <sub-page-ctn :page="subPageHref" :params="subPageParams" v-if="subDialogVisible" ></sub-page-ctn> 
                </transition>        
                <div slot='footer' class='dialog-footer'>
                <el-button @click="cancel" v-if="subFooter('cancel')" >取消</el-button>
                <el-button type='primary' v-if="subFooter('confirm')" @click="confirm">确定</el-button >
                </div> 
            </el-dialog>
             <!-- 子页面容器 -->
        </div>
      </section>
    </el-col>
      <right-menu :menuData="rightMenuData"  :eventHandler=rightClickHandler  v-on:handleSelect= "handleRightSelect"></right-menu> 
  </el-row>
</template>
<script>

    
import {getMenuRoutes,addMenuToRoutes,mixins} from '@v2-lib/vue.spa.plugin'
import { getRoutersList } from '@/api/api.js'
import {caseRouter} from '@/api/case.js'

const caseList= process.env.NODE_ENV === 'production'?[]:caseRouter;
export default {
  name:'layout',
  data() {
    return {
      routerData:JSON.parse(JSON.stringify(getMenuRoutes())),
      sysLogo:"img/logo.png",
      sysName: "AWEB_ADMIN",
      collapsed: false,
      sysUserName: "admin",
      sysUserAvatar: "https://s.gravatar.com/avatar/f30a9191dda93b5389965ed99f57f850?s=50&d=retro",  
      rightClickHandler:null,
      isRouterAlive: true,
      clickTab: false
    };
  },

 async beforeRouteEnter(to, from, next){
      let transformMenu=(list)=>{
        var context = this;
          let menus = [],
              menuObj = {},
              menuParent = {},
              result = list||[];

          if(result.length){
            result.sort((a,b)=>{
              return parseInt(a.seq,10)-parseInt(b.seq,10);
            }).map(i=>{
              !i.pid&&(i.pid='');
              let p=menuObj[i.pid];
              if(!p){
                p=menuObj[i.pid]={
                  id:i.pid,
                  children:[]
                }
              }else{
                !p.children&&(p.children=[]);
              }
              let item=menuObj[i.id]||{
                id:i.id,
                //children:[]
              };
              item.pid=i.pid||"";
              item.name = i.id;
              item.path = i.id;
              item.component=i.value;
              item.meta ={title:i.name,icon:i.icon};
              menuObj[i.id]=item;
              p.children.push(item);
            });

            Object.keys(menuObj)
                .filter(e=>!menuObj[e].children)
                .map(e=>delete menuObj[e]);

            return menuObj[''].children;
          
          }
      };
      let getMenu=()=>{
        return new Promise((resolve,reject)=>{
              getRoutersList().then(res => {
                if(res && res.status){
                  var list = res&&res.content&&res.content.menus||[];
                  let menu = transformMenu(list);
                  resolve(menu);                  
                }else{
                  reject()
                }

          })
        })
      };
      try{

        let menus=getMenuRoutes();
        if(!menus.length){
          let menus=await getMenu();
          let path = to.redirectedFrom || to.path;
          let menuData=[...menus,...caseList];
          addMenuToRoutes(menuData);
          next(path);
        }else{
          next()
        }
      }catch(e){
      
      console.log(e);
        next();
      }

 },
  mixins:[mixins],

  methods: {
    beforeClose(){
      console.log("333")
      return true;
    },
    handleSelectMenu:function(key, keyPath){
       console.log('key',key);

      let keys = key.split('#'),
          path = keys[0],
          page = keys[1],
          title= keys[2];


       this.open({
         path:'/'+path,
         page:page,
         status:true,
         type:'BLANK',
         title:title||'标题',
         keepAlive:true
       })


    },
    tabRightClick: function(e) {
      if (e.target.classList[0] === "el-tabs__item") {
        e.stopPropagation();
        e.preventDefault();
        this.rightClickHandler = e;
        // this.rightClickTaget

      }else{
        return true;
      }
    },
    reload() {
   
          this.isRouterAlive = false;
         
          this.$nextTick(function () {
              this.isRouterAlive = true
          })
        },
    handleRightSelect:function(key){
        // let id= this.rightClickHandler&& this.rightClickHandler.toElement.id,activeIndex;
        // if(id){
        //   id=id.replace('tab-','');
        // }
        let  activeIndex=this.activeIndex;

       switch(key){
         case'refresh':
      
         this.reload();
            
          break;
         case'close':
            let targetRoute=this.getCurrentRouteMatched(activeIndex);
            targetRoute.instances.default.close({path:activeIndex});
           break;  
           case'closeLeft':

            if (this.openedTabs && this.openedTabs.length >= 1) {

              this.$store.commit("delete_left_tabs", activeIndex);
             
            }
           break;
          case'closeRight':

            if (this.openedTabs && this.openedTabs.length >= 1) {

              this.$store.commit("delete_right_tabs", activeIndex);
             
            }
         
           break;

         case'closeAll':
           this.$store.commit("delete_allTabs");
           break;

       }

    },
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
      })
        .then(() => {
          this.$deleteAxios(`${this.$axios.server}/signOut.do`, {}).then(function(
            data
          ) {
            if (data.status) {
              sessionStorage.removeItem("user");
              _this.$router.push("/login");
              // global.pageMap = {};
            } else {
              _this.$notify.error({
                title: "退出登录失败"
              });
            }
          });
        })
        .catch(() => {});
    },
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    tabClick(tab) {
      this.clickTab = true;
      this.$router.push({ path: this.activeIndex,query:this.URLQueryMap[this.activeIndex] ||{}});

    },
    tabRemove(targetName) {
      
       let targetRoute=this.getCurrentRouteMatched (targetName);
      targetRoute.instances.default.close({path:targetName});

     
    },

    getCurrentRouteMatched(targetName ){
        let currentRoute= this.$router.match(targetName)
        let matched=currentRoute.matched.filter(item=>item.path===currentRoute.path)  
        return matched[0];
    },

  
    cancel(){         
           this.closeDialog();
           this.$store.commit("do_cancel");        
    },
    confirm(){
          this.closeDialog(); 
          this.$store.commit("do_confirm");       
    },
    closeDialog(){
       this.$store.commit("set_D_visible",false);    
       this.$store.commit("set_active_index", this.activeIndex);
    },
    openMarket(arg){
      if(arg==='end'){
         window.open('https://market.awebide.com/package/@aweb-initApp/springboot');
      }else if(arg==='endDoc'){
          window.open('https://vue-api.awebide.com/swagger-ui.html#/');
      }else{
        window.open('https://www.awebide.com:7002/package/@aweb-template/vue-spa');
      }
     
    }
   
  },

  
  mounted() {
    // this.getMenu();
    let user = sessionStorage.getItem("user");
   
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
     this.$store.commit("add_tabs", {
        route: this.$route.path,
        name: this.$route.meta.title
        
      });
    
    this.$store.commit("set_active_index", this.$route.path);

  },
  computed: {
    openedTabs() {

      return this.$store.state.openedTabs;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    },
     subDialogVisible: {
        get() {
          return this.$store.state.subDialogVisible;
        },
        set(val) {
          this.$store.commit("set_D_visible", val);
        }
     },
     subPageHref: {
        get() {
          return this.$store.state.subPageHref;
        },
        set(val) {
          this.$store.commit("set_subPageHref", val);
        }
     },
    subPageParams: {
        get() {
          return this.$store.state.subPageParams;
        },
        set(val) {
          this.$store.commit("set_subPageParams", val);
        }
     },
     subPageTitle:{
       get() {
          return this.$store.state.subPageTitle;
        },
        set(val) {
          this.$store.commit("set_subPageTitle", val);
        }
     },
    rightMenuData() {
       return this.$store.state.rightMenuData;
    },
    URLQueryMap:{
      get() {
        return this.$store.state.URLQueryMap;
      },
      set(val) {
        this.$store.commit("set_url_map", val);
      }
    },
    subFooter(type){
       return (type)=>{
         return  this.$store.getters.subPageFooter(type);
       }
    }
  },
  watch: {
    $route(to, from) {
      let flag = false;
     
      if(to.meta.type ==='BLANK'){
        if(Object.keys(to.query).length){
            this.$store.commit("set_url_map",({path:to.path,query:to.query}))
          }
      }
      if (this.clickTab) {

        this.$store.commit("set_active_index", to.path);
        this.clickTab = false;

      } else {
      if(to.meta.type==='BLANK' || !to.meta.type){
        for (let item of this.openedTabs) {
                if (item.route === to.path) {
                  this.$store.commit("set_active_index", to.path);
                  flag = true;
                  break;
                }
              }
      
          if (!flag) {
            this.$store.commit("add_tabs", { 
              route: to.path, 
              name: to.meta.title,
              keepAlive:to.meta.keepAlive

            });
            this.$store.commit("set_active_index", to.path);
          }
      }else if(to.meta.type==='SELF'){
    
          this.$store.commit("add_tabs", {
             route: to.path,
             name: to.meta.title,
             keepAlive:to.meta.keepAlive
           });
          this.$store.commit("set_active_index",to.path);
          this.$store.commit("delete_tabs", from.path);
       
      }
    }

     
    },
 
    subDialogVisible:{
       immediate:true,
       handler(newVal, oldVal){
           if(!newVal && oldVal){
             let currentRoute=this.$router.currentRoute;
              let matched=currentRoute.matched.filter(item=>item.path===currentRoute.path)  
              let currentPageConfig =  matched[0].components.default;
              let currentPageIns = matched[0].instances.default;
               currentPageConfig.resume && currentPageConfig.resume.call(currentPageIns);                
           }
       }
    }
  }

};
</script>

<style  lang="less">
.aweb-container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  background-color: #f0f2f5;
  .aweb-header {
    line-height: 64px;
    background: #fff;
    height: 64px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    .aweb-userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .aweb-userinfo-inner {
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
      .aweb-download-btn{
        margin-right: 1em;
      }
    }
    .aweb-logo {
      height: 64px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: rgb(14, 9, 9);
      }
    }
    .logo-width,
    .logo-collapse-width {
      background-color: #152028;
      color: #fff;
      box-shadow: 2px 0 6px rgba(0,21,41,.35);  
      transition: width .28s;
      }
      .logo-collapse-width {
        width: 64px;
      }
      .logo-width {
      width: 230px;
      }
    .aweb-tools {
      padding: 0px 23px;
      width: 14px;
      height: 64px;
      line-height: 64px;
      cursor: pointer;
    }
  }
  .aweb-body {
    position: absolute;
    top: 64px;
    bottom: 0px;
    overflow: hidden;
    aside {
	  width: 230px;
		box-shadow: 2px 0 6px rgba(0,21,41,.35);
    transition: width .28s;
    //  position:absolute;
    height: 100%;
      .el-menu {
      height: 100%;
      border-right: 0;
  
      
      }
      a.router-link-exact-active.router-link-active{
        text-decoration: none;
      }
      .el-menu-item{
         &:hover{
            i{
                color: #fff;
            }
         }
         &.is-active:hover{
             color: #fff !important;
         }
      }
      .el-submenu{
           [class*="fa "]{
           
            margin-right: 9px;
            font-size: 18px;
            margin-left: 4px;
           }
          &:hover{
            .el-submenu__title i{
               color: #fff;
            } 
          }
      }
    }
    .menu-collapsed {
    
      width: 64px;
      transition: width .28s;
      &+.aweb-ctt{
        margin-left: 64px;
        transition: margin-left .5s;
      }
    }
    .menu-expanded {
    
      width: 230px;
       transition: width .5s;
       &+.aweb-ctt{
        margin-left: 230px;
        transition: margin-left .28s;;
      }
    }

  }
   .aweb-ctt {
  
      overflow: auto;
      padding: 10px;
      margin-left: 230px;
      position: absolute;
      left: 0;
      right: 0;
      top:0;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .aweb-ctt-wrap {
        background-color: #fff;
        box-sizing: border-box;
        padding:20px;
      }
      .grid-content{
           >div>div.el-tabs>.el-tabs__content{
              height: calc(100vh - 125px);
              overflow: auto;
              padding: 0;
           }
           .el-tabs__item:focus, 
           .el-tabs__item:focus:active,
           .el-tabs__item:active:focus{
                 outline: none;
                outline-color: transparent;
           }
      }
     
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }
}
</style>