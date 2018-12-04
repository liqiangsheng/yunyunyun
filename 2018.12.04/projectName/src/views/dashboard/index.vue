<template>
  <div class="dashboard-container">
    <div class='dashboard-text'>账号：{{userAccount}}</div>
    <div class='dashboard-text'>用户名：{{name}}</div>
    <div class='dashboard-text'>所属：{{rolesName}}</div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'dashboard',
      computed: {
        ...mapGetters([
          'name',
          'rolesName',
          'userAccount'
        ])
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
