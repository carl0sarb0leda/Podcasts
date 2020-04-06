import channelStyles from './channelStyles/channel.js';

const Banner = ({ channel }) => {
	return (
		<div>
			<div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
			{/* Styles */}
			<style jsx>{channelStyles}</style>
		</div>
	);
};

export default Banner;
