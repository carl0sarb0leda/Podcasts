import { Fragment } from 'react';

const Channel = (props) => {
	const { channel, audioClips, series } = props;
	return (
		<React.Fragment>
			<header>Podcast 😎</header>
			<h1>😗{channel.title}</h1>
			<h2>Series</h2>
			{series.map((serie) => <div key={serie.id}>{serie.title}</div>)}
			<h2>Ultimos Podcasts</h2>
			{audioClips.map((clip) => <div key={clip.id}>{clip.title}</div>)}

			<style jsx>{`
				header {
					color: #fff;
					background: #8756ca;
					padding: 15px;
					text-align: center;
				}

				.banner {
					width: 100%;
					padding-bottom: 25%;
					background-position: 50% 50%;
					background-size: cover;
					background-color: #aaa;
				}

				.channels {
					display: grid;
					grid-gap: 15px;
					padding: 15px;
					grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
				}
				a.channel {
					display: block;
					margin-bottom: 0.5em;
					color: #333;
					text-decoration: none;
				}
				.channel img {
					border-radius: 3px;
					box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
					width: 100%;
				}
				h1 {
					font-weight: 600;
					padding: 15px;
				}
				h2 {
					padding: 5px;
					font-size: 0.9em;
					font-weight: 600;
					margin: 0;
					text-align: center;
				}

				.podcast {
					display: block;
					text-decoration: none;
					color: #333;
					padding: 15px;
					border-bottom: 1px solid rgba(0, 0, 0, 0.2);
					cursor: pointer;
				}
				.podcast:hover {
					color: #000;
				}
				.podcast h3 {
					margin: 0;
				}
				.podcast .meta {
					color: #666;
					margin-top: 0.5em;
					font-size: 0.8em;
				}
			`}</style>

			<style jsx global>{`
				body {
					margin: 0;
					font-family: system-ui;
					background: white;
				}
			`}</style>
		</React.Fragment>
	);
};

export async function getServerSideProps({ query }) {
	//query is fetching the props sent by the link in index.js
	let idChannel = query.id;

	//fetch data from the api
	let [ reqChannel, reqSeries, reqAudios ] = await Promise.all([
		fetch(`https://api.audioboom.com/channels/${idChannel}`),
		fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
		fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
	]);

	let channel = (await reqChannel.json()).body.channel; //this depends on the api format
	let audioClips = (await reqAudios.json()).body.audio_clips;
	let series = (await reqSeries.json()).body.channels;

	//pass the data to Channel via props
	return { props: { channel, audioClips, series } };
}

export default Channel;
