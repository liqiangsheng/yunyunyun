export let actions={ //异步处理VUEX
  mapData(store,data){
    store.commit("mapData",data)
  },
  multiActivityId(store,data){
    store.commit("multiActivityId",data)
  },
  payId(store,data){
    store.commit("payId",data)
  },
};
