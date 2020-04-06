import fetch from 'node-fetch';
import Layout from '../../components/Layout';
import Banner from '../../components/Channel/Banner';
import Serie from '../../components/Channel/Serie';
import PodcastList from '../../components/Channel/PodcastList';
import PodcastPlayer from '../../components/Channel/PodcastPlayer';

const Channel = (props) => {
	const { channel, audioClips, series } = props;
	//Hooks
	const [ openPodcast, setOpenPodcast ] = React.useState('');
	const setPodcastOpen = (event, podcast) => {
		event.preventDefault();
		setOpenPodcast(podcast);
	};
	const setPodcastClose = (event, podcast) => {
		event.preventDefault();
		setOpenPodcast(null);
	};

	return (
		<Layout title={channel.title}>
			<Banner channel={channel} />
			{/* Modal */}
			{openPodcast && (
				<div className="modal">
					<PodcastPlayer clip={openPodcast} onClose={setPodcastClose} />
				</div>
			)}
			<h1>{channel.title}</h1>
			<Serie series={series} />
			<PodcastList audioClips={audioClips} onClickPodcast={setPodcastOpen} />
		</Layout>
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

	//console.log('Paths:', paths); //see the paths
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	//be careful with params and query

	let idChannel = params.channel; //params already brings the id from index
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
