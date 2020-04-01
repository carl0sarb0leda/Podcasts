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
			<h1>Hello!!</h1>
			<p>Welcome Next</p>
		</React.Fragment>
	);
};
export default Index;
