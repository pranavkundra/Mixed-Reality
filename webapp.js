var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		
		
var width  = window.innerWidth,
	height = window.innerHeight;

var cubeVisible=true
	
renderer.setSize(width, height);

var webglEl = document.getElementById('sphere');	
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
// camera.position.x = 0.1;


/* Creates a sphere and texturemaps the projection onto the sphere */ 
THREE.ImageUtils.crossOrigin = '';
var imageTexture = THREE.ImageUtils.loadTexture("./"+imageFile);
imageTexture.minFilter = THREE.LinearFilter;
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(120, 40, 40),
	new THREE.MeshBasicMaterial({
		map: imageTexture
	})
);
sphere.scale.x = -1;
scene.add(sphere);

var geometry = new THREE.BoxGeometry(2,2,2);
var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: false});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;   


var controls = new THREE.OrbitControls(camera);
controls.noPan = true;
controls.noZoom = true; 
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;
webglEl.appendChild(renderer.domElement);
render();

function render() {
	controls.update();
	requestAnimationFrame(render);
	cube.rotation.x +=.01;
	renderer.render(scene, camera);
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

function cubeToggle() {
	if(cubeVisible)
	{
		cubeVisible=false;
		scene.remove(cube);
	}

	else
	{
		cubeVisible=true;
		scene.add(cube);
	}
}


window.addEventListener( 'resize', onWindowResize, false );