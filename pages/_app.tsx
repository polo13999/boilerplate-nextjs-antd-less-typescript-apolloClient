/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Tien Tran
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-06-19 15:26:14
*------------------------------------------------------- */
import React from 'react';
// import App from 'next/app';
import Head from 'next/head';

import cookie from 'react-cookies';

import { useAsync } from 'react-use';

import NProgress from 'nprogress';
import { useRouter } from 'next/router';

import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'src/lib/apolloClient'


require('src/styles/index.less');


const MyApp = (props) => {
	const { Component, pageProps } = props;
	const [awaitLoading, setAwaitLoading] = React.useState(true);
	const router = useRouter();

	const apolloClient = useApollo(pageProps)


	React.useEffect(() => {
		const handleRouteChange = (url, { shallow }) => {
			if (!shallow) {
				NProgress.start();
			}
		};

		router.events.on('routeChangeStart', handleRouteChange);
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
			router.events.off('routeChangeComplete', () => NProgress.done());
			router.events.off('routeChangeError', () => NProgress.done());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	return (
		<ApolloProvider client={apolloClient}>

			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, height=device-height, user-scalable=0" />
			</Head>
			<Component {...pageProps} router={router} />
		</ApolloProvider>

	);
};

MyApp.getInitialProps = async (context) => {
	const { ctx, Component } = context;
	if (!process.browser) { cookie.plugToRequest(ctx.req, ctx.res); }
	let pageProps = {};
	if (Component?.getInitialProps) { pageProps = await Component?.getInitialProps(ctx); }
	const propsData = { ...pageProps, };
	let layoutProps = {};
	return { pageProps: { ...propsData, ...layoutProps, }, };
};

export default MyApp;
