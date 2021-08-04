import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const LoginPage = () => {

    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberme: false
    });

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setForm((form) => ({
                ...form,
                rememberme: true,
                email
            }));
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

    const onSubmit = async(ev) => {
        ev.preventDefault();
        (form.rememberme) ? localStorage.setItem('email', form.email) : localStorage.removeItem('email');

        const { email, password } = form;
        const ok = await login(email, password);

        if(!ok){
            Swal.fire('Error', 'Verifique su Usuario o Contraseña');
        }
    }

    const todoOk = () => {
        return (form.email.length > 0  && form.password.length > 0) ? true : false;
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
                <button disabled={!todoOk()} type="submit" className="login100-form-btn">
                    Ingresar
                </button>
            </div>

        </form>
    )
}
