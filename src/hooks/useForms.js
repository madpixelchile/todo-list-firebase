import { useState } from "react";

export const useForms = (initialValues = {}) => {

    const [inputValue, setInputValue] = useState(initialValues);

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setInputValue({
            ...inputValue,
            [name]: value
        })
    }

    return {
        handleChange,
        inputValue,
        setInputValue
    }
}
