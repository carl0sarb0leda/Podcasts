import { Link } from 'next/link';

const PodcastPlayer = ({ clip, onClose }) => {
	return (
		<div className="modal">
			<div className="clip">
				<nav>
					{onClose ? (
						<a onClick={onClose}>Close 📌</a>
					) : (
						<Link href={`/channel/[channel]`} as={`/channel/${podcast.channel.id}`}>
							<a className="close">&lt; Volver</a>
						</Link>
					)}
				</nav>

				<picture>
					<div
						style={{ backgroundImage: `url(${clip.urls.image || clip.channel.urls.logo_image.original})` }}
					/>
				</picture>

				<div className="player">
					<h3>{clip.title}</h3>
					<h6>{clip.channel.title}</h6>
					<audio controls autoPlay={true}>
						<source src={clip.urls.high_mp3} type="audio/mpeg" />
					</audio>
				</div>
			</div>

			<style jsx>{`
				nav {
					background: none;
				}
				nav a {
					display: inline-block;
					padding: 15px;
					color: white;
					cursor: pointer;
					text-decoration: none;
					text-shadow: 0 0 5px #c62828;
				}
				.clip {
					display: flex;
					height: 100%;
					flex-direction: column;
					color: white;
					opacity: 0.9 !important;
				}
				picture {
					display: flex;
					align-items: center;
					justify-content: center;
					flex: 1 1;
					flex-direction: column;
					width: auto;
					padding: 10%;
				}
				picture div {
					width: 100%;
					height: 100%;
					background-position: 50% 50%;
					background-size: contain;
					background-repeat: no-repeat;
				}
				.player {
					padding: 30px;
					background: rgba(0, 0, 0, 0.3);
					text-align: center;
				}
				h3 {
					margin: 0;
				}
				h6 {
					margin: 0;
					margin-top: 1em;
				}
				audio {
					margin-top: 2em;
					width: 100%;
				}

				.modal {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 99999;
				}
			`}</style>
		</div>
	);
};

export default PodcastPlayer;
