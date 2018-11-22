<template>
    <el-row class="app-wrapper" >
        <side-top-bar></side-top-bar>
        <!-- 主容器 -->
        <el-col :span="24" class="main">
           <sidebar></sidebar>
            <!-- 主视图 -->
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <columns></columns>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    import { Navbar, Sidebar, AppMain ,SideTopBar,Columns } from '@/views/layout';
    import { avoid } from '@/router/index';

    export default {
      name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain,
            SideTopBar,
            Columns
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar;
            }
        },
      data(){
        return {
            routerRoot:false
        }
      },
        methods:{

        },
      created(){
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .app-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        min-width: 1365px;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-140px, 0);
                .sidebar-container {
                    transform: translate(132px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 40px;
            }
        }
        .sidebar-wrapper {
            width: 220px;
            position: fixed;
            top: 50px;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
            transition: all .28s ease-out;
        }
        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -17px;
            overflow-y: scroll;
        }
        .main-container {
            min-height: 100%;
            transition: all .28s ease-out;
            margin-left: 180px;
        }
    }
    /*anick自定义*/
    .content-container {
        margin-left: -18px;
        flex:1;
        overflow-y: scroll;
        .breadcrumb-container {
            //margin-bottom: 15px;
            .title {
                width: 200px;
                float: left;
                color: #475669;
            }
            .breadcrumb-inner {
                float: right;
            }
        }
        .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
        }
    }
    .view{
        padding: 15px;
    }
</style>
