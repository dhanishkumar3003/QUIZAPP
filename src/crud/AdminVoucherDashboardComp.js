import axios from 'axios';
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const AdminVoucherDashboardComp = () => {
    const [itemData,setItemData] = useState([]);

    useEffect(()=>{
        fetchData()
    },[])


    const fetchData = ()=>{
        axios.get(`http://localhost:8888/voucher`).then((res)=>{
            // console.log(res.data);
            setItemData(res.data)
        }).catch((error)=>{})
    }

    const deleteRecord = (id)=>{
        if(window.confirm(`Are You Sure To Delete Voucher With Id:${id}`)){
            axios.delete(`http://localhost:8888/voucher/${id}`).then(()=>{
                window.alert("Record Delete Successfully");
                fetchData();
               }).catch((error)=>{})
        }
    }
    return (
        <div>
            
            <Link to="/admindashboard/voucheradd" className='btn btn-primary mb-2'>
            <AddIcon></AddIcon>Add</Link>

            <table className='table table-hover table-striped '>
              <thead>
                <tr className='table-dark'>
                    <th>Sr.No</th><th>Voucher</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                itemData.length > 0 && itemData.map((val,index)=>{
                        return <tr>
                            <td>{index+1}</td>
                            <td>{val.voucher_number}</td>
                            <td>
                               <button type='button' onClick={()=>deleteRecord(val.id)} className='btn btn-outline-danger btn-sm'>
                                    <DeleteOutlineIcon></DeleteOutlineIcon>
                                </button>
                            </td>
                        </tr>
                    })
                }
              </tbody>
            </table>
        </div>
    )
}

export default AdminVoucherDashboardComp;