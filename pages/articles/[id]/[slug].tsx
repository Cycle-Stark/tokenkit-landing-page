import { SidebarArticleCard } from '@/components/common/ArticleComponents'
import CustomRTE from '@/components/rte/CustomRTE'
import SEOHeader from '@/components/seo/SEOHeader'
import HeaderAndFooterWrapper from '@/layouts/HeaderFooterWrapper'
import { APP_NAME, API_ENDPOINTS, DEFAULT_APP_URL } from '@/utils/constants'
import { isDarkMode, makeRequestOne } from '@/utils/functions'
import { Box, Stack, Title, Container, Grid, useMantineTheme, useMantineColorScheme, Image } from '@mantine/core'
import Head from 'next/head'
import React from 'react'

interface ISingleArticle {
    article?: any
    otherArticles?: any
}

const SingleArticle = (props: ISingleArticle) => {
    const { article, otherArticles } = props
    const theme = useMantineTheme()
    const { colorScheme } = useMantineColorScheme()

    return (
        <div key={`article_${article.id}`}>
            <SEOHeader url={`${DEFAULT_APP_URL}/articles/${article?.id}/${article?.slug}`} title={`${article?.title}`} />
            <Box>
                <Stack>
                    <Box py={'70px'} style={{
                        background: 'rgba(0, 4, 53, 0.7)',
                        backdropFilter: 'blur(5px)',
                        WebkitBackdropFilter: 'blur(5px)',
                    }}>
                        <Title size={'52px'} ta={'center'} c="white" maw={'80%'} mx={'auto'}>{article?.title}</Title>
                    </Box>
                    <Box w={"100%"}>
                        <Container size={"xl"} py={"20px"}>
                            <Grid>
                                <Grid.Col span={{ md: 8 }}>
                                    <Box p={"sm"} bg={isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.indigo[0]} style={{
                                        borderRadius: theme.radius.lg
                                    }}>
                                        <Image src={article?.image} radius={"lg"} />
                                        <CustomRTE key={article.id} content={article?.content} readonly={true} />
                                    </Box>
                                </Grid.Col>
                                <Grid.Col span={{ md: 4 }}>
                                    <Box p={"sm"} bg={isDarkMode(colorScheme) ? theme.colors.dark[7] : theme.colors.yellow[0]} style={{
                                        borderRadius: theme.radius.lg
                                    }}>
                                        <Stack gap={4}>
                                            <Title order={2} fw={500}>Read More</Title>
                                            {
                                                otherArticles?.map((item: any) => (
                                                    <SidebarArticleCard key={`${item?.id}`} {...item} />
                                                ))
                                            }
                                        </Stack>
                                    </Box>
                                </Grid.Col>
                            </Grid>
                        </Container>
                    </Box>
                </Stack>
            </Box>
        </div>
    )
}


export async function getServerSideProps(context: any) {
    // requireAuthMiddleware(context.req, context.res, () => { })
    // const cookies = context.req.cookies
    // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]

    // const token = cookies[LOCAL_STORAGE_KEYS.token]

    // const userDetails: any = JSON.parse(userDetails_ ?? "{}")
    const params = context?.params

    try {
        const articleQuery = await makeRequestOne({ url: API_ENDPOINTS.BLOGS + "/" + params.id, method: 'GET', params: { fields: 'id,title,image,slug,categories,description,content', is_public: true }, })
        const article = articleQuery?.data

        const otherArticlesQuery = await makeRequestOne({ url: API_ENDPOINTS.RANDOMBLOGS, method: 'GET', params: { fields: 'id,title,image,slug,categories', limit: 6 }, })
        const otherArticles = otherArticlesQuery?.data?.results

        return {
            props: {
                article,
                otherArticles,
            }
        }
    } catch (err) {
        return {
            props: {

            }
        }
    }
}

SingleArticle.PageLayout = HeaderAndFooterWrapper

export default SingleArticle