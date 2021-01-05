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
   shouldAnimate:true,
 });
//    取消双击事件
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

var entity = viewer.entities.add({
    model:{
        uri:'../../asset/model/CesiumAir/Cesium_Air.glb',
        minimumPixelSize:64
    },
    position:Cesium.Cartesian3.fromDegrees(118.3080,32.2700,5000)
});
//追踪模型的位置
viewer.trackedEntity = entity;

var emitterModelMatrix = new Cesium.Matrix4();
var translation = new Cesium.Cartesian3();
var rotation = new Cesium.Quaternion();
var hpr = new Cesium.HeadingPitchRoll();
var trs = new Cesium.TranslationRotationScale();
function computerEmitterModelMatrix(){
    hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
    //调整相对位置  前后  左右  上下
    trs.translation = Cesium.Cartesian3.fromElements(-13.0, 0.0, 1.4, translation);
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

    return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
}

var particleSystem = viewer.scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../asset/images/fire.png',
    imageSize : new Cesium.Cartesian2(20, 20),
    startScale : 1.0,
    endScale : 4.0,
    particleLife : 0.9,
    speed : 15.0,
    emitter : new Cesium.CircleEmitter(0.5),
    emissionRate : 13.0,
    //将粒子系统放在模型中心
    modelMatrix : entity.computeModelMatrix(viewer.clock.startTime, new Cesium.Matrix4()),
    lifetime : 16.0,
    //调整粒子系统相对模型位置
    emitterModelMatrix : computerEmitterModelMatrix()
}));
//viewer.scene.primitives.add(particleSystem);