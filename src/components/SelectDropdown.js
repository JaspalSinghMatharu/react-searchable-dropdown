import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

const propTypes = {
    /** Data for options of select dropdown */
    data: PropTypes.array,
    /** Placeholder text for select dropdwon */
    placeholder: PropTypes.string,
    /** Boolean value to set if the select dropdown is searchable */
    searchable: PropTypes.bool,
    /** Boolean value to set if the select dropdown has multiple select option */
    multiselect: PropTypes.bool,
    /** The key of value to be displayed in the select */
    label: PropTypes.string,
    /** Callback function to be fired on text input change */
    onInputChange: PropTypes.func
}

const defaultProps = {
    data: [],
    placeholder: 'Select',
    searchable: true,
    multiselect: false,
    label: "",
}

function SelectDropdown(props) {

    const [filteredData, setFilteredData] = useState(props.data);
    const [searchInput, setSearchInput] = useState('');
    const [selectedOptions, setSelections] = useState(props.multiselect ? [] : "");
    const [isOptionVisible, setOptionVisibility] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const selectAllCheckBox =  useRef(null);

    useEffect(() => {
        if(selectedOptions.length && selectedOptions.length !== props.data.length && selectAllCheckBox.current ) {
           selectAllCheckBox.current.indeterminate = true;
        }
        else if(selectAllCheckBox.current) {
           selectAllCheckBox.current.indeterminate = false;
        }
    }, [selectedOptions])

    useEffect(() => {
        document.addEventListener('click', () => {
            setOptionVisibility(false);
        })

        return () => {
            document.removeEventListener('click', () => {
                setOptionVisibility(false)
            })
        }
    })

    const handleInputChange = (e) => {
        const {label, data, onInputChange} = props;
        let userInput = e.target.value.toLowerCase();
        let updatedData = data.filter((item) => {
            let optionText = label ? item[label]: item;
            return optionText.toLowerCase().indexOf(userInput) !== -1
        })

        setFilteredData(updatedData);
        setSearchInput(userInput);

        if(onInputChange) {
            onInputChange(e);
        }
    }

    const toggleOptions = () => {
        setOptionVisibility(!isOptionVisible);
    }

    const handleOptionClick = (e) => {
        const {multiselect, data} = props;
        let currentOption = e.currentTarget.getAttribute('data-value');
        if(multiselect) {
            let selectedIndex = selectedOptions.indexOf(currentOption);
            if(selectedIndex === -1) {
                setSelections([...selectedOptions, currentOption]);
            }
            else {
                let stateToUpdate = [...selectedOptions];
                stateToUpdate.splice(selectedIndex, 1);
                setSelections([...stateToUpdate]);
                setSelectAll(false)
            }   
        }
        else {
            setSelections(currentOption);
            setOptionVisibility(false);
            setSearchInput('');
            setFilteredData(data);
        }
    }

    const handleSelectAllClick = (e) => {
        const {label, data} = props;
        let allValues = label ? data.map(item => item[label]): data;
        
        if(selectedOptions.length && selectedOptions !== data.length) {
            setSelectAll(false);
            setSelections([]);
            return;
        }

        if(e.target.checked) {
            setSelections(allValues);
            setSelectAll(true)
        }
        else {
            setSelections([]);
            setSelectAll(false);
        }
    }

    const setSelectedValue = () => {
        const {multiselect} = props;
        let selectedValue = multiselect ? selectedOptions.join(',') : selectedOptions;
        return selectedValue;
    }

    const handleClearClick = () => {
        setSelections([]);
        setSelectAll(false);
    }

    const handleSubmitClick = () => {
        setOptionVisibility(false);
    }

    const handleSelectDropdownClick = (e) => {
        e.stopPropagation();
    }

    const {
        placeholder,
        searchable,
        multiselect,
        label,
        data
    } = props;

    const isIndeterminate = selectedOptions.length > 0 && selectedOptions.length !== data.length;
    const isSelectAllChecked = selectAll || selectedOptions.length == data.length;

    return (
        <div className="select-dropdown" onClick={handleSelectDropdownClick}>
            <div className="select-input-wrapper" onClick={toggleOptions}> 
                <div className="select-input input-placeholder">
                    {selectedOptions.length ? <span>{placeholder} - <span className="selected-highlighter">{setSelectedValue()}</span></span>: placeholder }
                </div>
                <span className={`select-arrow ${isOptionVisible ? 'active': ''}`}></span>
            </div>
            {isOptionVisible && 
                <div className='select-options-container'>
                    {searchable ? <input className="select-input search-input" placeholder='Search' value={searchInput} onChange={handleInputChange} /> : null }
                    <div className="options-wrapper">
                        {multiselect &&
                            <div className="select-options__item">
                                <CheckBox ref={selectAllCheckBox} onChange={handleSelectAllClick} checked={isSelectAllChecked} indeterminate={isIndeterminate} />
                            </div>
                        }
                        <ul className="select-options-list">
                            {
                                filteredData && filteredData.map((item, index) => {
                                    let selectOptionLabel = label ? item[label] : item;
                                    return ( 
                                            multiselect ? 
                                            <li onClick={handleOptionClick} key={index} data-value={selectOptionLabel} className="select-options__item">
                                                <CheckBox readOnly checked={selectedOptions.indexOf(selectOptionLabel) !== -1} label={selectOptionLabel} />
                                            </li>: 
                                            <li onClick={handleOptionClick} key={index} data-value={selectOptionLabel} className={`select-options__item  ${selectedOptions.indexOf(selectOptionLabel) !== -1 ? 'selected-option': ''}`}>
                                                {selectOptionLabel}
                                            </li>
                                    )
                                })
                            }
                        </ul>
                        {multiselect &&
                            <div className="select-option-footer">
                                <button className="btn" onClick={handleClearClick}>Clear</button>
                                <button className="btn btn-primary" onClick={handleSubmitClick}>Submit</button>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;

export default SelectDropdown;
