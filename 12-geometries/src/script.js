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

// Object
//  const geometry = new THREE.BoxGeometry(1, 1, 1,2, 2, 2)

// const geomtry = new THREE.Geometry()

// const vertex1 = new THREE.Vector3(0, 0, 0)
// geometry.vertices.push(vertex1)
 
// const vertex2 = new THREE.Vector3(0, 1, 0)
// geometry.vertices.push(vertex2)
 
// const vertex3 = new THREE.Vector3(1, 0, 0)
// geometry.vertices.push(vertex3)
 
// const face = new THREE.Face3(0, 1, 2)
// geometry.faces.push(face)
// geometry.faces.push(new THREE.Face3(0,1,2))

// for(let i = 0; i < 50 ; i++)
// {
//     for(let j=0 ; j < 3; j++)
//     {
//         geometry.vertices.push(new THREE.Vector3(
//         (Math.random() - 0.5) * 4,//x-axis
//         (Math.random() - 0.5) * 4,//y-axis
//         (Math.random() - 0.5) * 4 //z-axis
//         ))
//     }
//     const verticesIndex = i * 3
//     geometry.faces.push(new THREE.Face3(
//         verticesIndex,
//         verticesIndex + 1,
//         verticesIndex + 2
//     ))
// }

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)

/*  1st way of creating our own buffer geometry
const positionsArray = new Float32Array(9)

//first vertices
positionsArray[0] = 0
positionsArray[1] = 0
positionsArray[2] = 0

//second vertices
positionsArray[3] = 0
positionsArray[4] = 1
positionsArray[5] = 0

//third vertices
positionsArray[6] = 1
positionsArray[7] = 0
positionsArray[8] = 0

*/

//Second way to create own buffer geometry(By using array)
// const positionsArray = new Float32Array([
//     0, 0, 0, //first vertices
//     0, 1, 0, //second vertices
//     1, 0, 0  //third vertices
// ])
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttribute) 

const geometry = new THREE.BufferGeometry()

const count = 100 
const positionsArray = new Float32Array(count * 3 * 3)

for(let i = 0; i < count * 3 *3; i++)
{
    positionsArray [i]= (Math.random()- 0.5)*4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3 )
geometry.setAttribute('position', positionsAttribute)


const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe : true
 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
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

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
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

/*
We only used the 'BoxGeometry' but there are many other Geometries
But what is Geometry in THREE.JS?
-Composed of vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface)
-Can be used for meshes but also for particles
-Can store more data than the positions(UV coordinates, normals, colors or anything we want)

All the following geometries inherit from "Geometry"
This class has many builtin methods like transalte(...),rotateX(...),rotateY(...),normalize(...)

Types:
BoxGeometry - BoxGeometry is a geometry class for a rectangular cuboid with a given 'width','height' and 'dephth'. On creation,the cuboid is centred on the origin,
            with each edge parallel to one of the axes
    
PlaneGeometry - A class for generating plane geometrics (eg two triangles combined and make one square but it look only by one side)

CircleGeometry - CircleGeometry is a shape of Euclidean geometry with lots of parameters.
            -it is bulit counter-clockwise from a start angle and givenc central angle.
            -it is used to create regular polygones,where the number of segmemts determines the number of sides

ConeGeometry - A class for generating cone geometries

CyliderGeometry - A class for generating cylinder geometries(eg.Anything which is in the form of cylinders we can made that like base of rocket and may more)

RingGeometry -  A class for generating two-dimensional ring geometry.

TorusGeometry - A class for generating torus geometries.(we can say that ring in 3-D form)

TorusKnotGeometry - Creates a torus knot, the particular shape of which is defined by a pair of coprime integers,p and q.
                - If p and q are not coprime, the result will be a torus link.

DodecahedronGeometry - A class for generating a dodecahedron geometry 
                    - Like a raw diamond shape
    
OctahedronGeometry - A class for generating an octahedron geometry

TetrahedronGeometry - A class for generating an tetranhedron geometry

IcosahedronGeometry - A class for generating an icosahedron geometry
                    - same as Tetrahedron geometry

SphereGeometry - A class for generating sphere geometries(used to make planet or football and stuff like that)

ShapeGeometry - Creates an one-sided polygonal geometry from one or more path shapes
              -it is basically made on curves (eg. heart shape)

TubeGeometry - Creates a tube that extrudes along 3-D curves(used in wires and rooler-coster ride structures like that)

ExtrudeGeometry - Creates extruded geometry from apath shape.

LatheGeometry - Creates meshes with axial symmetry like varses. The lathe rotates around the Y axis.

TextGeometry - A class for generating text as a single geometry. It is constructed by providing a string of text and a hash of parameters consisting of a loaded Font and settings for the geometry's parent ExtrudeGeometry.
            - See the Font,FontLoader and [page:Creating-Text] pages for additional details.

By comining those, we can create pretty complex shapes 
-eg if we want to create a house we dont have houseGeometry so at that time we have other Geometries to create a house

*/



/*
In the Square Example ,

we have total 6 parameters 
- width : The size on the x axis
- height : The size on the y axis
- depth : The size on the z axis
- widthSegments : How many subdivisions in the x axis
- heightSegments : How many subdivsions in the y axis
- depthSegments : How many subdivisions in the z axis

Subdivisions corresponds to how much triangles should compose a face 
- 1 = 2 triangles per face
- 2 = 8 triangles per face
const geometry = nwe THREE.BoxGeometry (1,1,1,2,2,2)
The problem is that we cannot see these triangles  

It doesnt change with the square 
- So we can you wirefrme: true onn the material 
const material = new THREE.MeshBasicMaterial({
    color : red, 
    wireframe :true
})


WE Can Create our own Geometry :- 
We ca create our geometry 
If the geometry is very complex and specific, we can also use a 3D software 
Create an empty geometry with 'Geometry'
const geometry = new THREE.Geometry()

We are going to use vector3 to create vertices and put them in the vertoces array 
const vertex1 = new THREE.Vector3(0, 0, 0)
geometry.vertices.push(vertex1)
 
const vertex2 = new THREE.Vector3(0, 1, 0)
geometry.vertices.push(vertex2)
 
const vertex3 = new THREE.Vector3(1, 0, 0)
geometry.vertices.push(vertex3)

Now, we can create a face using the Face3 and add it to the face array
// const face = new THREE.Face3(0, 1, 2)
// geometry.faces.push(face)

geometry.faces.push(new THREE.Face3(0,1,2))
we can write any of them for faces and here, the Face3 contains the indexes of the vertices

THAt was a lot of efforts just to create a mere triangle 
Let's create a bunch of random triangles 
const geometry = new THREE.BoxGeometry(1, 1, 1,2, 2, 2)
for(let i = 0; i < 50 ; i++)
{
    for(let j=0 ; j < 3; j++)
    {
        geometry.vertices.push(new THREE.Vector3(
        (Math.random() - 0.5) * 4,//x-axis
        (Math.random() - 0.5) * 4,//y-axis
        (Math.random() - 0.5) * 4 //z-axis
        ))
    }
    const verticesIndex = i * 3
    geometry.faces.push(new THREE.Face3(
        verticesIndex,
        verticesIndex + 1,
        verticesIndex + 2
    ))
}

Buffer Geometry - 
    - While wandering the Three.js documentation, you probably came across"BufferGeometr"
    - Buffer geometries are more efficient and optimized but less developer-friendly.
    - Most of the geometries we saw earlier have a buffer version 
    eg.const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
   
things are getting little harder when we  create our own buffer geometry 
--CREATING OUR OWN BUFFER GEOMETRY :
    - Before Creating the geometry, we need to understand how to store buffer geometry data
    - we are going to use Float32Array (to store data)
    - Typed array 
    - can only store floats
    - Fixed length
    - Easier to handel for the computer
  There are two ways of creating and filling a Float32Array
  1. Specify the length and then fill the array
      const positionsArray = new Float32Array(9)

        //first vertices
        positionsArray[0] = 0
        positionsArray[1] = 0
        positionsArray[2] = 0

        //second vertices
        positionsArray[3] = 0
        positionsArray[4] = 1
        positionsArray[5] = 0

        //third vertices
        positionsArray[6] = 1
        positionsArray[7] = 0
        positionsArray[8] = 0

  2. Second way to create own buffer geometry(By using array)
    const positionsArray = new Float32Array([
    0, 0, 0, //first vertices
    0, 1, 0, //second vertices
    1, 0, 0  //third vertices
    ])
    It's a one dimension array where the first 3 values are the x,y,z coordinates of the first vertex   
    The next 3 values are x,y,z coordinates of the second vertex and on going

Then we can convert that Float32Array to a BufferAttribute
 const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
3 corresponds to how much values compose one vertex
 
we can add this BufferAttribute to our BufferGeometry with setAttribute(...)
     geometry.setAttribute('position' , positionAttribute )
position is the name that will be used in the shaders
const positionsArray = new Float32Array([
    0, 0, 0, //first vertices
    0, 1, 0, //second vertices
    1, 0, 0  //third vertices
])
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionsAttribu



We can also create a bunch of random trianglesconst geometry = new THREE.BufferGeometry()

    const count = 100 
    const positionsArray = new Float32Array(count * 3 * 3)

    for(let i = 0; i < count * 3 *3; i++)
    {
        positionsArray [i]= (Math.random()- 0.5)*4
    }

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3 )
    geometry.setAttribute('position', positionsAttribute)


Index - 
    -Some geometry have faces that share common vertices
    -when creating a BufferGeometry we can specify a bunch of vertices and then the indices to create the faces and re-use vertices multiple times
     - we are not going to cover this here.

*/

