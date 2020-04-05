import { Fragment } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Layout = ({ children, title }) => {
	return (
		<React.Fragment>
			{/* Head allows manage the title and meta elements*/}
			<Head>
				<title>{title}</title>
			</Head>

			{/* From here is the actual layout  */}
			<header>
				<Link href={`/`}>
					<a>Podcast 😎</a>
				</Link>
			</header>

			{/* We should include the children from props to pass all the content */}
			{children}

			{/* From here are the styles */}
			<style jsx>
				{`
					header {
						color: #fff;
						background: #8756ca;
						padding: 15px;
						text-align: center;
					}
					header a {
						color: #fff;
						text-decoration: none;
					}
				`}
			</style>

			<style jsx global>
				{`
					body {
						margin: 0;
						font-family: system-ui;
						background: white;
					}
				`}
			</style>
		</React.Fragment>
	);
};

export default Layout;
