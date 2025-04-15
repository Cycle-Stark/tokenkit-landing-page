import LandingPage from '@/components/pages/home/LandingPage';
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper';
import { API_ENDPOINTS } from '@/utils/constants';
import { makeRequestOne } from '@/utils/functions';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
// import { Welcome } from '../components/Welcome/Welcome';

interface IHomePage {
  partners?: any[]
  projects?: any[]
  events?: any[]
  blogs?: any[]
}

function HomePage({ blogs }: IHomePage) {
  return (
    <>
      {/* <Welcome /> */}
      {/* <ColorSchemeToggle /> */}
      <LandingPage blogs={blogs ?? []} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  // requireAuthMiddleware(context.req, context.res, () => { })
  // const cookies = context.req.cookies
  // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]

  // const token = cookies[LOCAL_STORAGE_KEYS.token]

  // const userDetails: any = JSON.parse(userDetails_ ?? "{}")

  try {
    // const partnersQuery = await makeRequestOne({ url: API_ENDPOINTS.PARTNERS, method: 'GET', params: { fields: 'title,logo,url', limit: 10 }, })
    // const projectsQuery = await makeRequestOne({ url: API_ENDPOINTS.PROJECTS, method: 'GET', params: { fields: 'id,title,slug,description,image,details', limit: 4 }, })
    // const eventsQuery = await makeRequestOne({ url: API_ENDPOINTS.EVENTS, method: 'GET', params: { fields: 'id,title,slug,description,details,start_date,start_time,end_date,end_time,is_fullday,details,image', limit: 4 }, })
    const blogsQuery = await makeRequestOne({ url: API_ENDPOINTS.BLOGS, method: 'GET', params: { fields: 'id,title,slug,description,created_on,image,categories', limit: 8 }, })

    return {
      props: {
        // partners: partnersQuery?.data?.results,
        // projects: projectsQuery?.data?.results,
        // events: eventsQuery?.data?.results,
        blogs: blogsQuery?.data?.results,
      }
    }
  } catch (err) {
    return {
      props: {

      }
    }
  }
}


HomePage.PageLayout = HeaderAndFooterWrapper

export default HomePage