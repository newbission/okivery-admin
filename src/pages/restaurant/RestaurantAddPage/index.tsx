import { AxiosError } from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import styles from '@pages/auth/LoginPage/LoginPage.module.css';
import { getResponseData } from '@utils/apiController';
import { SessionStorage } from '@utils/storage';

import { APIPurpose, SessionData, APIStatus } from '@utils/custom_constant';
import { set_title } from 'App';
import TimePicker from '@components/TimePicker';

interface LoginForm {
  email: string;
  password: string;
  keep: boolean;
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
        });
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

interface RestaurantAddForm {
  // 이름
  // 오픈시간
  // 닫는시간
  // 로고
  // 설명 및 공지사항
  // 원산지
  name: string;
  openTime: string;
  closeTime: string;
  logo: File;
}

const RestaurantAddValidationSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required'),
  password: Yup.string().required('password is required'),
});

const RestaurantAddPage = () => {
  const [openTime, setOpenTime] = useState<string>('00:00');
  const [closeTime, setCloseTime] = useState<string>('00:00');
  const [imgBase64, setImgBase64] = useState<string | null>(null); // 파일 base64
  const [imgFile, setImgFile] = useState<File | null>(null); // 파일

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setImgBase64(null);
    if (!files || !files.length) return;
    const file = files[0];
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImgBase64(base64);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <h1>Add New Restaurant</h1>
      <input type='text' id='name' placeholder='Restaurant name' />
      <TimePicker time={openTime} setTime={setOpenTime} />
      <TimePicker time={closeTime} setTime={setCloseTime} />
      <label>
        <input
          type='file'
          id='file'
          onChange={handleChangeFile}
          style={{ display: 'none' }}
        />
        {imgBase64 ? (
          <img
            src={imgBase64}
            alt='Uploaded Image'
            width='128'
            height='128'
            style={{ display: 'block' }}
          />
        ) : (
          <div
            style={{
              display: 'block',
              width: '128px',
              height: '128px',
              backgroundColor: 'red',
              color: 'white',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            choose logo
          </div>
        )}
      </label>
      <textarea placeholder='description and notice'/>
      <textarea placeholder='material origin' />
    </>
  );
};

export default React.memo(RestaurantAddPage);
