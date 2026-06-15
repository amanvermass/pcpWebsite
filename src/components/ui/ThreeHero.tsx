"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect WebGL support
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn("WebGL not supported, falling back to static CSS background");
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Create a series of nested architectural grids (representing blueprints/structure)
    const gridSize = 16;
    const gridDivisions = 16;
    
    // Bottom grid (Sand-Gold/Charcoal mix)
    const gridBottom = new THREE.GridHelper(gridSize, gridDivisions, 0xC58B45, 0x2C2C2C);
    gridBottom.position.y = -2;
    (gridBottom.material as THREE.Material).transparent = true;
    (gridBottom.material as THREE.Material).opacity = 0.35;
    mainGroup.add(gridBottom);

    // Middle floating grid
    const gridMiddle = new THREE.GridHelper(gridSize - 4, gridDivisions - 4, 0xD4A373, 0x1B1B1B);
    gridMiddle.position.y = 0;
    (gridMiddle.material as THREE.Material).transparent = true;
    (gridMiddle.material as THREE.Material).opacity = 0.2;
    mainGroup.add(gridMiddle);

    // Top vertical wireframe block structures (like abstract buildings/bricks)
    const wireframeGroup = new THREE.Group();
    mainGroup.add(wireframeGroup);

    const createWireframeBox = (w: number, h: number, d: number, px: number, py: number, pz: number, color: number) => {
      const geometry = new THREE.BoxGeometry(w, h, d);
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.45
      });
      const line = new THREE.LineSegments(edges, lineMaterial);
      line.position.set(px, py, pz);
      wireframeGroup.add(line);
      return line;
    };

    // Staggered structural blocks
    const box1 = createWireframeBox(3, 5, 3, -3, 0.5, -2, 0xD4A373);
    const box2 = createWireframeBox(2, 6, 2, 2.5, 1, 1, 0xC58B45);
    const box3 = createWireframeBox(4, 3, 4, 0, -0.5, 3, 0xD4A373);
    
    // Add glowing vertex points for the structural nodes
    const pointGeometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const addPointsFromMesh = (mesh: THREE.LineSegments) => {
      const posAttr = mesh.geometry.attributes.position;
      if (posAttr) {
        for (let i = 0; i < posAttr.count; i++) {
          const worldPos = new THREE.Vector3(
            posAttr.getX(i),
            posAttr.getY(i),
            posAttr.getZ(i)
          );
          worldPos.applyMatrix4(mesh.matrixWorld);
          positions.push(worldPos.x, worldPos.y, worldPos.z);
        }
      }
    };

    // Force update matrix for correct world coordinates
    box1.updateMatrixWorld();
    box2.updateMatrixWorld();
    box3.updateMatrixWorld();
    addPointsFromMesh(box1);
    addPointsFromMesh(box2);
    addPointsFromMesh(box3);

    pointGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    
    // Luxury Gold Particle Nodes
    const pointMaterial = new THREE.PointsMaterial({
      color: 0xC58B45,
      size: 0.12,
      transparent: true,
      opacity: 0.8
    });
    const points = new THREE.Points(pointGeometry, pointMaterial);
    wireframeGroup.add(points);

    // Subtle Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Directional Light for shine on the wireframe nodes (if any material responds)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Mouse Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize between -1 and 1
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle auto rotation of the main group
      mainGroup.rotation.y = elapsedTime * 0.05;

      // Mouse Parallax effect
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.3;
      
      // Interpolate for smooth lag
      camera.position.x += (targetX * 10 - camera.position.x) * 0.05;
      camera.position.y += (targetY * 5 + 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0.5, 0);

      // Pulse the opacity of wireframes slightly
      const pulse = 0.45 + Math.sin(elapsedTime * 2.0) * 0.15;
      box1.material.opacity = pulse;
      box2.material.opacity = pulse * 0.8;
      box3.material.opacity = pulse * 0.9;
      pointMaterial.opacity = 0.6 + Math.sin(elapsedTime * 2.0) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      gridBottom.dispose();
      gridMiddle.dispose();
      box1.geometry.dispose();
      (box1.material as THREE.Material).dispose();
      box2.geometry.dispose();
      (box2.material as THREE.Material).dispose();
      box3.geometry.dispose();
      (box3.material as THREE.Material).dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default ThreeHero;
