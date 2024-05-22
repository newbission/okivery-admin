import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import styles from '@pages/auth/LoginPage/LoginPage.module.css';
import { getResponseData } from '@utils/apiController';
import { SessionStorage } from '@utils/storage';

import { APIPurpose, SessionData, APIStatus } from '@utils/custom_constant';
import { set_title } from 'App';

interface LoginForm {
  email: string;
  password: string;
}

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
});

const LoginPage = () => {
  useEffect(() => {
    set_title('Login');
  });

  const navigate = useNavigate();

  const handleSubmit = (values: LoginForm) => {
    const login = async () => {
      try {
        const response = await getResponseData(APIPurpose.ADMIN_LOGIN, 'POST', {
          email: values.email,
          password: values.password,
        })
        if (response?.status === APIStatus.OK) {
          const data = response.data;
          const sessionStorage = SessionStorage.getInstance();
          sessionStorage.set(SessionData.ACCESS, data.access);
          sessionStorage.set(SessionData.REFRESH, data.refresh);
        }
        navigate('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            const status: number = error.response.status;
            if (status === APIStatus.BAD_REQUEST) {
              alert('invalid email or password');
              console.log(error.message);
            } else if (status === APIStatus.SERVER_ERROR) {
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
  return (
    <div>
      <h1 className={styles.test}>Admin Login Page</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
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
