const plugins = {};
import { Message } from 'element-ui'
plugins.install = function (Vue) {
    /*数组比较排序*/
    Vue.prototype.compare = sign => {
        return function (a, b) {
            var value1 = a[sign];
            var value2 = b[sign];
            return value1 - value2;
        }
    };
    /*数据类型判断*/
    Vue.prototype.ObjectRest = obj => {
    	var  cate = '';
        for (var _key in obj) {
            var type = Object.prototype.toString.call(obj[_key]);
            switch (type) {
                case '[object String]':
                   obj[_key] = '';
                   cate = 'String'
                    break;
                case '[object Number]':
                    obj[_key] = 0;
                    break;
                case '[object Boolean]':
                    obj[_key] = true;
                    break;
                case '[object Undefined]':
                    obj[_key] = undefined;
                    break;
                case '[object Null]':
                    obj[_key] = null;
                    break;
                case '[object Object]':
                    obj[_key] = {};
                    break;
                case '[object Array]':
                    obj[_key] = [];
                    break;
                default:
            }
        }
    };
    /*空对象判断*/
    Vue.prototype.isEmptyObject = obj => {
        for (var _key in obj) {
            return false;
        };
        return true;
    },
     Vue.prototype.isObject = obj => {
        for (var _key in obj) {
            return false;
        };
        return true;
    };
    Vue.prototype.arrInsert = (index, item, arr) => {
      arr.splice(index,0, item)
      return arr
    },
    /*清除数据的响应式*/
    Vue.prototype.clearObj = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };
    /*清除对象的空属性*/
    Vue.prototype.clearEmpty = (obj) => {
        for (var _key in obj) {
            var type = Object.prototype.toString.call(obj[_key]);
            switch (type) {
                case '[object String]':
                    if (obj[_key] == '') {
                        delete obj[_key];
                    }
                    break;
                case '[object Number]':
                    if (obj[_key] == 0) {
                        delete obj[_key];
                    }
                    break;
                case '[object Boolean]':
                    break;
                case '[object Undefined]':
                    if (obj[_key] == undefined) {
                        delete obj[_key];
                    }
                    break;
                case '[object Null]':
                    if (obj[_key] == null) {
                        delete obj[_key];
                    }
                    delete obj[_key];
                    break;
                case '[object Object]':
                    if (this.isObject(obj[_key])) {
                        delete obj[_key];
                    }
                    break;
                case '[object Array]':
                    if (obj[_key].length == 0) {
                        delete obj[_key];
                    }
                    break;
                default:
            }
        }
        return obj;
    },
        Vue.prototype.makeTreeData = (data, title) => {
            var treedata = [], obj;
            obj = {
                title: data[title],
                content: data
            };

            if (data.children && data.children.length) {
                obj.children = [];
                loop(data.children, obj.children);
            };

            treedata.push(obj);
            return treedata;

            function loop(list, children) {
                list.map((item, index, arrar) => {
                    var obj = {
                        title: item[title],
                        children:item.children,
                        content: item
                    };
                    children.push(obj)
                    if (item.children && item.children.length) {
                        obj.children = [];
                        loop(item.children, obj.children);
                    };
                });
            }
        },
        Vue.prototype.params =(data) =>{
          let url = ''
          for (var k in data) {
            let value = data[k] !== undefined ? data[k] : ''
            url += '&' + k + '=' + encodeURIComponent(value)
          }
          return url ? url.substring(1) : ''
        },

         Vue.prototype.makeTreeDataSelected = (data, title,selected) => {
         	
            var treedata = [], obj;
            obj = {
                title: data[title],
                content: data
            };

            if (data.children && data.children.length) {
                obj.children = [];
                loop(data.children, obj.children);
            };

            treedata.push(obj);
            return treedata;

            function loop(list, children) {
                list.map((item, index, arrar) => {
                    var obj = {
                        title: item[title],
                        children:item.children,
                        content: item,
                        checked:false
                    };
                    if(selected.indexOf(item.dataId)>=0 ||( obj.content && selected.indexOf(obj.content.dataId)>=0)){
                    	obj.checked = true;
                    };
                    children.push(obj)
                    if (item.children && item.children.length) {
                        obj.children = [];
                        loop(item.children, obj.children);
                    };
                });
            }
        },
        Vue.prototype.makeTreeMerchantsData = (data, title, dicId) => {
            var treedata = [], obj;
            obj = {
                title: "<span>" + data[title] + "</span>",
                content: data,
                selected: data.Id == dicId ? true : false
            };

            if (data.ChildList && data.ChildList.length) {
                obj.children = [];
                loop(data.ChildList, obj.children);
            };

            treedata.push(obj);
            return treedata;

            function loop(list, children) {
                list.map((item, index, arrar) => {
                    var obj = {
                        title: item[title],
                        content: item
                    };
                    children.push(obj)
                    if (item.ChildList && item.ChildList.length) {
                        obj.children = [];
                        loop(item.ChildList, obj.children);
                    };
                });
            }
        },
        Vue.prototype.makeCascader = (data, jsons) => {
            var treedata = [];
            var obj = {};
            _.each(jsons, (value, key) => {
                obj[key] = data[value]
            })

            obj.content = data;

            if (data.ChildList && data.ChildList.length) {
                obj.children = [];
                loop(data.ChildList, obj.children);
            };

            treedata.push(obj);
            return treedata;

            function loop(list, children) {
                list.map((item, index, arrar) => {
                    var obj = {
                        label: item.DeptName,
                        value: item.Id,
                        content: item
                    };
                    children.push(obj)
                    if (item.ChildList && item.ChildList.length) {
                        obj.children = [];
                        loop(item.ChildList, obj.children);
                    };
                });
            }
        },
        Vue.prototype.timeFormate = time => {
            if (time.toLocaleDateString) {
                var timeStr = time.toLocaleDateString();
                var timeArr = timeStr.split('/');
                timeArr.map((item,index) =>{
                	if(parseInt(item)<10){
                		item = "0"+item;
                		timeArr[index] = item;
                	}
                });
                timeStr = timeArr.join('-');
                return timeStr;
            } else {
                return time;
            }
        },
        Vue.prototype.makeTreeArray = (data, sign) => {
            var arr = [];
            arr.push(data[sign]);
            if (data.ChildList && data.ChildList.length) {
                loop(data.ChildList);
            };
            function loop(list) {
                _.each(list, (item, index, array) => {
                    arr.push(item[sign]);
                    if (item.ChildList && item.ChildList.length) {
                        loop(item.ChildList);
                    }
                })
            };
            return arr;
        },
        Vue.prototype.makeRoleJurisdictionTree = (data) => {
            let list = []
            _.each(data, item => {
                let obj = {
                    groupId: item.GroupId,
                    groupName: item.GroupName,
                    checked: true
                }

                list.push(obj)
                if (item.ChildList && item.ChildList.length) {
                    obj.childList = []
                    loop(item.ChildList, obj.childList)
                }
            })
            function loop(list, children) {
                list.map((item, index, array) => {
                    let data = {
                        PMenuId: item.PMenuId,
                        ActionId: item.ActionID,
                        id: item.PMenuId || item.ActionID,
                        title: item.FuncName || item.PMenuName,
                        checked: !!item.Display || !!item.IsCheck,
                        showCheckbox: true,
                        ParentId: item.ParentId
                    }
                    data.changeStatus = data => {
                        changeStatusLoop(data)
                    }
                    children.push(data)
                    if (item.ChildMenu && item.ChildMenu.length) {
                        data.children = []
                        loop(item.ChildMenu, data.children)
                    }
                    if (item.Funclist && item.Funclist.length) {
                        data.actionData = []
                        loop(item.Funclist, data.actionData)
                    }
                })
            }
            function changeStatusLoop(data) {
                data.children && _.each(data.children, item => {
                    item.checked = data.checked
                    if (item.actionData && item.actionData.length) {
                        _.each(item.actionData, actionItem => {
                            actionItem.checked = item.checked
                        })
                    }
                    if (item.children && item.children.length) {
                        item.changeStatus(item)
                    }
                })
                data.actionData && _.each(data.actionData, item => {
                    item.checked = data.checked
                })
            }
            return list
        },
         Vue.prototype.deepCopy = (data) =>{
          const t = typeOf(data);
            let o;
        
            if (t === 'array') {
                o = [];
            } else if ( t === 'object') {
                o = {};
            } else {
                return data;
            }
        
            if (t === 'array') {
                for (let i = 0; i < data.length; i++) {
                    o.push(deepCopy(data[i]));
                }
            } else if ( t === 'object') {
                for (let i in data) {
                    o[i] = deepCopy(data[i]);
                }
            }
            return o;
        },

        Vue.prototype.formatDate = (date, fmt) => {
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
            }
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            }
            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + ''
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
                }
            }
            return fmt
        },
        //数字格式化成带n位小数
        Vue.prototype.formatPrice = (price=0, n=2) => {
            n = isNaN(+n)?0:+n
            price = +price
            if(isNaN(price)){
                return Number(0).toFixed(n)
            }else{
                return Number(price).toFixed(n)
            }
        },
        /*对象浅copy*/
        Vue.prototype.volutions = (target,data) =>{
    			for(var k in data){
    				if(target[k] != undefined){
    					target[k] = data[k];
    				}
    			};
    			return target;
    		},
        
        /*前端导出*/
       Vue.prototype.frontExport = (tableModel,tableData,name) => {
         if(!tableData || tableData.length === 0){
           Message({
             message:'暂无可导出数据',
             type:'warning'
           })
           return
         }
          let tHeaderData = [];
          let filterValData = [];
          tableModel.forEach(res=>{
              tHeaderData.push(res.label);
              filterValData.push(res.prop);
          });
          var _date = new Date()
          var str = '('+_date.getFullYear()+'-'+(_date.getMonth()+1)+'-'+_date.getDate()+')';
          require.ensure([], () => {
              const { export_json_to_excel } = require('vendor/Export2Excel');
              const data = formatJson(filterValData, tableData);
              export_json_to_excel(tHeaderData, data, name+str);
          })
          
          function formatJson(filterVal, jsonData) {
      　　　return jsonData.map(v => filterVal.map(j => v[j]))
      　　}
       }
}


export default plugins;
