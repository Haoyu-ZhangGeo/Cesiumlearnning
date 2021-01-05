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
//时间设置为东八区
//const start = viewer.clock.currentTime = Cesium.JulianDate.addHours(Cesium.JulianDate.now(new Date()), 8, new Cesium.JulianDate());

// 引出视窗，去除屏幕下方IU控件
const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider:mapBox,
   animation:false,//左下角时间动画视窗
   baseLayerPicker:true,//右上角底图选择按钮
   geocoder:false,//搜索按钮
  // homeButton:false,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false,//视窗全屏按钮
   shouldAnimate : true,//开启模型动画效果
   
 });
//    取消双击事件
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

//创建盒子
const greenBox = viewer.entities.add({
    name : 'Green Box',
    position: Cesium.Cartesian3.fromDegrees(114,50,30000),
    box:{
        dimensions :new Cesium.Cartesian3(400000,300000,100000),
        material:Cesium.Color.GREEN,
        outline:true,
    }

});
const redBox = viewer.entities.add({
    name : 'Red Box',
    position: Cesium.Cartesian3.fromDegrees(114,40,30000),
    box:{
        dimensions :new Cesium.Cartesian3(400000,300000,100000),
        material:Cesium.Color.RED,
        outline:true,
    }

});

let length = 100000;
const property = new Cesium.CallbackProperty(function(time,result){
    result = result || new Cesium.Cartesian3(0,0,0);

    length +=10000;
    if(length > 900000){
        length = 100000;
    }
    result.x = 400000;
    result.y = 300000;
    result.z = length;

    return result;  
},false);

greenBox.box.dimensions = property;

const collection = viewer.entities;
redBox.box.dimensions = new Cesium.ReferenceProperty(collection,greenBox.id,['box','dimensions']);