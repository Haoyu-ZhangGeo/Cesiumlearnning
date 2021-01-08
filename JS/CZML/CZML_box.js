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
   fullscreenButton:false,//视窗全屏按钮
   shouldAnimate : true,//开启模型动画效果
   
 });
 //    取消双击事件
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

var czmlBox = [
    {
      id: "document",
      name: "box",
      version: "1.0",
    },
    {
      id: "shape2",
      name: "Red box with blue outline",
      position: {
        cartographicDegrees: [114.0, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [300000.0, 400000.0, 500000.0],
        },
        material: {
          solidColor: {
            color: {
              rgba: [255, 0, 0, 128],
            },
          },
        },
        outline: true,
        outlineColor: {
          rgba: [0, 0, 255, 255],
        },
      },
    },
    {
      id: "shape3",
      name: "Green box outline",
      position: {
        cartographicDegrees: [120, 40.0, 300000.0],
      },
      box: {
        dimensions: {
          cartesian: [400000.0, 300000.0, 500000.0],
        },
        fill: false,
        outline: true,
        outlineColor: {
          rgba: [0, 255, 0, 255],
        },
      },
    },
    {
        id:"rectangle",
        name:"Regular Rectangle",
        rectangle:{
            coordinates:{
                wsenDegrees:[94,40,104,50],
            },
            fill:true,
            material:{
                solidColor:{
                    color:{
                        rgba:[255,255,0,128]
                    },
                },
            },
            height : 0,
            outline:true,
            outlienColor:{
                rgba:[0,0,0,255],
            },
        },
    },
    {
        id:"blueCorridor",
        name:"corridor",
        corridor:{
            positions:{
                cartographicDegrees:[
                    130,
                    40,
                    0,
                    124,
                    40,
                    0,
                    124,
                    35,
                    0,
                ],
            },
            height:200000,
            extrudedHeight:100000,
            cornerType: "MITERED",
            width:200000,
            material:{
                solidColor:{
                    color:{
                        rgba:[0,0,255,134],
                    },
                },
            },
            outline:true,
            outlienColor:{
                rgba:[255,255,255,255],
            },
        },
    },
    {
        id: "orangePolygon",
    name: "Orange polygon with per-position heights and outline",
    polygon: {
      positions: {
        cartographicDegrees: [
          -108.0,
          25.0,
          100000,
          -100.0,
          25.0,
          100000,
          -100.0,
          30.0,
          100000,
          -108.0,
          30.0,
          300000,
        ],
      },
      material: {
        solidColor: {
          color: {
            rgba: [255, 100, 0, 100],
          },
        },
      },
      extrudedHeight: 0,
      perPositionHeight: true,
      outline: true,
      outlineColor: {
        rgba: [0, 0, 0, 255],
      },
    },
    },
    {
        id: "purpleLine",
        name: "Purple arrow at height",
        polyline: {
          positions: {
            cartographicDegrees: [-75, 43, 500000, -120, 43, 500000],
          },
          material: {
            polylineArrow: {
              color: {
                rgba: [148, 0, 211, 255],
              },
            },
          },
          arcType: "NONE",
          width: 10,
        },
      },
      {
        id: "redSphere",
        name: "Red sphere with black outline",
        position: {
          cartographicDegrees: [-107.0, 40.0, 300000.0],
        },
        ellipsoid: {
          radii: {
            cartesian: [300000.0, 300000.0, 300000.0],
          },
          fill: true,
          material: {
            solidColor: {
              color: {
                rgba: [255, 0, 0, 100],
              },
            },
          },
          outline: true,
          outlineColor: {
            rgbaf: [0, 0, 0, 1],
          },
        },
      },
  ];

  const dataSourcePromise = Cesium.CzmlDataSource.load(czmlBox);
  viewer.dataSources.add(dataSourcePromise);
  viewer.zoomTo(dataSourcePromise);