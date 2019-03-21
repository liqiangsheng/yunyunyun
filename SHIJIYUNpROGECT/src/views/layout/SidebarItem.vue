<template>
    <!-- 左侧菜单 -->
    <div class="bar-menu">
        <template v-for="(item,itemIndex) in routes" >
            <div v-if="'/'+$route.path.split('/')[1]==='/'+item.path.split('/')[1]" :key="itemIndex">
                <!-- 循环子路由 -->
                <template v-for="(child,childIndex) in item.children">
                    <router-link v-if="!child.hidden&&child.noDropdown" :to="item.path+'/'+child.path" :key="childIndex">
                        <el-menu-item :index="item.path+'/'+child.path" @click="handleNodeClick(child)" :id="child.path">
                            <span slot="title">{{child.name}}</span>
                        </el-menu-item>
                    </router-link>
                    <!-- 循环子路由的子路由 -->
                    <el-submenu :index="child.name" v-if="!child.noDropdown&&!child.hidden" :id="child.path">
                        <!-- 第一层 -->
                        <template slot="title">
                           <span class="childName">{{child.name}}</span>
                        </template>
                        <template v-for="(childList,childListIndex) in child.children"  >

                            <div v-if="childList.children && childList.children.length>0" :key="childListIndex">
                                <el-submenu :index="childList.path" :id="childList.path">
                                    <template slot="title" >{{childList.name}}</template>
                                    <div v-for="(list,listIndex) in childList.children">
                                        <router-link :to="item.path+'/'+child.path+'/'+childList.path+'/'+list.path" :key="listIndex" v-if="!list.hidden">
                                            <el-menu-item :index="item.path+'/'+child.path+'/'+childList.path+'/'+list.path" @click="handleNodeClick(list)" :id="list.path">{{list.name}}</el-menu-item>
                                        </router-link>
                                    </div>
                                </el-submenu>
                            </div>
                            <div v-else>
                                <router-link :to="item.path+'/'+child.path+'/'+childList.path" :key="childListIndex" v-if="!childList.hidden">
                                    <el-menu-item :to="item.path+'/'+child.path+'/'+childList.path"  :index="item.path+'/'+child.path+'/'+childList.path" @click="handleNodeClick(childList)" :id="childList.path">
                                        <span>{{childList.name}}</span>
                                    </el-menu-item>
                                </router-link>
                            </div>
                        </template>
                    </el-submenu>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue';
    import NavBox from './nav.vue';
    import Columns from './Columns.vue';
    //import Vue from 'vue';
    export default {
        name: 'SidebarItem',
        components: {
            Navbar,
            NavBox,
            Columns,
        },
        props: {
            routes: {
                type: Array
            }
        },
        data() {
            return {

            };
        },
        methods: {
            handleNodeClick(data){
                this.$root.hubBus.$emit('menuClick',data);
            }
        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        },
        mounted(){

        },
        created(){
//            console.log(this.routes,"carter")
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .bar-menu{
       width: 200px;
        height: 100%;
        display: inline-block;
    }
    .menu-expanded{
        width: 100%;
    }
   /* .is-active.is-opened .childName{
        color:red;
    }*/
    .el-menu-item.is-active{
        background:#f4f6f7;
       border-left:3px solid #39b2b6;
    }
</style>


