import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Loding } from '@components/index';
import styles from '@pages/auth/LoginPage/LoginPage.module.css';
import { myaxios as axios } from '@utils/apiController';
import { SessionStorage } from '@utils/storage';

import {
  APIPurpose as Purpose,
  SessionData,
  APIStatus as Status,
} from '@utils/custom_constant';
import { set_title } from 'App';

type Props = {};

interface LoginForm {
  email: string;
  password: string;
  keep: boolean;
}

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
});

const IS_LOGINED: string = 'is_logined';

const get_local = (key: string) => {
  return localStorage.getItem(key);
};

const LoginPage = (props: Props) => {
  const [isLogined, setIsLogined] = useState<boolean>(
    Boolean(get_local(IS_LOGINED))
  );

  useEffect(() => {
    set_title('Login');
  });

  const navigate = useNavigate();

  const handleSubmit = (values: LoginForm) => {
    const login = async () => {
      try {
        const response = await axios.post(Purpose.ADMIN_LOGIN, {
          email: values.email,
          password: values.password,
        });
        const data = response.data;
        const sessionStorage = SessionStorage.getInstance();
        sessionStorage.set(SessionData.ACCESS, data.access);
        sessionStorage.set(SessionData.REFRESH, data.refresh);
        navigate('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            const status: number = error.response.status;
            if (status === Status.BAD_REQUEST) {
              alert('invalid email or password');
              console.log(error.message);
            } else if (status === Status.SERVER_ERROR) {
              alert('server error please wait or call to server manager');
            }
          } else if (error.request) {
            console.log('request', error.request);
          } else {
            console.log('Error', error.message);
          }
        }
      }
    };
    login();
  };
  return isLogined ? (
    <Loding />
  ) : (
    <div>
      <h1 className={styles.test}>Admin Login Page</h1>
      <Formik
        initialValues={{ email: '', password: '', keep: false }}
        validationSchema={LoginValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label>
              E-Mail <Field name='email' type='email' autoFocus={true} />
            </label>
          </div>
          <div>
            <label>
              Password <Field name='password' type='password' />
            </label>
          </div>
          <button name='login-submit' type='submit'>
            전송{' '}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
