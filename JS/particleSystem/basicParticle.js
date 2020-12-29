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
viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

const entity = viewer.entities.add({
    model:{
        uri:'../../asset/model/CesiumAir/Cesium_Air.glb',
        minimumPixelSize:64
    },
    position:Cesium.Cartesian3.fromDegrees(118.3080,32.2700,5000)
});
//追踪模型的位置
viewer.trackedEntity = entity;
//建立模型矩阵
// 计算当前时间点飞机模型的位置矩阵
function computeModelMatrix(entity, time) {
    //获取位置
    var position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3());
    if (!Cesium.defined(position)) {
        return undefined;
    }
    //获取方向
    var modelMatrix;
    var orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new  Cesium.Quaternion());
    if (!Cesium.defined(orientation)) {
        modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, new     Cesium.Matrix4());
    } else {
        modelMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation, new Cesium.Matrix3()), position, new Cesium.Matrix4());
    }
    return modelMatrix;
}


//建立变换矩阵
// 计算引擎(粒子发射器)位置矩阵
function computeEmitterModelMatrix() {
    //方向
    hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, new Cesium.HeadingPitchRoll());
    var trs = new Cesium.TranslationRotationScale();

    //以modelMatrix(飞机)中心为原点的坐标系的xyz轴位置偏移
    trs.translation = Cesium.Cartesian3.fromElements(2.5, 3.5, 1.0, new Cesium.Cartesian3());
    trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, new Cesium.Quaternion());
    return Cesium.Matrix4.fromTranslationRotationScale(trs, new Cesium.Matrix4());
}
// var particleSystem = viewer.scene.primitives.add(new Cesium.ParticleSystem({
//     image : '../../asset/images/fire.png',
//     startScale : 1.0,
//     endScale : 4.0,
//     particleLife : 1.0,
//     speed : 5.0,
//     imageSize : new Cesium.Cartesian2(20, 20),
//     emissionRate : 5.0,
//     lifetime : 16.0,
//     modelMatrix : computeModelMatrix(entity, Cesium.JulianDate.now()),
//     emitterModelMatrix : computeEmitterModelMatrix()
// }));
var particleSystem = viewer.scene.primitives.add(new Cesium.ParticleSystem({
    image : '../../asset/images/fire.png',
    startScale : 1.0,
    endScale : 4.0,
    minimumLife : 1.0,
    maximumLife : 1.5,
    speed : 5.0,
    width : 20,
    height : 20,
    lifeTime : 16.0,
    //主模型参数(位置)
    modelMatrix : computeModelMatrix(entity, Cesium.JulianDate.now()),
    // 发射器参数
    emitter : new Cesium.CircleEmitter(0.5),
    rate : 5.0,
    emitterModelMatrix : computeEmitterModelMatrix(),
    //颜色
    startColor: Cesium.Color.RED.withAlpha(0.7),
    endColor: Cesium.Color.YELLOW.withAlpha(0.3),
    //forces: [applyGravity]
}));