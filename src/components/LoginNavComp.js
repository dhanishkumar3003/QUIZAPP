import React from 'react';
import { Link } from 'react-router-dom';

function LoginNavComp() {
    return (
        <div style={{
            backgroundColor: '#2980b9',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60px',
        }}>
            <nav style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Link to="/adminlogin" style={{
                    color: 'white',
                    padding: '14px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '18px',
                    transition: 'background-color 0.3s, color 0.3s',
                    margin: '0 10px',
                }}>Admin Login</Link>
                <Link to="/teacherlogin" style={{
                    color: 'white',
                    padding: '14px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '18px',
                    transition: 'background-color 0.3s, color 0.3s',
                    margin: '0 10px',
                }}>Teacher Login</Link>
                <Link to="/" style={{
                    color: 'white',
                    padding: '14px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontSize: '18px',
                    transition: 'background-color 0.3s, color 0.3s',
                    margin: '0 10px',
                }}>Student Login</Link>
            </nav>
        </div>
    );
}

export default LoginNavComp;
