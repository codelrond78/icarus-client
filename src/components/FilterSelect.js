import { Select } from "@chakra-ui/react";

const FilterSelect = ({onChange, value}) => {
    return <Select onChange={onChange} value={value}>
        <option value='ALL'>All</option>
        <option value='TEMPLATE'>Only templates</option>
        <option value='RUNNING'>Only running</option>
    </Select>
}

export default FilterSelect;