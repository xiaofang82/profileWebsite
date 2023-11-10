var SEPARATION = 100, AMOUNTX = 60, AMOUNTY = 40;
	var container;
	var camera, scene, renderer;
	var particles, particle, count = 0;
	var mouseX = 0, mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	$(function () {
		init();		
		animate();	
	});

	function init() {

		container = document.createElement( 'div' );	
		document.getElementById('header').appendChild( container );			
		camera = new THREE.PerspectiveCamera( 120, window.innerWidth / window.innerHeight, 1, 1500 );	
		camera.position.set(0,450,2000);	

		scene = new THREE.Scene();	
		particles = new Array();

		var PI2 = Math.PI * 2;
		
		var material = new THREE.ParticleCanvasMaterial( {
			color: 0x0f96ff,
			vertexColors:true,
			size: 4,
			program: function ( context ) {
				context.beginPath();
				context.arc( 0, 0, 0.01, 0, PI2, true );	
				context.fill();
			}
		} );
		
		var materialY = new THREE.ParticleCanvasMaterial( {
			color: 0xffffff,
			vertexColors:true,
			size: 1,
			program: function ( context ) {

				context.beginPath();
				
				var lGrd = context.createLinearGradient(-0.008,0.25,0.016,-0.25);
				lGrd.addColorStop(0, '#16eff7');
				lGrd.addColorStop(1, '#0090ff');
				context.fillStyle = lGrd;
				context.fillRect(-0.008,0.25,0.016,-0.25); 
				
				context.fillStyle = "#0090ff";
				context.arc(0, 0, 0.008, 0, PI2, true);   
				context.fillStyle = "#16eff7";
				context.arc(0, 0.25, 0.008, 0, PI2, true);   
				context.fill();
				context.closePath();
				
				var rGrd = context.createRadialGradient(0, 0.25, 0, 0, 0.25, 0.025);
				rGrd.addColorStop(0, 'transparent');
				rGrd.addColorStop(1, '#16eff7');
				context.fillStyle = rGrd;
				context.arc(0, 0.25, 0.025, 0, PI2, true);   
				context.fill();

			}
		} );

		
		var i = 0;
		for ( var ix = 0; ix < AMOUNTX; ix ++ ) {
			for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
				var num = Math.random()-0.1;
				if (num >0 ) {
					particle = particles[ i ++ ] = new THREE.Particle( material );
					//console.log("material")
				}
				else {
					particle = particles[ i ++ ] = new THREE.Particle( materialY );
					//console.log("materialY")
				}
				//particle = particles[ i ++ ] = new THREE.Particle( material );
				particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
				particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
				scene.add( particle );
			}
		}

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
	}

	
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}

	function animate() {
		requestAnimationFrame( animate );
		render();
	}

	
	function render() {
		var i = 0;
		
		for (var ix = 0; ix < AMOUNTX; ix++) {
			for (var iy = 0; iy < AMOUNTY; iy++) {
				particle = particles[i++];
				
				particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
				
				particle.scale.x =  particle.scale.y = particle.scale.z  = ( (Math.sin((ix + count) * 0.3) + 1) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4 )*50;	//正常情况下再放大100倍*1200
			}
		}

		renderer.render( scene, camera );
		count += 0.1;
	}