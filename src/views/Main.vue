<template>
  <div>
    <el-container>
        <el-header>
            <!-- 导航条 -->
            <CommonHeaderVue/>
        </el-header>
        <!-- tag标签 -->
        <CommonTag/>
        <el-container>
            <el-aside width="auto">
                <!-- 侧边栏 -->
               <CommonAside/>
            </el-aside>
            <el-main>
                <!-- 路由出口 -->
                <!-- 展示台 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonHeaderVue from '@/components/CommonHeader';
import CommonAside from '@/components/CommonAside';
import CommonTag from '../components/CommonTag';
export default {
    name:'Main',
    components:{
        CommonAside,
        CommonHeaderVue,
        CommonTag
    }
}
</script>

<style scoped>
.el-header{
    padding: 0px;
}
</style>