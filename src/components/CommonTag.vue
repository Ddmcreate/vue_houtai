<template>
  <div style="height:30px" class="tags">
    <el-tag
        v-for="(tag,index) in tags"
        :key="tag.name"
        :closable="tag.name !=='home'"
        :effect="$route.name === tag.name ? 'dark' :'plain'"
        @click="changeMenu(tag)"
        @close="handleClose(tag,index)"
        :type="tag.type">
        {{tag.label}}
    </el-tag>
 </div>
</template>

<script>
import { mapState ,mapMutations} from 'vuex';
export default {
    name:'CommonTag',
    data(){
        return{

        }
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabList
        })
    },
    methods:{
        ...mapMutations(['closeTag']),
        //点击tag标签实现跳转功能
        changeMenu(item) {
            // 跳转到包含该对象的路径
            this.$router.push({name:item.name})
        },
        //点击tag删除标签实现删除功能
        handleClose(item,index){
            // 获取store中定义的closeTag方法1)(删除对应的数据)
            this.closeTag(item)  //1.删除功能

            //2. 删除后的跳转逻辑
            // 如，有四个标签，删除一个，还有三个，length 3  而传过来的index是被删tag标签的索引值，index 3
            const length= this.tags.length 


            // 2-1:当删除的不是当前路由的位置，则不发生跳转
            if(item.name !== this.$route.name){
                return 
            }

            // 2-2:当 实现当删除的是最后一个时，路由自动跳到前一个
            if(index === length){
                this.$router.push({
                    name:this.tags[index - 1].name
                })
            }else{
                // 删除的不是最后的，中间的，就往后跳
                this.$router.push({
                    name:this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tags{
    display:inline-block;
    float: right;
    margin-left: 200px;
    width:800px;
    .el-tag{
        margin-left:10px;
        cursor: pointer;
    }
}

</style>