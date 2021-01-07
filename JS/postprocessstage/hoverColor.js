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

const entity = viewer.entities.add({
    name :'Balloon',
    model:{
        uri:'../../asset/model/CesiumBalloon/CesiumBalloon.glb',
        minimumPixelSize:64
    },
    position:Cesium.Cartesian3.fromDegrees(118.3080,32.2700,3000)
});

viewer.trackedEntity = entity;

const fragmentShaderSource =
  "uniform sampler2D colorTexture;\n" +
  "varying vec2 v_textureCoordinates;\n" +
  "uniform vec4 highlight;\n" +
  "void main() {\n" +
  "    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n" +
  "    if (czm_selected()) {\n" +
  "        vec3 highlighted = highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb;\n" +
  "        gl_FragColor = vec4(highlighted, 1.0);\n" +
  "    } else { \n" +
  "        gl_FragColor = color;\n" +
  "    }\n" +
  "}\n";

const stage = viewer.scene.postProcessStages.add(
    new Cesium.PostProcessStage({
      fragmentShader: fragmentShaderSource,
      uniforms: {
        highlight: function () {
          return new Cesium.Color(0.58, 0.38, 0.5, 0.6);
        },
      },
    })
  );
  stage.selected = [];
  
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction(function (movement) {
    const  pickedObject = viewer.scene.pick(movement.endPosition);
    if (Cesium.defined(pickedObject)) {
      stage.selected = [pickedObject.primitive];
    } else {
      stage.selected = [];
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

