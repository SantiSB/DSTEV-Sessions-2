import { useEffect, useRef } from "react";
import * as THREE from "./threejs/three.module.js";
import { EffectComposer } from "./threejs/EffectComposer.js";
import { RenderPass } from "./threejs/RenderPass.js";
import { ShaderPass } from "./threejs/ShaderPass.js";
import { RGBShiftShader } from "./threejs/RGBShiftShader.js";
import { DotScreenShader } from "./threejs/DotScreenShader.js";

const Background = () => {
  const starBackgroundRef = useRef(null);
  let camera, scene, renderer, composer;
  let object;

  useEffect(() => {
    init();
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  const init = () => {
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      starBackgroundRef.current.offsetWidth,
      starBackgroundRef.current.offsetHeight
    );
    starBackgroundRef.current.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 1000);

    object = new THREE.Object3D();
    scene.add(object);

    const geometry = new THREE.SphereGeometry(1, 4, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    for (let i = 0; i < 100; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
        .normalize();
      mesh.position.multiplyScalar(Math.random() * 400);
      mesh.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2
      );
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
      object.add(mesh);
    }

    scene.add(new THREE.AmbientLight(0xcccccc));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 1);
    scene.add(light);

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const effect1 = new ShaderPass(DotScreenShader);
    effect1.uniforms["scale"].value = 4;
    composer.addPass(effect1);

    const effect2 = new ShaderPass(RGBShiftShader);
    effect2.uniforms["amount"].value = 0.0015;
    composer.addPass(effect2);

    window.addEventListener("resize", onWindowResize, false);
  };

  const onWindowResize = () => {
    camera.aspect =
      starBackgroundRef.current.offsetWidth /
      starBackgroundRef.current.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      starBackgroundRef.current.offsetWidth,
      starBackgroundRef.current.offsetHeight
    );
    composer.setSize(
      starBackgroundRef.current.offsetWidth,
      starBackgroundRef.current.offsetHeight
    );
  };

  const animate = () => {
    requestAnimationFrame(animate);

    object.rotation.x += 0.005;
    object.rotation.y += 0.01;

    composer.render();
  };

  return (
    <div
      id="star-background"
      className="fixed top-0 left-0 w-full h-screen z-[-1]"
      ref={starBackgroundRef}
    ></div>
  );
};

export default Background;
