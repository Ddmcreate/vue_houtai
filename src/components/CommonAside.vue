<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
   @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      height="100vh"
    >
    <!-- 无子菜单的选项 -->
    <el-menu-item  @click="clikMenu(item)"    v-for="item in noChildren" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <!-- 有子菜单的数据 -->
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
        <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="subItem  in item.children" :key="subItem.name" :index="subItem.name">
            <el-menu-item    @click="clikMenu(subItem)"  slot="title">{{subItem.label}}</el-menu-item >
         </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>
<script>
import Cookie from 'js-cookie'
export default {
    name:'CommonAside',
    data() {
      return {
        // isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    //   当重复点击二次时，进行二次向他的跳转，会报错
      clikMenu(item){
        console.log(item)
        // 当页面的路由与跳转的路由不一致才允许跳转
        if(this.$route.path !== item.path){
            // 这个时路由器管理路由
            if(this.$route.path === '/home' && item.path === '/'){
                
            }else{
              this.$router.push({name:item.name})
                // this.$router.push(item.path)
                // 添加面包屑
                this.$store.commit("selectMenu",item)
            }
        }
      }
    },
    // 计算属性
    computed:{
        // 没有孩子的
        noChildren(){
            return this.menuData.filter(item => !item.children)
        },
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },
        // 获取stroe内state中 tab模块的值修改的值
        isCollapse(){
            return  this.$store.state.tab.isCollapse
        },
        // 菜单数据
        menuData(){
          // 判断菜单数据是否存在，
          return    JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        }
    }
  }



</script>

<style lang="less" scoped>
.el-menu{
    height: 100vh;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>