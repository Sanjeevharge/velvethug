// Velvet Hug 3D WebGL Mattress Layer Visualizer & Anatomical Inspector
// Built using Three.js with White & Royal Purple Studio Aesthetics

export class MattressVisualizer3D {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.options = options;
    this.isExploded = false;
    this.autoRotate = true;
    this.activeLayerIndex = 0;
    this.currentMattress = options.mattress || null;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.layersGroup = null;
    this.layerMeshes = [];
    this.targetLayerPositions = [];

    this.isMouseDown = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.targetRotationY = 0.5;
    this.targetRotationX = 0.35;

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded. Loading fallback canvas...');
      this.renderFallback();
      return;
    }

    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 480;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.position.set(0, 4.2, 8.8);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Clean Bright Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 12, 8);
    dirLight1.castShadow = true;
    this.scene.add(dirLight1);

    const purpleFillLight = new THREE.DirectionalLight(0xddd6fe, 0.8);
    purpleFillLight.position.set(-6, 2, -6);
    this.scene.add(purpleFillLight);

    const softPointLight = new THREE.PointLight(0x7c3aed, 0.8, 12);
    softPointLight.position.set(0, 4, 3);
    this.scene.add(softPointLight);

    // Create 3D Mattress Layers
    this.createMattressLayers();

    // Events
    this.bindEvents();

    // Animation Loop
    this.animate();
  }

  createMattressLayers() {
    if (this.layersGroup) {
      this.scene.remove(this.layersGroup);
    }

    this.layersGroup = new THREE.Group();
    this.layerMeshes = [];
    this.targetLayerPositions = [];

    const matWidth = 5.2;
    const matLength = 4.2;

    const layerDefs = [
      {
        name: 'Top Quilted Cool-Touch Damask',
        height: 0.28,
        color: 0xffffff,
        roughness: 0.25,
        metalness: 0.05,
        yBase: 0.8,
        yExploded: 1.9,
        desc: 'Belgian silk-infused quilted fabric with diamond thermoregulation'
      },
      {
        name: '100% Organic Natural Pin-Core Latex',
        height: 0.45,
        color: 0xfef9c3,
        roughness: 0.6,
        metalness: 0.02,
        yBase: 0.45,
        yExploded: 1.1,
        desc: 'Sri Lankan organic latex with hundreds of microscopic breathing channels'
      },
      {
        name: 'Cryo-Gel Adaptive Memory Foam',
        height: 0.4,
        color: 0xa78bfa,
        roughness: 0.45,
        metalness: 0.1,
        yBase: 0.05,
        yExploded: 0.3,
        desc: 'Thermoreactive adaptive purple memory foam for lumbar pressure contouring'
      },
      {
        name: '7-Zone Pocket Coil Spring Core',
        height: 0.7,
        color: 0x6b7280,
        roughness: 0.2,
        metalness: 0.85,
        yBase: -0.5,
        yExploded: -0.6,
        isCoilGrid: true,
        desc: '1200+ individually encased tempered carbon steel coils for zero partner motion'
      },
      {
        name: 'High-Density Orthopedic Foundation',
        height: 0.5,
        color: 0x3b0764,
        roughness: 0.7,
        metalness: 0.1,
        yBase: -1.1,
        yExploded: -1.6,
        desc: 'Deep royal purple high-resilience Aerocell anti-sag foundation'
      }
    ];

    layerDefs.forEach((def, index) => {
      let mesh;

      if (def.isCoilGrid) {
        mesh = new THREE.Group();
        const coilGeo = new THREE.CylinderGeometry(0.14, 0.14, def.height, 12);
        const coilMat = new THREE.MeshStandardMaterial({
          color: def.color,
          metalness: def.metalness,
          roughness: def.roughness
        });

        for (let x = -2.2; x <= 2.2; x += 0.45) {
          for (let z = -1.7; z <= 1.7; z += 0.45) {
            const coil = new THREE.Mesh(coilGeo, coilMat);
            coil.position.set(x, 0, z);
            mesh.add(coil);
          }
        }
      } else {
        const geometry = new THREE.BoxGeometry(matWidth, def.height, matLength, 8, 4, 8);
        const material = new THREE.MeshStandardMaterial({
          color: def.color,
          roughness: def.roughness,
          metalness: def.metalness
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }

      mesh.position.y = def.yBase;
      mesh.userData = { ...def, index };

      this.layersGroup.add(mesh);
      this.layerMeshes.push(mesh);
      this.targetLayerPositions.push({
        base: def.yBase,
        exploded: def.yExploded
      });
    });

    this.scene.add(this.layersGroup);
  }

  setExplodedMode(exploded) {
    this.isExploded = exploded;
  }

  setAutoRotate(auto) {
    this.autoRotate = auto;
  }

  bindEvents() {
    const el = this.renderer.domElement;

    el.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isMouseDown) return;
      const deltaX = e.clientX - this.prevMouseX;
      const deltaY = e.clientY - this.prevMouseY;

      this.targetRotationY += deltaX * 0.008;
      this.targetRotationX += deltaY * 0.008;
      this.targetRotationX = Math.max(-0.5, Math.min(0.9, this.targetRotationX));

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    el.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isMouseDown = true;
        this.prevMouseX = e.touches[0].clientX;
        this.prevMouseY = e.touches[0].clientY;
      }
    });

    window.addEventListener('touchend', () => {
      this.isMouseDown = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isMouseDown || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.prevMouseX;
      const deltaY = e.touches[0].clientY - this.prevMouseY;

      this.targetRotationY += deltaX * 0.008;
      this.targetRotationX += deltaY * 0.008;

      this.prevMouseX = e.touches[0].clientX;
      this.prevMouseY = e.touches[0].clientY;
    });

    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.autoRotate && !this.isMouseDown) {
      this.targetRotationY += 0.0025;
    }

    if (this.layersGroup) {
      this.layersGroup.rotation.y += (this.targetRotationY - this.layersGroup.rotation.y) * 0.08;
      this.layersGroup.rotation.x += (this.targetRotationX - this.layersGroup.rotation.x) * 0.08;

      this.layerMeshes.forEach((mesh, idx) => {
        const targetY = this.isExploded 
          ? this.targetLayerPositions[idx].exploded 
          : this.targetLayerPositions[idx].base;
        mesh.position.y += (targetY - mesh.position.y) * 0.12;
      });
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  renderFallback() {
    this.container.innerHTML = `
      <div style="position:relative; width:100%; height:100%; display:flex; align-items:center; justify-content:center;">
        <img src="/images/crosssection-layers.jpg" style="width:100%; height:100%; object-fit:cover;" alt="3D Anatomical Layers">
      </div>
    `;
  }
}
