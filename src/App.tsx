import './App.css';
import { AppBar, Box, Toolbar, IconButton, Button, Typography, Container } from '@mui/material';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import './services/toolstudio';

import { Home } from './pages/home/Home';
import { FunctionPlayer } from './pages/player/Player';
import NewForm from './pages/NewFunc/NewFunc';

function App() {

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="sticky">
				<Container maxWidth="md">
					<Toolbar disableGutters={true}>
						<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						
						   <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }} className="link" >
							  ToolStudio
						   </Typography>
						   <Typography variant="h6" component={Link} to="/add" sx={{ flexGrow: 14 }} className="link" >
							 Add
						   </Typography>
						
						
					</Toolbar>
				</Container>
			</AppBar>
			<BrowserRouter>
				<Route exact path="/" component={Home} />
				<Route  path="/add" component={NewForm} />
				<Route path="/funcs/:group/:name" render={ props => (
					<FunctionPlayer name={props.match.params.name} group={props.match.params.group}/>
					)} />
			</BrowserRouter>
		</Box>
	);
}

export default App;
