import css from 'styled-jsx/css';

export default css`
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
`;
