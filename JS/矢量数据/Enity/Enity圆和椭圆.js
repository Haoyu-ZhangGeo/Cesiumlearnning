const viewer = new Cesium.Viewer('cesiumContainer',{
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPickers: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    clock: new Cesium.Clock(), //用于控制当前时间的时钟对象
    selectedImageryProviderViewModel: undefined, //当前图像图层的显示模型，仅baseLayerPicker设为true有意义
    imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), //可供BaseLayerPicker选择的图像图层ProviderViewModel数组
    selectedTerrainProviderViewModel: undefined, //当前地形图层的显示模型，仅baseLayerPicker设为true有意义 
    imageryProvider:new Cesium.WebMapTileServiceImageryProvider({
        url:"http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles"+"&tk=a97b47d24163e99bad49d43e371304fe",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        maximumLevel:18, //天地图的最大缩放级别
        tileMatrixSetID: "GoogleMapsCompatible",
        show: false
    }),
})
//浮空的绿色圆形
var greenCircle = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-111.0, 40.0, 150000.0),
    name : 'Green circle at height',
    ellipse : {
        semiMinorAxis : 300000.0,
        semiMajorAxis : 300000.0,
        height: 200000.0, //浮空
        material : Cesium.Color.GREEN
    }
});
//红色椭圆形，位于地表，带轮廓
var redEllipse = viewer.entities.add({
    //不带高度
    position: Cesium.Cartesian3.fromDegrees(-103.0, 40.0),
    name : 'Red ellipse on surface with outline',
    ellipse : {
        semiMinorAxis : 250000.0,
        semiMajorAxis : 400000.0,
        material : Cesium.Color.RED.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.RED
    }
});
//蓝色椭圆柱，旋转了角度
var blueEllipse = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-95.0, 40.0, 100000.0),
    name : 'Blue translucent, rotated, and extruded ellipse',
    ellipse : {
        semiMinorAxis : 150000.0,
        semiMajorAxis : 300000.0,
        extrudedHeight : 200000.0,  //拉伸
        rotation : Cesium.Math.toRadians(45), //旋转
        material : Cesium.Color.BLUE.withAlpha(0.7),
        outline : true
    }
});
 
viewer.zoomTo(viewer.entities);
