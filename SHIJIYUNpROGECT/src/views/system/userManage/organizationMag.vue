<template>
    <div class="main-box" clz-type="table">
        <!-- 权限设置 -->
        <div class="table-box">
            <div class="tree" v-loading="loading">
                <el-tree
                        :data="data"
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        @node-click="handleNodeClick"
                        :highlight-current="true"
                        :props="defaultProps">
                </el-tree>
                <!--<div class="treeBtn">-->
                    <!--<el-button type="primary"  size="small" @click="addParent" id="addParent" >新增父级资源</el-button>-->
                    <!--<el-button type="primary"  size="small" @click="addChildren" id="addChildren" >新增子级资源</el-button>-->
                    <!--<el-button type="primary"  size="small" @click="editResource" id="editResource" >编辑资源</el-button>-->
                    <!--<el-button type="primary"  size="small" @click="delResource" id="delResource" class="btn-warning">删除资源</el-button>-->
                <!--</div>-->
            </div>
            <!--<div class="treeContent">
                <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
                    <el-amap-marker v-for="marker in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :key="marker.key"></el-amap-marker>
                </el-amap>
                <div class="toolbar">
                    <span v-if="loaded">
                      location: lng = {{ lng }} lat = {{ lat }}
                    </span>
                    <span v-else>正在定位</span>
                </div>
            </div>-->
        </div>
    </div>
</template>

<script>
    import { getOrgList, } from '@/api/system/userManage'
    export default {
        data() {
            let self = this;
            return {
                form:{
                    name:''
                },
                data: [
//                    {
//                    id: 1,
//                    label: '一级 1',
//                    children: [{
//                        id: 4,
//                        label: '二级 1-1',
//                        children: [{
//                            id: 9,
//                            label: '三级 1-1-1'
//                        }, {
//                            id: 10,
//                            label: '三级 1-1-2'
//                        }]
//                    }]
//                }, {
//                    id: 2,
//                    label: '一级 2',
//                    children: [{
//                        id: 5,
//                        label: '二级 2-1'
//                    }, {
//                        id: 6,
//                        label: '二级 2-2'
//                    }]
//                }, {
//                    id: 3,
//                    label: '一级 3',
//                    children: [{
//                        id: 7,
//                        label: '二级 3-1'
//                    }, {
//                        id: 8,
//                        label: '二级 3-2'
//                    }]
//                }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                zoom: 14,
                center: [121.5273285, 31.21515044],
                lng: 0,
                lat: 0,
                loaded: false,
                loading:false,
                plugin: [{
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.center = [self.lng, self.lat];
                                    self.loaded = true;
                                    self.$nextTick();
                                }
                            });
                        }
                    }
                }],
                markers: [
                    {
                        position: [121.5273285, 31.21515044],
                        events: {
                            click: () => {
                                alert('click marker');
                            },
                            dragend: (e) => {
                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false,
                        key:0
                    }
                ]
            };
        },
        methods: {
            handleNodeClick(data) {
//                console.log(data);
            },
            addParent(){

            },
            addChildren(){

            },
            editResource(){

            },
            delResource(){

            },
            getList(){  //获取数据
                this.loading = true
                let data = {};
                getOrgList(data).then(res=>{
                    this.loading = false;
                    if(res.data.status){
                        this.data = res.data.data;
                    }
                });
            }
        },
        created(){
            this.getList();  //初始化数据
        }
    };
</script>


<style scoped>
    .table-box{display:flex; }
    .el-tree{min-height: 600px;}
    .tree{flex:none; margin-right: 20px;min-width:388px;width:25%;}
    .treeBtn{padding:20px 0;}
    .treeContent{ width: 73.7%;height: 600px;border: 1px solid rgb(209, 227, 229);text-align: center;box-sizing: border-box;min-width:300px;flex:1;}
    .treeContent .el-form{width: 85%;display: inline-block;}
    .el-form-item{margin-bottom: 15px;}

</style>
