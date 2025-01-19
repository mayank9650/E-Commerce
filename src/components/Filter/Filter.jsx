import React from 'react'
import Button from '../../utils/atoms/button/Button'
import SingleSelect from '../../utils/molecules/singleselect/SingleSelect'
import { TEXT_CONSTANS } from '../../utils/constants';

export default function Filter({
    updateFilters,
    filterData,
    categoryOptions
}) {

    const handleConfirm = (selected) => {
        updateFilters('category', selected)
    };

    const handleCancel = () => {
        console.log('Selection cancelled');
    };

    const sortHandler = () => {
        let sorting = 'asc'
        if(filterData.sort === 'asc'){
            sorting = 'desc'
        }
        updateFilters('sort', sorting)
    }

    return (
        <div>
            <h2>{TEXT_CONSTANS.FILTERS}:</h2>
            <SingleSelect
                options={categoryOptions}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <Button 
                text={`${TEXT_CONSTANS.SORT}: ${filterData.sort ==='asc' ? TEXT_CONSTANS.LOW_TO_HIGHT : TEXT_CONSTANS.HIGH_TO_LOW}`} 
                onClick={sortHandler}
            ></Button>
        </div>
    )
}
