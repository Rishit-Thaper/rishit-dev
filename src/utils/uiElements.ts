import { IconType } from 'react-icons';
import { FaGitAlt, FaSass, FaNodeJs, FaReact, FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter, FaSquareGithub } from 'react-icons/fa6';
import { FiFigma } from 'react-icons/fi';
import { RiInstagramFill } from 'react-icons/ri';
import { SiExpress, SiMongodb, SiPostman, SiCplusplus, SiGmail } from 'react-icons/si';
import { TbBrandTypescript, TbSql } from 'react-icons/tb';

export const badges: { alt: string; imageUrl: string }[] = [
  {
    alt: 'C++',
    imageUrl: 'https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white',
  },
  {
    alt: 'JavaScript',
    imageUrl: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  },
  {
    alt: 'Node.js',
    imageUrl: 'https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white',
  },
  {
    alt: 'Express',
    imageUrl: 'https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white',
  },
  {
    alt: 'React',
    imageUrl: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black',
  },
  {
    alt: 'MongoDB',
    imageUrl: 'https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white',
  },
  {
    alt: 'Next.js',
    imageUrl: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white',
  },
  {
    alt: 'SASS',
    imageUrl: 'https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white',
  },
  {
    alt: 'Figma',
    imageUrl: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white',
  },
  {
    alt: 'Git',
    imageUrl: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  },
  {
    alt: 'MySQL',
    imageUrl: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
  },
  {
    alt: 'Postman',
    imageUrl: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white',
  },
  {
    alt: 'HTML5',
    imageUrl: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  },
  {
    alt: 'CSS3',
    imageUrl: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
  },
  {
    alt: 'NPM',
    imageUrl: 'https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white',
  },
  {
    alt: 'TypeScript',
    imageUrl: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
  },
  {
    alt: 'Java',
    imageUrl: 'https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white',
  },
];

export const icons: { name: string; icon: IconType }[] = [
  { name: 'figma', icon: FiFigma },
  { name: 'git', icon: FaGitAlt },
  { name: 'sass', icon: FaSass },
  { name: 'nodeJs', icon: FaNodeJs },
  { name: 'typescript', icon: TbBrandTypescript },
  { name: 'react', icon: FaReact },
  { name: 'express', icon: SiExpress },
  { name: 'mongodb', icon: SiMongodb },
  { name: 'sql', icon: TbSql },
  { name: 'postman', icon: SiPostman },
  { name: 'cplusplus', icon: SiCplusplus },
  { name: 'figma1', icon: FiFigma },
  { name: 'git1', icon: FaGitAlt },
  { name: 'sass1', icon: FaSass },
  { name: 'nodeJs1', icon: FaNodeJs },
  { name: 'typescript1', icon: TbBrandTypescript },
  { name: 'react1', icon: FaReact },
  { name: 'express1', icon: SiExpress },
  { name: 'mongodb1', icon: SiMongodb },
  { name: 'sql1', icon: TbSql },
  { name: 'postman1', icon: SiPostman },
  { name: 'cplusplus1', icon: SiCplusplus },
];

export const footerIcons: { links: string; icon: IconType }[] = [
  {
    links: 'https://www.linkedin.com/in/rishit-5463261a6/',
    icon: FaLinkedin,
  },
  {
    links: 'https://www.instagram.com/rishit_thaper/',
    icon: RiInstagramFill,
  },
  {
    links: 'mailto:thaperrishit@gmail.com',
    icon: SiGmail,
  },
  {
    links: 'https://github.com/Rishit-Thaper',
    icon: FaSquareGithub,
  },
  {
    links: 'https://x.com/rishit_9703',
    icon: FaSquareXTwitter,
  },
];

export const projects = [
  {
    title: "Dareventure",
    desc: "Created an engaging party game app using Next.js, featuring popular games like Truth or Dare, Never Have I Ever, and Would You Rather, with options for both adults and PG13.",
    techStack: ["Next.js", "MongoDB"],
    url: "https://dareventure.vercel.app/"
  },
  {
    title: "Flirtfolio",
    desc: "Developed a playful pickup line app with a Next.js frontend, allowing users to generate or contribute lines.",
    techStack: ["Next.js", "Appwrite"],
    url: "https://flirtfolio.vercel.app/" 
  },
  {
    title: "Linkify",
    desc: "A versatile web application facilitating efficient management and sharing of links.",
    techStack: ["Node.js", "Express", "MongoDB", "React.js", "TypeScript"],
    url: "https://linkify-kappa.vercel.app/home" 
  },
  {
    title: "BlogShots",
    desc: "Crafted a dynamic blogging platform with a concise 150-word content limit.",
    techStack: ["MongoDB", "ExpressJS", "ReactJS", "NodeJS"],
    url: ""
  }
];
