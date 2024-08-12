import React from 'react';
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Typography,
	Box,
	IconButton,
	Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import UploadPage from './pages/UploadPage';
import { motion } from 'framer-motion';
import logo from './assets/logoz.png';
import { Background } from './pages/components/Background';
import { BoxesCore } from './ui/background-boxes';
import { BackgroundBoxes } from './pages/components/Background2';
import { Background3 } from './pages/components/Background3';
import { TextGenerateEffect } from './ui/text-generate-effect';

const theme = createTheme({
	palette: {
		mode: 'dark', // Set the theme to dark mode
		primary: {
			main: '#bb86fc',
		},
		background: {
			default: '#0d0d0d', // Adjusted to a more consistent black
			paper: '#1c1c1c', // Slightly lighter black for components
		},
		text: {
			primary: '#ffffff',
			secondary: '#b0b0b0',
		},
	},
	typography: {
		fontFamily: [
			'"Bricolage Grotesque"',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		h1: {
			fontSize: '3rem',
			fontWeight: 800,
			color: '#ffffff',
			letterSpacing: '0.05rem',
			marginBottom: '20px',
		},
		h6: {
			fontSize: '1.2rem',
			fontWeight: 500,
			color: '#b0b0b0',
		},
	},
	// components: {
	// 	MuiAppBar: {
	// 		styleOverrides: {
	// 			root: {
	// 				backgroundColor: '#1c1c1c',
	// 				boxShadow: 'none',
	// 				borderBottom: '1px solid #333',
	// 			},
	// 		},
	// 	},
	// },
});

const CustomContainer = styled(Box)({
	padding: '40px',
	backgroundColor: '#1c1c1caa', // Consistent with the app's overall theme
	borderRadius: '16px',
	boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
	maxWidth: '900px',
	width: '100%',
	margin: 'auto',
	backdropFilter: 'blur(10px)',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

const App: React.FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{/* <Background /> */}

			<AppBar position='sticky'>
				<Toolbar className=' bg-black'>
					{/* <IconButton edge="start" color="inherit" aria-label="menu">
            <svg
              width="30"
              height="30"
              viewBox="0 0 107 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-3"
            >
              <path
                d="M53.3542 37.1159C52.7389 37.1159 52.1489 36.8715 51.7139 36.4365C51.2788 36.0014 51.0344 35.4114 51.0344 34.7962V9.27897C51.0344 8.66374 51.2788 8.0737 51.7139 7.63867C52.1489 7.20363 52.7389 6.95923 53.3542 6.95923C53.9694 6.95923 54.5594 7.20363 54.9945 7.63867C55.4295 8.0737 55.6739 8.66374 55.6739 9.27897V34.7962C55.6739 35.4114 55.4295 36.0014 54.9945 36.4365C54.5594 36.8715 53.9694 37.1159 53.3542 37.1159Z"
                fill="#AECEE8"
              />
              <path
                d="M99.7491 48.7146H6.95924C3.11576 48.7146 0 51.8304 0 55.6739V71.9121C0 75.7556 3.11576 78.8713 6.95924 78.8713H99.7491C103.593 78.8713 106.708 75.7556 106.708 71.9121V55.6739C106.708 51.8304 103.593 48.7146 99.7491 48.7146Z"
                fill="#AECEE8"
              />
              <path
                d="M102.069 71.9121H4.63949C2.84865 71.9121 1.2341 71.2162 0 70.105V71.9121C0 73.7578 0.733203 75.5279 2.03831 76.833C3.34342 78.1382 5.11353 78.8714 6.95924 78.8714H99.7491C101.595 78.8714 103.365 78.1382 104.67 76.833C105.975 75.5279 106.708 73.7578 106.708 71.9121V70.105C105.44 71.2631 103.786 71.9074 102.069 71.9121Z"
                fill="#7EAFD0"
              />
              <path
                d="M81.1911 27.8369H25.5172C17.8303 27.8369 11.5988 34.0685 11.5988 41.7554V85.8306C11.5988 93.5175 17.8303 99.7491 25.5172 99.7491H81.1911C88.8781 99.7491 95.1096 93.5175 95.1096 85.8306V41.7554C95.1096 34.0685 88.8781 27.8369 81.1911 27.8369Z"
                fill="#EFF3F9"
              />
              <path
                d="M92.7898 92.7898H27.837C25.376 92.7898 23.0159 91.8122 21.2757 90.0721C19.5356 88.3319 18.558 85.9718 18.558 83.5108V32.4764C18.558 31.4604 18.674 30.4722 18.8804 29.5188C16.6769 30.7133 14.8371 32.4809 13.5553 34.6348C12.2736 36.7888 11.5976 39.249 11.5988 41.7554V85.8306C11.5988 89.522 13.0652 93.0622 15.6754 95.6724C18.2856 98.2827 21.8258 99.7491 25.5172 99.7491H81.1911C83.6372 99.7485 86.0399 99.1026 88.1566 97.8767C90.2733 96.6507 92.0291 94.8881 93.2468 92.7666C93.0937 92.7713 92.9453 92.7898 92.7898 92.7898Z"
                fill="#CFE0F3"
              />
              <path
                d="M69.5922 62.6331C74.7169 62.6331 78.8712 58.4788 78.8712 53.3541C78.8712 48.2295 74.7169 44.0751 69.5922 44.0751C64.4676 44.0751 60.3132 48.2295 60.3132 53.3541C60.3132 58.4788 64.4676 62.6331 69.5922 62.6331Z"
                fill="#1761B2"
              />
              <path
                d="M69.5924 57.9936C72.1547 57.9936 74.2319 55.9164 74.2319 53.3541C74.2319 50.7918 72.1547 48.7146 69.5924 48.7146C67.0301 48.7146 64.9529 50.7918 64.9529 53.3541C64.9529 55.9164 67.0301 57.9936 69.5924 57.9936Z"
                fill="#0D3B8D"
              />
              <path
                d="M71.9122 53.3541C73.1933 53.3541 74.2319 52.3155 74.2319 51.0344C74.2319 49.7532 73.1933 48.7146 71.9122 48.7146C70.631 48.7146 69.5924 49.7532 69.5924 51.0344C69.5924 52.3155 70.631 53.3541 71.9122 53.3541Z"
                fill="#EFF3F9"
              />
              <path
                d="M37.1159 62.6331C42.2405 62.6331 46.3949 58.4788 46.3949 53.3541C46.3949 48.2295 42.2405 44.0751 37.1159 44.0751C31.9913 44.0751 27.8369 48.2295 27.8369 53.3541C27.8369 58.4788 31.9913 62.6331 37.1159 62.6331Z"
                fill="#1761B2"
              />
              <path
                d="M37.1159 57.9936C39.6783 57.9936 41.7554 55.9164 41.7554 53.3541C41.7554 50.7918 39.6783 48.7146 37.1159 48.7146C34.5536 48.7146 32.4764 50.7918 32.4764 53.3541C32.4764 55.9164 34.5536 57.9936 37.1159 57.9936Z"
                fill="#0D3B8D"
              />
              <path
                d="M39.4357 53.3541C40.7169 53.3541 41.7555 52.3155 41.7555 51.0344C41.7555 49.7532 40.7169 48.7146 39.4357 48.7146C38.1546 48.7146 37.116 49.7532 37.116 51.0344C37.116 52.3155 38.1546 53.3541 39.4357 53.3541Z"
                fill="#EFF3F9"
              />
              <path
                d="M53.3542 81.1911C48.1347 81.1911 42.9571 79.9477 38.3756 77.5932C37.8485 77.3006 37.4559 76.8145 37.2807 76.2377C37.1056 75.6609 37.1616 75.0386 37.437 74.5023C37.7123 73.966 38.1854 73.5579 38.7563 73.3641C39.3271 73.1704 39.9509 73.2062 40.4958 73.464C48.4641 77.5607 58.2442 77.5607 66.2125 73.464C66.7553 73.2222 67.3702 73.1974 67.9307 73.3948C68.4912 73.5922 68.9548 73.9968 69.2263 74.5254C69.4977 75.0541 69.5564 75.6666 69.3902 76.2372C69.224 76.8077 68.8456 77.293 68.3328 77.5932C63.6949 79.9608 58.5614 81.1939 53.3542 81.1911Z"
                fill="#AECEE8"
              />
              <path
                d="M53.3541 16.2382C57.8382 16.2382 61.4732 12.6032 61.4732 8.11911C61.4732 3.63505 57.8382 0 53.3541 0C48.87 0 45.235 3.63505 45.235 8.11911C45.235 12.6032 48.87 16.2382 53.3541 16.2382Z"
                fill="#FF3B65"
              />
              <path
                d="M55.6738 11.5987C53.8281 11.5987 52.058 10.8655 50.7529 9.56042C49.4478 8.25531 48.7146 6.4852 48.7146 4.6395C48.7146 3.22445 49.1414 1.9138 49.8675 0.816559C48.4843 1.47181 47.3151 2.50551 46.4952 3.79793C45.6754 5.09034 45.2384 6.58859 45.235 8.11912C45.235 10.2724 46.0904 12.3376 47.613 13.8602C49.1356 15.3828 51.2008 16.2382 53.3541 16.2382C55.4291 16.2355 57.4239 15.4361 58.9266 14.0051C60.4292 12.5741 61.3251 10.6207 61.4291 8.54827C60.7919 9.48807 59.9341 10.2575 58.9308 10.7892C57.9276 11.321 56.8093 11.5989 55.6738 11.5987Z"
                fill="#D82B50"
                fillOpacity="0.458824"
              />
            </svg>
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Edison
          </Typography> */}
					<img
						src={logo}
						alt='logo'
						width={250}
					/>
				</Toolbar>
			</AppBar>
			<Background3/>
			<Box
				sx={{
					// backgroundColor: "#0d0d0d", // Updated to a deeper black
					minHeight: '100vh',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '40px 0',
					opacity: 0.9,
				}}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
				>
					<CustomContainer>
						<Typography
							variant='h1'
							align='center'
							maxWidth={600}
						>
							<TextGenerateEffect words="Click. Upload. Innovate. It's That Simple." />
						</Typography>
						<Typography
							variant='h6'
							align='center'
							paragraph
						>
							Snap. Upload. Innovate. Let our AI analyze your Raspberry Pi
							components and conjure up personalized project ideas with detailed
							PDF guides.
						</Typography>
						<UploadPage />
					</CustomContainer>
				</motion.div>
			</Box>
		</ThemeProvider>
	);
};

export default App;
