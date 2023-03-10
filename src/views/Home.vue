<template>
 <el-row>
  <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div class="user">
              <img src="../assets/touxiang.jpg" alt="">
                <div class="userinfo">
                  <p class="name">Admin</p>
                  <p class="access">超级管理员</p>
                </div>
          </div>
          <div class="login-info">
              <p >上次登录的时间：<span>2021-7-19</span></p>
              <p>上次登录的地点：<span>南昌</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px ;height:380px;">
              <el-table
              :data="tableData"
              style="overflow: hidden;">
                  <el-table-column v-for="(val,key) in tableLabel" :key="key" :prop="key" :label="val"/>

              </el-table>
        </el-card>
      </div>
  </el-col>
  <el-col :span="16">
    <div class="grid-content bg-purple-light">
      <div class="num">
        <el-card v-for="(item,index) in countData" :key="index" >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor : item.color}"></i>
          <div class="detail" >
              <p class="price">￥{{item.value}}</p>
              <p class="desc">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <div class="zx">
        <el-card style="height: 280px; margin: 0 30px 20px 20px;">
            <!-- 折线图 -->
            <div ref="echarts1" style="height:280px"></div>
        </el-card>
      </div>
      <div class="graph" style="margin: 0 30px 20px 20px;">
          <el-card>
            <div ref="echarts2" style="height:300px"></div>
          </el-card>
          <el-card>
            <div ref="echarts3" style="height:300px"></div>
          </el-card>
      </div>
    </div>
  </el-col>
</el-row>
</template>

<script>
import { getData } from '../api'
// 引入图表
// import * as echarts from 'echarts/lib/echarts';
import * as echarts from 'echarts';

export default {
    name:'home',
    data(){
      return {
          tableData: [],
          tableLabel:{
            name:'课程',
            todayBuy:'今日购买',
            monthBuy:'本月购买',
            totalBuy:'总购买'
          },
          countData:[
            {
              name:'今日支付订单',
              value:1234,
              icon:'success',
              color:'blue'
            },
            {
              name:'今日收藏订单',
              value:210,
              icon:'star-on',
              color:'#ffb980'
            },
            {
              name:'今日未支付订单',
              value:1234,
              icon:'goods',
              color:'purple'
            },
            {
              name:'本月支付订单',
              value:1234,
              icon:'success',
              color:'blue'
            },
            {
              name:'本月收藏订单',
              value:210,
              icon:'star-on',
              color:'#ffb980'
            },
            {
              name:'本月未支付订单',
              value:1234,
              icon:'goods',
              color:'purple'
            }
          ]
      }
    },
    mounted(){
      getData().then(({data}) =>{
          const {tableData} =data.data
          // console.log(tableData)
          this.tableData = tableData
          // console.log(data.data)

          
          // 图表的渲染
          // 处理获取XAxis
          const {orderData} = data.data

          // 获取对象的keys值
          const XAxis =Object.keys(orderData.data[0])
          
          // 折线图
            var myChart = echarts.init(this.$refs.echarts1);

            // 指定图表的配置项和数据
            var option = {
              tooltip: {},
              legend: {
                data: XAxis
              },
              xAxis: {
                data:  XAxis
              },
              yAxis: {},
              series:[]
            };
            XAxis.forEach(key=>{
              option.series.push({
                    name:key,
                    data:orderData.data.map(item=> item[key]),
                    type:'line'
                  })
                })
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);


            // 柱状图
            const myChart2 = echarts.init(this.$refs.echarts2)

            // 获取用户数据
            const {userData} =data.data
            console.log(userData)

             // 指定图表的配置项和数据
              var option2 = {
                // 图例颜色文字
                legend:{
                  textStyle:{
                    color:"#333"
                  }
                },
                grid:{
                  left:"20%"
                },
                // 提示框
                tooltip: {
                  trigger:"axis"
                },
                xAxis: {
                  type:"category",
                  data: userData.map(item=>item.data),
                  lineStyle:{
                    color:"#17b3a3",
                  },
                  axisLabel:{
                    interval:0,
                    color:"#333"
                  }
                },
                yAxis: {
                  type:"value",
                  axisLine:{
                    lineStyle:{
                      color:'#17b3a3'
                    }
                  }
                },
                series: [
                  {
                    name: '新增用户',
                    // 柱状图
                    type: 'bar',
                    data: userData.map(item=>item.new)
                  },
                  {
                    name: '活跃用户',
                    // 柱状图
                    type: 'bar',
                    data: userData.map(item=>item.active)
                  }
                ]
              };

              // 使用刚指定的配置项和数据显示图表。
              myChart2.setOption(option2)


              // 饼状图
              // 获取数据
              const {videoData} =data.data

              const myChart3 = echarts.init(this.$refs.echarts3)

              const  option3 = {
                tooltip:{
                      trigger:"item"
                    },
                    color:[
                      "#0f78f4",
                      "#dd536b",
                      "#9462e5",
                      "#a6a6a6",
                      "#e1bb22",
                      "#39c362",
                      "#3ed1cf"
                  ],
                  series: [
                    {
                      data:videoData,
                      type:'pie'
                    }
                  ]
                };
              myChart3.setOption(option3)
          })
      }
}
</script>

<style lang="less" scoped >

.box-card .user{
    display: flex;
    align-items: center;
    img{
      width:150px;
      height: 150px;
      border-radius:50%;
      margin-right: 20px;
    }
   padding-bottom: 20px;
   margin-bottom: 20px;
   border-bottom:1px solid #ccc;

}
.userinfo{
      .name{
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access{
        color: #999;
      }
      .el-card{
        display: flex;
        align-content: center;
      }
}
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      margin-left:60px;
      color:#666666
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  .icon{
    width: 60px;
    height: 60px;
    font-size: 30px;
    text-align: center;
    line-height: 60px;
    float: left;
    margin-right: 10px;
    color:white;
  }
  .detail{
    width:100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
  }
  .el-card{
    width:250px;
    height: 100px;
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
.detail {
  .price{
    margin-top:10px;
    margin-bottom: 20px;
    }
  .desc{
    width: 130px;
  }
}

// 图表
.graph{
  display: flex;
  justify-content: space-between;
  height:300px;
  .el-card{
    width:48%;
  }
}

// 主页面
/deep/ .el-main{
  padding:35px 20px 20px 20px;
}
</style>