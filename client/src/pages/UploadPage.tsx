import React, { useState, useEffect } from "react";
import { Box, CircularProgress, IconButton, Divider } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import { analyzeImage, getProjectDetails } from "../services/api";
import FileUpload from "./components/FileUpload";
import ComponentList from "./components/ComponentList";
import ProjectIdeasList from "./components/ProjectIdeasList";
import ProjectTutorial from "./components/ProjectTutorial";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import robot from "../assets/Bot.webp";
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
            <>
              <motion.div
                style={{ width: "1px", backgroundColor: "#e0e0e0" }}
                variants={fadeOutAndSlide}
                initial="initial"
                exit="exit"
              >
                <Divider orientation="vertical" flexItem />
              </motion.div>
              <motion.img
                src={robot}
                alt="robot"
                style={{
                  maxWidth: "400px",
                  height: "460px",
                  borderRadius: "50px",
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={imageControls}
                exit={{ opacity: 0, scale: 0.9 }}
              />
            </>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
};
export default UploadPage;