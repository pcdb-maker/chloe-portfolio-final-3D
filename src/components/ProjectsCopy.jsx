import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projectsCopy = [
  {
    title: "Wawatmos",
    url: "https://r3f-wawatmos-final.vercel.app/",
    image: "projectsCopy/wawatmos.jpg",
    description: "Recreating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "Portfolio Baking",
    url: "https://www.youtube.com/watch?v=YkHqpqJgLKw",
    image: "projectsCopy/baking.jpg",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  {
    title: "3D Avatar",
    url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
    image: "projectsCopy/avatar.jpg",
    description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
  },
  {
    title: "Kanagame",
    url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
    image: "projectsCopy/kanagame.jpg",
    description: "Use React Three Fiber to create a 3D game",
  },
  {
    title: "Loader",
    url: "https://www.youtube.com/watch?v=L12wIvuZTOY",
    image: "projectsCopy/loader.jpg",
    description: "Create a loading screen for your r3f projects",
  },
];

const ProjectCopy = (props) => {
  const { projectCopy, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(1.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        position-y={-8.3}
        onClick={() => window.open(projectCopy.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={projectCopy.image}
        toneMapped={false}
        position-y={-8}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.1}
        position={[-0.9, -8.5, 1]}
      >
        {projectCopy.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-0.9, -8.7, 1]}
      >
        {projectCopy.description}
      </Text>
    </group>
  );
};

export const currentProjectCopyAtom = atom(Math.floor(projectsCopy.length / 3));

export const ProjectsCopy = () => {
  const { viewport } = useThree();
  const [currentProjectCopy] = useAtom(currentProjectCopyAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projectsCopy.map((projectCopy, index) => (
        <motion.group
          key={"projectCopy_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProjectCopy) * 2.5,
            y: currentProjectCopy === index ? 0 : -0.1,
            z: currentProjectCopy === index ? -2 : -3,
            rotateX: currentProjectCopy === index ? 0 : -Math.PI / 3,
            rotateZ: currentProjectCopy === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <ProjectCopy projectCopy={projectCopy} highlighted={index === currentProjectCopy} />
        </motion.group>
      ))}
    </group>
  );
};
