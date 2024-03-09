import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
// const image = new Image()

// image.onload = () =>
// {
//     const texture = new THREE.Texture(image)
//     console.log(texture)
// }

// image.src = '/textures/door/color.jpg '

// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () =>
// {
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

//Texture Loader
const loadingManager =new THREE.LoadingManager()

// loadingManager.onStart = () =>
// {
//     console.log('onStart')
// }
// loadingManager.onLoad = () =>
// {
//     console.log('onLoad')
// }
// loadingManager.onProgress = () =>
// {
//     console.log('onProgress')
// }
// loadingManager.onError = () =>
// {
//     console.log('onError')
// }
const TextureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = TextureLoader.load('/textures/checkerboard-1024x1024.png')
 const colorTexture = TextureLoader.load('/textures/checkerboard-8x8.png')
const alphaTexture = TextureLoader.load('/textures/door/alpha.jpg')
const heightTexture = TextureLoader.load('/textures/door/height.jpg')
const normalTexture = TextureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = TextureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = TextureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = TextureLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
 
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.magFilter =THREE.NearestFilter
//  colorTexture.magFilter =THREE.LinearFilter


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
// const geometry = new THREE.SphereBufferGeometry(1, 32, 100 ) //creates Sphere
// const geometry = new THREE.ConeBufferGeometry(1, 1, 32) //Creates cone Shaped
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100) //looks like doughnet 
const material = new THREE.MeshBasicMaterial({ map : colorTexture })
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

/* TEXTURES :
    What is Textures ?
    - Textures are based on images or Texture are images that will cover the surface of the geometrics 
    - many types with many different effects
    
    Types :
    1. Color(or Albedo)
        - most simple one
        - applied on the geometry 
    
    2. Alpha 
        - Grayscale image
        - white visible
        - black not visible

    3. Height (or Displacement)
        - Grayscale image 
        - Move the vertices to create some relief
        - Need enough subdivision

    4. Normal 
        - ADD details
        - Doesn't need subdivision
        - The vertices won't move
        - Lure the light about the face orientation
        - Better performances than adding a height texture with a lot of subdivision
    
    5. Ambient Occlusion
        - Grayscale Image
        - Add fake shadows in crevices
        - not physically accurate 
        - Helps to create contrast and see detalis

    6. Metalness 
        - Grayscale image
        - White is metallic
        - Black is non-metallic
        - Mostly for reflection
    
    7. Roughness
        - Grayscale image 
        - In duo with the  metalness
        - White is rough
        - Black is Smooth
        - Mostly for light dissipation
There are many other types but these are the main ones and we will focus on them 

PBR - These textures mainly follows PBR principles(especially the metalness and the roughness)
    - Physically based Rendering (PBR)
    - Many technics that tend to follow real-life directions to get realistic results
    - Becoming the standard for realistic renders
    - Many software, engines and libraries are using it.

How to Load Textures : 
    - To getting the URL of Image
    - To load the texture, we need the URL of the image file
    - Because we are using WebPack, There are two ways of getting it
    - STEP 1 :Put the image texture in the /src/ folder and import it
                import imageSource from './image/jpg'
                consloe.log(imageSource)
    - STEP 2 : Put the image in /static/ folder and access it directly
                const imageSource = './image.jpg'
                console.log(imageSource)

Load the Image :
    - Now that we know how to get the images URL, we can load the textures located in /static/
    - There are multiple ways of loading a textures
    - Using Native JavaScript
    - Create an Image instance, listen to the load event, and change it's src
        const image = new Image()
         image.onload = () =>
        {
          console.log('image loaded')
        }
        image.src = '/textures/door/color.jpg '
    
    - We cannot use the image directly and we need transform it into a Texture
    - Create a texture variable with the Texture class
        const image = new Image()
        image.onload = () =>
        {
            const texture = new THREE.Texture(image)
            console.log(texture)
        }
        image.src = '/textures/door/color.jpg '

    - We need to use that texture in the material 
    - Unfortunately, the texture variable has been declared in the function and we can not access it outside of this function
    - We can create the texture outside of the function and update it once the image is loaded with 'needsUpdate = true'  
        const image = new Image()
        cost texture = new THREE.Texture(image)
        image.addEventListener('load', () =>
        {
            texture.needsUpdate = true
        })
        image.src = '/textures/door.color.jpg'
    - Replace the color property by map and use the texture
        const matrial = new THREE.MeshBasicMaterial({map: texture})

USE Texture Loader :
    - Instantiate a variable using the TextureLoader class and use its .load(...) method to create a texture
        const TextureLoader = new THREE.TextureLoader()
        const texture = TextureLoader.load('/textures/door/color.jpg')
    - One textureLoader can load multiple textures
    - We can send 3 functions after the path 
        * Load = when the image loaded successfully
        * progress = When the loading is progressing 
        * error = if something went wrong 
           const TextureLoader = new THREE.TextureLoader()
            const texture = TextureLoader.load('/textures/door/color.jpg',
             () =>
             {
                 console.log('load')
             },
             () =>
             {
                 console.log('progress')
            },
                () =>
             {
                 console.log('error')
             }
            )

USING The LoadManager :
    - We can use Loading Manager to mutualize the events 
    - It's useful if we want to know the global loading progress or be informed when everything is loaded.
    - Create an instance of the Loading Manager class and pass it to the TextureLoader
        const loadingMaager = new THREE.LoadingManager()
        const textureLoader = new THREE.TextureLoader(loadingManager)
    - Listen to the events by replacing the following properties by your own functions
        loadingManager.onStart = () =>
        {
            console.log('onStart')
        }
        loadingManager.onLoad = () =>
        {
            console.log('onLoad')
        }
        loadingManager.onProgress = () =>
        {
            console.log('onProgress')
        }
        loadingManager.onError = () =>
        {       
            console.log('onError')
        }

Load More Images : We renamed texture with colorTextrue
    const TextureLoader = new THREE.TextureLoader(loadingManager)
    const colorTexture = TextureLoader.load('/textures/door/color.jpg')
    const alphaTexture = TextureLoader.load('/textures/door/alpha.jpg')
    const heightTexture = TextureLoader.load('/textures/door/height.jpg')
    const normalTexture = TextureLoader.load('/textures/door/normal.jpg')
    const ambientOcclusionTexture = TextureLoader.load('/textures/door/ambientOcclusion.jpg')
    const metalnessTexture = TextureLoader.load('/textures/door/metalness.jpg')
    const roughnessTexture = TextureLoader.load('/textures/door/roughness.jpg')

UV Unwrapping : 
    - Replace the BoxGeometry by other geometries
    const geometry = new THREE.BoxBufferGrometry(1, 1, 1) //createsBOX
    const geometry = new THREE.SphereBufferGeometry(1, 32, 100 ) //creates Sphere
    const geometry = new THREE.ConeBufferGeometry(1, 1, 32) //Creates cone Shaped
    const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100) //looks like doughnet 

    - The texture is being stretched or squeezed in different ways to cover the geometry
    - This is called UV unwrapping and it's like unwrapping an origami or a candy wrap to make it flat
    - Each vertex will have 2D coordinate on a flat plane (usually a square)
    - We can see those UV coordinates in geometry.attribute.uv
        console.log(geometry.attribute.uv)
    - Those UV coordinate are generated by Three.js
    - If you create your own geometry you'll have to specify the UV coordinates
    - If you are making the geometry using 3D software, you'll also have to do the UV unwrapping

Transforming the Textures :
    - We can repeat the texture by using the repeat property 
    - It's vector2 with x and y properties
        const colorTexture = textureLoader.load('/textures/door/color.jpg')
        colorTexture.repeat.x =2
        colorTexture.repeat.y =3
    - By default, the texture doesn't repeat and the last pixel get stretched 
    - We can change that with THREE.RepeatWrapping on the wrapS and wrapT properties
        colorTexture.wrapS = THREE.RepeatWrapping
        colorTexture.wrapT = THREE.RepeatWrapping
    - We can alternate the direction with THREE.MirroredRepeatWrapping
        colorTexture.wrapS = THREE.MirroredRepeatWrapping
        colorTexture.wrapT = THREE.MirroredRepeatWrapping
        (Not in used that much)

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

Texture Format and Optimisation :
    - When preparing textures, keep in mind 3 elements
        1.The Weight
        2.The Size(or the resolution)   
        3.The data

    1. The Weight :
        - The user will have to download the textures 
        - Choose the right type of file
        .jpg - lossy compression but usually lighter 
        .png - lossless compression but usually heavier
        - You can use compression websites and softwares like TintPNG

    2.The size (the Resolution) :
        - Each pixel of the textures will have to stored on the GPU regardless of the image's weight
        - GPU has storage limitations 
        - It's even worse because mipmapping incerases the number of pixels to store
        - Try to reduce the size of your image as much as possible
        - The mipmapping will produce a half smaller version of the texture repeatedly until 1x1.
        - Because of that, the texture width and height must be a power of 2    
                * 512x512
                * 1024x1024
                * 512x2048

     3. The Data ;
        - Textures support transparency but we can't have transparency in .jpg
        - If we want to have only one texture that combine color and alpha,we better use .png file
        - If we are using a normal texture we want to have thw exact values which is why we shouldn't apply loosy compression and we better use .png for those
        - Sometimes we can combine different data into one texture by usig the red,green, blue and alpha channels seperatly
        
        
The difficulty is to find the right combination of texture formates and resolution

Where to find Textures :
    - Its always hard to find the perfect textures 
    - A good start would be to search on the web
        * poliigon.com
        * 3dtextures.me
        * arroway-textures.ch

- Always make sure that you have the right to use the texture if it's  not for personal usage
- You can also create your own textures with photos and 2D softwares like Photoshop or even procedural textures with Substance Designer

*/
