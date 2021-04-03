import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
    return (
        <div className="container">
            <Head>
                <title className="text-4xl">{ postData.title }</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    };
  }
  
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}
