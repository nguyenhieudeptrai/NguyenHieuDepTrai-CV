import { CameraControls, OrbitControls, Preload, Sky, Stars, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import * as Three from 'three';

const d = (deg) => Math.PI * deg / 180;

// const render = new Three.WebGLRenderer();
// render.setSize(window.innerWidth, window.innerHeight);
// const CANVAS = render.domElement;
const Demo3D = () => {
    return (
        <div className='w-screen h-screen bg-black'>

            <Canvas
                shadows
                camera={{ position: [100, 50, 10], fov: 20, }}
            // gl={{ preserveDrawingBuffer: true }}
            >
                <React.Suspense fallback={null}>
                    <CameraControls />
                    <OrbitControls
                        maxPolarAngle={d(80)} minPolarAngle={d(20)}
                        maxDistance={13} minDistance={5}
                        maxAzimuthAngle={d(90)} minAzimuthAngle={d(-180)}
                    />
                    <Sky />
                    <ambientLight />
                    <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
                    <Girl />
                    <Plane />
                </React.Suspense>
                {/* <Preload all /> */}
            </Canvas>
        </div>
    )
}
const Plane = () => {
    return (
        <mesh position={[0, 0, 0]} rotation={[-d(90), 0, 0]} receiveShadow>
            <planeGeometry args={[100, 100, 1, 1]} />
            <meshBasicMaterial color="#b5c6d7" />
            {/* <shadowMaterial transparent opacity={0.2} /> */}


        </mesh>
    )
}
const Girl = () => {
    const girl = useGLTF(process.env.PUBLIC_URL + '/model/scene.gltf');
    const [index, setIndex] = useState("walking");

    const { ref, actions, names } = useAnimations(girl.animations);

    useEffect(() => {
        actions[index].reset().fadeIn(0.5).play()
        return () => actions[index].fadeOut(0.5);
    }, [index, actions, names]);

    return (
        <group ref={ref}>
            <mesh position={[0, 0, 0]} rotation={[0, d(270), 0]} >
                <primitive object={girl.scene}
                    scale={0.1}
                    position={[0, 0, 0]}
                />
            </mesh>
        </group>
    )

}

export default Demo3D;