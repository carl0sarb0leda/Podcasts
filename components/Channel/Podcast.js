import Link from 'next/link';
import channelStyles from './channelStyles/channel.js';

const Podcast = ({ audioClips }) => {
	return (
		<div>
			<h2>Ultimos Podcasts</h2>
			{audioClips.map((clip) => (
				// <Link href={`/channel/podcast?id=${clip.id}`} key={clip.id}> same as below
				<Link href={{ pathname: `/channel/podcast`, query: { id: clip.id } }} key={clip.id}>
					<a className="podcast">
						<h3>{clip.title}</h3>
						<div className="meta">{Math.ceil(clip.duration / 60)} minutes</div>
					</a>
				</Link>
			))}

			{/* Styles */}
			<style jsx>{channelStyles}</style>
		</div>
	);
};

export default Podcast;
