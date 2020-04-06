import { useRouter } from 'next/router';

const Loading = () => {
	const router = useRouter();
	const [ loading, setLoading ] = React.useState('');

	React.useEffect(() => {
		const handleStart = (url) => url !== router.pathname && setLoading(true);
		const handleComplete = (url) => url !== router.pathname && setLoading(false);

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	});

	return loading && <div>Loading...</div>;
};

export default Loading;
