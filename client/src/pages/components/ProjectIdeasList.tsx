import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import remarkGfm from "remark-gfm";
import RefreshIcon from "@mui/icons-material/Refresh";

interface ProjectIdeasListProps {
  projectIdeas: string[];
  selectedProject: string | null;
  onSelectProject: (idea: string) => void;
  onGetProjectDetails: () => void;
  onRefreshIdeas: () => void;
  loading: boolean; // Loading state specific to this component
}

const ProjectIdeasList: React.FC<ProjectIdeasListProps> = ({
  projectIdeas,
  selectedProject,
  onSelectProject,
  onGetProjectDetails,
  onRefreshIdeas,
  loading, // Receive the loading state specific to this component
}) => {
  return (
    <Box
      className="p-6"
      sx={{ backgroundColor: "#1c1c1c", borderRadius: "16px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="mb-4"
          sx={{ backgroundColor: "#2a2a2a", borderRadius: "12px" }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h5"
                className="text-center text-2xl font-bold"
                sx={{ color: "#ffffff" }}
              >
                Project Ideas
              </Typography>
              <IconButton
                onClick={onRefreshIdeas}
                color="primary"
                className="transition duration-300 ease-in-out transform hover:scale-110"
                disabled={loading} // Disable the button during loading
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "#00bfa5" }} /> // Show loading spinner during refresh
                ) : (
                  <RefreshIcon sx={{ color: "#00bfa5" }} />
                )}
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
      <List className="space-y-2 w-full">
        {projectIdeas.map((idea, index) => (
          <React.Fragment  key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectProject(idea)}
              className={`hover:bg-[#305853] cursor-pointer rounded-lg shadow-md transition duration-300 ease-in-out transform w-full ${
                selectedProject === idea ? "bg-[#003f38]" : "bg-transparent"
              }`}
            >
              <ListItem className="w-full">
                <ListItemText
                  className="w-full"
                  primary={
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      className="prose max-w-none prose-invert w-full"
                    >
                      {idea}
                    </ReactMarkdown>
                  }
                  primaryTypographyProps={{ className: "text-gray-300 w-full" }}
                />
              </ListItem>
              {index < projectIdeas.length - 1 && (
                <Divider sx={{ borderColor: "#555" }} />
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </List>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={onGetProjectDetails}
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4 py-2 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            sx={{
              backgroundColor: "#00bfa5",
              "&:hover": {
                backgroundColor: "#00897b",
              },
            }}
          >
            Get Project Details
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default ProjectIdeasList;
