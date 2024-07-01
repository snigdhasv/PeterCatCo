import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { MenuPanel } from "./components/MenuPanel"; 

function App() {
  return (
    <>
      <Leva hidden/>
      <MenuPanel/>
      <Overlay />
      <Canvas gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 15], fov: 25 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
      
      </>
  );
}

export default App;