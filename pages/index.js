import { Fragment } from 'react'; //Fragment only used to avoid <div>
import 'isomorphic-fetch';
import Link from 'next/link';
//import Error from 'next/error'; //to make customs error

const Index = (props) => {
	//destructuring props and taking channels, setting a default value []  in case the request return empty
	//it could be defined directly in the function like: const Index = ({channels}) => {
	const { errorCode, channels = [] } = props;
	// if (errorCode) {
	// 	return <Error statusCode={errorCode} />;
	// }

	return (
		<React.Fragment>
			<header>Podcast 😎</header>
			<div className="channels">
				{channels.map((channel) => (
					<div key={channel.id}>
						<Link href={`/channel/[channel]`} as={`/channel/${channel.id}`}>
							<a className="channel">
								<img src={channel.urls.logo_image.original} alt="" />
								<h2>{channel.title}</h2>
							</a>
						</Link>
					</div>
				))}
			</div>
			<style jsx>{`
				header {
					color: #fff;
					background: #8756ca;
					padding: 15px;
					text-align: center;
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
				h2 {
					padding: 5px;
					font-size: 0.9em;
					font-weight: 600;
					margin: 0;
					text-align: center;
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

// export async function getStaticProps() {
// 	//fetch data from the api
// 	let req = await fetch('https://api.audioboom.com/channels/recommended?api_version=2');
// 	const errorCode = req.status > 200 ? req.status : false; //handling status errors
// 	let { body: channels } = await req.json(); //destructuring the request looking for channels inside the body key
// 	//pass the data to Index via props
// 	return {
// 		props: { errorCode, channels }
// 	};
// }
export async function getServerSideProps() {
	//fetch data from the api
	let req = await fetch('https://api.audioboom.com/channels/recommended?api_version=2');
	const errorCode = req.status > 200 ? req.status : false; //handling status errors
	let { body: channels } = await req.json(); //destructuring the request looking for channels inside the body key
	//pass the data to Index via props
	return {
		props: { errorCode, channels }
	};
}

export default Index;
