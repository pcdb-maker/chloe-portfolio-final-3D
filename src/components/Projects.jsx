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
    description: "The random pre-loaded user email password (demodemo) will log you in. Some browsers will auto-login for you. Please don't refesh the auth. ",
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
    description: "Front-end version of an e-commerce website with multi-modal pop-outs using React.js and Vite.js.",
  },


  {
    title: "Banking Website",
    url: "https://react-banking-app-fe.netlify.app/",
    image: "projects/avatar6.jpg",
    description: "Fully interactive web-page with one-page navigational header made with React.js.",
  },
  
  {
    title: "Travel Website",
    url: "https://react-travel-fe.netlify.app/",
    image: "projects/avatar7.jpg",
    description: "One page website with splash page. Made with React.js.",
  },

  {
    title: "Space Website",
    url: "https://react-space-fe.netlify.app/",
    image: "projects/avatar8.jpg",
    description: "One page website with splash page and AOS animation. Made with React.js.",
  },

  {
    title: "Metaverse Website",
    url: "https://react-metaverse-fe.netlify.app/",
    image: "projects/avatar9.jpg",
    description: "One page website with splash page, dynamic loading and AOS animation. Made with React.js.",
  },

  {
    title: "Example Portfolio",
    url: "https://react-portfolio-fe.netlify.app/",
    image: "projects/avatar10.jpg",
    description: "Fully interactive web-page with one-page navigational header made with React.js.",
  },

  {
    title: "Restaurant",
    url: "https://burger-restaurant-react-fe.netlify.app/",
    image: "projects/avatar11.jpg",
    description: "One page website with splash page. Made with React.js.",
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
        fontSize={0.13}
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
