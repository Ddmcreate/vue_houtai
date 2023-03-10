<template>
    <el-form ref="form" :model="form" :rules="rules" class="login" :inline="true">
        <h3>登录系统</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="password">
            <el-input  v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="login" type="primary">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name:'Login',
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            // 规则校验与prop搭配使用
            rules:{
                username:[
                    { required:true, trigger:'blur', message:'请输入用户名'}
                ],
                password:[
                    { required:true, trigger:'blur', message:'请输入密码'}
                ]
            }
        }
    },
    methods:{
        // 登入
        login(){
            // 随机生成一个token信息
            // const token = Mock.Random.guid()
            // // token信息存入cookie用于不同页面的通信
            // alert(token)
            // Cookie.set('token',token)

            // 表单校验
            this.$refs.form.validate((valid)=>{
                if(valid){
                    getMenu(this.form).then(({data})=>{
                        // alert(data)
                        if(data.code === 20000){
                            // token信息存入cookie用于不同页面的通信
                            Cookie.set('token',data.data.token)

                            // 获取菜单的数据，存入store中（因为数据要跨组件使用，所以要定义在全局中）
                            this.$store.commit('setMenu',data.data.menu)
                            this.$store.commit('addMenu',this.$router)
                            // 跳转至首页
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message)
                        }
                    })
                }
            })

            
        }
    }
}
</script>

<style lang="less" scoped>

.login{
    // margin-top: 400px;
    margin: 180px auto;
    width:400px;
    height: 300px;
    border: 1px solid rgb(204, 170, 170);
    border-radius: 20px;
    box-shadow: 5px 5px 5px rgb(188, 176, 176) ,-5px 5px 5px rgb(188, 176, 176) ,5px -5px 5px rgb(188, 176, 176),-5px -5px 5px rgb(188, 176, 176);
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
</style>