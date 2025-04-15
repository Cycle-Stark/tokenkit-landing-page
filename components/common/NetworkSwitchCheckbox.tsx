import { Checkbox, Group, Radio, Stack, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import classes from "@/styles/checkbox.module.css"
import { useAppContext } from '@/providers/AppProvider';

const data = [
    {
        name: 'Mainnet',
        value: "SN_MAIN",
        description: 'Starknet Mainnet Network',
    },
    {
        name: 'Sepolia',
        value: "SN_SEPOLIA",
        description: 'Starknet Sepolia Network',
    },
];

const NetworkSwitchCheckbox = () => {
    const { chainId, switchNetwork, connection } = useAppContext()
    const [value, setValue] = useState<any>(chainId);


    const cards = data.map((item) => (
        <Radio.Card className={classes.root} radius="md" value={item.value} key={item.name} color='indigo'>
            <Group wrap="nowrap" align="flex-start">
                <Radio.Indicator color='indigo' />
                <div>
                    <Text className={classes.label}>{item.name}</Text>
                    <Text className={classes.description}>  {item.description}</Text>
                </div>
            </Group>
        </Radio.Card>
    ));

    useEffect(() => {
        if (value) {
            switchNetwork(connection, value)
        }
    }, [value])

    return (
        <div>
            <Radio.Group
                size='sm'
                value={value}
                onChange={setValue}
                label="Pick Network"
                description="Choose a network you want to use"
            >
                <Stack pt="md" gap="xs">
                    {cards}
                </Stack>
            </Radio.Group>
        </div >
    )
}

export default NetworkSwitchCheckbox