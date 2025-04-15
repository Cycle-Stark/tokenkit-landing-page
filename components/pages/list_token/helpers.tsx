import NetworkSwitchCheckbox from "@/components/common/NetworkSwitchCheckbox";
import { useAppContext } from "@/providers/AppProvider";
import { API_ENDPOINTS } from "@/utils/constants";
import { makeRequestOne } from "@/utils/functions";
import { IWalletConnectionAndFormSubmission } from "@/utils/types";
import { Avatar, Button, Group, Stack, Text } from "@mantine/core";
import { DropzoneProps, Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { IconInfoCircle, IconUpload, IconX, IconCloudUpload } from "@tabler/icons-react";
import { useState } from "react";


export function CustomImageDropzone(props: Partial<DropzoneProps> & { callBack: (imageUrl: string) => void }) {
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const getObjectURL = (file: File): string => {
        return URL.createObjectURL(file);
    };

    const handleUploadIcon = () => {
        if (!image) {
            showNotification({
                message: "An image is required for upload",
                color: "orange",
                icon: <IconInfoCircle />
            })
            return
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("image", image)
        makeRequestOne({
            url: API_ENDPOINTS.UPLOAD_IMAGE,
            method: "POST",
            extra_headers: {
                "CONTENT-TYPE": "multipart/form-data"
            },
            data: formData,
            useNext: false,
        }).then((res: any) => {
            showNotification({
                title: "Icon upload",
                message: `Icon Uploaded succesffuly`,
                color: "green",
                icon: <IconInfoCircle />
            })
            console.log(res)
            props.callBack && props.callBack(res?.data?.image_url)
        }).catch((err: any) => {
            showNotification({
                title: "Icon upload",
                message: `An error occured during icon upload ${err}`,
                color: "red",
                icon: <IconInfoCircle />
            })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Stack>
            <Dropzone
                onDrop={(files) => setImage(files[0])}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                {...props}
                radius={"md"}
            >
                <Stack justify="center" align='center' ta={"center"} gap="xl" mih={80} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload size={42} color="var(--mantine-color-blue-6)" stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size={42} color="var(--mantine-color-red-6)" stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconCloudUpload size={42} color="var(--mantine-color-dimmed)" stroke={1.5} />
                    </Dropzone.Idle>
                    <Stack gap={"md"}>
                        <Text size="md" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Drop the token logo.
                        </Text>
                    </Stack>
                </Stack >
            </Dropzone>
            {
                image ? (
                    <Group justify='space-between'>
                        <Group gap={"20px"} >
                            <Avatar src={getObjectURL(image)} radius={"md"} size={"lg"} />
                            <Text>Token Icon</Text>
                        </Group>
                        <Button size='sm' radius={"md"} variant='light' onClick={handleUploadIcon} loading={loading}>Upload</Button>
                    </Group>
                ) : null
            }
        </Stack>
    );
}


export const WalletConnectionAndFormSubmission = ({ loading, submitButtonTitle }: IWalletConnectionAndFormSubmission) => {
    const { handleConnectWalletBtnClick, address, chainId } = useAppContext()

    return (
        <Stack gap={20}>
            <NetworkSwitchCheckbox />

            {
                (chainId && address) ? (
                    <>
                        {/* <Text ta={"center"} size='sm'>You are Listing on: {chainId}</Text> */}
                        <Text ta={"center"} size='sm' style={{
                            wordBreak: "break-all"
                        }}>Connected address: {address}</Text>
                    </>
                ) : null
            }
            {
                address ? (
                    <Group gap={10}>
                        <Button size='lg' flex={1} radius={"lg"} mt={"md"} color='indigo' type='submit' loading={loading}>{submitButtonTitle}</Button>
                        <Button size='lg' variant='light' flex={1} radius={"lg"} mt={"md"} color='indigo' type='button' onClick={() => handleConnectWalletBtnClick()}>Disconnect Wallet</Button>
                    </Group>
                ) : (
                    <Button size='lg' fullWidth radius={"lg"} mt={"md"} color='indigo' onClick={() => handleConnectWalletBtnClick()} type='button'>Connect Wallet</Button>
                )
            }
        </Stack>
    )
}