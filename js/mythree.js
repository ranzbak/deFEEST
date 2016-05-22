// Declaring global variables
var geometry, material, mesh;
var container, rotation, camera;
var group, renderer, stats, scene;

// Object arrays 
var cubes = [];

// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//var renderer = new THREE.WebGLRenderer();
//renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

// Setup some stuff to show

//camera.position.z = 5;

// Set up the 3D text 
var loader = new THREE.FontLoader();
//loader.load( 'fonts/helvetiker_regular.typeface.js', function ( font ) {
loader.load( 'fonts/Comic Sans MS_Regular.js', function ( font ) {

  init( font );
  animate();

} );

// Init 
function init( font ) {

  // Create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xf0f0f0 ); 
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 0, 150, 500 );

  // Get the scene object
  scene = new THREE.Scene();

  // Setup cubes
  var cubcol = 0;
  for (var i = 0; i < 10; i++) { 
    cubcol += 1000;
    // Setup cube
    geometry = new THREE.BoxGeometry( 80, 80, 80 );
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00 + cubcol } );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = -290+i*60;
    cubes.push(cube);
  }

  // Get text from hash

  var theText = "deFEEST :)";

  var hash = document.location.hash.substr( 1 );

  if ( hash.length !== 0 ) {

    theText = hash;

  }

  var geometry = new THREE.TextGeometry( theText, {

    font: font,
    size: 80,
    height: 20,
    curveSegments: 2

  });

  geometry.computeBoundingBox();

  var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

  var material = new THREE.MultiMaterial( [
    new THREE.MeshBasicMaterial( { color: 0x0000ff, overdraw: 0.5 } ),
    new THREE.MeshBasicMaterial( { color: 0xffff00, overdraw: 0.5 } )
  ] );

  var mesh = new THREE.Mesh( geometry, material );

  mesh.position.x = centerOffset;
  mesh.position.y = 100;
  mesh.position.z = 0;

  mesh.rotation.x = 0;
  mesh.rotation.y = Math.PI * 2;
  
  // Create group and add objects
  group = new THREE.Group();
  group.add( mesh );

  for (var curcube of cubes) {
    group.add(curcube);
  }

  scene.add( group );

  //var renderer = new THREE.CanvasRenderer();
  //renderer.setClearColor( 0xf0f0f0 );
  //renderer.setPixelRatio( window.devicePixelRatio );
  //renderer.setSize( window.innerWidth, window.innerHeight );
  //container.appendChild( renderer.domElement );


  //stats = new Stats();
  //container.appendChild( stats.dom );

  //document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  //document.addEventListener( 'touchmove', onDocumentTouchMove, false );

  //

  //window.addEventListener( 'resize', onWindowResize, false );

}

// Render the scene 
function animate() {
  requestAnimationFrame( animate );

  render();

}

function render() {
  // rotate the group
  group.rotation.x -= 0.01;
  group.rotation.y -= 0.015;
  group.rotation.z -= 0.01;

  // Animate the cubes
  var rot=0;
  for (var curcube of cubes) {
    rot += rot+0.00005;
    curcube.rotation.x += 0.01+rot;
    curcube.rotation.y += 0.01+rot;
    curcube.scale.set(Math.sin(curcube.rotation.x * .2+rot), Math.cos(curcube.rotation.x*.5), Math.sin(curcube.rotation.x*.7+rot));
  }

  // Render the scene 
  renderer.render( scene, camera );
}
