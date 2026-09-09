# Edison: The Creative Electronics Companion

![Banner](./docs/banner.png)
[Watch the Introduction Video](https://youtu.be/HfTonOn_Yf8)
## Project Overview

Welcome to Edison: The Creative Electronics Companion! This project is designed to assist users in creating exciting projects with various electronic parts. By utilizing advanced Language Models (LLMs) and the Gemini API, our system identifies electronic components from images and provides users with detailed, step-by-step project tutorials. Additionally, LlamaIndex is employed for effective data management and retrieval, ensuring an interactive and seamless user experience.

## Core Features

### Image Analysis

- **Capture an image of electronic parts**: Simply upload a photo of your electronic components (e.g., Arduino, sensors).
- **Identify and list parts**: Our LLM processes the image to recognize and list the components.

### Project Suggestion

- **Receive project ideas**: Based on the identified parts, the system suggests 3-4 project ideas.

### Interactive Tutorial

- **Step-by-step guidance**: Once a project is selected, the system provides a detailed tutorial to guide users through the creation process.
- **User-friendly instructions**: The instructions are tailored to be easily understood by the average user.
- **Visual aids**: The tutorial includes images to enhance comprehension and facilitate the building process.

## Technology Stack

### LlamaIndex

- **Data Management and Retrieval**: LlamaIndex allows the system to effectively manage and retrieve data, connecting various data sources (like documents and databases) to the LLMs. This integration ensures that the tutorials and project ideas are based on well-structured and easily accessible data.

### LLM (Language Model)

- **Component identification and project generation**: Utilizes advanced language models to identify parts and generate project steps.

### Gemini API

- **Integration at various stages**: Enhances image recognition, project suggestions, and instruction generation.

### Image Processing Tools

- **Electronic parts analysis**: Employs image processing techniques to accurately recognize electronic components from images.

## Workflow

1. **Upload an image**: The user uploads a photo of their electronic parts.
2. **Identify components**: The LLM identifies and lists the parts present in the image.
3. **Project suggestions**: The system presents 3-4 project ideas based on the identified parts.
4. **Project selection**: The user selects a project idea.
5. **Detailed tutorial**: The LLM provides a comprehensive, step-by-step tutorial for the selected project, including images to aid understanding.
6. **Continuous guidance**: The system guides the user through each step until the project is completed.

## Integration Points for Gemini API

- **Image recognition**: Utilizes the API for accurate identification of electronic parts.
- **Project idea enhancement**: Improves the quality and relevance of suggested projects.
- **Instruction generation**: Refines and enhances the step-by-step tutorials.
- **Additional resources**: Provides troubleshooting tips and additional resources as needed.

## Expected Output

- **User-friendly interface**: An intuitive platform for uploading images of electronic parts.
- **Intelligent system**: Automatically identifies parts and suggests viable projects.
- **Comprehensive tutorials**: Detailed, step-by-step project guides with images to facilitate understanding and execution.

## Getting Started

### Prerequisites

- Node.js
- Python
- FastAPI
- Tailwind CSS

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MohamedMagdy097/Edison.git
   cd Edison
   ```

2. **Install dependencies**:

   **For the backend**:

   ```bash
   cd server
   poetry install
   ```

   **For the frontend**:

   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in both the server and client directories and add the necessary environment variables.

4. **Run the development server**:

   **For the backend**:

   ```bash
   poetry run uvicorn app.main:app --reload
   ```

   **For the frontend**:

   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on the code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
