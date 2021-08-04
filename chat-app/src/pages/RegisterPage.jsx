import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../auth/AuthContext';

export const RegisterPage = () => {

    const { register } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: 'Test 1',
        email: 'test1@test.com',
        password: 'Admin123'
    });

    const onChange = ({ target }) => {
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async(ev) => {
        ev.preventDefault();

        const {name, email, password } = form;
        const msg = await register(name, email, password);

        if(msg !== true){
            Swal.fire('Error', msg);
        }
    }

    const todoOk = () => {
        return (form.name.length > 0  && form.email.length > 0  && form.password.length > 0) ? true : false;
    }

    return (
        <form onSubmit={onSubmit} className="login100-form validate-form flex-sb flex-w">
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input  value={form.name} onChange={onChange} className="input100" type="text" name="name" placeholder="Nombre" />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input value={form.email} onChange={onChange} className="input100" type="email" name="email" placeholder="Email" />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input value={form.password} onChange={onChange} className="input100" type="password" name="password" placeholder="Password" />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button disabled={!todoOk()} type="submit" className="login100-form-btn">
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}
