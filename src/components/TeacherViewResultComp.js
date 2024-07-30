import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Results = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8888/student`)
            .then(response => {
                setDatas(response.data);
                console.log("Data fetched successfully:", response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const renderTableRows = () => {
        return datas.map((data, index) => (
            <tr key={index} style={tableRowStyle}>
                <td style={tableCellStyle}>{data.student_name}</td>
                <td style={tableCellStyle}>{data.student_email}</td>
                <td style={tableCellStyle}>
                    <ul style={listStyle}>
                        {data.results.map((result, idx) => (
                            <li key={idx} style={listItemStyle}>
                                Exam: {result.examName}, Score: {result.score}
                            </li>
                        ))}
                    </ul>
                </td>
            </tr>
        ));
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Student Results</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Email</th>
                        <th style={tableHeaderStyle}>Results</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

// CSS styles
const containerStyle = {
    margin: '20px',
    textAlign: 'center',
};

const headingStyle = {
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
};

const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid #ddd', // Adding a border to the entire table
};

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd',
};

const tableRowStyle = {
    borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
    padding: '10px',
    textAlign: 'center', // Center aligns content in table cells
};

const listStyle = {
    listStyleType: 'none',
    padding: 0,
};

const listItemStyle = {
    marginBottom: '5px',
};

export default Results;