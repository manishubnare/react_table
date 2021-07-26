import React,{} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import {useImperativeHandle, useRef, forwardRef,useState} from 'react';

function Date(props,ref){
    const dateFormat = 'DD/MM/YYYY'
    const [inputDate , setInputDate] = useState(moment(dateFormat));
    useImperativeHandle(ref, () => {
        return {
            getValue: () => {
                return inputDate;
            }
        };
    });
    
    return(
        <DatePicker onChange={(value , e) => setInputDate(e)} />
    );
}

export default forwardRef(Date);