import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaGitAlt, FaNodeJs, FaReact, FaSass } from "react-icons/fa";
import { FiFigma } from "react-icons/fi";
import { SiCplusplus, SiExpress, SiMongodb, SiPostman } from "react-icons/si";
import { TbBrandTypescript, TbSql } from "react-icons/tb";
import { Icon } from "./Icon";

const icons: { name: string; icon: IconType }[] = [
  { name: "figma", icon: FiFigma },
  { name: "git", icon: FaGitAlt },
  { name: "sass", icon: FaSass },
  { name: "nodeJs", icon: FaNodeJs },
  { name: "typescript", icon: TbBrandTypescript },
  { name: "react", icon: FaReact },
  { name: "express", icon: SiExpress },
  { name: "mongodb", icon: SiMongodb },
  { name: "sql", icon: TbSql },
  { name: "postman", icon: SiPostman },
  { name: "cplusplus", icon: SiCplusplus },
  { name: "figma1", icon: FiFigma },
  { name: "git1", icon: FaGitAlt },
  { name: "sass1", icon: FaSass },
  { name: "nodeJs1", icon: FaNodeJs },
  { name: "typescript1", icon: TbBrandTypescript },
  { name: "react1", icon: FaReact },
  { name: "express1", icon: SiExpress },
  { name: "mongodb1", icon: SiMongodb },
  { name: "sql1", icon: TbSql },
  { name: "postman1", icon: SiPostman },
  { name: "cplusplus1", icon: SiCplusplus },
];

const animationDirection = [{ x: ["0%", "-100%"] }, { x: ["-100%", "0%"] }];

const AnimatedCarousel = () => {
  return animationDirection.map((direction, index) => (
    <Box overflow="hidden" width="100%" key={index} mt={5}>
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap" }}
        animate={direction}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      >
        {icons.map(({ name, icon }) => (
          <Flex key={name} direction="column" align="center" mr={10}>
            <Icon icon={icon} />
          </Flex>
        ))}
        {icons.map(({ name, icon }) => (
          <Flex key={name} direction="column" align="center" mr={10}>
            <Icon icon={icon} />
          </Flex>
        ))}
      </motion.div>
    </Box>
  ));
};

export default AnimatedCarousel;
