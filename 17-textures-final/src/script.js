import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loadingManager: loading started')
}
loadingManager.onLoaded = () =>
{
    console.log('loadingManager: loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loadingManager: loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loadingManager: loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-2x2.png')
const colorTexture = textureLoader.load(
    '/textures/minecraft.png',
    () =>
    {
        console.log('textureLoader: loading finished')
    },
    () =>
    {
        console.log('textureLoader: loading progressing')
    },
    () =>
    {
        console.log('textureLoader: loading error')
    }
)
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
console.log(geometry.attributes)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()
//This is the final topic of textures 

/*
OFFSET :
    - We can offset the texture using the offset property which is Vector2
        colorTexture.offset.x = 0.5
        colorTexture.offset.y = 0.5

Rotation :
    - We can rotate the texture using the rotation property 
        colorTexture.rotation = Math.PI * 0.25
    - Remove the offset and repeat properties to notice that the rotation occurs around between left corner
    - that is 0, 0 UV coordinates
    - We can change this pivot point with the center property which is Vector2
        colorTexture.rotation = Math.PI * 0.25
        colorTexture.center.x = o.5
        colorTexture.center.y = o.5

Filtering and Mipmapping :
    - If you look at the cube's top face while this face is almost hideen, you'll see a blury texture
    - that is due to the filtering and mipmapping
    - Mip Mapping is a technic that consist of creating half a smaller version of a texture again and agian until we get a 1*1 texture.
    - All those texture variations are sent to the GPU, and the GPU will choose the most appropriate version of the texture
    - All of this is already handeled by Three.js and the GPU but we can choose different algorithms.
      There are two types of filter algorithms
    1. Minification Filter :
        - Happens when the pixels of texture are smaller than the pixels of the render
        - In other words, the texture is too big for the surface, it covers
        - We can chage the minification filter of the texture using minFilter property with those 6 values 
            1. THREE.NearestFilter
            2. THREE.LinearFilter
            3. THREE.NearestMipmapNearestFilter
            4. THREE.NearestMipmapLinearFilter
            5. THREE.LinearMipmapNearestFilter
            6. THREE.LinearMipmapLinearFilter(default)
    - We will only test THREE.NearestFilter
        colorTexture.minFilter = THREE.NearestFilter
    The pixels are more sharp but also glitchy  
    - We can test with checkerboard-1024x1024.png to see those glichy artfacts more clearly 
        const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
      This is called moire patterns

Magnification Filter :
    - Happens when the pixels of the texture are bigger than the pixels of the render
    - In other words, the texture is too small for the surface it covers 
    - Use the checkerboard-8x8.png texture
        const colorTexture  = textureLoader.load('/texture/checkerboard-8x8.png')
    - It look bad, but it is depends on the context
    - In the effect isn't exaggerated, the users will probably not noticed
    - Solution : We can change the magnification filter of the texture using the magFilter property with those 2 values 
        * THREE.NearestFilter 
        * THREE.LinearFilter(Default)
    - Useful if you're going for a Minecraft style 
        Use the minecraft.png texture
        const colorTexture = textLoader.load('/texture/minecraft.png')

    - THREE.NearestFilter is cheper than the other ones and if the result is fine with you just use it
      We can get framerate using NearestFilter 

    - If we are using THREE.NearestFilter on minFilter, we dont need the mipmaps
    - we can deactivate the mipmaps generating with colorTexture.generateMipmaps = false
        colorTexture.generatingMipmaps = false
        colorTexture.minFilter = THREE.Nearest Filter 



*/
