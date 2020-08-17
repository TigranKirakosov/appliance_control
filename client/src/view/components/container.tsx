import React from 'react';

const Container: React.FC<any> = ({ children, p, m, border, ...rest }) => {
    const styles = {
        padding: `${p || 0}rem`,
        margin: `${m || 0}rem 0`,
        border: `${border}px solid black`
    };
    return (
        <div {...rest} style={styles}>{children}</div>
    );
};

export default Container;
