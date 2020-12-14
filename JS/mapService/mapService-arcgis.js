const China = Cesium.Rectangle.fromDegrees(100, 10, 120, 70);//以弧度表示的经纬度 west south east north .fromDegree 为经纬度定义方法
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = China;
// 使初始位置放大 
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.5;

//esri 地图服务调用
const esri = new Cesium.ArcGisMapServerImageryProvider({
  url:'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
  enablePickFeatures: false
});
//专门的bing接口   没有申请key
const bing = new Cesium.BingMapsImageryProvider({
  url : 'https://dev.virtualearth.net',
  key : 'get-yours-at-https://www.bingmapsportal.com/',
  mapStyle : Cesium.BingMapsStyle.AERIAL
});


// 引出视窗，去除屏幕下方IU控件
const viewer = new Cesium.Viewer('cesiumContainer', {
   imageryProvider:esri,bing,
   animation:false,//左下角时间动画视窗
   baseLayerPicker:false,//右上角底图选择按钮
   geocoder:false,//搜索按钮
   navigationHelpButton:false,//帮助按钮
   homeButton:true,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false,//视窗全屏按钮
   infoBox:false//是否显示点击要素之后显示的信息
   
 });
 //    取消双击事件
 viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

