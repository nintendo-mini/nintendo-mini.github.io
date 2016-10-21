/* global Box3D */

const bootstrap = (function() {
  const getEntities = function(staticBase) {
    return [
      {
        id: 'CAMERA_ID',
        type: 'camera',
        parentId: 'ROOT_OBJECT_ID',
        parentAssetId: 'SCENE_ID',
        properties: {
          position: {
            x: 0.9,
            y: 0.353,
            z: 0.703
          }, // Default position of camera
          quaternion: {
            x: -0.185,
            y: 0.294,
            z: 0.058,
            w: 0.936
          }, // Default position of camera
          near: 0.01, // Camera near-plane distance
          far: 6
        },
        components: {
          // The render view controls how the scene is rendered: regular,
          // UV-only, normal-only, etc.
          renderView: {
            enabled: true,
            scriptId: 'render_view_component'
          },
          // An orbit controller for rotating around the 3D model, made for preview
          previewCameraController: {
            componentData: {
              orbitDistanceMin: 1.1, // Minimum camera distance
              orbitDistanceMax: 1.1, // Maximum camera distance
              useKeyboard: false,
              enablePan: false
            },
            enabled: true,
            scriptId: 'preview_camera_controller'
          },
          previewCameraFocus: {
            componentData: {},
            enabled: true,
            scriptId: 'preview_camera_focus'
          }
        }
      }, {
        id: 'SCENE_ID',
        type: 'scene',
        parentAssetId: 'SCENE_ID',
        properties: {
          rootObjectId: 'ROOT_OBJECT_ID'
        }
        // The scene contains the lights and camera
      }, {
        id: 'ROOT_OBJECT_ID',
        type: 'node',
        parentAssetId: 'SCENE_ID',
        children: [
          'CAMERA_ID',
          'AMBIENT_LIGHT_ID',
        ]
      }, {
        id: 'AMBIENT_LIGHT_ID',
        type: 'light',
        parentAssetId: 'SCENE_ID',
        parentId: 'ROOT_OBJECT_ID',
        properties: {
          lightType: 'ambient'
        }
      }, {
        id: 'APP_ASSET_ID',
        type: 'application',
        parentAssetId: 'APP_ASSET_ID',
        properties: {
          startupScene: 'SCENE_ID' // The scene to load
        },
        components: {
          rendererComponent: {
            componentData: {
              antialias: !Box3D.isMobile(),
              renderOnDemand: true,
              maxTextureSize2d: Box3D.isMobile() ? 1024 : undefined,
              maxTextureSizeCube: Box3D.isMobile() ? 512 : undefined,
              // Mobile fragment precision at mediump is often too low.
              // TODO - investigate changing some values in shaders to highp
              // to eliviate the problem while letting the rest default to mediump.
              precision: Box3D.isMobile() ? 'highp' : 'mediump',
              clearAlpha: 0.0,
              clearColor: { r: 0.95, g: 0.95, b: 0.95 }
            },
            scriptId: 'box3d_renderer',
            enabled: true
          },
          debugPerformance: {
            scriptId: 'debug_performance',
            enabled: false
          },
          inputController: {
            scriptId: 'input_controller_component',
            enabled: true
          },
          renderModesComponent: {
            componentData: {},
            scriptId: 'render_modes'
          }
        }
      }, {
        id: 'MAT_CAP_TEX',
        type: 'texture2D',
        properties: {
          name: 'Mat Cap Texture',
          imageId: 'MAT_CAP_IMG',
          uMapping: 'clamp',
          vMapping: 'clamp'
        }
      }, {
        id: 'MAT_CAP_IMG',
        type: 'image',
        properties: {
          name: 'Mat Cap Image',
          width: 256,
          height: 256,
          stream: false
        },
        representations: [{
          src: staticBase + 'vendor/matcap.png',
          isExternal: true,
          contentType: 'image/png',
          contentEncoding: 'identity',
          width: 256,
          height: 256,
          compression: 'zip'
        }]
      }, {
        id: 'HDR_ENV_IMG_0',
        type: 'image',
        properties: {
          name: 'HDR Env Image 0',
          isHdr: true,
          width: 1024,
          height: 512,
          stream: false
        },
        representations: [{
          src: staticBase + 'vendor/HDR_Env0.png',
          isExternal: true,
          contentType: 'image/png',
          contentEncoding: 'identity',
          width: 1024,
          height: 512,
          compression: 'zip',
          channels: ['red', 'green', 'blue', 'exponent']
        }]
      }, {
        id: 'HDR_ENV_IMG_1',
        type: 'image',
        properties: {
          name: 'HDR Env Image 1',
          isHdr: true,
          width: 512,
          height: 256,
          stream: false
        },
        representations: [{
          src: staticBase + 'vendor/HDR_Env1.png',
          isExternal: true,
          contentType: 'image/png',
          contentEncoding: 'identity',
          width: 512,
          height: 256,
          compression: 'zip',
          channels: ['red', 'green', 'blue', 'exponent']
        }]
      }, {
        id: 'HDR_ENV_IMG_2',
        type: 'image',
        properties: {
          name: 'HDR Env Image 2',
          isHdr: true,
          width: 256,
          height: 128,
          stream: false
        },
        representations: [{
          src: staticBase + 'vendor/HDR_Env2.png',
          isExternal: true,
          contentType: 'image/png',
          contentEncoding: 'identity',
          width: 256,
          height: 128,
          compression: 'zip',
          channels: ['red', 'green', 'blue', 'exponent']
        }]
      }, {
        id: 'HDR_ENV_MAP_0',
        type: 'texture2D',
        properties: {
          imageId: 'HDR_ENV_IMG_0',
          name: 'HDR Env Map 0',
          isHdr: !Box3D.isMobile(),
          minFilter: 'linear',
          magFilter: 'linear',
          vMapping: 'clamp',
          generateMipmaps: false
        }
      }, {
        id: 'HDR_ENV_MAP_1',
        type: 'texture2D',
        properties: {
          imageId: 'HDR_ENV_IMG_1',
          name: 'HDR Env Map 1',
          isHdr: !Box3D.isMobile(),
          minFilter: 'linear',
          magFilter: 'linear',
          vMapping: 'clamp',
          generateMipmaps: false
        }
      }, {
        id: 'HDR_ENV_MAP_2',
        type: 'texture2D',
        properties: {
          imageId: 'HDR_ENV_IMG_2',
          name: 'HDR Env Map 2',
          isHdr: !Box3D.isMobile(),
          minFilter: 'linear',
          magFilter: 'linear',
          vMapping: 'clamp',
          generateMipmaps: false
        }
      }, {
        id: 'HDR_ENV_MAP_CUBE_0',
        type: 'renderTextureCube',
        properties: {
          name: 'HDR Cube Env Map 0',
          isHdr: !Box3D.isMobile(),
          type: Box3D.isMobile() ? 'uByte' : 'float',
          width: 512,
          height: 512,
          generateMipmaps: true,
          vMapping: 'clamp',
          uMapping: 'clamp'
        },
        components: {
          equirectToCubemap: {
            scriptId: 'panorama_to_cubemap_script',
            enabled: true,
            componentData: {
              inputTexture: 'HDR_ENV_MAP_0'
            }
          }
        }
      }, {
        id: 'HDR_ENV_MAP_CUBE_1',
        type: 'renderTextureCube',
        properties: {
          name: 'HDR Cube Env Map 1',
          isHdr: !Box3D.isMobile(),
          type: Box3D.isMobile() ? 'uByte' : 'float',
          width: 256,
          height: 256,
          generateMipmaps: true,
          vMapping: 'clamp',
          uMapping: 'clamp'
        },
        components: {
          equirectToCubemap: {
            scriptId: 'panorama_to_cubemap_script',
            enabled: true,
            componentData: {
              inputTexture: 'HDR_ENV_MAP_1'
            }
          }
        }
      }, {
        id: 'HDR_ENV_MAP_CUBE_2',
        type: 'renderTextureCube',
        properties: {
          name: 'HDR Cube Env Map 2',
          isHdr: !Box3D.isMobile(),
          type: Box3D.isMobile() ? 'uByte' : 'float',
          width: 128,
          height: 128,
          generateMipmaps: true,
          vMapping: 'clamp',
          uMapping: 'clamp'
        },
        components: {
          equirectToCubemap: {
            scriptId: 'panorama_to_cubemap_script',
            enabled: true,
            componentData: {
              inputTexture: 'HDR_ENV_MAP_2'
            }
          }
        }
      }
    ];
  };

  function initialize(options) {
    options = options || {};
    if (options.apiBase === undefined) {
      return Promise.reject(new Error('Missing apiBase!'));
    }

    if (!options.fileId === undefined) {
      return Promise.reject(new Error('Missing fileId!'));
    }

    if (!options.token === undefined) {
      return Promise.reject(new Error('Missing token!'));
    }

    const box3d = new Box3D.Engine();

    return Promise.resolve({ box3d: box3d, options: options });
  }

  function configureBox3d(state) {
    const boxSdk = new BoxSDK(state.options);

    const resourceLoader = new Box3DResourceLoader(boxSdk);

    return new Promise(function(resolve) {
      state.box3d.initialize({
        engineName: 'Default',
        container: '#box3d',
        entities: getEntities(state.options.staticBase),
        inputSettings: {
          mouseEvents: {
            scroll: true,
            scroll_preventDefault: true
          },
          vrEvents: {
            enable: true,
            position: false
          }
        },
        resourceLoader: resourceLoader,
      }, function() {
        resolve(state);
      });
    });
  }

  function loadApplication(state) {
    const app = state.box3d.getAssetById('APP_ASSET_ID');
    const scene = state.box3d.getAssetById('SCENE_ID');

    if (!app) {
      return Promise.reject(new Error('Could not find application asset!'));
    }

    if (!scene) {
      return Promise.reject(new Error('Could not find scene asset!'));
    }

    return new Promise(function(resolve) {
      app.load(function() {
        resolve(Object.assign({ app: app, scene: scene }, state));
      });
    });
  }

  function loadModelFromBox(state) {
    const loader = new Box3D.JSONLoader(state.box3d);

    return new Promise(function(resolve, reject) {
      loader.loadFromUrl(state.options.apiBase + '/' + state.options.fileId + '/entities.json')

        .then(function(loadedEntities) {
          const entityDesc = loadedEntities.find(function(e){ return e.type === 'prefab' });


          if (entityDesc) {
            const prefabAsset = state.box3d.getAssetById(entityDesc.id);

            if (prefabAsset) {
              return resolve(Object.assign({ prefabAsset: prefabAsset }, state));
            }
          }

          return reject(new Error('No prefab asset found!'));
        });
    });
  }

  function configureImageBasedLighting(state) {
    const materials = state.box3d.getAssetsByType('material');

    Object.keys(materials).forEach(function(id) {
      const mat = materials[id];
      if (mat) {
        mat.setProperty('envMapIrradiance', 'HDR_ENV_MAP_CUBE_2');
        mat.setProperty('envMapRadiance', 'HDR_ENV_MAP_CUBE_0');
        mat.setProperty('envMapRadianceHalfGloss', 'HDR_ENV_MAP_CUBE_1');
      }
    });

    return Promise.resolve(state);
  }

  function createInstance(state) {
    const prefabInstance = state.scene.createInstance(state.prefabAsset);

    if (prefabInstance) {
      // Scale the instance to 100 units in size.
      prefabInstance.scaleToSize(1);

      // Center the instance.
      prefabInstance.alignToPosition({ x: 0, y: 0.1, z: 0 }, { x: 0, y: 0, z: 0 });

      // Add the instance to the scene.
      state.box3d.getObjectById('ROOT_OBJECT_ID').addChild(prefabInstance);

      return Promise.resolve(Object.assign({ prefabInstance }, state));
    }

    return Promise.reject(new Error('Failed to create prefab instance!'));
  }

  return function(options) {
    return initialize(options)
      .then(configureBox3d)
      .then(loadApplication)
      .then(loadModelFromBox)
      .then(configureImageBasedLighting)
      .then(createInstance);
  }
})();

(function(context) {
  context.showPreview = function(path) {
    bootstrap({
      apiBase: '',    // the root path of 3d folders
      fileId: path,   // the 3d folder to render
      staticBase: '', // root path of static files
      token: ' '      // forces use of
    })
    .then( function(state) {
      // Everything is loaded and ready
      state.prefabInstance.componentRegistry.add('rotate_component', {
        autoRotate: true,
        previewRotation: true,
        rotation: {
          x: 0,
          y: 0.1,
          z: 0
        }
      }, 'rotation_1');

      state.prefabInstance.load(function() {
        // $('#grid').removeClass('flickering');
        $('#loading').hide();
        $('#instructions').fadeIn();
        setTimeout(function(){
        	$('#instructions').fadeOut();
        }, 3000);
      });

    })
    .catch( function(err) {
      // An error happened during bootstrap
      console.error(err);
    });
  }
})(window);
