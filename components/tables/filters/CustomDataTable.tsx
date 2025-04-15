import { CustomPaginationForForm } from "@/components/common/CustomPagination"
import { useAppContext } from "@/providers/AppProvider"
import { isDarkMode, makeRequestOne } from "@/utils/functions"
import { useMantineColorScheme, Box, ScrollArea, Stack, LoadingOverlay, Button, Group, Tooltip, ActionIcon, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useModals } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { IconWriting, IconTrash } from "@tabler/icons-react"
import { DataTableColumn, DataTable } from "mantine-datatable"
import React, { useEffect, useState } from "react"
import GlobalFilterFormAjax from "./GlobalFilterFormAjax"
import { FilterField } from "./helpers"
import useSWR from "swr"
import { TABLE_ICON_SIZE } from "@/utils/constants"
import CustomError from "@/components/common/CustomError"


interface DataFilter {
    [key: string]: string | number
}

// interface DataTableColumn {
//     accessor: string
//     render?: any
//     width?: string | number
//     title: string | React.ReactNode
// }

interface IUpdateData {
    formNode?: any
    extraFormProps?: any
    modalSize: string
    deletingModalTitle: string
    updatingModalTitle: string
}

export interface IExtraAction {
    title: string
    element: any
    color: string
}

interface ICustomDataTable {
    url: string
    method: string
    defaultFilters: DataFilter
    useNext: boolean
    useDirectUrl: boolean
    formValidators: any
    columns: DataTableColumn[]
    filterFields: FilterField[]
    updateData?: IUpdateData
    hideUpdateActionBtn?: boolean
    hideDeleteActionBtn?: boolean
    extraActionButtons?: IExtraAction[]
    hideFilters?: boolean
    hideActionsColumn?: boolean
    tableHeight?: string | number
}

const CustomDataTable = (props: ICustomDataTable) => {
    const { url, method, defaultFilters, useNext, useDirectUrl, formValidators, columns, filterFields, updateData, hideUpdateActionBtn, extraActionButtons, hideDeleteActionBtn, hideFilters, hideActionsColumn, tableHeight } = props
    const [deleting, setDeleting] = useState<boolean>(false)
    const [filters, setFilters] = useState<null | any>(defaultFilters)
    const [page, setPage] = useState(defaultFilters?.page ?? 1)
    const [recordsPerPage, setRecordsPerPage] = useState(defaultFilters?.limit ?? 10)
    const { colorScheme } = useMantineColorScheme()

    const { token } = useAppContext();
    const { data, error, mutate, isLoading } = useSWR({
        url: url, method: method,
        extra_headers: {
            //  AUTHORIZATION: `Bearer ${token}`,
            'api-key': token
        },
        params: { ...filters, page }, useNext: useNext, useDirectUrl
    }, makeRequestOne)

    const records = data?.data?.results
    const totalRecords = data?.data?.count
    const pages = data?.data?.total_pages

    const form = useForm({
        initialValues: defaultFilters,
        validate: formValidators
    })

    const modals = useModals()

    const updateModal = (data: any) => {
        const Form = updateData?.formNode ?? Box
        return modals.openModal({
            title: updateData?.updatingModalTitle ?? "[Update title not set]",
            size: updateData?.modalSize,
            scrollAreaComponent: ScrollArea.Autosize,
            radius: "md",
            children: (
                <>
                    {
                        Form ? (<Form updating={true} data={data} mutate={mutate} {...updateData?.extraFormProps} />)
                            :
                            "[No update form]"
                    }
                </>
            )
        })
    }

    const addModal = () => {
        const Form = updateData?.formNode ?? <Box />
        return modals.openModal({
            title: "Add Entry",
            size: updateData?.modalSize,
            scrollAreaComponent: ScrollArea.Autosize,
            radius: "md",
            children: (
                <>
                    {
                        updateData?.formNode ? (<Form updating={false} mutate={mutate} {...updateData?.extraFormProps} />)
                            :
                            "[No create form]"
                    }
                </>
            )
        })
    }

    const handleDelete = (id: any) => {
        let delete_url = `${url}/${id}`
        let method = 'DELETE'
        setDeleting(true)
        makeRequestOne({
            url: delete_url,
            method,
            data: {
            },
            extra_headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res: any) => {
            showNotification({
                message: 'Deleted successfully',
                color: 'green'
            })
            mutate()
        }).catch((err: any) => {
            const errors = err?.response?.data
            showNotification({
                message: err?.response?.message,
                color: 'red'
            })
        }).finally(() => {
            setDeleting(false)
        })
    }

    const deleteModal = (id: any) => {
        return modals.openModal({
            title: updateData?.deletingModalTitle,
            radius: "md",
            color: 'red',
            centered: true,
            children: (
                <Stack style={{ justify: "relative" }}>
                    <LoadingOverlay visible={deleting} />
                    <Text>
                        Are you sure you want to delete this entry?
                    </Text>
                    <Button radius="md" color='red' onClick={() => handleDelete(id)} >
                        Delete
                    </Button>
                </Stack>
            )
        })
    }


    const updateEntry = (entry: any) => {
        if (updateModal) {
            updateModal(entry)
        }
    }

    useEffect(() => {
        setFilters(defaultFilters)
    }, [defaultFilters])

    return (
        <>
            <Stack>
                {!hideFilters && (
                    <GlobalFilterFormAjax
                        fields={filterFields}
                        form={form}
                        setFilters={setFilters}
                        defaultFilters={defaultFilters}
                        pages={pages}
                        count={totalRecords}
                        mutate={mutate}
                        addFunction={addModal}
                    />
                )}
                {/* {error ? <CustomError msg={error?.message} /> : null} */}
                <Box>
                    <DataTable
                        withTableBorder={false}
                        borderRadius="lg"
                        verticalSpacing="md"
                        minHeight={tableHeight ? undefined : 130}
                        height={tableHeight}
                        pinLastColumn
                        pinFirstColumn
                        records={records ?? []}
                        defaultColumnProps={{
                            titleStyle: (theme) => ({
                                background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[0]
                            }),
                            cellsStyle: () => (theme) => ({
                                background: isDarkMode(colorScheme) ? theme.colors.dark[6] : theme.colors.gray[0]
                            })
                        }}
                        columns={
                            [
                                ...columns,
                                {
                                    accessor: "actions",
                                    hidden: hideActionsColumn,
                                    title: <Text style={{ textAlign: "center" }} fw={500}>Actions</Text>,
                                    width: "140px",
                                    render: (item: any) => (
                                        <Group justify="center">
                                            {
                                                !hideUpdateActionBtn ? (
                                                    <Tooltip label="Update" color="indigo" withArrow>
                                                        <ActionIcon color="indigo" variant='light' size="md"
                                                            radius="md" onClick={() => updateEntry(item)}>
                                                            <IconWriting size={TABLE_ICON_SIZE} />
                                                        </ActionIcon>
                                                    </Tooltip>
                                                ) : null

                                            }
                                            {
                                                extraActionButtons?.map((action, i: number) => (
                                                    <Tooltip label={action.title} key={`extra_${i}`} color={action.color}>
                                                        <Box m={0} p={0}>
                                                            {React.createElement(action.element, { item })}
                                                        </Box>
                                                    </Tooltip>
                                                ))
                                            }
                                            <Tooltip label="Delete" color="red" withArrow>
                                                <ActionIcon color="red" variant='light'
                                                    size="md"
                                                    radius="md"
                                                    onClick={() => deleteModal(item.id)} display={hideDeleteActionBtn ? 'none' : 'inherit'}>
                                                    <IconTrash size={TABLE_ICON_SIZE} />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                    )
                                }
                            ]
                        }
                        page={Number(`${page ?? 1}`)}
                        onPageChange={setPage}
                        totalRecords={totalRecords}
                        recordsPerPage={Number(`${recordsPerPage ?? 10}`)}
                        fetching={isLoading}
                    />
                </Box>
                {!hideFilters && <CustomPaginationForForm pages={pages} form={form} />}
            </Stack>
        </>
    )
}

export default CustomDataTable
