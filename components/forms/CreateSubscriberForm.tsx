
import { useAppContext } from "@/providers/AppProvider";
import { API_ENDPOINTS } from "@/utils/constants";
import { makeRequestOne, displayErrors } from "@/utils/functions";
import { Button, Group, Loader, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconAlertTriangle, IconArticle } from "@tabler/icons-react";
import { useState } from "react";


interface ICreateSubscriberForm {
    data?: any
    updating?: boolean
    mutate?: any
    label?: string
    buttonLabel?: string
}

const CreateSubscriberForm = (props: ICreateSubscriberForm) => {
    const { data, updating, mutate, label, buttonLabel } = props
    const [loading, setLoading] = useState(false)
    const {  } = useAppContext()

    const form = useForm({
        initialValues: {
            email: updating ? data?.email : ""
        },
        validate: {
            email: val => val === "" ? "Subscriber Email is required" : null
        }
    })

    const handleSubmit = () => {
        setLoading(true)
        const data_ = JSON.parse(JSON.stringify(form.values))
        let METHOD = "POST"
        let URL = API_ENDPOINTS.SUBSCRIBERS

        if (updating) {
            METHOD = "PUT"
            URL = `${URL}/${data?.id}`
        }

        makeRequestOne({
            url: `${URL}`, method: METHOD, data: data_, useNext: false, extra_headers: {
                // Authorization: `Bearer ${token}`
            }
        }).then((res: any) => {
            showNotification({
                title: "Subscriber",
                message: updating ? "Subscriber updated successfully" : "Subscriber creation successfully",
                color: "green",
                icon: <IconAlertCircle stroke={1.5} />
            })
            if (!updating) {
                form.reset()
            }
            mutate && mutate()
        }).catch((error: any) => {
            showNotification({
                title: "Subscriber",
                message: error?.message,
                color: "red",
                icon: <IconAlertTriangle stroke={1.5} />
            })
            const error_data = error?.response?.data
            if (typeof (error_data) === 'object') {
                displayErrors(form, error_data)
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Stack h={'100%'} justify="center">
            <form onSubmit={form.onSubmit(_ => handleSubmit())}>
                <Group gap={10}>
                    <TextInput {...form.getInputProps('email')} size="md" radius={'sm'} color="teal" placeholder="Enter your Email" flex={1} />
                    <Button size="md" radius={'sm'} type='submit' loading={loading} >
                        {updating ? "Update" : buttonLabel ?? "Subscribe"}
                    </Button>
                </Group>
            </form>
        </Stack >
    )
}

export default CreateSubscriberForm