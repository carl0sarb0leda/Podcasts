import Link from 'next/link';
import channelStyles from './channelStyles/channel.js';

const Serie = ({ series }) => {
	return (
		<div>
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

			{/* Styles */}
			<style jsx>{channelStyles}</style>
		</div>
	);
};

export default Serie;
