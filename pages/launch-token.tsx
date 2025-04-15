
import LaunchTokenComponent from '@/components/pages/list_token/LaunchTokenComponent';
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper';

function ListToken() {
    return (
        <>
            <LaunchTokenComponent />
        </>
    );
}


ListToken.PageLayout = HeaderAndFooterWrapper

export default ListToken