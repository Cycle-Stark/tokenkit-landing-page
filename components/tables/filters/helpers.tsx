import { Grid, NumberInput, Select, Slider, Stack, Text, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"


interface SliderMark {
    value: string | number
    label: string
}

export interface FilterField {
    label: string
    accessor: string
    gridSize: number
    placeholder: string
    type: 'select' | 'text' | 'checkbox' | 'number' | 'slider' | 'date'
    options?: SelectOption[] | SelectGroup[]
    marks?: SliderMark[]
}

export interface SelectOption {
    value: string
    label: string
}

export interface SelectGroup {
    group: string;
    items: SelectOption[];
}

export function renderField(field: FilterField, i: number, form: any) {
    if (field.type === 'number') {
        return (
            <Grid.Col key={`field_${i}_${field.accessor}`} span={{ md: field.gridSize }}>
                <NumberInput {...form.getInputProps(field.accessor)}
                    placeholder={field.placeholder}
                    hideControls
                    label={<Text size="sm">{field.label}</Text>} radius="md" />
            </Grid.Col>
        )
    }
    if (field.type === 'text') {
        return (
            <Grid.Col key={`field_${i}_${field.accessor}`} span={{ md: field.gridSize }}>
                <TextInput {...form.getInputProps(field.accessor)}
                    placeholder={field.placeholder}
                    label={<Text size="sm">{field.label}</Text>} radius="md" />
            </Grid.Col>
        )
    }
    if (field.type === 'date') {
        return (
            <Grid.Col key={`field_${i}_${field.accessor}`} span={{ md: field.gridSize }}>
                <DateInput {...form.getInputProps(field.accessor)}
                    placeholder={field.placeholder}
                    label={<Text size="sm">{field.label}</Text>} radius="md" clearable />
            </Grid.Col>
        )
    }
    if (field.type === 'slider') {
        return (
            <Grid.Col key={`field_${i}_${field.accessor}`} span={{ md: field.gridSize }}>
                {/* <Center className='h-100'> */}
                <Stack className='h-100' gap={5}>
                    <Text size="sm">{field.label}</Text>
                    <Slider {...form.getInputProps(field.accessor)}
                        placeholder={field.placeholder}
                        radius="md"
                        marks={field.marks}
                        step={0.5}
                        min={0.5}
                        max={5}
                    />
                </Stack>
                {/* </Center> */}
            </Grid.Col>
        )
    }
    if (field.type === 'select') {
        return (
            <Grid.Col key={`field_${i}_${field.accessor}`} span={{ md: field.gridSize }}>
                <Select {...form.getInputProps(field.accessor)}
                    label={<Text size="sm">{field.label}</Text>}
                    placeholder={field.placeholder}
                    radius="md"
                    data={field?.options || []}
                    maxDropdownHeight={300}
                    nothingFoundMessage="No options"
                    searchable
                // filter={(value, item: any) =>
                //     item.label.toLowerCase().includes(value.toLowerCase().trim())
                // } 
                />
            </Grid.Col>
        )
    }
    return <></>
}