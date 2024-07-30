import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const VoucherUpdateComp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [itemData, setItemData] = useState({ id: "", voucher_number: "" });

    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setItemData({ ...itemData, [name]: value });
    };

    const addRecord = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8888/voucher/${id}`, itemData)
            .then(() => {
                window.alert("Voucher Updated Successfully");
                navigate('/maindashboard/voucherdash');
            })
            .catch((error) => { console.error(error); });
    };

    useEffect(() => {
        axios.get(`http://localhost:8888/voucher/${id}`)
            .then((res) => {
                setItemData(res.data);
            })
            .catch((error) => { console.error(error); });
    }, [id]);

    return (
        <div>
            <h2>This is Voucher Update Component</h2>
            <div className='row'>
                <div className='col-sm-3'></div>
                <div className='col-sm-6'>
                    <form onSubmit={addRecord}>
                        <label className='form-label'>Enter Voucher Number</label>
                        <input type='text' name="voucher_number" onChange={inputChangeHandler} value={itemData.voucher_number} className='form-control' />
                        <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                    </form>
                </div>
                <div className='col-sm-3'></div>
            </div>
        </div>
    );
};

export default VoucherUpdateComp;
