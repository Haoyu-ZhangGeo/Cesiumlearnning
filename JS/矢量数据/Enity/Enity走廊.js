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
var redCorridor = viewer.entities.add({
    name : 'Red corridor on surface with rounded corners and outline',
    corridor : {
        positions : Cesium.Cartesian3.fromDegreesArray([
                                                        -100.0, 40.0,
                                                        -105.0, 40.0,
                                                        -105.0, 35.0
                                                    ]),
                                                    width : 200000.0,
        material : Cesium.Color.RED.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.RED
    }
});
 
var greenCorridor = viewer.entities.add({
    name : 'Green corridor at height with mitered corners',
    corridor : {
        positions : Cesium.Cartesian3.fromDegreesArray(
        [    -90.0, 40.0,
             -95.0, 40.0,
             -95.0, 35.0
        ]),
        height: 100000.0,
        width : 200000.0,
        cornerType: Cesium.CornerType.MITERED,
        material : Cesium.Color.GREEN
    }
});
 
var blueCorridor = viewer.entities.add({
    name : 'Blue extruded corridor with beveled corners and outline',
    corridor : {
        positions : Cesium.Cartesian3.fromDegreesArray(
        [    80.0, 40.0,
             -88.0, 40.0,
             -85.0, 35.0
        ]),
        height : 200000.0,
        extrudedHeight : 100000.0,
        width : 200000.0,
        cornerType: Cesium.CornerType.BEVELED,
        material : Cesium.Color.BLUE.withAlpha(0.5),
        outline : true,
        outlineColor : Cesium.Color.BLUE
    }
});