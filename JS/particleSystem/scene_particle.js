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
 viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

 const snowGravityVector = new Cesium.Cartesian3();
 const snowUpdate = function(particle){
     Cesium.Cartesian3.normalize(particle.position,snowGravityVector);
     Cesium.Cartesian3.multiplyByScalar(snowGravityVector,Cesium.Math.randomBetween(-30.0,-300.0),snowGravityVector);
     particle.velocity = Cesium.Cartesian3.add(particle.velocity,snowGravityVector,particle.velocity);

     const distance = Cesium.Cartesian3.distance(scene.camera.position, particle.position);
     if (distance > (snowRadius)) {
        particle.endColor.alpha = 0.0;
    } else {
        particle.endColor.alpha = snowSystem.endColor.alpha / (distance / snowRadius + 0.1);
    }

 };

 const scene = viewer.scene;
scene.skyAtmosphere.hueShift = -0.8;
scene.skyAtmosphere.saturationShift = -0.7;
scene.skyAtmosphere.brightnessShift = -0.33;

scene.fog.density = 0.001;
scene.fog.minimumBrightness = 0.8;

var snowParticleSize = scene.drawingBufferWidth / 100.0;
var snowRadius = 100000.0;


scene.camera.setView({
    destination: Cesium.Rectangle.fromDegrees(113.9223,22.9012,114.2134,22.2212),
});

var snowSystem = new Cesium.ParticleSystem({
    modelMatrix : new Cesium.Matrix4.fromTranslation(scene.camera.position),
    minimumSpeed : -1.0,
    maximumSpeed : 0.0,
    lifetime : 15.0,
    emitter : new Cesium.SphereEmitter(snowRadius),
    startScale : 0.5,
    endScale : 1.0,
    image : "../../asset/images/smoke.png",
    emissionRate : 7000.0,
    startColor : Cesium.Color.WHITE.withAlpha(0.0),
    endColor : Cesium.Color.WHITE.withAlpha(1.0),
    minimumImageSize : new Cesium.Cartesian2(snowParticleSize, snowParticleSize),
    maximumImageSize : new Cesium.Cartesian2(snowParticleSize * 2.0, snowParticleSize * 2.0),
    updateCallback : snowUpdate
});
scene.primitives.add(snowSystem);

