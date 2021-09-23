import './App.css';
import { AppBar, Box, Toolbar, IconButton, Button, Typography, Container } from '@mui/material';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import './services/toolstudio';

import { Home } from './pages/home/Home';
import { FunctionPlayer } from './pages/player/Player';

function App() {

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="sticky">
				<Container maxWidth="md">
					<Toolbar disableGutters={true}>
						<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Link to={{pathname: '/'}}className= "link" >
						   <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							  ToolStudio
						   </Typography>
						</Link>
						
					</Toolbar>
				</Container>
			</AppBar>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route path="/funcs/:group/:name" render={ props => (
					<FunctionPlayer name={props.match.params.name} group={props.match.params.group}/>
					)} />
			</BrowserRouter>
		</Box>
	);
}

export default App;
