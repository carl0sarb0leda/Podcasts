import Link from 'next/link';
import channelStyles from './channelStyles/channel.js';

const PodcastList = ({ audioClips, onClickPodcast }) => {
	return (
		<div>
			<h2>Ultimos Podcasts</h2>
			{audioClips.map((clip) => (
				// <Link href={`/channel/podcast?id=${clip.id}`} key={clip.id}> same as below
				<Link
					href={{
						pathname: `/channel/podcast`,
						query: { id: clip.id }
					}}
					key={clip.id}
					passHref //passHref is compulsory in Next Link
				>
					<PodcastLink clip={clip} onClickPodcast={onClickPodcast} />
				</Link>
			))}

			{/* Styles */}
			<style jsx>{channelStyles}</style>
		</div>
	);
};

const PodcastLink = React.forwardRef(({ onClickPodcast, href, clip }, ref) => {
	//React.forwardRef is compulsory in Next Link
	return (
		<a
			className="podcast"
			onClick={(event) => {
				onClickPodcast(event, clip);
			}}
		>
			<h3>{clip.title}</h3>
			<div className="meta">{Math.ceil(clip.duration / 60)} minutes</div>
		</a>
	);
});

export default PodcastList;
