import DefaultToolImage from '../../assets/tool.svg';

import React from 'react';
import { Typography, TextField, Grid, Container } from '@mui/material';
import { Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import { DefaultClient } from '../../services/toolstudio';
import { Function as FunctionInfo } from '@peymanmo/toolstudio-api';

type FunctionProps = {
	group: string;
	name: string;
	description: string;
	tags: string[];
};
class FunctionCard extends React.Component<FunctionProps, {}> {
	render() {
		const hashTags = this.props.tags.map(tag => `#${tag}`);
		
		return (
			<Grid item xs="auto">
				<Card sx={{ maxWidth: 300 }}>
					<CardActionArea component={Link} to={`/funcs/${this.props.group}/${this.props.name}`}>
						<CardMedia component="img" height="100" image={DefaultToolImage} sx={{ objectFit: "scale-down" }}>
						</CardMedia>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{this.props.group}/{this.props.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{this.props.description}
							</Typography>
							<Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
								{hashTags.join(" ")}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	}
};

type HomeProps = {};
type HomeState = {
	loading: boolean;
	items: FunctionInfo[];
};

export class Home extends React.Component<HomeProps, HomeState> {
	state: HomeState = {
		loading: false,
		items: [],
	};

	componentDidMount() {
		DefaultClient.listFunctions().then(items => {
			this.setState({items: items});
		});
	}

	render() {
		const items = this.state.items.map(item => {
			let description = "no description available.";
			let tags = [];
			const metadata = item.getMetadata();
			if (metadata) {
				if (metadata.getDescription()) {
					description = metadata.getDescription();
				}
				if (metadata.getTagsList()) {
					tags = metadata.getTagsList();
				}
			}
			const name = `${item.getGroup()}/${item.getName()}`;
			return (
					<FunctionCard key={name} group={item.getGroup()} name={item.getName()} description={description} tags={tags} />
			);
		});

		return (
			<Container maxWidth="md" sx={{ mt: "5%" }}>
				<Typography variant="h4">what are you looking for?</Typography>
				<TextField id="standard-basic" label="write your keywords... e.g. #pdf #converter #resize" variant="standard" sx={{ width: "100%", mt: "20px" }} />
				<Grid container spacing={2} sx={{ mt: "10%" }}>
					{items}
				</Grid>
			</Container>
		);
	}
}
