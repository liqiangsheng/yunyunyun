<template>
    <div class="leftBar" :class="{'collapse':isCollapse}">
        <aside class="menu-expanded" >
            <el-menu mode="vertical" unique-opened  :default-active="$route.path" >
                <sidebar-item :routes='permission_routers'></sidebar-item>
            </el-menu>
        </aside>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from './SidebarItem';
    export default {
      components: { SidebarItem },
      computed: {
        ...mapGetters([
          'permission_routers',
          'sidebar'
        ]),

          isCollapse() {
              console.log(this.permission_routers)
              return !this.sidebar.opened
          }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.leftBar{    width: 217px;  overflow: scroll;margin-bottom: -16px;}
.el-menu {
    min-height: 100%;
}
.collapse{
    margin-left: -200px;
}

</style>
