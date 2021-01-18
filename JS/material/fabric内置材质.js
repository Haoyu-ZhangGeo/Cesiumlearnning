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
});
var scene = viewer.scene;
var rectangle;
var worldRectangle;
var polyline;

function applyAlphaMapMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      materials: {
        alphaMaterial: {
          type: "AlphaMap",
          uniforms: {
            image: "/asset/images/滁州学院.jpg",
          },
        },
      },
    },
  });
}
applyAlphaMapMaterial(scene);
function applyBumpMapMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      materials: {
        diffuseMaterial: {
          type: "DiffuseMap",
          uniforms: {
            image: "../images/bumpmap.png",
          },
        },
        bumpMaterial: {
          type: "BumpMap",
          uniforms: {
            image: "../images/bumpmap.png",
            strength: 0.8,
          },
        },
      },
      components: {
        diffuse: "diffuseMaterial.diffuse",
        specular: 0.01,
        normal: "bumpMaterial.normal",
      },
    },
  });
}

function applyCheckerboardMaterial(primitive, scene) {
  primitive.appearance.material = Cesium.Material.fromType(
    "Checkerboard"
  );
}

function applyColorMaterial(primitive, scene) {
  primitive.appearance.material = Cesium.Material.fromType("Color");
}

function applyCompositeMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      uniforms: {
        image: "../images/earthspec1k.jpg",
        heightField: "../images/earthbump1k.jpg",
      },
      materials: {
        bumpMap: {
          type: "BumpMap",
          uniforms: {
            image: "../images/earthbump1k.jpg",
          },
        },
      },
      source:
        "czm_material czm_getMaterial(czm_materialInput materialInput) { \n" +
        "    czm_material material = czm_getDefaultMaterial(materialInput); \n" +
        "    vec4 color; \n" +
        "    float heightValue = texture2D(heightField, materialInput.st).r; \n" +
        "    color.rgb = mix(vec3(0.2, 0.6, 0.2), vec3(1.0, 0.5, 0.2), heightValue); \n" +
        "    color.a = (1.0 - texture2D(image, materialInput.st).r) * 0.7; \n" +
        "    color = czm_gammaCorrect(color); \n" +
        "    material.diffuse = color.rgb; \n" +
        "    material.alpha = color.a; \n" +
        "    material.normal = bumpMap.normal; \n" +
        "    material.specular = step(0.1, heightValue); \n" + // Specular mountain tops
        "    material.shininess = 8.0; \n" + // Sharpen highlight
        "    return material; \n" +
        "} \n",
    },
  });
}

function applyDotMaterial(primitive, scene) {
  primitive.appearance.material = Cesium.Material.fromType("Dot");
}

function applyDiffuseMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      type: "DiffuseMap",
      uniforms: {
        image: "../images/Cesium_Logo_Color.jpg",
      },
    },
  });
}

function applyEmissionMapMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      materials: {
        diffuseMaterial: {
          type: "DiffuseMap",
          uniforms: {
            image: "../images/Cesium_Logo_Color.jpg",
          },
        },
        emissionMaterial: {
          type: "EmissionMap",
          uniforms: {
            image: "../images/checkerboard.png",
            repeat: {
              x: 1,
              y: 0.5,
            },
          },
        },
      },
      components: {
        diffuse: "diffuseMaterial.diffuse",
        emission: "emissionMaterial.emission * 0.2",
      },
    },
  });
}

function applyWaterMaterial(primitive, scene) {

  primitive.appearance.material = new Cesium.Material({
    fabric: {
      type: "Water",
      uniforms: {
        specularMap: "../images/earthspec1k.jpg",
        normalMap: Cesium.buildModuleUrl(
          "Assets/Textures/waterNormals.jpg"
        ),
        frequency: 10000.0,
        animationSpeed: 0.01,
        amplitude: 1.0,
      },
    },
  });
}

function applyGridMaterial(primitive, scene) {
  primitive.appearance.material = Cesium.Material.fromType("Grid");
}

function applyImageMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      type: "Image",
      uniforms: {
        image: "../images/Cesium_Logo_Color.jpg",
      },
    },
  });
}

function applyCompressedTextureMaterial(primitive, scene) {

  var compressedImageUrl;
  if (scene.getCompressedTextureFormatSupported("s3tc")) {
    compressedImageUrl = "../images/LogoDXT1.ktx";
  } else if (scene.getCompressedTextureFormatSupported("etc1")) {
    compressedImageUrl = "../images/LogoETC1.ktx";
  } else if (scene.getCompressedTextureFormatSupported("pvrtc")) {
    compressedImageUrl = "../images/LogoPVR.ktx";
  }

  primitive.appearance.material = new Cesium.Material({
    fabric: {
      type: "Image",
      uniforms: {
        image: compressedImageUrl,
      },
    },
  });
}

function applyNormalMapMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      materials: {
        diffuseMaterial: {
          type: "DiffuseMap",
          uniforms: {
            image: "../images/bumpmap.png",
          },
        },
        normalMap: {
          type: "NormalMap",
          uniforms: {
            image: "../images/normalmap.png",
            strength: 0.6,
          },
        },
      },
      components: {
        diffuse: "diffuseMaterial.diffuse",
        specular: 0.01,
        normal: "normalMap.normal",
      },
    },
  });
}

function applySpecularMapMaterial(primitive, scene) {
  primitive.appearance.material = new Cesium.Material({
    fabric: {
      type: "SpecularMap",
      uniforms: {
        image: "../images/Cesium_Logo_Color.jpg",
        channel: "r",
      },
    },
  });
}

function applyStripeMaterial(primitive, scene) {
  primitive.appearance.material = Cesium.Material.fromType("Stripe");
}

function applyRimLightingMaterial(primitive, scene) {
  primitive.appearance.material = Cesium.Material.fromType(
    "RimLighting"
  );
}

function applyPolylineArrowMaterial(primitive, scene) {
  var material = Cesium.Material.fromType("PolylineArrow");
  primitive.material = material;
}

function applyPolylineGlowMaterial(primitive, scene) {
  var material = Cesium.Material.fromType("PolylineGlow", {
    color: Cesium.Color.CRIMSON,
    glowPower: 0.2,
    taperPower: 0.4,
  });
  primitive.material = material;
}

function applyPolylineOutlineMaterial(primitive, scene) {
  var material = Cesium.Material.fromType("PolylineOutline", {
    outlineWidth: primitive.width / 2.0,
  });
  primitive.material = material;
}

function createPrimitives(scene) {
  rectangle = scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(
            -120.0,
            20.0,
            -60.0,
            40.0
          ),
          // vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        }),
      }),
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        aboveGround: false,
      }),
    })
  );

  worldRectangle = scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(
            -180.0,
            -90.0,
            180.0,
            90.0
          ),
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
        }),
      }),
      appearance: new Cesium.EllipsoidSurfaceAppearance({
        aboveGround: false,
      }),
      show: false,
    })
  );

  var polylines = scene.primitives.add(new Cesium.PolylineCollection());
  polyline = polylines.add({
    positions: Cesium.PolylinePipeline.generateCartesianArc({
      positions: Cesium.Cartesian3.fromDegreesArray([
        -110.0,
        42.0,
        -85.0,
        36.0,
        -100.0,
        25.0,
        -77.0,
        12.0,
      ]),
    }),
    width: 10.0,
    show: false,
  });
}



createPrimitives(scene);

applyAlphaMapMaterial(rectangle, scene);
