<!--suppress ALL -->
<template xmlns="">
    <div class="columns" v-loading.lock="fullscreenLoading">
            <el-tabs v-model="TabsValue" type="card" closable  @tab-remove="removeTab" @tab-click="tabClick">
                <el-tab-pane
                        v-for="(item, index) in Tabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                        clz-type="table"
                        id="col-tabs"
                >
                    <div style="clear: both"></div>
                    <div class="content" v-loading="boxLoading">
                        <component :is="item.content" :tabsData="item" :key="item.index"></component>
                    </div>
                </el-tab-pane>
            </el-tabs>

        <!-- 右键菜单 -->
        <context-menu class="right-menu"
                      :target="contextMenuTarget"
                      :show="contextMenuVisible"
                      @update:show="(show) => contextMenuVisible = show">
            <a href="javascript:;" @click="refreshCurrent()">刷新页面</a>
            <a href="javascript:;" @click="current()">关闭当前</a>
            <a href="javascript:;" @click="closeOther()">关闭其他</a>
            <a href="javascript:;" @click="closeAll()">关闭全部</a>
        </context-menu>
    </div>
</template>


<script>
    import  $ from 'jquery'
    import Vue from 'vue';
    import router from '../../router'
    import store from '../../store'
    import { component as VueContextMenu } from '@xunlei/vue-context-menu'
    import Layout from '@/views/layout/Layout.vue';
    import { avoid } from '@/router/index';

    export default {
        components: {
            'context-menu': VueContextMenu
        },
        data() {
            return {
                menu:false,
                TabsValue: '', //当前选中标签
                Tabs: [],   //tabs标签页数据
                tabIndex: 0,    //组件是否重置key
                fullscreenLoading:false,
                contextMenuTarget: '',
                contextMenuVisible: false,
                Savings:[],
                thisRoute:[],
                boxLoading:false
            }
        },
        methods: {
            /* 点击标签页 */

            tabClick(item){
                let _this = this;
                this.thisRoute.forEach((tab, index) => {
                    if (tab.name === item.name) {
                        if(tab.routesPath){
                            _this.$router.push(tab.routesPath)
                        }
                    }
                })
            },
            /* 删除标签页 */
            removeTab(targetName) {
                let _this = this;
                let tabs = this.Tabs;
                let activeName = this.TabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                                _this.thisRoute.forEach(res=>{
                                    if(nextTab.name === res.name){
                                        if(res.routesPath){
                                            _this.$router.push(res.routesPath)
                                        }
                                    }
                                })
                            }
                        }
                    });
                }
                this.TabsValue = activeName;
                this.Tabs = tabs.filter(tab => tab.name !== targetName);
                this.routeData()
            },
            /* 刷新当前标签页 */
            refreshCurrent(){
                let tabs = this.Tabs;
                let tabsValue = this.TabsValue;
                tabs.forEach(res=>{
                    if(res.name === tabsValue){
                        this.boxLoading = true;
                        setTimeout(() => {
                            this.boxLoading = false;
                            res.index++
                        }, 500);

                    }else{
                        return false
                    }
                })
                this.contextMenuVisible =false;
            },
            /* 关闭当前标签页 */
            current(){
                let _this = this;
                let tabs = this.Tabs;
                let tabsValue = this.TabsValue;
                tabs.forEach((tab, index)=>{
                    if(tab.name === tabsValue){
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            _this.$router.push(nextTab.routesPath)
                        }
                        this.removeTab(tab.name)
                    }else{
                        return false
                    }
                })
                this.contextMenuVisible =false;
                this.routeData()
            },
            /* 关闭其他标签页 */
            closeOther(){
                let tabs = this.Tabs;
                let tabsValue = this.TabsValue;
                tabs.forEach(res=>{
                    if(res.name === tabsValue){
                        return false
                    }else{
                        this.removeTab(res.name)
                    }
                })
                this.contextMenuVisible =false;
                this.routeData()
            },
            /* 关闭全部标签页 */
            closeAll(){
                this.Tabs = [];
                this.contextMenuVisible =false;
                this.routeData()
            },
            /* 记录打开的窗口信息 */
            routeData(menu){
                sessionStorage.setItem("Record", JSON.stringify(this.Tabs));
                this.thisRoute = JSON.parse(sessionStorage.getItem("Record"))
            },
        },
        created(){
            let route = this.$route;
            let set = new Set(avoid);
            if(!set.has(route.path)){
                let menu = this.$route.matched.pop();
                let data = {
                    title: menu.name,
                    name: menu.name,
                    data:menu.data,
                    index: this.tabIndex++,
                    content: menu.components.default,
                    routesPath:menu.path
                }
                this.Tabs.push(Object.assign({},data));
                this.TabsValue = menu.name;
            }
            this.routeData()
        },
        watch: {
            '$route' (to, from) {
                let set = new Set(avoid);
                let menu = to.matched.pop();
                this.routeData()
                /*判断点击菜单是否重复*/
                let exist = false;
                for (let i = 0; i < this.Tabs.length; i++) {
                    if (menu.name === this.Tabs[i].name) {
                        //如果参数不同
                        if(to.fullPath !== this.Tabs[i].routesPath){
                            this.Tabs[i].routesPath = to.fullPath
                            this.Tabs[i].index++
                        }
                        exist = true;
                        break
                    }
                }
                if (exist === true) {
                    this.TabsValue = menu.name;
                    return
                }
                let menuData = this.$route;
                let route = this.$route;
                if(!set.has(route.path)){
                    this.Tabs.push({
                        title: menu.name,
                        data:menu.data,
                        name: menu.name,
                        index: this.tabIndex++,
                        content: menu.components.default,
                        routesPath:this.$route.fullPath
                    });
                    this.TabsValue = menu.name;
                }

            }
        },
        mounted(){

            this.contextMenuTarget = $(".el-tabs__nav")[0]; //右击菜单
            let _this = this;
            /*监听菜单路由信息*/

            /*页面点击关闭窗口 start*/
            this.$root.hubBus.$on('closeWindow',function(menu){     //当前窗口按钮触发关闭当前页面事件
                let tabs = this.Tabs;
                this.Tabs = tabs.filter(tab => tab.name !== menu.closeTabs);
                let isNew = true;
                tabs.forEach((tab, index)=>{
                    //名字是否相等
                    if (tab.name === menu.backTabs) {
                        isNew = false
                        //是否不刷新
                        if(!menu.noRefresh){
                           this.Tabs[index].index++
                        }
                        //返回父页面
                        this.TabsValue = menu.backTabs;
                        //push路由
                        if(tab.routesPath){
                            _this.$router.push(tab.routesPath)
                        }
                    }
                })
                if(isNew){
                    tabs.forEach((tab, index)=>{
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            this.TabsValue = nextTab.name;
                        }
                    })
                }
                let menuId;
                if(menu.id){
                    menuId= menu.id;
                } else{
                    menuId =''
                }
                _this.$root.hubBus.$emit(menuId,menu.subPageData);   //刷新页面并把子页面数据传回父级
            }.bind(this));
            /*页面点击关闭窗口 end*/

            /*点击开启新窗口 start*/
            this.$root.hubBus.$on('menuClick',function(menu){      //接受A页面开启新窗口信息
                /*判断点击菜单是否重复*/
                let exist = false;
                for (let i = 0; i < this.Tabs.length; i++) {
                    if (menu.name === this.Tabs[i].name) {
                        this.Tabs[i].data = menu.data
                        this.Tabs[i].index++
                        exist = true;
                        break
                    }
                }
                if (exist === true) {
                    this.TabsValue = menu.name;
                    return
                }
                /*push数据*/
                this.Tabs.push({
                    title: menu.name,
                    name: menu.name,
                    data:menu.data,
                    index: this.tabIndex++,
                    content: menu.component,
                    routesPath:menu.routesPath
                });
                // console.log('index', this.Tabs[this.Tabs.length - 1].index)
                this.TabsValue = menu.name
            }.bind(this));
            /*点击开启新窗口 start*/
            this.$root.hubBus.$on('refreshTabs',function(menu){
                console.log('tabss刷新了')
                _this.refreshCurrent()
            })
        },
    }
</script>

<style>
    .el-tabs__item:focus.is-active.is-focus:not(:active){ box-shadow: none }
   /* .columns{min-width: 1115px;}*/
    .columns .el-tabs__header{margin-bottom: 0;background: #ffffff;position:fixed;z-index: 1000;width: 88.7%;}
    .columns .el-tabs__item{height: 30px;line-height: 30px;}
    .columns .el-tabs--card>.el-tabs__header .el-tabs__item.is-active{background: #f4f6f7;border-bottom-color:#f4f6f7;}
    .rightMenu{border:1px solid #000000;width: 100px;height: 100px;position:absolute;top:30px;left:250px;background:#ffffff;display: none;}
    .content{display: inline-block;width: 100%;}
    .columns .el-tab-pane{margin-top: 30px;padding: 15px;background:#f4f6f7;position: relative;}
    .table-pane-box .el-tabs__header {width: auto;     position: relative;background:#f4f6f7; z-index: 2;}
    .table-pane-box .el-tab-pane{margin-top: 0;padding:0;}
    .el-tabs__nav-next, .el-tabs__nav-prev{line-height: 30px;}
   .right-menu {
       border: 1px solid #eee;
       box-shadow: 0 0.5em 1em 0 rgba(0,0,0,.1);
       border-radius: 1px;
   }
   .right-menu {
       position: fixed;
       background: #fff;
       border: 1px solid rgba(0,0,0,.2);
       border-radius: 3px;
       z-index: 10060;
       display: none;
       font-size: 14px;
   }
   .right-menu a {
       width: 75px;
       height: 28px;
       line-height: 28px;
       text-align: center;
       display: block;
       color: #1a1a1a;
       padding: 2px;
   }
   .right-menu a:hover{
       background:#39B2B6;
       color:#ffffff;
   }
</style>
