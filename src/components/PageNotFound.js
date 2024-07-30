import React from 'react';
import error404image from '../shared/images/error.jpg';

const PageNotFound = () => {
    return (
        <div style={styles.container}>
            <h3 style={styles.text}>Page Not Found</h3>
            <img 
                style={styles.image} 
                src={error404image} 
                alt="Error" 
                width="400px" 
                height="400px" 
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
    },
    text: {
        color: 'red'
    },
    image: {
        display: 'block',
        margin: '0 auto'
    }
};

export default PageNotFound;
