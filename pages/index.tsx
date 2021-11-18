import App from 'src/components/App'
import InfoBox from 'src/components/InfoBox'
import Header from 'src/components/Header'
import Submit from 'src/components/Submit'
import PostList, { ALL_POSTS_QUERY, allPostsQueryVars, } from 'src/components/PostList'
import { initializeApollo, addApolloState } from 'src/lib/apolloClient'

const IndexPage = () => (

    <App>
        <Header />
        <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
        <Submit />
        <PostList />
    </App>
)

//SSR
export async function getStaticProps() {
    const apolloClient = initializeApollo()
    // need graphql server 
    try { await apolloClient.query({ query: ALL_POSTS_QUERY, variables: allPostsQueryVars, }) } catch (err) { console.log('err', err) }
    return addApolloState(apolloClient, { props: {}, revalidate: 1, })


}

export default IndexPage
