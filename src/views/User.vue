<template>
  <div class="message">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
       >

      <!-- 新增表单 -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;" value-format="yyyy-MM-DD"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr"></el-input>
          </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer" prop="name">
        <el-button  @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <div class="serach">
        <el-button type="primary" @click="handleAdd" style="width:80px; height:40px">
           + 新增
        </el-button>
        <el-form :model="userForm" :inline="true">
          <el-form-item>
            <el-input placeholder="请输入地址" v-model="userForm.name" ></el-input>
          </el-form-item>
          <el-form-item>
           <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table">
        <el-table
          :data="tableData"
          style="width: 100%"
          stripe>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.sex ? "男":"女"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="birth"
            label="出生日期">
          </el-table-column>
          <el-table-column
            prop="addr"
            label="地址">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger"  @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
     </el-table>
      </div>
      <div class="pagination ">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getUser ,addUser,updateUser,editUser, delUser} from '../api'
export default {
    name:'User',
    data(){
      return {
        dialogVisible: false,
        form:{
          name:'',
          age:'',
          sex:'',
          birth:'',
          addr:''
        },
        total:0,
        rules:{
          name:[
            {required:true , message:'请输入姓名'}
          ],
          age:[
            {required:true , message:'请输入年龄'}
          ],
          sex:[
            {required:true , message:'请输入性别'}
          ],
          birth:[
            {required:true , message:'请输入出生日期'}
          ],
          addr:[
            {required:true , message:'请输入地址'}
          ],
        },
        tableData:[],
        pageData:{
          page: 1,
          limit :10
        },
        userForm:{
          name:''
        },
        // 定义一个布尔值，来表示是编辑还是新增
        modalType:0 //0 表示新增的弹窗，1表示编辑

      }
    },
    methods:{
      // 新增
      handleAdd(){
        this.dialogVisible =true
        // 设置状态
        this.modalType =0
      },
      // 提交用户表单
      submit(){
        this.$refs.form.validate((valid)=>{
          // 判断数据是否有效
          if(valid){
            // 根据modalType的值，判断是编辑或新增
            if(this.modalType === 0){
                addUser(this.form).then(()=>{
                  //重新获取列表的接口
                  this.getList()
                })
            }else{
                editUser(this.form).then(()=>{
                  this.getList()
                })
            }

            // 有效则关闭
            this.dialogVisible =false
            this.handleClose()
          }
        })
      },
      // 弹窗关闭之前的操作（只能是点击关闭的图标）
      handleClose(){
        // 清空数据
        this.$refs.form.resetFields()
        this.dialogVisible =false
      },
      cancel(){
        this.dialogVisible = false
        this.handleClose()
      },

      // 编辑按钮
      handleEdit(row){
        console.log(row)
        // 打开弹窗
        this.dialogVisible =true
        this.modalType = 1
        // 对当前的数据进行深拷贝，不然的话就会影响原本的数据
        this.form = JSON.parse(JSON.stringify(row))
        
      },
      // 删除按钮
      handleDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           // 删除接口调用
         delUser({id:row.id}).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //重新获取列表的接口
          this.getList()
         })       
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
      // 选择页码切换事件
      handlePage(val){
        // alert(val)
        this.pageData.page = val
        this.getList()
      },
      // 列表查询的方法
      onSubmit(){
        this.getList()
      },
      //渲染数据
      getList(){
        // promise对象
          getUser({params :{...this.userForm,...this.pageData}}).then(({data})=>{
            //  console.log(data.list) 
            this.tableData =data.list
            // 获取list数据条数
            this.total = data.count || 0
            })
     }
    },
    mounted(){
      // 页面首次加载的时候进行渲染
      this.getList()
    }
}
</script>

<style lang="less" scoped>
.message{
  height: 90%;
  .table{
    height: 400px;
    overflow: auto;
  }
  .pagination{
    float: right;
  }
  .serach{
    display: flex;
    justify-content: space-between;
  }
}
</style>