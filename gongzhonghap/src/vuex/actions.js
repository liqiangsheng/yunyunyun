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
  tabbarAarrIndex(store,data){
    store.commit("tabbarAarrIndex",data)
  },
  headerIndex(store,data){
    store.commit("headerIndex",data)
  },
  homePageIndex(store,data){
    store.commit("homePageIndex",data)
  },
};
