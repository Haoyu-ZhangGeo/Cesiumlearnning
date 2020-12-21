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
var redLine = viewer.entities.add({
    name : '沿着地球表面的红线',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(
            [-75, 35,
             -125, 35]),
        width : 5,
        material : Cesium.Color.RED
    }
});
 
var glowingLine = viewer.entities.add({
    name : '具有发光效果的线',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArray(
            [-75, 37, -125, 37]
        ),
        width : 10,
        material : new Cesium.PolylineGlowMaterialProperty({
            glowPower : 0.2,
            color : Cesium.Color.BLUE
        })
    }
});
 
var orangeOutlined = viewer.entities.add({
    name : '具有一定高度的线',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
            [-75, 39, 250000,-125, 39, 250000]
        ),
        width : 5,
        material : new Cesium.PolylineOutlineMaterialProperty({
            color : Cesium.Color.ORANGE,
            outlineWidth : 2,
            outlineColor : Cesium.Color.BLACK
        })
    }
});
 
var yellowLine = viewer.entities.add({
    name : '不贴着地表的线',
    polyline : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
            [-75, 43, 500000,-125, 43, 500000]
        ),
        width : 3,
        followSurface : false,  //是否贴着地表
        material : Cesium.Color.PURPLE
    }
});