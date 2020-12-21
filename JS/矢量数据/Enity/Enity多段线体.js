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
 
function computeCircle(radius) {
    var positions = [];
    for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(
            radius * Math.cos(radians), radius * Math.sin(radians)));
    }
    return positions;
}
 
function computeStar(arms, rOuter, rInner) {
    var angle = Math.PI / arms;
    var length = 2 * arms;
    var positions = new Array(length);
    for (var i = 0; i < length; i++) {
        var r = (i % 2) === 0 ? rOuter : rInner;
        positions[i] = new Cesium.Cartesian2(
            Math.cos(i * angle) * r, Math.sin(i * angle) * r);
    }
    return positions;
}
 
var redTube = viewer.entities.add({
    name : 'Red tube with rounded corners',
    polylineVolume : {
        positions : Cesium.Cartesian3.fromDegreesArray(
            [-85.0, 32.0,
             -85.0, 36.0,
             -89.0, 36.0]),
        shape : computeCircle(60000.0),
        material : Cesium.Color.RED
    }
});
 
var greenBox = viewer.entities.add({
    name : 'Green box with beveled corners and outline',
    polylineVolume : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
            [-90.0, 32.0, 0.0,
             -90.0, 36.0, 100000.0,
             -94.0, 36.0, 0.0]),
        shape :[new Cesium.Cartesian2(-50000, -50000),
                new Cesium.Cartesian2(50000, -50000),
                new Cesium.Cartesian2(50000, 50000),
                new Cesium.Cartesian2(-50000, 50000)],
        cornerType : Cesium.CornerType.BEVELED,
        material : Cesium.Color.GREEN,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});
 
var blueStar = viewer.entities.add({
    name : 'Blue star with mitered corners and outline',
    polylineVolume : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
            [-95.0, 32.0, 0.0,
             -95.0, 36.0, 100000.0,
             -99.0, 36.0, 200000.0]),
        shape : computeStar(7, 70000, 50000),
        cornerType : Cesium.CornerType.MITERED,
        material : Cesium.Color.BLUE,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});
 
viewer.zoomTo(viewer.entities);