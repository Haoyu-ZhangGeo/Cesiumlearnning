const China = Cesium.Rectangle.fromDegrees(100, 10, 120, 70);//以弧度表示的经纬度 west south east north .fromDegree 为经纬度定义方法
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = China;
// 使初始位置放大 
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.5;

 //使用 WebTile……接口访问天地图  其他接口地址请到天地图官网查找，天地图与cesium有三维地形插件
const tdMap = new Cesium.WebMapTileServiceImageryProvider({
  url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1f2ef17e38eb899d84d7017624791d77",
  layer: "tdtBasicLayer",
  style: "default",
  format: "image/jpeg",
  tileMatrixSetID: "GoogleMapsCompatible",
  subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  show: false
});
//调用天地图标注  不会调用WMTS标准的接口
const tdNoteLayer = new Cesiuum.WebMapTileServiceImageryProvider({
  url:"http://t7.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=1f2ef17e38eb899d84d7017624791d77",
  subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
  layer:"tiandituImgMarker",
  style:"default",
  show:true,
  maximumLevel:16
});
// 引出视窗，去除屏幕下方IU控件
const viewer = new Cesium.Viewer('cesiumContainer',{
   imageryProvider:tdMap,
   animation:false,//左下角时间动画视窗
   baseLayerPicker:false,//右上角底图选择按钮
   geocoder:false,//搜索按钮
   navigationHelpButton:false,//帮助按钮
  // homeButton:false,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false//视窗全屏按钮
   
 });
//    取消双击事件
 viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

 //添加影像
 viewer.imageryLayers.addImageryProvider(tdNoteLayer);
 viewer.imageryLayers.raiseToTop(tdtNoteLayer);

 