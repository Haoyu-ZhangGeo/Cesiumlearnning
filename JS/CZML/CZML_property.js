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
   animation:true,//左下角时间动画视窗
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

const czmlProperty = [
    {
        id:"document",
        name:"CZML Custom Property",
        version:"1.0",
        clock:{
            interval:"1970/2020",
            currentTime:"1970",
            multiplier:500000000,
        },
    },
    {
        id: "custom_property_object",
        name: "An object with custom properties",
        properties: {
          constant_property: true,
          population_intervals: [
            {
              interval: "1970/1980",
              number: 2209600,
            },
            {
              interval: "1980/2090",
              number: 2889700,
            },
            {
              interval: "1990/2000",
              number: 3307600,
            },
            {
              interval: "2000/2010",
              number: 4326900,
            },
          ],
        },

    },
    {
        id: "colorado",
        name: "Colorado",
        polygon: {
          positions: {
            cartographicDegrees: [
              -109.03,
              41,
              0,
              -102.03,
              41,
              0,
              -102.03,
              37,
              0,
              -109.03,
              37,
              0,
            ],
          },
          material: {
            solidColor: {
              color: {
                rgba: [0, 255, 0, 150],
              },
            },
          },
          height: 0,
          extrudedHeight: 0,
        },
      },
    ]

  const dataSourcePromise = Cesium.CzmlDataSource.load(czmlProperty);
  viewer.dataSources.add(dataSourcePromise);
  viewer.zoomTo(dataSourcePromise);