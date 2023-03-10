<template>
  <div class="header-container">
    <div class="title" v-show="isshow" ref="title">
                通用后台管理系统
    </div>
    <div class="l-content">
        <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
        <!-- <span class="text">首页</span> -->
        <!-- 首页的面包屑部分 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in tags" :key="item.path"  :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="r-content">
        <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
                <img src="../assets/touxiang.jpg" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item command="cancel">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {mapState} from 'vuex'
export default {
    name:'CommonHeader',
    data(){
        return {
            isshow:true,
        }
    },
    methods:{
        handleMenu(){
            // 点击按钮，触发commit方法，修改菜单是否折叠的值
            this.isshow =!this.isshow
            this.$store.commit("CollapseMenu")
        },
        handleClick(command){
            if(command === 'cancel'){
                // 登出则清除token的值
                Cookie.remove('token')
                // 返回登入页
                this.$router.push('/login')
                // 清除cookie中的menu菜单数据
                Cookie.remove('menu')
                this.$store.commit('deleteMenu')
            }
        }
    },
    computed:{
        // 遍历面包屑(store中存储的)
        ...mapState({
            tags:state=>state.tab.tabList
        })
    },

    mounted(){
        console.log(this.tags)
    }
}
</script>

<style scoped lang="less">
.header-container{
    height: 60px;
    background-color: #333;
    position: relative;
}
.header-container>div:nth-child(n+1){
    float: left;
}
.header-container>.title{
    width: 200px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color:white;
}
.header-container >.l-content{
    display: flex;
    justify-content: space-around;
    align-content: center;
}
.el-button{
    margin:13px 20px 0px;
    color:red;
    background-color:wheat;
}
.text{
    margin-top:15px;
    font-size: 16px;
    color: white;
}
.r-content{
   position:absolute;
   top: 5px;
   right: 10px;
   
}

.el-dropdown-link>img{
    display: block;
    width:50px;
    height: 50px;
    border-radius: 50%;
}

/* 面包屑 */
.el-breadcrumb{
    margin-top: 20px;
    color:white;
    margin-left: 20px;
    /* 样式穿刺 ,不加样式不能被修改*/
    /deep/.el-breadcrumb__item{
        .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
            color: #666;
        }
        &:last-child{
            .el-breadcrumb__inner{
                color: white;
            }
        }
    }
}
</style>