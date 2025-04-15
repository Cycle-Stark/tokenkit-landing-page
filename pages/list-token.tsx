import ListTokenComponent from '@/components/pages/list_token/ListTokenComponent';
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper';

function ListToken() {
    return (
        <>
            <ListTokenComponent />
        </>
    );
}


ListToken.PageLayout = HeaderAndFooterWrapper

export default ListToken