<template>
    <section>
        <Leftbar></Leftbar>
        <Topbar></Topbar>
        <el-row class="container">
            <el-col :span="24" class="topbar-wrap">
            <div class="topbar-logos" v-show="!collapsed">
                <router-link :to="{name:'/backend'}"><img src="/static/images/logo.png"></router-link>
            </div>
            <div class="topbar-account topbar-btn">
                <el-dropdown trigger="click">
                <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{sysUserName}}  <i
                    class="iconfont icon-down"></i></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                    <router-link to="/user/profile"><span style="color: #555;font-size: 14px;">个人信息</span></router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                    <router-link :to="'/user/changepwd'"><span style="color: #555;font-size: 14px;">修改密码</span></router-link>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
            </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="{showSidebar:!collapsed}">
        <!--展开折叠开关-->
        <div class="menu-toggle" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>
        <!--导航菜单-->
        <el-menu default-active="0" router :collapse="collapsed">
          <div v-for="(item,index) in $router.options.routes" v-if="item.menuShow" :key='index'>
            <el-submenu v-if="!item.leaf" :index="index+''">
              <template slot="title">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <el-menu-item 
                v-for="term in item.children" 
                :key="term.path" 
                :index="term.path" 
                v-if="term.menuShow"
                :class="$route.path==term.path?'is-active':''">
                <i :class="term.iconCls"></i>
                <span slot="title">{{term.name}}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item 
              v-else-if="item.leaf&&item.children&&item.children.length" 
              :index="item.children[0].path"
              :class="$route.path==item.children[0].path?'is-active':''">
              <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>

    </el-col>
  </el-row>
</section>
    
</template>
<script>
import Leftbar from "../../components/leftbar.vue";
import Topbar from "../../components/topbar.vue";
export default {
  name: "backend",
  components: {
    Leftbar,
    Topbar
  },
  created() {
    this.$on("setUserName", text => {
      this.sysUserName = text;
    });
  },
  data() {
    return {
      sysUserName: "",
      sysUserAvatar: "",
      collapsed: false
    };
  },
  methods: {
    handleOpen() {
      //console.log('handleopen');
    },
    handleClose() {
      //console.log('handleclose');
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    logout() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          sessionStorage.removeItem("access-user");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    var user = sessionStorage.getItem("access-user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
    }
  }
};
</script>
<style lang="">

</style>
