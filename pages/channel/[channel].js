import { Fragment } from 'react';
import Link from 'next/link';
import fetch from 'node-fetch';

const Channel = (props) => {
	const { channel, audioClips, series } = props;
	return (
		<React.Fragment>
			<header>Podcast 😎</header>
			<div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />

			<h1>{channel.title}</h1>

			{series.length > 0 && (
				<div>
					<h2>Series</h2>
					<div className="channels">
						{series.map((serie) => (
							<Link href={`/channel?id=${serie.id}`} key={serie.id}>
								<a className="channel">
									<img src={serie.urls.logo_image.original} alt="" />
									<h2>{serie.title}</h2>
								</a>
							</Link>
						))}
					</div>
				</div>
			)}

			<h2>Ultimos Podcasts</h2>
			{audioClips.map((clip) => (
				<Link href={`/channel/podcast?id=${clip.id}`} key={clip.id}>
					<a className="podcast">
						<h3>{clip.title}</h3>
						<div className="meta">{Math.ceil(clip.duration / 60)} minutes</div>
					</a>
				</Link>
			))}
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
		</React.Fragment>
	);
};

// This function gets called at build time
export async function getStaticPaths() {
	//Call the api
	let res = await fetch('https://api.audioboom.com/channels/recommended?api_version=2');
	const channels = (await res.json()).body; //looking inside the api response

	//Get the paths we want to pre-render based on the id from index.js
	const paths = channels.map((channel) => ({
		params: { channel: channel.id.toString() } //IMPORTANT should be a string
	}));

	console.log('Paths:', paths);
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	//be careful with params and query

	let idChannel = params.channel; //params already brings the id from the prop as{} in <link> at index
	//console.log('------------------------', params);
	//fetch data from the api
	let [ reqChannel, reqSeries, reqAudios ] = await Promise.all([
		fetch(`https://api.audioboom.com/channels/${idChannel}`),
		fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
		fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
	]);

	let channel = (await reqChannel.json()).body.channel; //this depends on the api format
	let series = (await reqSeries.json()).body.channels;
	let audioClips = (await reqAudios.json()).body.audio_clips;

	//pass the data to Channel via props
	return {
		props: { channel, audioClips, series }
	};
}

//Using getServerSideProps, receive a query key
// export async function getServerSideProps({ query }) {
// 	//query is fetching the props sent by the link in index.js
// 	let idChannel = query.id;

// 	//fetch data from the api
// 	let [ reqChannel, reqSeries, reqAudios ] = await Promise.all([
// 		fetch(`https://api.audioboom.com/channels/${idChannel}`),
// 		fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
// 		fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
// 	]);

// 	let channel = (await reqChannel.json()).body.channel; //this depends on the api format
// 	let series = (await reqSeries.json()).body.channels;
// 	let audioClips = (await reqAudios.json()).body.audio_clips;

// 	//pass the data to Channel via props
// 	return {
// 		props: { channel, audioClips, series }
// 	};
// }

export default Channel;
