/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2021-03-10 11:36:23
*------------------------------------------------------- */

import React from 'react';

import Head from 'next/head';

import METADATA from 'src/constants/metadata';

import Meta from './Meta';




const HeadShare = (props) => {
	const { title, ...attr } = props;

	return (
		<Head>
			<title>{(title ? title + ' | ' : '') + METADATA.APP_NAME}</title>
			<Meta {...attr} />
		</Head>
	);
};



export default HeadShare;
