import { Fragment } from 'react'; //Fragment only used to avoid <div>

//Making a class component and export it
// export default class extends React.Component {
// 	render() {
// 		return <h1>Hello!</h1>;
// 	}
// }

//Working with functional components

const Index = () => {
	return (
		<React.Fragment>
			<h1>Welcome!!</h1>
			<img src="/brown.png" alt="brown" />
			<p>Made by Carlos</p>
			<style jsx>
				{`
					h1 {
						color: #2196f3;
						text-align: center;
						font-family: cursive;
					}
					:global(p) {
						text-align: center;
					}
					img {
						max-width: 25%;
						display: block;
						margin: 0 auto;
					}
				`}
			</style>
		</React.Fragment>
	);
};
export default Index;
