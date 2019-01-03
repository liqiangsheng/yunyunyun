export let actions={ //异步处理VUEX
  mapData(store,data){
    store.commit("mapData",data)
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
