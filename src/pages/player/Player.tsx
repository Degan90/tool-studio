import "./Player.css"

import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

import { Function as FunctionInfo } from '@peymanmo/toolstudio-api';
import {DefaultClient} from "../../services/toolstudio";
import BasicRating from "../Rating/BasicRating";


function FunctionDetails(item: FunctionInfo) {
	let description = "no description available.";
	let tags: string[] = [];
	

	const metadata = item.getMetadata();
	if (metadata) {
		if (metadata.getDescription()) {
			description = metadata.getDescription();
		}
		if (metadata.getTagsList()) {
			tags = metadata.getTagsList();
		}
	}

	let hashTags = tags.map(tag => `#${tag}`);

	return (
		<Box>
			{description}
			<Typography variant="subtitle1" color="text.primary" sx={{ mt: 1 }}>
				{hashTags.join(" ")}
			</Typography>
		</Box>
	);
}

type PlayerProps = {
	group: string;
	name: string;
};

type PlayerState = {
	item: FunctionInfo;
};

export class FunctionPlayer extends React.Component<PlayerProps, PlayerState> {
	
	componentDidMount() {
		DefaultClient.getFunction(this.props.group, this.props.name, false).then(item => {
			this.setState({item: item});
			const frame = document.getElementById("main-viewport") as HTMLIFrameElement;
			DefaultClient.manager.install(`${this.props.group}/${this.props.name}`, frame);
		});
	}
	
	render() {
		let info = (<Box>loading...</Box>);
		if (this.state && this.state.item)
			info = FunctionDetails(this.state.item);

		return (
			<Box>
				<Container maxWidth="lg" sx={{ mt: "5%" }}>
					<Paper elevation={3}>
						<iframe title="function-viewport" id="main-viewport" style={{ minHeight: "500px" }}>
						</iframe>
					</Paper>
					
			

				</Container>

				<Container maxWidth="lg" sx={{ mt: "2%" }}>
					<Typography variant="h5">
						{this.props.group}/{this.props.name}
					</Typography>
					{info}
					<BasicRating />
					
				</Container>

			</Box>
		);
	}
}
