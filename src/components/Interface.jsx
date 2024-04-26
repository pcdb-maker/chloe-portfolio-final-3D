import React from 'react'
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
import { currentProjectCopyAtom, projectsCopy } from "./ProjectsCopy";
import { SocialIcon } from 'react-social-icons'




const Section = (props) => {
  const { children } = props;

  return (
    <motion.section
      className={`
  h-screen w-screen p-8 max-w-screen-2xl mx-auto
  flex flex-col items-start justify-center
  `}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.6,
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = (props) => {
  const { setSection } = props;
  return (
    <div className="flex flex-col items-center w-screen">
      <AboutSection setSection={setSection} />
      <SkillsSection />
      <ProjectsSection />
      <ProjectsCopySection />
     
      
      <ContactSection />
    </div>
  );
};

const AboutSection = (props) => {
  const { setSection } = props;
  return (
    <Section>
      <h1 className="text-6xl font-extrabold leading-snug">
        Hi, I'm
        <br />
        <span className="bg-white px-1 italic">Chloe O!</span>
      </h1>
      <motion.p
        className="text-lg text-black font-bold mt-7"
        initial={{
          opacity: 0,
          y: 21,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
      >
        I develop interactive front-end web experiences
        <br />
        that unite practicality and intuitive design elements.
      </motion.p>
      <motion.button
        onClick={() => setSection(4)}
        className={`bg-indigo-600 text-white py-4 px-8 
      rounded-lg font-bold text-lg mt-16`}
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
          delay: 2,
        }}
      >
        Contact me
      </motion.button>
    </Section>
  );
};

const skills = [
  {
    title: "Threejs / React Three Fiber",
    level: 80,
  },
  {
    title: "React / React Native",
    level: 90,
  },
  {
    title: "Nodejs",
    level: 90,
  },
  {
    title: "Typescript",
    level: 60,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
  {
    title: "3D Modeling",
    level: 40,
  },
];


const SkillsSection = () => {
  return (
    <Section>
      <motion.div whileInView={"visible"}>
        <h2 className="text-5xl font-bold text-white">Skills</h2>
        <div className=" mt-8 space-y-4">
          {skills.map((skill, index) => (
            <div className="w-64" key={index}>
              <motion.h3
                className="text-xl font-bold text-gray-100"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    transition: {
                      duration: 1,
                      delay: 1 + index * 0.2,
                    },
                  },
                }}
              >
                {skill.title}
              </motion.h3>
              <div className="h-2 w-full bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-indigo-500 rounded-full "
                  style={{ width: `${skill.level}%` }}
                  initial={{
                    scaleX: 0,
                    originX: 0,
                  }}
                  variants={{
                    visible: {
                      scaleX: 1,
                      transition: {
                        duration: 1,
                        delay: 1 + index * 0.2,
                      },
                    },
                  }}
                />
              </div>
            </div>
          ))}
        </div>
       
      </motion.div>
    </Section>
  );
};

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };


  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProject}
        >
          ← Previous
        </button>
        <h2 className="text-5xl font-bold">Hosted Project Gallery </h2>
      

        
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProject}
        >
          Next →
        </button>
      </div>
     
    </Section>
  );
};

const ProjectsCopySection = () => {
  const [currentProjectCopy, setCurrentProjectCopy] = useAtom(currentProjectCopyAtom);

  const nextProjectCopy = () => {
    setCurrentProjectCopy((currentProjectCopy + 1) % projectsCopy.length);
  };

  const previousProjectCopy = () => {
    setCurrentProjectCopy((currentProjectCopy - 1 + projectsCopy.length) % projectsCopy.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-8 items-center justify-center">
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={previousProjectCopy}
        >
          ← Previous
        </button>



        <h2 className="text-5xl font-bold">Education History</h2>
        <button
          className="hover:text-indigo-600 transition-colors"
          onClick={nextProjectCopy}
        >
          Next →
        </button>
      </div>
    </Section>
  );
};


const ContactSection = () => {
  return (
    <Section>
<h1>Contact</h1>
// renders: vimeo icon
<SocialIcon target="_blank" url="www.behance.com"></SocialIcon>
// renders: meetup icon
<SocialIcon target="_blank" url="www.github.com"></SocialIcon>
// renders: meetup icon
<SocialIcon target="_blank" url="www.vimeo.com"></SocialIcon>


    </Section>
  );
};
