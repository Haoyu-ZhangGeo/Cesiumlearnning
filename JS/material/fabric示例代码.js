const viewer = new Cesium.Viewer('cesiumContainer',{
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPickers: true, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: true, //是否显示geocoder小器件，右上角查询按钮
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
viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.camera.setView({
    destination : new Cesium.Cartesian3(-2644963.9889313546, 5763731.142118295, 2199400.7089496767), //世界坐标系下的一个坐标点
    orientation : {//旋转角度
        heading :6.075,
        pitch :-0.727,
        roll : 6.283
    }
});

const extrudedPolygon = new Cesium.PolygonGeometry({
  polygonHierarchy : new Cesium.PolygonHierarchy(
    Cesium.Cartesian3.fromDegreesArray([
      112.41726298378288, 23.290411251106182,
      113.67072522399741, 23.560312361463682,
      114.09370956893551, 22.590768298743153,
      112.83803246418894, 22.285610818885644
    ])
  ),
  extrudedHeight: 3000
});

const instance = new Cesium.GeometryInstance({
  geometry: extrudedPolygon,
  id: 'box with height'
});

const m = new Cesium.Material({
  fabric: {
    type: 'Color',
    uniforms: {
      color: new Cesium.Color(216 / 255.0, 170 / 255.0, 208 / 255.0).withAlpha(0.618),
    },
  }
});

const aper =  new Cesium.MaterialAppearance({
  material : m,
});

var p = viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances: instance,
  appearance: aper,
  releaseGeometryInstances: false,
  compressVertices: false,
}));

// p.readyPromise.then(v => console.log(v));

const vs = aper.vertexShaderSource;
const fs = aper.fragmentShaderSource;
const fs2 = aper.getFragmentShaderSource();

console.log(`// 顶点着色器：
${vs}`);
console.log(`// 片元着色器：
${fs}`);
console.log(`// 片元着色器2：
${fs2}`);