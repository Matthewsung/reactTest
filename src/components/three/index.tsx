import { useEffect } from "react";
import {Canvas, LoaderProto, useLoader} from '@react-three/fiber'
import {OrbitControls, Plane, PerspectiveCamera,
  // useTexture
   } from "@react-three/drei";

// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import URDFLoader from "urdf-loader";
const robotURL = '/rb5_moveit.xacro'
// const robotObjUrl = '/obj_file/_4_pipe_1.obj'
// const objURL = '/airplane.obj'
// const objColor = '/Sting_Base_Color.png'
let robotImg: any

const RobotModel = (props:any) => {
  const URDFLOADER: LoaderProto<unknown> = URDFLoader
  robotImg = useLoader(URDFLOADER , robotURL)

  return (
    <mesh>
      <primitive object={robotImg} rotation={[-Math.PI / 2, 0, Math.PI / 3]} map={props.map} />
    </mesh>
  )
}

// const TestModel = () => {
//   // robot의 obj 파일은 색만 적용됨
//   let objImg = useLoader(OBJLoader,robotObjUrl )
//   const color = useTexture(objColor)
//
//   objImg.traverse(( c:any ) => {
//     if(c.isMesh) {
//       c.material.color = {r: 0, g: 0.4, b:0, isColor: true}
//       c.material.map = color
//     }
//   })
//
//   return <mesh >
//     <primitive object={objImg} position={[0,0,-0.3]} scale={[0.001,0.001,0.001]} rotation={[-Math.PI/0.4, 0,0]}  />
//     {/*<primitive object={objImg} position={[0, 1.2,-0.5]} scale={[0.0005,0.0005,0.0005]} rotation={[-Math.PI/0.4, -Math.PI/10, Math.PI/10]}  />*/}
//   </mesh>
// }
const ThreeComponent = () => {
  let x = 0
  let y = 0
  let z = 0
  // const joints = ['Body_Base','Body_Module_1','Body_Module_2','Body_Module_3','Body_Module_4','Body_Module_5','Body_Module_6',
  //   'Body_Module_Dummy','Body_Pipe_1','Body_Pipe_2','Body_Tool_Flange','Pipe2_to_Module4','Tool_Center_Point','Tool_Flange',
  //   'base_joint','elbow','module2_to_pipe1','moduled_to_pipe2','pipe1_to_module3','shoulder','wrist1','wrist2']
  useEffect(()=> {
    setInterval(() => {
      x += 0.01
      y += 0.01
      z += 0.01
      robotImg?.setJointValues(
        {
          ['base_joint'] : [x,y,z],
          ['elbow'] : [-x,y,z],
          ['shoulder'] : [x,y,z],
          ['wrist1'] : [x,y,z],
          ['wrist2'] : [x,-y,z]
        }
      )
    },20)
  }, [])
  return (
    <Canvas style={{width: '100%', height: '700px', border:'1px solid '}} >

      <OrbitControls  />

      <ambientLight intensity={0.4}  />
      <directionalLight position={[2,3,-1]} intensity={0.8}/>

      <PerspectiveCamera makeDefault manual position={[0,2,-2]} fov={75} >
        {texture => (
          <group>
            <mesh >
              <Plane scale={[5,5,5]} rotation={[-Math.PI / 2,0,0]}>
                <meshPhongMaterial color="#ffff00" />
              </Plane>
              <Plane scale={[5,5,5]} position={[0,0,2.5]} rotation={[0,0,0]}>
                <meshPhongMaterial color="#ffff00" />
              </Plane>
            </mesh>
            <RobotModel map={texture}/>
          </group>
        )}
        {/*<TestModel />*/}
      </PerspectiveCamera>
    </Canvas>
  )
}

export default ThreeComponent