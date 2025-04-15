import { useState } from 'react';
import { CheckIcon, Combobox, Group, Input, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { LANGUAGES } from '@/utils/languages';


export function CustomLanguagesComboBox({ update, activeLanguage }: { update: any, activeLanguage: string }) {

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = LANGUAGES.sort((a, b) => a.value.localeCompare(b.value)).map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
            <Group gap="xs">
                {item.value === activeLanguage && <CheckIcon size={12} />}
                <span>{item.label}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                update(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                >
                    {activeLanguage || <Input.Placeholder>Select Language</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <ScrollArea h={'300px'}>
                <Combobox.Options>{options}</Combobox.Options>
                </ScrollArea>
            </Combobox.Dropdown>
        </Combobox>
    );
}