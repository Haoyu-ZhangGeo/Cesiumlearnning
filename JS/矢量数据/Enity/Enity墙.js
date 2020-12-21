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
//东西方向的横墙
var redWall = viewer.entities.add({
    name : 'Red wall at height',
    wall : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
             [-115.0, 44.0, 200000.0,//坐标点
              -90.0, 44.0, 200000.0]
        ),
        minimumHeights : [100000.0, 100000.0], //按坐标点的最小高度数组
        material : Cesium.Color.RED
    }
});
//四边围墙
var greenWall = viewer.entities.add({
    name : 'Green wall from surface with outline',
    wall : {
        positions : Cesium.Cartesian3.fromDegreesArrayHeights(
            [-107.0, 43.0, 100000.0,
             -97.0, 43.0, 100000.0,
             -97.0, 40.0, 100000.0,
             -107.0, 40.0, 100000.0,
             -107.0, 43.0, 100000.0]),
        material : Cesium.Color.GREEN,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});
//曲折的墙
var blueWall = viewer.entities.add({
    name : 'Blue wall with sawtooth heights and outline',
    wall : {
        //坐标点，不指定高度
        positions : Cesium.Cartesian3.fromDegreesArray(
            [-115.0, 50.0,
             -112.5, 50.0,
             -110.0, 50.0,
             -107.5, 50.0,
             -105.0, 50.0,
             -102.5, 50.0,
             -100.0, 50.0,
             -97.5, 50.0,
             -95.0, 50.0,
             -92.5, 50.0,
             -90.0, 50.0]),
        maximumHeights : [ //上高
            100000, 200000, 100000, 200000, 100000, 200000, 
            100000, 200000, 100000, 200000, 100000],
        minimumHeights : [  //下高
            0, 100000,  0, 100000, 0, 100000, 0, 100000, 0,
            100000, 0],
        material : Cesium.Color.BLUE,
        outline : true,
        outlineColor : Cesium.Color.BLACK
    }
});

//镜头顺时针旋转九十度，即东向
var heading = Cesium.Math.toRadians(90);
//镜头倾斜30度俯视
var pitch = Cesium.Math.toRadians(-30);
viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch)).then(function(result){
    //执行完毕后，进行的动作
    if (result) { //如果镜头切换成功，则result=true
        viewer.selectedEntity = wyoming;
    }
});
viewer.flyTo(viewer.entities);