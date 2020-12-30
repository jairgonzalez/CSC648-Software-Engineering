import React from 'react';
import { Field, Formik } from 'formik';
import { Container } from '@components/Layouts';
import { Text } from '@components/DataDisplay';
import { InputField } from '../components/InputFields';

const FireDataEntry = (): JSX.Element => {
  // const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  // const url = `${baseURL}/api/users/login`;
  return (
    <Container align="center">
      <Text variant="h1"> Wild Fire Data Entry Form</Text>
      <Formik
        onSubmit={(data) => {
          console.log(data);
        }}
        initialValues={{
          start_date: '',
          end_date: '',
          aqi: '',
          EvacuationLevel: '',
          county_id: '',
          county: '',
          area: '',
          active: '',
          name: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="start_date"
                required
                placeholder="start date "
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="end_date"
                required
                placeholder="end date"
                component={InputField}
              />
            </div>

            <div>
              <Field
                name="aqi"
                required
                placeholder="Air Quality Level"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="EvacuationLevel"
                required
                placeholder="Evacuation Level"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="county_id"
                required
                placeholder="county id"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="county"
                required
                placeholder="county name"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="area"
                required
                placeholder="area"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="active"
                required
                placeholder="active"
                component={InputField}
              />
            </div>
            <div>
              <Field
                name="name"
                required
                placeholder="name of fire"
                component={InputField}
              />
            </div>

            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default FireDataEntry;
