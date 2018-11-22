<template>
    <div class="clz-select-city">
           <el-select v-model="selectCityData.selectProvince" placeholder="请选择" @change="provinceChange(selectCityData.selectProvince)" class="selectItem" @click="provinceChange" :disabled="selectCityData.disable">
               <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
           </el-select>
           <el-select v-model="selectCityData.selectCity" placeholder="请选择"  @change="selectCityChange(selectCityData.selectCity)"  class="selectItem" :disabled="selectCityData.disable">
               <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
           </el-select>
           <el-select style="margin-right: 0;" v-model="selectCityData.selectArea" placeholder="请选择" @change="selectAreaChange(selectCityData.selectArea)"  class="selectItem" :disabled="selectCityData.disable">
               <el-option v-for="item in areaData" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
           </el-select>
    </div>
</template>

<style scoped>
    .clz-select-city{
        width: 133%;
        font-size: 0;
    }
    .selectItem{
      font-size: 0;
      width: 33%;
      margin-right: 0.5%;
    }
</style>

<script>
    export default {
        props: ["selectCityData"],
        data() {
            return {
                province: [],
                city:[],
                areaData:[],
            };
        },
        watch: {
            selectCityData:{
                handler(curVal,oldVal){
                    this.getOwerShip();
                },
                deep:true
            }
        },
        methods: {
            provinceChange(obj){
                this.selectCityData.selectProvinceName = this.province.filter(item=>item.value === obj)[0].label;
                this.$emit('selectCityData',this.selectCityData);
                this.selectCityData.selectCity="";
                this.selectCityData.selectArea="";
                this.selectCityData.selectCityName="";
                this.selectCityData.selectAreaName = "";
                this.areaData = [];
            },
            selectCityChange(obj){
                this.selectCityData.selectCityName = this.city.filter(item=>item.value === obj)[0].label;
                this.$emit('selectCityData',this.selectCityData);
                this.selectCityData.selectArea="";
                this.selectCityData.selectAreaName="";
            },
            selectAreaChange(obj){
                this.selectCityData.selectAreaName = this.areaData.filter(item=>item.value === obj)[0].label;
               // console.log(this.areaData.filter(item=>item.value === obj)[0])
                this.$emit('selectCityData',this.selectCityData);
            },

            getOwerShip(){
                let objData=[];
                let _this = this;
                $.ajax({
                    url: 'http://o7d94lzvx.bkt.clouddn.com/20171206164127482c6e7bc3d54440a9112ee1e41ed666/region.xml',
                    type: 'GET',
                    dataType: 'xml',
                    success: function(xml) {

                        //获取第一层地区数据：省级|直辖市
                        let province = xml.getElementsByTagName("root")[0].childNodes;
                        //遍历省级目录
                        for (let p in province){
                            //过滤解析xml产生的空对象
                            if (province[p].nodeName === undefined || province[p].nodeName !== "region"){
                                continue;
                            }
                            //创建新对象
                            let region = {
                                "value":"",
                                "label":"",
                                "children":null
                            };

                            region.value = province[p].getAttribute("regionCode");
                            region.label = province[p].getAttribute("regionName");
                            //构建子节点
                            let citys = [];
                            for (let c in province[p].childNodes){
                                //过滤解析xml产生的空对象
                                if (province[p].childNodes[c].nodeName === undefined || province[p].childNodes[c].nodeName !== "region"){
                                    continue;
                                }
                                //创建新对象
                                let cityRegion = {
                                    "value":"",
                                    "label":"",
                                    "children":null
                                };
                                cityRegion.value = province[p].childNodes[c].getAttribute("regionCode");
                                cityRegion.label = province[p].childNodes[c].getAttribute("regionName");
                                //构建子节点
                                let areas = [];
                                for (let a in province[p].childNodes[c].childNodes){
                                    //过滤解析xml产生的空对象
                                    if (province[p].childNodes[c].childNodes[a].nodeName === undefined
                                        || province[p].childNodes[c].childNodes[a].nodeName !== "region"){
                                        continue;
                                    }
                                    //创建新对象
                                    let areaRegion = {
                                        "value":"",
                                        "label":"",
                                        "children":null
                                    };
                                    areaRegion.value = province[p].childNodes[c].childNodes[a].getAttribute("regionCode");
                                    areaRegion.label = province[p].childNodes[c].childNodes[a].getAttribute("regionName");
                                    areas.push(areaRegion);
                                }
                                if (areas.length > 0){
                                    cityRegion.children = areas;
                                }
                                citys.push(cityRegion);

                            }
                            if (citys.length > 0){
                                region.children = citys;
                            }
                            objData.push(region);
                        }
                        _this.province = objData;
                        _this.province.filter(res=>{
                            if(res.value === _this.selectCityData.selectProvince){
                                _this.selectCityData.selectProvinceName = res.label;
                            }
                        });
                     //   _this.selectCityData.selectProvinceName = _this.province.filter(item=>item.value === _this.selectCityData.selectProvince)[0].label;

                        for(let item in objData){
                            if(objData[item].value === _this.selectCityData.selectProvince){
                                _this.city =objData[item].children;
                                //_this.selectCityData.selectCityName = _this.city.filter(item=>item.value === _this.selectCityData.selectCity)[0].label;
                                _this.city.filter(res=>{
                                    if(res.value === _this.selectCityData.selectCity){
                                        _this.selectCityData.selectCityName = res.label;
                                    }
                                })
                            }
                        }
                        for(let tmp in _this.city){
                            if(_this.city[tmp].value === _this.selectCityData.selectCity){
                                _this.areaData = _this.city[tmp].children;
                                _this.areaData.filter(res=>{
                                    if(res.value === _this.selectCityData.selectArea){
                                        _this.selectCityData.selectAreaName = res.label;
                                    }
                                })
                            }
                        }
                    }

                });
            }
        },
        created(){
            this.getOwerShip();

        }
    };
</script>
