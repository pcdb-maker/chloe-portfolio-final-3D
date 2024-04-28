

import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projectsCopy = [
  {
    title: "",
    url: "",
    image: "projectsCopy/education2.jpg",
    description: "",
  },
  {
    title: "",
    url: "",
    image: "projectsCopy/education3.jpg",
    description: "",
  },
  {
    title: "",
    url: "",
    image: "projectsCopy/education4.jpg",
    description: "",
  },
  {
    title: "",
    url: "",
    image: "projectsCopy/education5.jpg",
    description: "",
  },
  {
    title: "",
    url: "",
    image: "projectsCopy/education1.jpg",
    description: "",
  },
  
];

const ProjectCopy = (props) => {
  const { projectCopy, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(1.7);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 1.7 : 1.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
         position-z={-0.001}
        position-y={-8.25}
        onClick={() => window.open(projectCopy.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.8, 2.5]} />
        <meshBasicMaterial color="black" transparent opacity={5} />
      </mesh>
      <Image
        scale={[2.6, 1.5, 2]}
        url={projectCopy.image}
        toneMapped={false}
        position-y={-7.95}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -8.9, 0]}
      >
        {projectCopy.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -9,1]}
      >
        {projectCopy.description}
      </Text>
    </group>
  );
};

export const currentProjectCopyAtom = atom(Math.floor(projectsCopy.length * 0)); // Mathmatical logic of which item should display in the carousel first
export const ProjectsCopy = () => {
  const { viewport } = useThree();
  const [currentProjectCopy] = useAtom(currentProjectCopyAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
    {projectsCopy.map((projectCopy, index) => (
      <motion.group
        key={"projectCopy_" + index}
        position={[index * -2.5, 0, -2]}
        animate={{
          x: 0 + (index - currentProjectCopy) * 4,
          y: currentProjectCopy === index ? 1: -0.1,
          z: currentProjectCopy === index ? 0 : -5,
       
        }}
      >
        <ProjectCopy projectCopy={projectCopy} highlighted={index === currentProjectCopy} />
      </motion.group>
    ))}
  </group>
  );
};
