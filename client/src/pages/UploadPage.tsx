import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Divider,
  Typography,
  Grid,
  styled,
  Link,
} from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import { analyzeImage, getProjectDetails } from "../services/api";
import FileUpload from "./components/FileUpload";
import ComponentList from "./components/ComponentList";
import ProjectIdeasList from "./components/ProjectIdeasList";
import ProjectTutorial from "./components/ProjectTutorial";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import robot from "../assets/Bot.webp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MenuIcon from "@mui/icons-material/Menu";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { theme } from "../theme";
const ContributorLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
const contributors = [
  {
    name: "Ahmed Mansy",
    linkedin: "https://www.linkedin.com/in/ahmed-mansy/",
    twitter: "https://x.com/Ahmedz14z",
  },
  {
    name: "Mohamed Magdy",
    linkedin: "https://www.linkedin.com/in/mohamedmagdy097",
    twitter: "#",
  },
  { name: "Kang Hojin", linkedin: "#", twitter: "#" },
  { name: "Vicky", linkedin: "#", twitter: "#" },
  { name: "Ali Khan", linkedin: "#", twitter: "#" },
  { name: "Imran", linkedin: "#", twitter: "#" },
];
const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [components, setComponents] = useState<string[]>([]);
  const [projectIdeas, setProjectIdeas] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [tutorial, setTutorial] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ideasLoading, setIdeasLoading] = useState<boolean>(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [showImage, setShowImage] = useState<boolean>(true);
  const imageControls = useAnimation();
  useEffect(() => {
    if (components.length > 0) {
      const animateImage = async () => {
        await imageControls.start({ opacity: 0, scale: 0.9 });
        setShowImage(false);
      };
      animateImage();
    }
  }, [components, imageControls]);
  const handleFileChange = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyzeImage = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (file) {
      setLoading(true);
      const data = await analyzeImage(file);
      console.log("Project Ideas Response: ", data);
      const componentsData = data.components || [];
      const projectIdeasData = data.project_ideas || [];
      setComponents(componentsData);
      setProjectIdeas(projectIdeasData);
      setLoading(false);
    }
  };
  const handleGetProjectDetails = async () => {
    if (file && selectedProject !== null) {
      setLoading(true);
      setTutorial("");
      const controller = new AbortController();
      setAbortController(controller);
      try {
        await getProjectDetails(
          file,
          selectedProject,
          (data) => {
            if (data.project_overview) {
              setTutorial((prev) => prev + data.project_overview);
            } else if (data.section && data.content) {
              setTutorial((prev) => prev + data.content);
            }
          },
          controller.signal
        );
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("Streaming aborted");
        } else {
          console.error("Error during streaming:", error);
        }
      }
      setLoading(false);
    }
  };
  const handleRefreshIdeas = async () => {
    if (file) {
      setIdeasLoading(true);
      const data = await analyzeImage(file);
      console.log("Refreshed Project Ideas: ", data);
      const projectIdeasData = data.project_ideas || [];
      setProjectIdeas(projectIdeasData);
      setIdeasLoading(false);
    }
  };
  const handleStopStreaming = () => {
    if (abortController) {
      abortController.abort();
    }
  };
  const fadeOutAndSlide = {
    initial: { opacity: 1, x: 0, scale: 1 },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
  const slideInFromLeft = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  const slideInFromRight = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ display: "flex", gap: 4 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={slideInFromLeft}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <FileUpload
              onFileChange={handleFileChange}
              onAnalyzeImage={handleAnalyzeImage}
              file={file}
              loading={loading}
            />
            <AnimatePresence>
              {components.length > 0 && (
                <motion.div
                  key="componentList"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideInFromRight}
                >
                  <ComponentList components={components} />
                </motion.div>
              )}
              {projectIdeas.length > 0 && (
                <motion.div
                  key="projectIdeasList"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideInFromRight}
                >
                  <ProjectIdeasList
                    projectIdeas={projectIdeas}
                    selectedProject={selectedProject}
                    onSelectProject={setSelectedProject}
                    onGetProjectDetails={handleGetProjectDetails}
                    onRefreshIdeas={handleRefreshIdeas}
                    loading={ideasLoading}
                  />
                </motion.div>
              )}
              {tutorial && (
                <motion.div
                  key="projectTutorial"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideInFromRight}
                >
                  <ProjectTutorial tutorial={tutorial} />
                </motion.div>
              )}
            </AnimatePresence>
            {loading && (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress sx={{ color: "#00bfa5" }} />
              </Box>
            )}
            {loading && (
              <Box mt={2} display="flex" justifyContent="center">
                <IconButton
                  color="error"
                  onClick={handleStopStreaming}
                  sx={{
                    border: "1px solid",
                    borderRadius: "8px",
                    color: "#00bfa5",
                    borderColor: "#00bfa5",
                  }}
                >
                  <StopIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </motion.div>
        <AnimatePresence>
          {showImage && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.div
                style={{
                  position: "relative",
                  width: "400px",
                  height: "225px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={imageControls}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {/* IFRAME HERE!! */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/HfTonOn_Yf8"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>

              <Box sx={{ mt: 4, width: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" align="left" gutterBottom>
                      Contributors
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                      }}
                    >
                      {contributors.map((contributor, index) => (
                        <Box
                          key={index}
                          sx={{ mb: 1, display: "flex", alignItems: "center" }}
                        >
                          <Typography variant="body1">
                            {contributor.name}
                          </Typography>
                          <ContributorLink
                            href={contributor.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkedInIcon fontSize="small" />
                          </ContributorLink>
                          <ContributorLink
                            href={contributor.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <TwitterIcon fontSize="small" />
                          </ContributorLink>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" align="center" gutterBottom>
                      GitHub Repository
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Link
                        href="https://github.com/MohamedMagdy097/Edison"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <GitHubIcon sx={{ mr: 1 }} />
                        View on GitHub
                      </Link>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};
export default UploadPage;
