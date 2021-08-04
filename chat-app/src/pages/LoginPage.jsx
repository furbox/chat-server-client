import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
    const [form, setForm] = useState({
        email: 'furbox@gmail.com',
        password: 'Admin123',
        rememberme: false
    });
    useEffect(() => {
        const email = localStorage.getItem('email');
        if(email){
            setForm({
                ...form,
                rememberme: true,
                email
            })
        }
    }, []);
    
    const onChange = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        });
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if(form.rememberme){
            localStorage.setItem('email', form.email);
        }else{
            localStorage.removeItem('email');
        }
    }

    return (
        <form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input value={form.email} onChange={onChange} className="input100" type="email" name="email" placeholder="Email" />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input value={form.password} onChange={onChange} className="input100" type="password" name="password" placeholder="Password" />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col" onClick={() => toggleCheck()}>
                    <input readOnly checked={form.rememberme} onChange={onChange} className="input-checkbox100" id="ckb1" type="checkbox" name="rememberme" />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn">
                    Ingresar
                </button>
            </div>

        </form>
    )
}
