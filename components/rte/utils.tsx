
import { Button, Stack, TextInput, Popover } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { RichTextEditor, useRichTextEditorContext } from "@mantine/tiptap";
import { IconPhotoPlus, IconVideoPlus, IconCodeAsterix, IconCode } from "@tabler/icons-react";
import { CustomLanguagesComboBox } from "./CustomLanguagesComboBox";


export function ImageControl() {
    const { editor } = useRichTextEditorContext();
    const [opened, { open, close }] = useDisclosure()

    const form = useForm({
        initialValues: {
            src: ''
        },
        validate: {
            src: val => val === '' ? ' image url' : null
        }
    })

    const insertImage = () => {
        const src = form.values.src
        if (src !== '') {
            editor?.chain().focus().setImage({ src }).run()
            close()
        }
    }


    return (
        <>
            <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened} onClose={close}>
                <Popover.Target>
                    <RichTextEditor.Control
                        onClick={() => open()}
                        aria-label=" Image"
                        title=" Image"
                    >
                        <IconPhotoPlus stroke={1.5} size="1rem" />
                    </RichTextEditor.Control>
                </Popover.Target>
                <Popover.Dropdown>
                    <Stack>
                        <TextInput label="Image URL" radius={'md'} {...form.getInputProps('src')} />
                        <Button size='sm' onClick={insertImage}>Insert</Button>
                    </Stack>
                </Popover.Dropdown>
            </Popover>

        </>
    );
}

export function YoutubeControl() {
    const { editor } = useRichTextEditorContext();
    const [opened, { open, close }] = useDisclosure()

    const form = useForm({
        initialValues: {
            src: ''
        },
        validate: {
            src: val => val === '' ? ' image url' : null
        }
    })

    const insertVideo = () => {
        const src = form.values.src
        if (src !== '') {
            editor?.commands.setYoutubeVideo({
                src: src
            })
            close()
        }
    }


    return (
        <>
            <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened} onClose={close}>
                <Popover.Target>
                    <RichTextEditor.Control
                        onClick={() => open()}
                        aria-label=" Video"
                        title=" Video"
                    >
                        <IconVideoPlus stroke={1.5} size="1rem" />
                    </RichTextEditor.Control>
                </Popover.Target>
                <Popover.Dropdown>
                    <Stack>
                        <TextInput label="Youtube Video URL" radius={'md'} {...form.getInputProps('src')} />
                        <Button size='sm' onClick={insertVideo}>Insert</Button>
                    </Stack>
                </Popover.Dropdown>
            </Popover>
        </>
    );
}

const CodeBlockForm = ({ editor, onClose }: { editor: any, onClose: any }) => {

    const form = useForm({
        initialValues: {
            language: 'plaintext'
        },
        validate: {
            language: val => (val === '' || !val) ? 'Select Language to Use' : null
        }
    })

    const insertCodeBlock = () => {
        console.log("Inserting")
        console.log(editor, form.values.language)

        editor?.commands.setCodeBlock({
            language: form.values.language
        })
        console.log("closing")
        onClose && onClose()
    }

    const updateLanguage = (val: string) => {
        form.setFieldValue('language', val)
        editor?.commands.setCodeBlock({
            language: val
        })
        onClose && onClose()
    }

    console.log(form.values.language)

    return (
        <Stack>
            <CustomLanguagesComboBox update={updateLanguage} activeLanguage={form.values.language} />
            <Button size='sm' onClick={insertCodeBlock}>Insert</Button>
        </Stack>
    )
}


export function CodeBlockControl() {
    const [opened, { open, close }] = useDisclosure()
    const { editor } = useRichTextEditorContext();

    return (
        <>
            <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened} onClose={close}>
                <Popover.Target>
                    <RichTextEditor.Control
                        onClick={open}
                        aria-label=" codeblock"
                        title="Set Codeblock"
                    >
                        <IconCodeAsterix stroke={1.5} size="1rem" />
                    </RichTextEditor.Control>
                </Popover.Target>
                <Popover.Dropdown>
                    <CodeBlockForm editor={editor} onClose={close} />
                </Popover.Dropdown>
            </Popover>
        </>
    );
}

export function CodeControl() {
    const { editor } = useRichTextEditorContext();
    const Code = () => {
        editor?.commands.setCode()
    }


    return (
        <>
            <RichTextEditor.Control
                onClick={Code}
                aria-label=" code"
                title=" code"
            >
                <IconCode stroke={1.5} size="1rem" />
            </RichTextEditor.Control>
        </>
    );
}