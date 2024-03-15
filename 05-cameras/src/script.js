import "./style.css";
import * as THREE from "three";

/**
 * Curser
 */
const cursor = {
    x: 0,
    y: 0,
};
window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.width - 0.5);
    // console.log(cursor.x, cursor.y)
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const aspectRatio = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.01,100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //Update Camera

    //with this we can see only from top bottom and from side but we cannot see behind the cube
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10
    // camera.lookAt(mesh.position)

    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();


//camers: it is abstract class , you're not supposed to use it directly
//for that we have to inherit from different camera types

/* Array Cameras :
        Array camera render the scnce from multiple cameras on areas of render

    Stereo Cameras :
        Stereo Camera render the scence from two cameras that mimic the eyes to careate a parallel effect .
        use with devices like VR headset, red and blue glasses or cardboard

    Cube Camera : 
        Cube Camera do 6 renders,each one facing a different directions, one forward,backword,left, right ,top,bottom   
        It can render surroundings for the things like environment map,reflection or shadow map

    Perspective Camera :
        Perspective camera render the scence with perspective.  

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,1 ,1000)
        --> in this code, 75 = field of view | it is in degree | also called as 'fov'(field of view) |vertical vision angle
        --> sizes.width / sizes.height : Aspect Ratio , The width of render divided by height of render | also it can change with very specific situations
        --> near and far : The third and fourth part of parameters are called near and far, correspond to how close and how far camera can see  
                            Any object or part of object closer than 'near'or further than 'far' will not show up 
                            Do not use values like '0.00001' and '999999' to prevent z-fighting (bug, glich)

    
    
    Orthographic Camera :
        Orthographic camera render the scence without perspective.
        i.e, if object is far from the camera, it will have the same size of same object and it is very close to camera
        Orthographic Camera differs from Persepective camera by it's lack of perspective 
        Objects has the same size regardless of their distance to camera
        Insted field of view, we provide how far the camera can see in each direction(left,right,top and bottom).Then the 'near' and 'far'

    Control Camera with mouse :
        -If we want to control the position of camera with mouse
        -First we need the mouse co-ordinates on the page 
        -Listen to the 'mousemove' event with 'addEventListener' and retrieve the 'event.clientX' and 'event.clientY'
        const cursor ={
    x : 0,
    y : 0
}
window.addEventListener('mousemove',(event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.width - 0.5)
    // console.log(cursor.x, cursor.y) 
})

 //Update Camera in the tick function --   with this we can see only from top bottom and from side but we cannot see behind the cube

    camera.position.x = cursor.x * 10
    camera.position.y = cursor.y * 10
    camera.lookAt(mesh.position)


*/