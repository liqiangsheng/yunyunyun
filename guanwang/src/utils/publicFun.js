export default{
    install: function (Vue, options) {
        Vue.prototype.exportFile = function (obj) { //导出处理方法
            let formData = [];
            for (let i in obj) {
                if (obj[i] !== '') {
                    formData.push(i + '=' + obj[i]);
                }
            }
            let str = '';
            let s = 0;
            formData.forEach(function (item) {
                s++;
                if (s === 1) {
                    str = '?' + str + item;
                } else {
                    str = str + '&' + item;
                }
            });
            return str
        };
        /**
        * 解析obj 只包含KEY 和VALUE
        * */
        Vue.prototype.parseObj = function (localStorageData) {
            let obj = [];
            for (let item in localStorageData) {
                let data = {value: item, label: localStorageData[item]};
                obj.push(data);
            }
            return obj;
        };
        /**
         * 解析obj 只包含KEY 和VALUE 输出数组
         * @localStorageData 缓存数据
         * @key 指定数组key
         * @value 指定数组value
         * @setAll 是否需要'全部'选项
         * */
        Vue.prototype.exportArray = function(localStorageData,setAll,key,value){
            let defaultData = { key:'value',value:'label',setAll:true};
            let changeData = { key:key,value:value,setAll:setAll};
            $.extend(defaultData,changeData);
            let obj = [];
            for (let item in localStorageData) {
                let data = {[defaultData.key]:item, [defaultData.value]: localStorageData[item]};
                obj.push(data);
            }
            if(defaultData.setAll){
                obj.unshift({[defaultData.key]: '', [defaultData.value]: '全部'});
            }
            return obj;
        }

        Vue.prototype.parseList = function (localStorageData) { //解析List 包含所有列表子项
            let obj = [];
            for (let item in localStorageData) {
                obj.push(localStorageData[item]);
            }
            return obj;
        };
        /**
         * 转换成label value
         * @data 缓存数据
         * @label 指定数组label
         * @value 指定数组value
         * @all 是否需要'全部'选项
         * */
        Vue.prototype.exportLabelValue = function (data,label,value,all) {
            let labelValue = [];
            if(data){
                data.forEach(res=>{
                    labelValue.push({ label:res[value],value:res[label] })
                });
            }
            if(all){
                labelValue.unshift({ label:'全部',value:''})
            }
            return labelValue
        };

        Vue.prototype.unShiftAll = function (data,label,value) {
            let defaultData = { key:'value',value:'label'};
            let changeData = { key:label,value:value};
            $.extend(defaultData,changeData);
            if(!data){
                data = []
            }
            data.unshift({ [defaultData.key]:'全部',[defaultData.value]:''})
            return data
        };
        /**
         * 表格合并
         */
        Vue.prototype.tableMerge = function (tabId, max) { //表格合并
            let tab = document.getElementById(tabId);
            let maxCol = max, val, count, start;
            for (var col = maxCol - 1; col >= 0; col--) {
                count = 1;
                val = "";
                for (var i = 0; i < tab.rows.length; i++) {

                    if (val === tab.rows[i].cells[col].innerHTML) {
                        count++;
                    } else {
                        if (count > 1) { //合并
                            start = i - count;
                            tab.rows[start].cells[col].rowSpan = count;
                            for (var j = start + 1; j < i; j++) {
                                tab.rows[j].cells[col].style.display = "none";
                            }
                            count = 1;
                        }
                        val = tab.rows[i].cells[col].innerHTML;
                    }
                }
                if (val === '') {
                    count++;
                } else {
                    if (count > 1) { //合并，最后几行相同的情况下
                        start = i - count;
                        tab.rows[start].cells[col].rowSpan = count;
                        for (var j = start + 1; j < i; j++) {
                            tab.rows[j].cells[col].style.display = "none";
                        }
                    }
                }
            }
        };
        /**
         * 表格动态合并
         * @param row
         * @param column
         * @param rowIndex
         * @param columnIndex
         */
        Vue.prototype.objectSpanMethod = function ({ row, column, rowIndex, columnIndex }) {
            if(cacheData.length<=0){
                return false
            }
            let colNum = cacheData[rowIndex][columnIndex];
            if (colNum < 2) {
                return {
                    rowspan: colNum,
                    colspan: colNum
                }
            } else {
                return {
                    rowspan: colNum,
                    colspan: 1
                }
            }
        };
        /**
         * 表格动态合并 预处理器
         * @param tableData 表格数据源
         * @param colData   表头数据源
         * @param mergeColumnData   要合并的列 key
         * @param keyId  根据指定ID合并
         */
        let cacheData =[];
        Vue.prototype.mergeTable = function (tableData,colData,mergeColumnData,keyId) {
            //console.log(tableData,colData,mergeColumnData,keyId)
            let cache = []; //储蓄一条数据
            let cacheIndex = []; //位置
            let mergeColumn = []; //要合并列
            let id = 'id';
            if(keyId){ id = keyId }
            $.extend(mergeColumn,mergeColumnData);
            let objMergeColumn={ };  //转换数据 换成obj
            mergeColumn.map((res,index)=>{
                objMergeColumn[res] = res
            });
            tableData.forEach((res,i)=>{
                cacheData[i] = [];
                colData.forEach((item,j)=>{
                    if(i === 0 ){
                        cacheData[0][j] = 1;
                        cache = JSON.parse(JSON.stringify(res));
                        cacheIndex[j] = 0;
                    }else{
                        //是否有指定要合并的列
                        if(mergeColumn.length>0){
                            //判断id
                           // debugger
                            if(res[id] === cache[id]) {
                                //判断tableData的列的值是否等于 缓存的列的值
                                if (res[item.prop] === cache[objMergeColumn[item.prop]] && item.prop !=='index') {
                                    //如果是 就叠加
                                    cacheData[cacheIndex[j]][j]++;
                                    cacheData[i][j] = 0
                                } else {
                                    if (cache[objMergeColumn[item.prop]] !== undefined) {
                                        cache[objMergeColumn[item.prop]] = res[item.prop];
                                    }
                                    cacheIndex[j] = i;
                                    cacheData[i][j] = 1;
                                }
                            }else{
                                cacheData[i][j] = 1;
                                cacheIndex[j] = i;
                                if(cacheData[i].length === colData.length){
                                    cache = JSON.parse(JSON.stringify(res));
                                }
                            }
                        }else{
                            if(res[id] === cache[id]){
                                if(res[item.prop] === cache[item.prop] && item.prop !=='index'){
                                    cacheData[cacheIndex[j]][j]++;
                                    cacheData[i][j] = 0
                                }else{
                                    cache[item.prop] = res[item.prop];
                                    cacheIndex[j] = i;
                                    cacheData[i][j] = 1;
                                }
                            }else{
                                cacheData[i][j] = 1;
                                cacheIndex[j] = i;
                                if(cacheData[i].length === colData.length){
                                    cache = JSON.parse(JSON.stringify(res));
                                }
                            }
                        }
                    }
                })
            });
           //  console.log('cacheId:',cache)
           //  console.log('cacheIndex',cacheIndex)
           //console.log('cacheData',cacheData)
            return cacheData
        };


        /**
         * 导出文件
         * @param options
         */
        Vue.prototype.DownLoadFile = function (options) {

            let data = Object.assign({},options.data);
            const reg = RegExp(/GMT/);
            for (let item in data) {
                if(data[item] !== undefined && data[item] !== null){
                    if(reg.test(data[item])){
                        data[item] = GMTToStr(data[item]);
                    }
                }else{
                    data[item] = "";
                }
            }
            /**
             * @return {string}
             */
            function GMTToStr(time) {
                let date = new Date(time);
                let Str = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate()  + ' ' +
                    date.getHours() + ':' +
                    date.getMinutes() + ':' +
                    date.getSeconds();
                return Str
            }
            console.log('导出：',options)
            options.data = data;
            var config = $.extend(false, {method: 'post'}, options);
            var $iframe = $('<iframe id="down-file-iframe" />');
            var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
            $form.attr('action', config.url);
            for (var key in config.data) {
                $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
            }
            $iframe.append($form);
            $(document.body).append($iframe);
            $form[0].submit();
            $iframe.remove();
        };

        /**
         * 清空obj
         * @param obj
         */
        Vue.prototype.deleteObj = function (obj) {
            for (let i in obj) {
                obj[i] = "";
            }
            return obj;
        };
        /**
         * 咨询弹窗
         * @param fun
         */
        Vue.prototype.deleteConfirm = function (fun,data) {
            let _this = this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function(){
                fun(data).then(res=>{
                    if(res.data.status){
                        _this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        return true
                    }
                })
            }).catch(() => {
                console.log(2)
            })
        };



        /**
         * 停用启用
         * @param Selected  选中值
         * @param dis  启用停用 true false
         * @param functions 请求
         * @param key objKey
         */
        Vue.prototype.enabledDisabled = function (Selected, dis, functions,key='ids',_msg) {
            if (Selected.length <= 0) {
                this.$message({
                    message: '请勾选选项',
                    type: 'warning'
                });
                return false
            }
            let postData = Object.assign({[key]: [], disable: dis});
            for (let item in Selected) {
                if (postData.disable) {
                    if (!Selected[item].disable) {  // 状态为 true 停用状态的才允许启用
                        postData[key].push(Selected[item].id);
                    }
                } else {
                    if (Selected[item].disable) {  // 状态为 true 停用状态的才允许启用
                        postData[key].push(Selected[item].id);
                    }
                }
            }
            if (postData[key].length <= 0) {
                if (postData.disable) {
                    this.$message({
                        message:_msg?_msg:'状态已停用',
                        type: 'warning'
                    });
                } else {
                    this.$message({
                        message:_msg?_msg:'状态已启用',
                        type: 'warning'
                    });
                }
                return false
            }
            this.$confirm('此操作将改变该条数据状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                functions(postData).then(res => {
                    if (res.data.status) {
                        this.$message({
                            message: res.data.message,
                            type: 'success'
                        });
                        this.getList();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });

        };

        /**
         * 勾选表格提示
         * @param selectTableData
         * @param single
         * @param message
         */
        Vue.prototype.selectTableData = function (selectTableData,single,message) {
            if(single){
                if(selectTableData.length<=0){
                    this.$message({
                        message: '请勾选要'+ message +'的表格',
                        type: 'warning'
                    });
                }else if(selectTableData.length>=2){
                    this.$message({
                        message: '不能同时'+ message +'两条',
                        type: 'warning'
                    });
                }else{
                       return true
                }
            }else{
                if(selectTableData.length<=0){
                    this.$message({
                        message: '请勾选要'+ message +'的表格',
                        type: 'warning'
                    });
                }else{
                    return true
                }
            }
        };


        /**
         * 本地表格删除
         * @param sele 勾选中的表格
         * @param tableData 表格数据源
         */
        Vue.prototype.deleteSelectTable = function (sele,tableData) {
            if(sele.length<=0){
                this.$message({
                    message: '请勾选要删除的表格',
                    type: 'warning',
                });
            }else{
                sele.forEach(res=>{
                    for(let i=0;i<tableData.length;i++) {
                        if (tableData[i].index === res.index) {
                            tableData.splice(i,1);
                            this.$message({
                                message:'删除成功',
                                type:'success',
                                duration:1500
                            })
                        }
                    }
                });
            }
        };
        /**
         * 本地表格搜索
         * @param tableDataTemp 复制一份表格数据源
         * @param tableData 表格数据源
         * @param keyword 搜索框关键词
         * @param keyData 搜索的表格值
         * @param keywordState 是否第一次搜索
         */
       /* /!*本地搜索 start*!/
        tableDataTemp:[], //复制的表格数据源
        keyword:'', //搜索框值
        keywordState:true, //搜索次数
        keyData:[], //要搜索的表格值
        /!*本地搜索 end *!/*/
        Vue.prototype.localQuery = function (tableDataTemp,tableData,keyword,keyData,keywordState) {
          //  console.log(tableDataTemp,tableData,keyword,keyData,keywordState)
            if(keywordState){
                tableDataTemp = Object.assign(tableData); //复制
                this.keywordState=false;
            }
            let index = [];
            let { keys } = Object;
            if(keyData.length<=0  && tableDataTemp.length>0){
                for (let item of keys(tableDataTemp[0])) {
                    keyData.push(item);
                }
            }
            let setKay = new Set(keyData);
            let key = [...setKay];
            for(let i=0; i<tableDataTemp.length; i++){
                for(let k in key){
                    let str = tableDataTemp[i][key[k]]+"";
                    if(str.trim().toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
                        index.push(tableDataTemp[i]);
                        break;
                    }
                }
            }
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 300);
            this.tableData = index;
            this.tableDataTemp = tableDataTemp
        };
        /**
         * 拷贝数据 取消双向绑定
         * @param data
         */
        Vue.prototype.cloneData = function (data){
           return JSON.parse(JSON.stringify(data))
        };
        /**
         * 权限obj
         * @param levelArray 多层数组
         */
        Vue.prototype.Jurisdiction = function (levelArray) {
            if(!localStorage.getItem("userResMap")){
                return
            }
            let hrefs = JSON.parse(localStorage.getItem("userResMap")).hrefs;
            let thisPath ='#'+this.$route.path;
          //  console.log(hrefs)
           /* if(hrefs.length>0 && hrefs !== undefined){
                hrefs.forEach(res=>{
                    if(res===thisPath){*/
                        if (levelArray) {
                            let _this = this;
                            function filterUserResMap(map,setMap){
                                let setMapLength =  setMap.length;
                                if(setMapLength === 1){
                                    _this.pageResource = map[setMap[0]] || {};
                                    _this.tableShow = map[setMap[0]]['field'] || [];  //显示字段
                                    _this.userButtonCodes = map[setMap[0]]['button'] || {}; //权限按钮
                                }else if(setMapLength === 2){
                                    _this.pageResource = map[setMap[0]][setMap[1]] || {};
                                    _this.tableShow = map[setMap[0]][setMap[1]]['field'] || [];  //显示字段
                                    _this.userButtonCodes = map[setMap[0]][setMap[1]]['button'] || {}; //权限按钮
                                }else if(setMapLength === 3){
                                    _this.pageResource = map[setMap[0]][setMap[1]][setMap[2]] || {};
                                    _this.tableShow = map[setMap[0]][setMap[1]][setMap[2]]['field'] || [];  //显示字段
                                    _this.userButtonCodes = map[setMap[0]][setMap[1]][setMap[2]]['button'] || {}; //权限按钮
                                    // console.log('pageResource :',_this.pageResource)
                                    // console.log('tableShow :',_this.tableShow)
                                    // console.log('userButtonCodes :',_this.userButtonCodes)
                                }else if(setMapLength === 4){
                                    _this.pageResource = map[setMap[0]][setMap[1]][setMap[2]][setMap[3]] || {};
                                    _this.tableShow = map[setMap[0]][setMap[1]][setMap[2]][setMap[3]]['field'] || [];  //显示字段
                                    _this.userButtonCodes = map[setMap[0]][setMap[1]][setMap[2]][setMap[3]]['button'] || {}; //权限按钮
                                    // console.log('pageResource :',_this.pageResource)
                                    // console.log('tableShow :',_this.tableShow)
                                    // console.log('userButtonCodes :',_this.userButtonCodes)
                                }else if(setMapLength === 5){
                                    _this.pageResource = map[setMap[0]][setMap[1]][setMap[2]][setMap[3]][setMap[4]] || {};
                                    _this.tableShow = map[setMap[0]][setMap[1]][setMap[2]][setMap[3]][setMap[4]]['field'] || [];  //显示字段
                                    _this.userButtonCodes = map[setMap[0]][setMap[1]][setMap[2]][setMap[3]][setMap[4]]['button'] || {}; //权限按钮
                                    // console.log('pageResource :',_this.pageResource)
                                    // console.log('tableShow :',_this.tableShow)
                                    // console.log('userButtonCodes :',_this.userButtonCodes)
                                }
                            }
                            filterUserResMap(JSON.parse(localStorage.getItem("userResMap")).userResMap,levelArray)
                        }
            //         }
            //     })
            // }
        };

    }
}
