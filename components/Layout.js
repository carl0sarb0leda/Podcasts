import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Loading from './Loading';

const Layout = ({ children, title }) => {
	const router = useRouter();
	return (
		<React.Fragment>
			{/* Head allows manage the title and meta elements*/}
			<Head>
				<title>{title}</title>
			</Head>

			{/* From here is the actual layout  */}
			<header>
				<Link href={'/'}>
					<a>Podcast Demo 😎</a>
				</Link>
				<MyLink href={'/about'}>About 🦉</MyLink>
				<Loading />
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
						text-align: right;
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

const MyLink = ({ children, href }) => {
	const router = useRouter();
	return (
		<a
			href="#"
			onClick={(e) => {
				e.preventDefault();
				// typically you want to use `next/link` for this usecase
				// but this example shows how you can also access the router
				// and use it manually
				router.push(href);
			}}
		>
			{children}
			<style jsx>{`
				a {
					color: #fff;
					text-decoration: none;
					padding: 10px;
				}
			`}</style>
		</a>
	);
};

export default Layout;
