import React, { useState } from 'react';
import Services from '../../api/rest/services';
import store from '../../state/store';

const LoginPage: React.FC = () => {
    const [{ email, password }, setFormState] = useState({
        email: '',
        password: ''
    });

    const handleChange = ({ target: { name, value }}) => setFormState(state => ({ ...state, [name]: value}));

    const handleSubmit = async () => {
        try {
            await Services.Auth.login(email, password);
            const user = await Services.Auth.authenticate();
            store.dispatch({ type: 'SET_USER', payload: user });
        } catch(error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <label>
                <p>E-Mail:</p>
                <input type="email" name="email" onChange={handleChange} value={email} />
            </label>
            <label>
                <p>Password:</p>
                <input type="password" name="password" onChange={handleChange} value={password} />
            </label>
            <input type="submit" onClick={handleSubmit} />
        </div>
    );
};

export default LoginPage;
