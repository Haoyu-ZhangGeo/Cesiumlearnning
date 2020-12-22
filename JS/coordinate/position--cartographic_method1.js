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

 //<!-- 经纬度实时显示 -->
 var longitude_show=document.getElementById('longitude_show');
 var latitude_show=document.getElementById('latitude_show');
 var altitude_show=document.getElementById('altitude_show');
 var canvas=viewer.scene.canvas;
 //具体事件的实现
 var ellipsoid=viewer.scene.globe.ellipsoid;
 var handler = new Cesium.ScreenSpaceEventHandler(canvas);
 handler.setInputAction(function(movement){
             //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
              var cartesian=viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
               if(cartesian){
                    //将笛卡尔三维坐标转为地图坐标（弧度）
                    var cartographic=viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
                    //将地图坐标（弧度）转为十进制的度数.也可以不调用API自己用数学方法转换，弧度转经纬度
                     var lat_String=Cesium.Math.toDegrees(cartographic.latitude);
                     var log_String=Cesium.Math.toDegrees(cartographic.longitude);
                     var alti_String=(viewer.camera.positionCartographic.height/1000).toFixed(0);
                     //将经纬度转换为地理坐标
                     const latTo = Cesium.Math.toRadians(lat_String).toFixed(3);
                     const logTo = Cesium.Math.toRadians(log_String).toFixed(3);
                    longitude_show.innerHTML=latTo;
					latitude_show.innerHTML=logTo;
					altitude_show.innerHTML=alti_String;

                    
                }
         },Cesium.ScreenSpaceEventType.MOUSE_MOVE);

 

