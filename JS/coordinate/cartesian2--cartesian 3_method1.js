//以弧度表示的经纬度 west south east north .fromDegree 为经纬度定义方法  要在最上方引入
const China = Cesium.Rectangle.fromDegrees(100, 10, 120, 70);
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = China;
// 使初始位置放大 
Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.5;
//使用mapbox……接口调用mapbox地图服务，具体提供多少种服务详细看文档  浏览速度挺快的
const mapBox = new Cesium.MapboxImageryProvider({
    mapId:'mapbox.satellite',
    accessToken:'pk.eyJ1Ijoic3VydmluZy1tYXBwaW5nIiwiYSI6ImNraWJmempiODBoMWcycmw2N3N4dHJsemcifQ.377MGhK03RK1Vlsc_Ktt4Q'
    
});
// 引出视窗，去除屏幕下方IU控件
const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider:mapBox,
   animation:false,//左下角时间动画视窗
   baseLayerPicker:true,//右上角底图选择按钮
   geocoder:false,//搜索按钮
  // homeButton:false,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false//视窗全屏按钮
   
 });
//    取消双击事件
 viewer.cesiumWidget.screenSpaceEventHand

 //获取画布(在2D情况下方法不适用)
 const canvas = viewer.scene.canvas;
 const handler = new Cesium.ScreenSpaceEventHandler(canvas);
//绑定鼠标左键点击事件
handler.setInputAction(function(event){
    //获取鼠标点的windowposition
    const windowPosition = event.position;
    // 将屏幕坐标转换为cattesian3
    const ray = viewer.camera.getPickRay(windowPosition);
    const cartesian  = viewer.scene.globe.pick(ray,viewer.scene);
    //在控制台输出
    console.log(cartesian)
},Cesium.ScreenSpaceEventType.LEFT_CLICK);

 

