import * as THREE from './three.js/build/three.module.js'
// import { RectAreaLightHelper } from './three/addons/helpers/RectAreaLightHelper.js'
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from './three.js/examples/jsm/loaders/GLTFLoader.js'

// Geometry =>
// -Box
// -Torus
// -Circle
// -Cone
// -Cylinder

// Property Material =>
// -Standard
// -Lambert
// -Phong

// Light =>
// -AmbientLight
// -PointLight
// -SpotLight

// Switch Camera -> Spacebar

// Raycast -> Click on Sphere and Wire



var scene, renderer, currentCamera

scene = new THREE.Scene()
renderer = new THREE.WebGLRenderer({
    antialias: true
})

var FOV = 50
var ratio = window.innerWidth / window.innerHeight
var near = 1
var far = 2000

var cameraStatic = new THREE.PerspectiveCamera(FOV, ratio, near, far)
var cameraShowcase = new THREE.PerspectiveCamera(FOV, ratio, near, far)
var cameraControlled = new THREE.PerspectiveCamera(FOV, ratio, near, far)

cameraStatic.position.set(0, 100, 20)
cameraStatic.lookAt(0, 50, -200)

cameraShowcase.position.set(0, 100, 50)
cameraShowcase.lookAt(0, 50, -200)

cameraControlled.position.set(0, 100, 100)

currentCamera = cameraStatic


renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x303030);
renderer.render(scene, currentCamera);
document.body.appendChild(renderer.domElement);

var showcase = new OrbitControls(cameraShowcase, renderer.domElement)
showcase.autoRotate = true
showcase.autoRotateSpeed = 2
showcase.target.set(0, 50, -200)

var control = new OrbitControls(cameraControlled, renderer.domElement)
control.update()
control.target.set(0, 50, -200)



window.addEventListener('keydown', (e) => {
    if(e.key == ' '){
        if(currentCamera == cameraStatic){
            currentCamera = cameraShowcase;
        } else if(currentCamera == cameraShowcase){
            currentCamera = cameraControlled;
        } else{
            currentCamera = cameraStatic;
        }
    }
})

window.onresize = () => {
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    renderer.setSize(width, height);
    currentCamera.aspect = width / height;
    currentCamera.updateProjectionMatrix();
}

// Geomtery

const createStep = () => {
    
    const geo = new THREE.BoxGeometry(50, 5, 50)
    const map = new THREE.TextureLoader().load("./assets/black-floor.jpg");
    const material = new THREE.MeshPhongMaterial({
        map: map
    })
    
    for (let index = 0; index < 4; index++) {
        
        const mesh = new THREE.Mesh(geo, material)
        scene.add(mesh)
        mesh.position.set(0, index * 5, index * -25)
    }

    const platformStepGeo = new THREE.BoxGeometry(50, 5, 65)
    const platformStepMesh = new THREE.Mesh(platformStepGeo, material)
    platformStepMesh.position.set(0, 16, -125)
    scene.add(platformStepMesh)
}

const createPlatform = () => {

    const outerGeo = new THREE.TorusGeometry( 100, 6, 32, 32)
    const mapFloor = new THREE.TextureLoader().load("./assets/green-marble.jpg");
    const mapMetal = new THREE.TextureLoader().load("./assets/green-marble.jpg");

    const outerMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        metalness: 1,
        map: mapMetal
    })
    const outerMesh = new THREE.Mesh(outerGeo, outerMaterial)

    outerMesh.castShadow = true
    outerMesh.receiveShadow = true

    outerMesh.rotation.set(4.7, 0, 0)
    outerMesh.position.set(0, 10, -210)
    scene.add(outerMesh)

    const innerGeo = new THREE.CircleGeometry( 60, 32)
    const innerMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: mapFloor
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMaterial)

    innerMesh.castShadow = true
    innerMesh.receiveShadow = true

    const light = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(light)

    innerMesh.rotation.set(4.7, 0, 0)
    innerMesh.position.set(0, 15, -210)
    scene.add(innerMesh)

 
}

const createPlatformHolder = () => {

    const geo = new THREE.ConeGeometry(100, 50, 16, 1, true)
    const material = new THREE.MeshPhongMaterial({
        emissive: 0xff0040,
        side: THREE.DoubleSide,
        wireframe: true
    })
    const mesh = new THREE.Mesh(geo, material)
    mesh.name = "WireRed"

    mesh.rotateX(Math.PI)

    mesh.position.set(0, -12, -210)
    scene.add(mesh)
}

const createOuterPillar = () => {

    const geo = new THREE.CylinderGeometry( 7, 7, 125, 32 )
    const map = new THREE.TextureLoader().load("./assets/pillar.jpg")
    const material = new THREE.MeshLambertMaterial({
        map: map
    });
    const meshPillar1 = new THREE.Mesh(geo, material)
    const meshPillar2 = new THREE.Mesh(geo, material)
    const meshPillar3 = new THREE.Mesh(geo, material)
    const meshPillar4 = new THREE.Mesh(geo, material)

    meshPillar1.position.set(-85, 45, -160)
    meshPillar2.position.set(-80, 45, -270)
    meshPillar3.position.set(85, 45, -160)
    meshPillar4.position.set(80, 45, -270)

    meshPillar1.receiveShadow = true
    meshPillar1.castShadow = true
    meshPillar2.receiveShadow = true
    meshPillar2.castShadow = true
    meshPillar3.receiveShadow = true
    meshPillar3.castShadow = true
    meshPillar4.receiveShadow = true
    meshPillar4.castShadow = true

    scene.add(meshPillar1)
    scene.add(meshPillar2)
    scene.add(meshPillar3)
    scene.add(meshPillar4)

}

const createInnerPillar = () => {

    const geo = new THREE.CylinderGeometry( 4, 4, 20, 32 )
    const map = new THREE.TextureLoader().load("./assets/pillar.jpg")

    const material = new THREE.MeshLambertMaterial({
        map: map
    });
    const meshPillar1 = new THREE.Mesh(geo, material)
    const meshPillar2 = new THREE.Mesh(geo, material)
    const meshPillar3 = new THREE.Mesh(geo, material)
    const meshPillar4 = new THREE.Mesh(geo, material)

    meshPillar1.position.set(-45, 25, -190)
    meshPillar2.position.set(-40, 25, -240)
    meshPillar3.position.set(45, 25, -190)
    meshPillar4.position.set(40, 25, -240)

    meshPillar1.castShadow = true
    meshPillar2.receiveShadow = true
    meshPillar2.castShadow = true
    meshPillar3.receiveShadow = true
    meshPillar3.castShadow = true
    meshPillar4.receiveShadow = true
    meshPillar4.castShadow = true

    scene.add(meshPillar1)
    scene.add(meshPillar2)
    scene.add(meshPillar3)
    scene.add(meshPillar4)
}

const createPillarLight = () => {

    const geo = new THREE.SphereGeometry( 4, 32, 16 )
    const material1 = new THREE.MeshPhongMaterial({
        emissive: 0xff0040,
    });
    const material2 = new THREE.MeshPhongMaterial({
        emissive: 0x0040ff,
    });
    const material3 = new THREE.MeshPhongMaterial({
        emissive: 0x80ff80,
    });
    const material4 = new THREE.MeshPhongMaterial({
        emissive: 0xffaa00,
    });

    const sphereInnerPillar1 = new THREE.Mesh(geo, material1)
    const sphereInnerPillar2 = new THREE.Mesh(geo, material2)
    const sphereInnerPillar3 = new THREE.Mesh(geo, material3)
    const sphereInnerPillar4 = new THREE.Mesh(geo, material4)

    sphereInnerPillar1.position.set(-45, 45, -190)
    sphereInnerPillar2.position.set(-40, 45, -240)
    sphereInnerPillar3.position.set(45, 45, -190)
    sphereInnerPillar4.position.set(40, 45, -240)
    
    const pillarInnerLight1 = new THREE.PointLight( 0xff0040, 1.2, 60 )
    const pillarInnerLight2 = new THREE.PointLight( 0x0040ff, 1.2, 60 )
    const pillarInnerLight3 = new THREE.PointLight( 0x80ff80, 1.2, 60 )
    const pillarInnerLight4 = new THREE.PointLight( 0xffaa00, 1.2, 60 )

    scene.add(sphereInnerPillar1)
    scene.add(sphereInnerPillar2)
    scene.add(sphereInnerPillar3)
    scene.add(sphereInnerPillar4)
    
    pillarInnerLight1.position.set(-45, 45, -190)
    pillarInnerLight2.position.set(-40, 45, -240)
    pillarInnerLight3.position.set(45, 45, -190)
    pillarInnerLight4.position.set(40, 45, -240)

    sphereInnerPillar1.name = "InnerSphereInactive"
    sphereInnerPillar2.name = "InnerSphereInactive"
    sphereInnerPillar3.name = "InnerSphereInactive"
    sphereInnerPillar4.name = "InnerSphereInactive"

    scene.add(pillarInnerLight1)
    scene.add(pillarInnerLight2)
    scene.add(pillarInnerLight3)
    scene.add(pillarInnerLight4)

    const geoOuter = new THREE.SphereGeometry( 10, 32, 16 )
    const orbMaterial = new THREE.TextureLoader().load("./assets/floor.jpg")
    const materialOuter = new THREE.MeshPhongMaterial({
        lightMap: orbMaterial,
        lightMapIntensity: 0.7,
        map: orbMaterial
    })
    
    const sphereOuterPillar2 = new THREE.Mesh(geoOuter, materialOuter)
    const sphereOuterPillar3 = new THREE.Mesh(geoOuter, materialOuter)
    const sphereOuterPillar4 = new THREE.Mesh(geoOuter, materialOuter)
    const sphereOuterPillar1 = new THREE.Mesh(geoOuter, materialOuter)

    sphereOuterPillar1.position.set(-85, 115, -160)
    sphereOuterPillar2.position.set(-80, 115, -270)
    sphereOuterPillar3.position.set(85, 115, -160)
    sphereOuterPillar4.position.set(80, 115, -270)

    sphereOuterPillar1.name = "OuterSphereInactive"
    sphereOuterPillar2.name = "OuterSphereInactive"
    sphereOuterPillar3.name = "OuterSphereInactive"
    sphereOuterPillar4.name = "OuterSphereInactive"

    scene.add(sphereOuterPillar1)
    scene.add(sphereOuterPillar2)
    scene.add(sphereOuterPillar3)
    scene.add(sphereOuterPillar4)

    const pillarOuterLight1 = new THREE.PointLight( 0xffffff, 1.2, 60 )
    const pillarOuterLight2 = new THREE.PointLight( 0xffffff, 1.2, 60 )
    const pillarOuterLight3 = new THREE.PointLight( 0xffffff, 1.2, 60 )
    const pillarOuterLight4 = new THREE.PointLight( 0xffffff, 1.2, 60 )

    pillarOuterLight1.position.set(-85, 115, -160)
    pillarOuterLight2.position.set(-80, 115, -270)
    pillarOuterLight3.position.set(85, 115, -160)
    pillarOuterLight4.position.set(80, 115, -270)

    scene.add(pillarOuterLight2)
    scene.add(pillarOuterLight3)
    scene.add(pillarOuterLight1)
    scene.add(pillarOuterLight4)

}   

const createRotateLight = () => {

    const distance = 250
    const intensity = 3;
    const rotatingLight = new THREE.SpotLight( 0xffffff, intensity, distance );
    rotatingLight.position.set( 0, 170, 0);

    rotatingLight.castShadow = true;

    rotatingLight.shadow.mapSize.width = 512
    rotatingLight.shadow.mapSize.height = 512

    rotatingLight.shadow.camera.near = 0.5
    rotatingLight.shadow.camera.far = 500
    rotatingLight.shadow.camera.fov = 30

    scene.add( rotatingLight) 

    const spotLightHelper = new THREE.SpotLightHelper( rotatingLight )
    // scene.add( spotLightHelper )

    return rotatingLight
}

const rotatingLight = createRotateLight()

const createLugia = () => {

    const load3D = new GLTFLoader().load('./assets/lugia/scene.gltf', (object) => {
        
        const model = object.scene
        model.name = "Lugia"
        model.scale.set(20, 20, 20)
        model.position.set(0, 75, -230)
        
        model.traverse(function(objectNode){
            if(objectNode.isMesh){
                objectNode.name = "Lugia"
                objectNode.castShadow = true
            }
        })
        
        scene.add(model)
    })
}


const createSkybox = () =>{
    
        
    let skyboxLoader = new THREE.TextureLoader()
    let skyboxMaterialArr = [
        new THREE.MeshBasicMaterial({
            map: skyboxLoader.load('./assets/skybox2/right.png'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: skyboxLoader.load('./assets/skybox2/left.png'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: skyboxLoader.load('./assets/skybox2/top_rotate3.png'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: skyboxLoader.load('./assets/skybox2/bottom_rotate1.png'),
            side: THREE.DoubleSide
        }),
        
        new THREE.MeshBasicMaterial({
            map: skyboxLoader.load('./assets/skybox2/back.png'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: skyboxLoader.load('./assets/skybox2/front.png'),
            side: THREE.DoubleSide
        }),
         
    ]

    const skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
    const skybox = new THREE.Mesh(skyboxGeo, skyboxMaterialArr);
    scene.add(skybox);
}

const createAll = () => {

    createStep()
    createPlatformHolder()
    createPlatform()
    createOuterPillar()
    createInnerPillar()
    createPillarLight()
    createLugia()
    createSkybox()
}

createAll()

var t = 0
const renderFunction = () => {
    
    t += 0.005
    renderer.render(scene, currentCamera)
    requestAnimationFrame(renderFunction)
    
    rotatingLight.position.x = 75*Math.cos(t) + 0
    rotatingLight.position.z = 75*Math.sin(t) - 240
    showcase.update()

}
renderFunction();

var ray = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener("pointerdown", (e) => {

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;

    ray.setFromCamera(mouse, currentCamera);

    const intersects = ray.intersectObjects(scene.children)

    const orbMaterial = new THREE.TextureLoader().load("./assets/floor.jpg")

    for (let i = 0; i < intersects.length; i++) {
        
        if(intersects[i].object.name === "OuterSphereInactive"){
             intersects[i].object.material.lightMapIntensity = 1
             intersects[i].object.name = "OuterSphereActive"
        } else if(intersects[i].object.name === "OuterSphereActive"){
            intersects[i].object.material.lightMapIntensity = 0.7
            intersects[i].object.name = "OuterSphereInactive"
        }

        if(intersects[i].object.name === "InnerSphereInactive"){
            intersects[i].object.material.emissiveIntensity = 1
            intersects[i].object.name = "InnerSphereActive"
       } else if(intersects[i].object.name === "InnerSphereActive"){
           intersects[i].object.material.emissiveIntensity = 0.5
           intersects[i].object.name = "InnerSphereInactive"
       }

       if(intersects[i].object.name === "WireRed"){
            intersects[i].object.material.emissive = new THREE.Color(0xffff)
            intersects[i].object.name = "WireBlue"
        } else if(intersects[i].object.name === "WireBlue"){
            intersects[i].object.material.emissive = new THREE.Color(0xff0040)
            intersects[i].object.name = "WireRed"
       }
    }
}
)


