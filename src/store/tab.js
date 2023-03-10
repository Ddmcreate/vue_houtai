import Cookie from "js-cookie"
export default {
    mutations:{
        // 修改菜单的展开和收起 state 就可以获取里面的属性值。
       CollapseMenu(state){
            state.isCollapse = !state.isCollapse
       },
        // 更新或修改面包屑
       selectMenu(state,val){
            // console.log(val)
            // 当点击的是首页或者是tablist有的对象时，不进行更新
            if(val.name != 'home'){
                // 如果findeIndex返回的是-1，就是不存在
                // const index = state.tabList.findIndex(item=>ite)
                const index =state.tabList.findIndex(item=>item.name === val.name)
                if(index === -1){
                    state.tabList.push(val)
                    Cookie.set('menu',JSON.stringify(val))
                }
            }
       },
       deleteMenu(state){
            state.tabList.slice(0,1)
       },
         //删除指定的tag数据
        closeTag(state,val){
            // val拿到就是item值
            //拿到对应的索引，进行删除
            const index =state.tabList.findIndex(item=>item.name === val.name)
            state.tabList.splice(index,1)
        },

        // 设置菜单栏数据的方法
        setMenu(state,val){
            state.menu =val
            // 因为保存在store中的数据，不具有缓存功能，所以我们要自己存入cookie
            Cookie.set('menu',JSON.stringify(val))
        },

        // 
        addMenu(state,router){
            // 判断缓存中是否有数据
            if(!Cookie.get('menu')) return 
            const menu = JSON.parse(Cookie.get('menu'))

            state.menu =menu
            const menuArray =[]
            menu.forEach(item => {
                if(item.children){
                    item.children =item.children.map(item=>{
                        item.component =()=> import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component =()=>import(`../views/${item.url}`)
                    menuArray.push(item)
                }
                // 路由的动态添加
                menuArray.forEach(item=>{
                    router.addRoute('Main',item)
                })
            });
        }

    },
    // 定义共享的数据
    state:{
        //控制菜单的展开和收起
        isCollapse:false,
        // 面包屑的数据
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'s-home',
                url:'Home/home'
            },
        ],
        menu:[]
    }
}