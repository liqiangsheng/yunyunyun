//按钮权限控制 暂时不使用
import Vue from 'vue'
import router from '../router'
//let localStorage = require('storejs');

Vue.directive('has', {
    bind: function(el, binding) {
        let url = vm.$route.path.split('/').filter( item => item );
       // let userResMap = localStorage('userResMap').userResMap;
        let userResMap = {
            system:{
                userManage:{
                    character:{
                        button:{add:true,edit:true},
                        a:{add:true},
                        b:{add:true}
                    }
                }
            }
        }
        console.log(url)
        console.log(userResMap)
            if(url.length === 3){
               let button = userResMap[url[0]][url[1]][url[2]]['button'];
               //去双引号
                let expression = binding.expression.replace(/'/g,"");
               // el.parentNode.removeChild(el);

                console.log(button,binding.expression,button[expression])
                //如果不在权限里面
                if(!button[expression]){
                    el.parentNode.removeChild(el);
                }
            }



    }
});