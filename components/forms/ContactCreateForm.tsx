import { makeRequestOne } from "@/utils/functions";
import { API_ENDPOINTS } from "@/utils/constants";
import { displayErrors } from "@/utils/functions";
import { Button, Grid, Group, Loader, Select, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconAlertTriangle, IconSend } from "@tabler/icons-react";
import { useState } from "react";

const ContactCreateForm = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            phone_no: "",
            service: "",
            other: "",
            subject: "",
            message: "",
        },
        validate: {
            name: val => val === "" ? "Your name is required" : null,
            email: val => val === "" ? "Email is required" : null,
            phone_no: val => val === "" ? "Phone Number is required" : null,
            service: val => val === "" ? "Service is required" : null,
            subject: val => val === "" ? "Subject is required" : null,
            message: val => val === "" ? "Message is required" : null,
        }
    })

    const handleSubmit = () => {
        setLoading(true)
        const data_ = JSON.parse(JSON.stringify(form.values))

        makeRequestOne({ url: API_ENDPOINTS.CONTACT_FORM, method: "POST", data: data_ }).then((res: any) => {
            showNotification({
                title: "Contact",
                message: "Message sent successfully! We'll get back to you soon.",
                color: "green",
                icon: <IconAlertCircle stroke={1.5} />
            })
            form.reset()
        }).catch(error => {
            showNotification({
                title: "Contact",
                message: error?.message || "Failed to send message",
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
        <div>
            <form onSubmit={form.onSubmit(_ => handleSubmit())}>
                <Stack gap={10}>
                    <Grid>
                        <Grid.Col span={{ md: 6 }}>
                            <TextInput
                                label="Full Name"
                                placeholder='Enter your full name'
                                radius="md"
                                {...form.getInputProps('name')}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <TextInput
                                label="Email"
                                placeholder='Enter your email address'
                                radius="md"
                                {...form.getInputProps('email')}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <TextInput
                                label="Phone Number"
                                placeholder='Enter your phone number'
                                radius="md"
                                {...form.getInputProps('phone_no')}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ md: 6 }}>
                            <Select label="Service" searchable
                                radius={'md'}
                                placeholder='Select your service'
                                data={[
                                    { value: 'token_listing', label: "Token Listing" },
                                    { value: 'api_integration', label: "API Integration" },
                                    { value: 'sdk_support', label: "SDK Support" },
                                    { value: 'partnership', label: "Partnership" },
                                    { value: 'other', label: "Other" },
                                ]}
                                clearable
                                {...form.getInputProps('service')}
                                withAsterisk
                            />
                        </Grid.Col>
                        {
                            form.values.service === "other" && (
                                <Grid.Col span={{ md: 12 }}>
                                    <TextInput
                                        label="Other"
                                        placeholder='Describe your service need'
                                        radius="md"
                                        {...form.getInputProps('other')}
                                    />
                                </Grid.Col>
                            )
                        }
                        <Grid.Col span={{ md: 12 }}>
                            <TextInput
                                label="Subject"
                                placeholder='Enter your subject'
                                radius="md"
                                {...form.getInputProps('subject')}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <Textarea
                                minRows={6}
                                rows={5}
                                label="Message"
                                placeholder='Enter your message'
                                radius="md"
                                {...form.getInputProps('message')}
                                withAsterisk
                            />
                        </Grid.Col>
                    </Grid>
                    <Group justify="center" style={{ textAlign: "center" }}>
                        <Button radius={'md'} rightSection={loading ? <Loader color='white' size={16} /> : <IconSend size={16} />} type='submit' >
                            Send Message
                        </Button>
                    </Group>
                </Stack>
            </form>
        </div>
    )
}

export default ContactCreateForm
