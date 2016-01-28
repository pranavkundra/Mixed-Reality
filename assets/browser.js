
			var camera, scene, renderer;
			var target = new THREE.Vector3();

			// change these to control the start position and rotation of camera
			var CAMERASTART = 0;      // or 90, 180, 270
			var DEGREEINC = .1;       //rate of horizontal rotation of camera
			var LATINC = 0; //vertical rotation of camera
			var FOV = 75;  // camera field of view
			
			// another method of calculating rotation; not used now
			var degreecount = 0;    //counter for rotation of camera
			var lon = CAMERASTART; //horizontal pos of camera
			var lat = 0;  // vertical pos of camera 
			var phi = 0, theta = 0;
			var elements = []; //array for pano currently displays
 			
			//css objects
			var object1, object2;
			
			// Called when the pano images are loaded; should make startup smoother
			function startExperience (){
			init();		// to set up panos
			animate();  // called each frame to rotate camera
			}
			
						
			// initiatlize: two sets of pano images
			function init() {

				camera = new THREE.PerspectiveCamera( FOV, window.innerWidth / window.innerHeight, 1, 1000 );

				scene = new THREE.Scene();


				var sides1 = [
					{
						url: 'web/$KMLNAME.threejs1.png',
						position: new THREE.Vector3( -512, 0, 0 ),
						rotation: new THREE.Euler( 0, Math.PI / 2, 0 )
					},
					{
						url: 'web/$KMLNAME.threejs3.png',
						position: new THREE.Vector3( 512, 0, 0 ),
						rotation: new THREE.Euler( 0, -Math.PI / 2, 0 )
					},
					{
						url: 'web/$KMLNAME.threejs4.png',
						position: new THREE.Vector3( 0,  -512, 0 ),
						rotation: new THREE.Euler( -Math.PI / 2, 0, Math.PI )
					},
					{
						url: 'web/$KMLNAME.threejs5.png',
						position: new THREE.Vector3( 0, 512, 0 ),
						rotation: new THREE.Euler( Math.PI / 2, 0, Math.PI )
					},
					{
						url: 'web/$KMLNAME.threejs0.png',
						position: new THREE.Vector3( 0, 0,  512 ),
						rotation: new THREE.Euler( 0, Math.PI, 0 )
					},
					{
						url: 'web/$KMLNAME.threejs2.png',
						position: new THREE.Vector3( 0, 0, -512 ),
						rotation: new THREE.Euler( 0, 0, 0 )
					}
				];

				// now create the Skybox and scale it to avoid collision with the divs
				
				var sc = new THREE.Object3D();
				sc.scale.set(10.0, 10.0, 10.0);

				for ( var i = 0; i < sides1.length; i ++ ) {

					var side = sides1[ i ];

					var element = document.createElement( 'img' );
					element.width = 1026; // 2 pixels extra to close the gap.
					element.src = side.url;  //this loads the image
					elements.push(element);

					object1 = new THREE.CSS3DObject( element );
					object1.position = side.position;
					object1.rotation = side.rotation;
					scene.add( object1 );
					
				}	

				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );


				document.addEventListener( 'mousedown', onDocumentMouseDown, false );

				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			var myFunctionVar; // used for the setInterval function in scrolling

			function onDocumentMouseDown( event ) {
				var centerX = window.innerWidth / 2; 
				var centerY = window.innerHeight / 2;
				var movementX = event.clientX || 0;
				var movementY = event.clientY || 0;

				event.preventDefault();
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );

				movementX = movementX - centerX;
				movementY = movementY - centerY;
				
				myFunctionVar = setInterval(function() { 
						if (Math.abs(movementX)>100) {
							if (movementX>0) {
								lon += .25;
								}
							else {
								lon -= .5;
								}
						};
						
						if (Math.abs(movementY)>100) {
						if (movementY>0) {
								lat -= 0.12;
								}
							else {
								lat += 0.12;
								}
						}
				}, 10);	
			}


			function onDocumentMouseUp( event ) {
				clearInterval(myFunctionVar);
				document.removeEventListener( 'mouseup', onDocumentMouseUp );

			}

			var touchX, touchY; // used for scrolling in touch screen platforms

			function onDocumentTouchStart( event ) {

				event.preventDefault();

				var touch = event.touches[ 0 ];
				
				touchX = touch.screenX;
				touchY = touch.screenY;
			}

			function onDocumentTouchMove( event ) {

				event.preventDefault();

				var touch = event.touches[ 0 ];

				lon -= ( touch.screenX - touchX ) * 0.1;
				lat += ( touch.screenY - touchY ) * 0.1;

				touchX = touch.screenX;
				touchY = touch.screenY;

			}

			function animate() {

				requestAnimationFrame( animate );

				lon +=  DEGREEINC;
				degreecount += 1;
				
				lat = Math.max( - 85, Math.min( 85, lat ) );
				lat += LATINC;
				
				
				phi = THREE.Math.degToRad( 90 - lat );
				theta = THREE.Math.degToRad( lon );

				target.x = Math.sin( phi ) * Math.cos( theta );
				target.y = Math.cos( phi );
				target.z = Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( target );

				renderer.render( scene, camera );

			}
                 