
import { ArticleCard, SidebarArticleCard } from '@/components/common/ArticleComponents';
import { FooterLink } from '@/components/common/CustomFooter';
import { CustomLinkPagination } from '@/components/common/CustomPagination';
import SEOHeader from '@/components/seo/SEOHeader';
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper';
import { cookieSetter } from '@/providers/AppProvider';
import { DEFAULT_APP_URL, API_ENDPOINTS, LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { isDarkMode, makeRequestOne } from '@/utils/functions';
import { Alert, Box, Center, Container, em, Grid, Stack, Text, TextInput, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

interface IArticles {
    articles?: any[]
    totalPages: number
    page: number
    recentArticles?: any[]
    categories: any[]
    query: any
}

const Articles = ({ articles, totalPages, page, recentArticles, categories, query }: IArticles) => {
    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()
    const isDark = isDarkMode(colorScheme)
    const router = useRouter()

    const searchForm = useForm({
        initialValues: {
            search: query?.search
        },
    })

    const handleSearch = (formValues: any) => {
        const uniqueId = new Date().getTime().toString();
        cookieSetter(LOCAL_STORAGE_KEYS.category, router.query.category ?? '')
        cookieSetter(LOCAL_STORAGE_KEYS.search, formValues?.search ?? '')
        router.replace(`/articles`, {
            query: {
                category: query?.category,
                search: formValues?.search
            },
        })
    }

    useEffect(() => {
        const handleBeforeUnload = (e: any) => {
            console.log('handleBeforeUnload called');
            e.preventDefault();
            e.returnValue = '';
            cookieSetter(LOCAL_STORAGE_KEYS.category, '');
            cookieSetter(LOCAL_STORAGE_KEYS.search, '');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            cookieSetter(LOCAL_STORAGE_KEYS.category, '');
            cookieSetter(LOCAL_STORAGE_KEYS.search, '');
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <SEOHeader url={`${DEFAULT_APP_URL}/articles`} title={'News & Articles'} />
            <Stack key={router.asPath}>
                <Box
                    h={'400px'}
                    style={{
                        // background: 'url(/assets/images/articles/bg.svg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'top'
                    }}
                >
                    <Stack className='h-100' align='center' justify='center'>
                        <Title ta={'center'} fw={500} size={'36px'} c={'secondaryPink.9'}>News & Articles</Title>
                        <Text ta={'center'} c={'gray.1'}>
                            Empowering Decentralization Through Stories, Updates, and Ideas
                        </Text>
                    </Stack>
                </Box>
                <Container size={"xl"} w={'100%'} pt={'50px'} pb={'100px'}>
                    <Grid>
                        <Grid.Col span={{ md: 8 }}>
                            <Stack>
                                <Grid>
                                    {
                                        articles?.map((article: any, i: number) => (
                                            <Grid.Col span={{ md: 4 }} key={`article_${article?.id}`}>
                                                <ArticleCard {...article} date={article?.created_on} />
                                            </Grid.Col>
                                        ))
                                    }
                                    {
                                        articles?.length === 0 ? (
                                            <Grid.Col span={12}>
                                                <Alert radius={'md'} py={'50px'}>
                                                    <Text ta={'center'}>No related articles</Text>
                                                </Alert>
                                            </Grid.Col>
                                        ) : null
                                    }
                                </Grid>
                                <Center>
                                    <CustomLinkPagination
                                        pages={totalPages}
                                        active={page}
                                        pageURL={`/articles/?category=${query?.category ?? ''}&search=${query?.search ?? ''}`}
                                    />
                                </Center>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 4 }}>
                            <Stack w={'100%'}>
                                <form onSubmit={searchForm.onSubmit((values) => handleSearch(values))}>
                                    <TextInput {...searchForm.getInputProps('search')} radius={'xl'} leftSection={<IconSearch stroke={em(1.5)} size={'18px'} />} placeholder='Search...' styles={{
                                        input: {
                                            background: "transparent"
                                        }
                                    }} />
                                </form>
                                <Box p={{ base: "10px", md: "lg" }} bg={isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.indigo[0]} style={{
                                    borderRadius: theme.radius.lg
                                }}>
                                    <Stack gap={'6'}>
                                        <Title order={3} fw={700}>Blog Categories</Title>
                                        {
                                            categories?.map((cat: any, i: number) => (
                                                cat?.blogs_count !== 0 && <FooterLink 
                                                key={`cat_${cat?.id}`} 
                                                title={`${cat?.title} (${cat?.blogs_count})`} 
                                                href={`/articles?category=${cat?.id}&search=${query?.search}`} />
                                            ))
                                        }
                                    </Stack>
                                </Box>
                                <Box p={{ base: "10px", md: "lg" }} bg={isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.indigo[0]} style={{
                                    borderRadius: theme.radius.lg
                                }}>
                                    <Stack gap={'10'}>
                                        <Title order={3} fw={700}>Recent Posts</Title>
                                        {
                                            recentArticles?.map((article, i: number) => (
                                                <SidebarArticleCard key={`sidebar_article_${i}`} {...article} />
                                            ))
                                        }
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Stack>
        </>
    )
}


export async function getServerSideProps(context: NextPageContext) {

    const params = context?.query
    const req: any = context.req
    const cookies: any = req?.cookies

    const search = cookies[LOCAL_STORAGE_KEYS.search]
    const category = cookies[LOCAL_STORAGE_KEYS.category]

    try {
        const blogsQuery = await makeRequestOne({
            url: API_ENDPOINTS.BLOGS, method: 'GET',
            params: {
                page: params?.page ?? 1,
                categories__id: params?.category || category || '',
                search: search || params?.search || '',
                fields: 'id,title,slug,description,created_on,image,categories', limit: 6
            },
        })
        const recentBlogsQuery = await makeRequestOne({ url: API_ENDPOINTS.BLOGS, method: 'GET', params: { ordering: '-id', fields: 'id,title,slug,description,created_on,image,categories', limit: 6 }, })
        const categoriesQuery = await makeRequestOne({ url: API_ENDPOINTS.CATEGORIES, method: 'GET', params: { ordering: '-id', fields: 'id,title,slug,blogs_count', limit: 50 }, })

        return {
            props: {
                articles: blogsQuery?.data?.results,
                totalPages: blogsQuery?.data?.total_pages,
                page: params.page ?? 1,
                recentArticles: recentBlogsQuery?.data?.results,
                categories: categoriesQuery?.data?.results,
                query: {
                    search: params?.search || search || '',
                    category: params?.category || category || '',
                    page: params?.page ?? 1,
                }
            }
        }
    } catch (err: any) {
        if (err?.response?.data?.detail === 'Invalid page.') {
            return {
                redirect: {
                    destination: `/articles?search=${params?.search ?? ''}&category=${params?.category ?? ''}`,
                    permanent: false,
                }
            }
        }
        return {
            props: {

            }
        }
    }
}

Articles.PageLayout = HeaderAndFooterWrapper
export default Articles
