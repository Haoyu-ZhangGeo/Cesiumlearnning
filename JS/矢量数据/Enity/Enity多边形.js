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

var redPolygon = viewer.entities.add({
    name : '贴着地表的多边形',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0,
                                                        -115.0, 32.0,
                                                        -107.0, 33.0,
                                                        -102.0, 31.0,
                                                        -102.0, 35.0]),
        material : Cesium.Color.RED
    }
});
 
var greenPolygon = viewer.entities.add({
    name : '绿色拉伸多边形',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArray([-108.0, 42.0,
                                                        -100.0, 42.0,
                                                        -104.0, 40.0]),
        extrudedHeight: 500000.0,
        material : Cesium.Color.GREEN
    }
});
 
var orangePolygon = viewer.entities.add({
    name : '每个顶点具有不同拉伸高度的橘色多边形',
    polygon : {
        hierarchy : Cesium.Cartesian3.fromDegreesArrayHeights(
            [-108.0, 25.0, 100000,
             -100.0, 25.0, 100000,
             -100.0, 30.0, 100000,
             -108.0, 30.0, 300000]),
        extrudedHeight: 0,
        perPositionHeight : true,
        material : Cesium.Color.ORANGE,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});
 
var bluePolygon = viewer.entities.add({
    name : '具有挖空效果的蓝色多边形',
    polygon : {
        hierarchy : {
            positions : Cesium.Cartesian3.fromDegreesArray(
                [-99.0, 30.0,
                 -85.0, 30.0,
                 -85.0, 40.0,
                 -99.0, 40.0]),
            holes : [{
                positions : Cesium.Cartesian3.fromDegreesArray([
                    -97.0, 31.0,
                    -97.0, 39.0,
                    -87.0, 39.0,
                    -87.0, 31.0
                ]),
                holes : [{
                    positions : Cesium.Cartesian3.fromDegreesArray([
                        -95.0, 33.0,
                        -89.0, 33.0,
                        -89.0, 37.0,
                        -95.0, 37.0
                    ]),
                    holes : [{
                        positions : Cesium.Cartesian3.fromDegreesArray([
                            -93.0, 34.0,
                            -91.0, 34.0,
                            -91.0, 36.0,
                            -93.0, 36.0
                        ])
                    }]
                }]
            }]
        },
        material : Cesium.Color.BLUE,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});