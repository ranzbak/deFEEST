// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Setup some stuff to show
var geometry = new THREE.BoxGeometry( 3, 3, 3 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

// Render the scene 
function render() {
  requestAnimationFrame( render );

  // animation 
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.scale.set(Math.sin(cube.rotation.x * .2), Math.cos(cube.rotation.x*.5), Math.sin(cube.rotation.x*.7));

  renderer.render( scene, camera );
}
render();


