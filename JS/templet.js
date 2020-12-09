const China = Cesium.Rectangle.fromDegrees(100, 10, 120, 70);//以弧度表示的经纬度 west south east north .fromDegree 为经纬度定义方法
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = China;
// 使初始位置放大 
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.5;
// 引出视窗，去除屏幕下方IU控件
const viewer = new Cesium.Viewer('cesiumContainer', {
   animation:false,//左下角时间动画视窗
   baseLayerPicker:true,//右上角底图选择按钮
   geocoder:false,//搜索按钮
   navigationHelpButton:false,//帮助按钮
  // homeButton:false,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false//视窗全屏按钮
   
 });
//    取消双击事件
 viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
 const TD_Key = "1f2ef17e38eb899d84d7017624791d77";//天地图密钥
 //在线天地图影像服务地址
 const TD_IMG_W = "http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0" +"&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +"&style=default&format=tiles&tk=" + TD_Key;//影像
 //在线天地图矢量地图服务
 const TD_VEC_W = "http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0" +"&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +"&style=default&format=tiles&tk=" + TD_Key;//矢量
 //在线天地图影像中文标记服务(墨卡托投影)  
 const TD_CIA_W = "http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0" +"&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +"&style=default.jpg&tk=" + TD_Key;
 //在线天地图矢量中文标记服务(墨卡托投影)            
 const TD_CVA_W = "http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0" +"&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +"&style=default.jpg&tk=" + TD_Key;
 //加载影像服务
 const TDMap= new Cesium.WebMapTileServiceImageryProvider({
     url:TD_IMG_W,
     enablePickFeatures:false,
     subdomains:["t0", "t1", "t2", "t3","t4","t5","t6","t7"],
     minimumLevel:0,
     maximumLevel:18,
     format:"tile",
     layer:"img_w",
     style:"default",
     tileMatrixSetID: "GoogleMapsCompatible"
 });
//bacelayerpick设置
 const TDMapModel = new Cesium.ProviderViewModel({
   name:"天地图影像",
   iconUrl:Cesium.buildModuleUrl('/image/天地图影像.jpg'),
   tooltip:"天地图影像底图 地图服务",
   creationFunction:function(){
     return TDMap;
   }
 });

 const TDMap_VEC= new Cesium.WebMapTileServiceImageryProvider({
  url:TD_VEC_W,
  enablePickFeatures:false,
  subdomains:["t0", "t1", "t2", "t3","t4","t5","t6","t7"],
  minimumLevel:0,
  maximumLevel:18,
  format:"tile",
  layer:"img_w",
  style:"default",
  tileMatrixSetID: "GoogleMapsCompatible"
});

const TDMapModel_VEC = new Cesium.ProviderViewModel({
  name:"天地图矢量",
  iconUrl:Cesium.buildModuleUrl('/image/天地图矢量.jpg'),
  tooltip:"天地图矢量底图 地图服务",
  creationFunction:function(){
    return TDMap_VEC;
  }
});
const cia = new Cesium.WebMapTileServiceImageryProvider({   //调用影响中文注记服务
  url: TD_CIA_W,
  layer: "cia_w",
  style: "default",
  format: "tiles",
  tileMatrixSetID: "GoogleMapsCompatible",
  subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  minimumLevel: 0,
  maximumLevel: 18,
})
viewer.imageryLayers.addImageryProvider(cia)//添加到cesium图层上

//ArcGIS地图加载
const ArcGis = new Cesium.ArcGisMapServerImageryProvider({
  url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
});
const ArcGisModel = new Cesium.ProviderViewModel({
  name:"ArcGis影像",
  iconUrl:Cesium.buildModuleUrl('/image/天地图影像.jpg'),
  tooltip:"ArcGis影像底图 地图服务",
  creationFunction:function(){
    return ArcGis;
  }
});

//高德地图加载
const GD_VEC = new Cesium.UrlTemplateImageryProvider({
  url:
    "http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
  subdomains: ["1", "2", "3", "4"]
});
const GDMapModel = new Cesium.ProviderViewModel({
  name: "高德矢量",
  iconUrl: Cesium.buildModuleUrl(
    "/image/高德矢量.jpg"
  ),
  tooltip: "高德矢量 地图服务",
  creationFunction: function() {
    return GD_VEC;
  }
});

const GD_IMG = new Cesium.UrlTemplateImageryProvider({
  url:
    "https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
  subdomains: ["1", "2", "3", "4"]
});
const GDLabel = new Cesium.UrlTemplateImageryProvider({
     url:
       "http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}",
     subdomains: ["1", "2", "3", "4"]
   });
const GDMapModel_IMG = new Cesium.ProviderViewModel({
  name: "高德影像",
  iconUrl: Cesium.buildModuleUrl(
    "/image/高德影像.jpg"
  ),
  tooltip: "高德影像 地图服务",
  creationFunction: function() {
    return [GD_IMG ,GDLabel];
  }
});
viewer.imageryLayers.addImageryProvider(GDLabel)
///创建数组加载影像
 const ProviderViewModels = [];
 ProviderViewModels.push(TDMapModel);
 ProviderViewModels.push(TDMapModel_VEC);
 ProviderViewModels.push(ArcGisModel);
 ProviderViewModels.push(GDMapModel_IMG);
 ProviderViewModels.push(GDMapModel);
 viewer.baseLayerPicker.viewModel.imageryProviderViewModels = ProviderViewModels;//替换底图控件内容
 viewer.baseLayerPicker.viewModel.selectedImagery = viewer.baseLayerPicker.viewModel.imageryProviderViewModels[0];//初始图像选择
