<template>
    <div class="nav-box">
        <ul class="nav-item">
            <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path"  >
                <li class="nav-item-list" :class="{'list-active':$route.path+'/'==tag.path || $route.path == tag.path }" >
                    <span class="nav-list-name">{{tag.name}}</span>
                    <span class="nav-list-close" @click="closeViewTabs(tag,$event)">×</span>
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        computed: {
            visitedViews() {
                return this.$store.state.app.visitedViews.slice(-8)
            }
        },
        methods: {
            closeViewTabs(view, $event) {
                this.$store.dispatch('delVisitedViews', view)
                $event.preventDefault();
            },
            generateRoute() {
                if (this.$route.matched[this.$route.matched.length - 1].name) {
                    return this.$route.matched[this.$route.matched.length - 1]
                }
                this.$route.matched[0].path = '/'
                return this.$route.matched[0]
            },
            addViewTabs() {
                this.$store.dispatch('addVisitedViews', this.generateRoute())
            },
            isActive(path) {
                return path === this.$route.path
            }
        },
        watch: {
            $route() {
                this.addViewTabs();
            }
        }
    }
</script>


<style scoped>
    .nav-box{width:100%;height:30px;background:#ffffff;}
    .nav-item{width: 100%;display: block;height: 100%;padding-left: 0;}
    .nav-item-list{display:block;height: 100%;line-height: 30px;width: 136px;font-size: 12px;color:#333333;border-right:1px solid #e9e9e9;float: left;cursor:pointer;}
    .nav-list-name{width: 105px;display:block;float: left;text-align:center;color:#333333;}
    .nav-list-close{width: 30px;  display: block;  height: 30px;  line-height: 30px;  float: right;  font-size: 22px;  color: #a5a5a5;}
    .list-active{background: #f0f0f0;}
    .nav-item a{display:block}
</style>