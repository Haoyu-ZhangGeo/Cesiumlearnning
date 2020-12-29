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
   navigationHelpButton:false,//帮助按钮
  // homeButton:false,//回到默认视角按钮
   sceneModePicker:false,//切换2D,3D按钮
   timeline:false,//下方时间轴
   fullscreenButton:false,//视窗全屏按钮
   vrButton :true,//开启vr控件
 });
 
const imageryLayers = viewer.scene.imageryLayers;
const tdtAnnoLayer = imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
    url: "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={TileMatrix}&TILEROW={TileRow}&TILECOL={TileCol}&tk=" + "1f2ef17e38eb899d84d7017624791d77",
    layer: "tdtAnnoLayer",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible"
}));
//    取消双击事件
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


//1、获取HTML的select选项
//2、将每一个选项赋予相应的操作
const  camera_select = document.getElementById("camera_select");
 if(camera_select){
     camera_select.onchange = function gradeChange (){
         switch(camera_select.selectedIndex){
             case 1:
                 viewer.camera.flyTo({
                     destination:Cesium.Cartesian3.fromDegrees(118.3080,32.2700,3000),
                     orientation: {
                        heading: Cesium.Math.toRadians(10.20),
                        pitch: Cesium.Math.toRadians(-70.0),
                        roll: Cesium.Math.toRadians(20.10)
                    },
                    duration: 6,


                 });
                 break;
            case 2:
                viewer.camera.flyTo({
                    destination:Cesium.Rectangle.fromDegrees(115.7,39.4,117.4,41.6),
                    duration: 6,
                });
             
                break;
                
            case 3:
                viewer.camera.setView({
                    destination: Cesium.Cartesian3.fromDegrees(114.36384509, 30.53542614, 4000.0),
                    orientation: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-80.0),
                        roll: Cesium.Math.toRadians(0.0)
                    }
                });
                break;
            
            case 4:
                viewer.camera.setView({
                    destination: Cesium.Rectangle.fromDegrees(113.9223,22.9012,114.2134,22.2212),
                });
                break;

            case 5:{
                const wdOption = {
                    destination: Cesium.Cartesian3.fromDegrees(114.36384509, 30.53542614, 4000.0),
                    orientation: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-80.0),
                        roll: Cesium.Math.toRadians(0.0)
                         },
                    duration:5
                    };
                const chzOption = {
                    destination:Cesium.Cartesian3.fromDegrees(118.3080,32.2700,3000),
                     orientation: {
                        heading: Cesium.Math.toRadians(10.20),
                        pitch: Cesium.Math.toRadians(-70.0),
                        roll: Cesium.Math.toRadians(20.10)
                    },
                    duration: 6,

                };
                chzOption.complete = function (){
                    setTimeout (function(){
                        viewer.camera.flyTo(wdOption);
                    },1000);
                };
                viewer.camera.flyTo(chzOption);
            }
            break;
            case 6:
                viewer.camera.flyHome(3);
                break;
            default:
                break;

     }
  } 
}
