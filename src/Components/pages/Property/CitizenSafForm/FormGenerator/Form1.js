import React from 'react'
import FormGenerator from './FormGenerator'

function Form1() {

    const inputList = [
        { type: 'text', name: 'khata No', id: 'khataNo', dataList: null, required: true,validationMsg:'Enter k' },
        { type: 'date', name: 'plot No', id: 'plotNo', dataList: null, required: true,validationMsg:'Enter date' },
        { type: 'text', name: 'pincode', id: 'pincode', dataList: null, required: true,validationMsg:'Enter pin' },
        { type: 'text', name: 'city', id: 'city', dataList: null, required: false,validationMsg:'Enter' },
        { type: 'text', name: 'locality', id: 'locality', dataList: null, required: true,validationMsg:'Enter locality' },
        { type: 'select', name: 'ward no', id: 'ward', dataList: null, required: true,validationMsg:'Enterr ward' },
    ]
    return (
        <FormGenerator inputList={inputList} />
    )
}

export default Form1