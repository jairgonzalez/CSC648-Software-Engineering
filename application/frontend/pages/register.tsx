import React from 'react';
import { useRouter } from 'next/router';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { InputField } from '../components/InputFields';
import { Link, Text } from '@components/DataDisplay';
import { Button } from '@components/Inputs';

const Register = (): JSX.Element => {
  const router = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseURL}/api/users/register`;
  return (
    <Container align="center">
      <Text variant="h1">Registration</Text>
      <Formik
        onSubmit={(data) => {
          console.log(JSON.stringify(data));
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            alert('Email is wrong format');
            return;
          }
          if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/i.test(data.password)) {
            alert(
              'password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'
            );
            return;
          }
          if (data.password !== data.confirm_password) {
            alert('passwords do not match');
            return;
          }

          fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
            .then((response) => console.log(response))
            // Redirect the user to log in
            .then(() => router.push('/Login'))
            // Should show useful feedback - for now we log
            .catch((err) => console.log(err));
        }}
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
          confirm_password: '',
          phone: '',
          address: '',
          county: '',
          zipcode: '',
          city: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="firstName"
                required
                placeholder="firstName"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="lastName"
                required
                placeholder="lastName"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="email"
                required
                placeholder="email"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="phone"
                required
                placeholder="phone number"
                component={InputField}
              />
              <Field
                name="password"
                required
                placeholder="password"
                type="password"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="confirm_password"
                required
                placeholder="confirm password"
                type="password"
                id="message"
              />
            </div>
            <div>
              <Field
                name="address"
                required
                placeholder="address"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="county"
                required
                placeholder="county"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="zipcode"
                required
                placeholder="zipcode"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="city"
                required
                placeholder="city"
                component={InputField}
              />
            </div>

            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
      <Text variant="h6">Already Registered?</Text>
      <Link href="/Login">
        <Button variant="secondary"> Login</Button>
      </Link>
    </Container>
  );
};

export default Register;
