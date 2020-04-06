import { Fragment } from 'react'; //Fragment only used to avoid <div>
import 'isomorphic-fetch';
import Link from 'next/link';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

//This gonna be render in running time
const Index = (props) => {
	//destructuring props and taking channels, setting a default value []  in case the request return empty
	const { channels = [] } = props;

	return (
		<Layout title="Podcast Yup">
			<ChannelGrid channels={channels} />
		</Layout>
	);
};

//This gonna be prerender in build time and storage in the Content Delivery Network
export async function getStaticProps() {
	//fetch data from the api
	let req = await fetch('https://api.audioboom.com/channels/recommended?api_version=2');
	let { body: channels } = await req.json(); //destructuring the request looking for channels inside the body key

	//pass the data to Index via props
	return {
		props: { channels }
	};
}

export default Index;
