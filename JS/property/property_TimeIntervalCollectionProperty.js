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
//自定义时间系统
const clock = new Cesium.Clock({
    startTime: Cesium.JulianDate.fromIso8601("2021-01-05"),
    currentTime: Cesium.JulianDate.fromIso8601("2021-01-05"),
    stopTime: Cesium.JulianDate.fromIso8601("2021-01-06"),
    //开启时间循环
    clockRange: Cesium.ClockRange.LOOP_STOP, 
    clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
    multiplier: 4000, //
    shouldAnimate: true, // 
  });

// 引出视窗，去除屏幕下方IU控件
const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider:mapBox,
   animation:true,//左下角时间动画视窗
   baseLayerPicker:true,//右上角底图选择按钮
   geocoder:false,//搜索按钮
  // homeButton:false,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false,//视窗全屏按钮
   shouldAnimate : true,//开启模型动画效果
   clockViewModel: new Cesium.ClockViewModel(clock),
 });
//    取消双击事件
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

//创建盒子
const greenBox = viewer.entities.add({
    name : 'Green Box',
    position: Cesium.Cartesian3.fromDegrees(114,50,30000),
    box:{
        dimensions :new Cesium.Cartesian3(400000,300000,500000),
        material:Cesium.Color.GREEN,
        outline:true,
    }

});

const property = new Cesium.TimeIntervalCollectionProperty(Cesium.Cartesian3);
      property.intervals.addInterval(Cesium.TimeInterval.fromIso8601({
          iso8601 : '2021-01-05T00:00:00.00Z/2021-01-05T08:00:00.00Z',
          isStartIncluded : true,
          isStopIncluded : false,
          data : new Cesium.Cartesian3(400000,300000,100000)
      }));
      property.intervals.addInterval(Cesium.TimeInterval.fromIso8601({
          iso8601 : '2021-01-05T08:00:00.00Z/2021-01-05T12:00:00.00Z',
          isStartIncluded : true,
          isStopIncluded : false,
          data : new Cesium.Cartesian3(400000,300000,400000)
      }));
      property.intervals.addInterval(Cesium.TimeInterval.fromIso8601({
          iso8601 : '2021-01-05T12:00:00.00Z/2021-01-05T18:00:00.00Z',
          isStartIncluded : true,
          isStopIncluded : false,
          data : new Cesium.Cartesian3(400000,300000,700000)
      }));
      property.intervals.addInterval(Cesium.TimeInterval.fromIso8601({
          iso8601 : '2021-01-05T18:00:00.00Z/2021-01-06T00:00:00.00Z',
          isStartIncluded : true,
          isStopIncluded : true,
          data : new Cesium.Cartesian3(400000,300000,1000000)
      }));
      greenBox.box.dimensions = property;
      

