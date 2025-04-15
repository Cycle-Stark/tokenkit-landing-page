import { CustomPaginationForForm } from '@/components/common/CustomPagination'
import { Stack, Grid, Group, Button, Text } from '@mantine/core'
import { IconPlus, IconRefresh, IconSearch, IconX } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import { FilterField, renderField } from './helpers'

interface IGlobalFilterFormAjax {
    fields: FilterField[]
    form: any
    setFilters: any
    defaultFilters: any
    pages: number
    count: number
    mutate: any
    addFunction?: any
    hideAddBtn?: boolean
}

const GlobalFilterFormAjax = (props: IGlobalFilterFormAjax) => {
    const { form, fields, pages, count, setFilters, defaultFilters, mutate, addFunction, hideAddBtn } = props

    const handleSearch = () => {
        setFilters(form.values)
    }

    const handleReset = () => {
        form.reset()
        setFilters(defaultFilters)
    }

    const handleRefresh = () => {
        mutate && mutate()
    }

    useEffect(() => {
        form.setFieldValue('page', 1)
    }, [form.values.limit, form.values.search])

    useEffect(() => {
        handleSearch()
    }, [form.values.page])

    return (
        <Stack>
            <form onSubmit={form.onSubmit((values: any) => handleSearch())}>
                <Grid>
                    {
                        fields.map((field: FilterField, i: number) => {
                            return renderField(field, i, form)
                        })
                    }
                    <Grid.Col span={{ md: 5 }}>
                        <Group className="h-100" align="end" justify="left" gap={'10px'}>
                            <Button type="submit" size="sm" radius="md" variant="light" leftSection={<IconSearch size={16} />}>Search</Button>
                            <Button size="sm" radius="md" onClick={handleReset} color='red' variant="light" leftSection={<IconX size={16} />}>Reset</Button>
                            <Button size="sm" radius="md" onClick={handleRefresh} color='green' variant="light" leftSection={<IconRefresh size={16} />}>Refresh</Button>
                            {
                                !hideAddBtn ? (
                                    <Button size="sm" radius="md" onClick={() => addFunction && addFunction()} color='indigo' variant="light" leftSection={<IconPlus size={16} />}>Add New</Button>
                                ) : null
                            }
                            <Text style={{ fontWeight: 600 }} size="sm">Found: {count} records</Text>
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
            <Group style={{ textAlign: "center" }}>
                <CustomPaginationForForm pages={pages} form={form} />
            </Group>
        </Stack>
    )
}

export default GlobalFilterFormAjax