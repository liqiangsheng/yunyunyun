<template>
    <div class="table-box">
        <div class="btn-content">
            <el-form>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <div class="btn-left">
                                <template v-for="btn in leftButton">
                                   <!-- <el-button v-show="userButtonCodesData[btn.id]" v-if=" btn.elemType === 'button' " :type="btn.type"
                                               :size="btn.size" @click="btn.method()" :id="btn.id" v-text="btn.value"
                                               :key="btn.id" :class="btn.class" ></el-button>-->
                                    <el-button  v-if=" btn.elemType === 'button' && userButtonCodesData[btn.id]"
                                                :type="btn.type"
                                               :size="btn.size"
                                                @click="btn.method()"
                                                :id="btn.id"
                                                v-text="btn.value"
                                               :key="btn.id"
                                                :class="btn.class" ></el-button>
                                    <el-upload
                                            class="upload-file"
                                            v-if=" btn.elemType === 'upload' && userButtonCodesData[btn.id]"
                                            :show-file-list="btn.showFileList"
                                            :on-success="btn.onSuccess"
                                            :action="btn.action">
                                        <el-button v-show="btn.showButton" size="small" type="primary" id="importBtn">{{btn.value}}</el-button>
                                    </el-upload>
                                </template>
                            </div>
                            <!-- 右侧按钮 -->
                            <div class="btn-right">
                                <template v-for="btn in rightButton">
                                    <el-button v-if=" btn.elemType === 'output' && userButtonCodesData[btn.id]" :type="btn.type" :size="btn.size" @click="btn.method()" :id="btn.id" v-text="btn.value" :key="btn.id"></el-button>
                                    <!--字段显示开始-->
                                    <clz-popover
                                            v-if=" btn.elemType === 'popover' && userButtonCodesData[btn.id]"
                                            :id="btn.id"
                                            :formDataLabel="popoverLabelData"
                                            :tableShow="tableShow"
                                            :tableKey="tableKey"
                                            :pageName="pageName"
                                            @tableShow="tableShow = arguments[0]"
                                            @tableKey="tableKey = arguments[0]"
                                            @pageName="pageName = arguments[0]">
                                    </clz-popover>
                                  <!--  字段显示结束-->
                                </template>
                                <slot name="popover"></slot>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                border
                tooltip-effect="dark"
                stripe
                v-loading="loading"
                :key='tableKey'
                @selection-change="selectChangeFun"
                :span-method="objectSpanMethod"
        >
            <el-table-column
                    v-if="selection"
                    align="center"
                    type="selection"
                    width="55">
            </el-table-column>  <!--勾选框-->
            <el-table-column
                    v-if="index"
                    label="序号"
                    width="90"
                    type="index"
                    align="center"
                    sortable
            >
            </el-table-column>
            <!--<template v-for="tab in tableShow" >-->
                <template v-for="(col, index) in formDataLabel" v-if="tableShow.indexOf(col.label)>-1">
                    <el-table-column   v-if="col.linkType" align="center" :type="col.type" :label="col.label" :width="col.width" :min-width="col.minWidth" :key="col.prop" >
                        <template  slot-scope='scope'>
                            <div class="link-type" @click="col.method(scope)">
                                <span v-if="col.formatter">{{col.formatter(scope.row[col.prop])}}</span>
                                <span v-else>{{scope.row[col.prop]}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" v-else :type="col.type" :prop="col.prop" :label="col.label" :width="col.width" :min-width="col.minWidth" :key="col.prop" :formatter="col.formatter">
                    </el-table-column>
                </template>
            <!--</template>-->
        </el-table>
        <el-row :span="24" v-if="paginationShow">
            <div class="box-page">
                <refresh-icon :tableKey="tableKey" @tableKey="tableKey = arguments[0]" @refreshTable="refreshTableFun()"></refresh-icon>
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="this.paginationDefaultData.p"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="this.paginationDefaultData.s"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="this.paginationDefaultData.total">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
    import clzPopover from '@/components/Popover/indexNew';
    export default {
        name: "table-box",
        components:{
            clzPopover,
        },
        props:{
            formDataLabel: {
                type: [Array],
            },
            popoverLabelData:{
                type: [Array],
            },
            tableData:{
                type: [Array],
            },
            tableShowData:{
                type: [Array],
            },
            leftButton: {
                type: [Array],
            },
            rightButton: {
                type: [Array],
            },
            pageName:{
                type:[String]
            },
            paginationData:{
                type:[Object]
            },
            selection:{
                type:[Boolean],
                default() {
                    return true
                }
            },
            index:{
                type:[Boolean],
                default() {
                    return true
                }
            },
            paginationShow:{
                type:[Boolean],
                default() {
                    return true
                }
            },
            loading:{
                type:[Boolean]
            },
            selectChange: {
                type: [Array],
            },

            objectSpanMethod:{
                type:[Function]
            },
            userButtonCodesData:{
                type:[Object],
                default() {
                    return {}
                }
            }
        },
        data(){
            return {
                tableKey:0,
                tableShow:this.tableShowData,
                total:0,
                paginationDefaultData: {
                    p:1,
                    s:10,
                    total:0
                }
            }
        },
        methods:{
            handleSizeChange(val) {     //每页显示多少行
                this.paginationDefaultData.s = val;
                this.$emit('refreshTable');
            },
            handleCurrentChange(val) {  //当前页
                this.paginationDefaultData.p = val;
                this.$emit('refreshTable');
            },
            selectChangeFun(sels){
                this.$emit('update:selectChange',sels);
            },
            refreshTableFun(){
                this.$emit('refreshTable');
            }
        },
        created () {
            this.$emit('update:paginationData', this.paginationDefaultData);
            console.log(this.userButtonCodesData)
        }
    }
</script>

<style scoped>

</style>
