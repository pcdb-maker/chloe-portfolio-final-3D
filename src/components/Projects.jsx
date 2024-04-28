import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "",
    url: "https://github.com/pcdb-maker",
    image: "projects/avatar1.jpg",
    description: "",
  },
  {
    title: "Full CRM App",
    url: "https://crm-react-app-refine.vercel.app/",
    image: "projects/avatar2.jpg",
    description: "Use the automatically pre-loaded user email password (demodemo) to login! Please don't refresh on the auth page! :) ",
  },

  {
    title: "Car Rental API",
    url: "https://new-car-api.vercel.app/",
    image: "projects/avatar3.jpg",
    description: "React.js webpage using RapidAPI to mimic the functionality of a car rental website.",
  },

  {
    title: "Magical Portfolio",
    url: "https://magical-portfolio-main.vercel.app/",
    image: "projects/avatar4.jpg",
    description: "3D Interactive portfolio example using React.js and Three.js.",
  },

{
    title: "E-Commerce site",
    url: "https://react-athena-jewelry.netlify.app/",
    image: "projects/avatar5.jpg",
    description: "Frontend version of an e-commerce website using React.js and Vite.js.",
  },


  {
    title: "Banking Website",
    url: "https://react-banking-app-fe.netlify.app/",
    image: "projects/avatar6.jpg",
    description: "Fully interactive webspage with one-page navigational header made with React.js",
  },
 
];  
const Project = (props) => {
  const { project, highlighted } = props;

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
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.8, 2.5]} />
        <meshBasicMaterial color="black" transparent opacity={5} />
      </mesh>
      <Image
        scale={[2.6, 1.5, 2]}
        url={project.image}
        toneMapped={false}
        position-y={0.4}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length * 0)); // Mathmatical logic of which item should display in the carousel first

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * -2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 4,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
