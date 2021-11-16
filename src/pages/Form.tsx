import { Formik, Form, Field, FieldArray } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";

import FormStore from "../mobx/FormStore";

const FormikForm = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required").email(),
    fields: Yup.array().of(
      Yup.object().shape({
        note: Yup.string()
          .required("Required")
          .min(4, "Must be longer than 4 characters"),
        subOptions: Yup.array().of(
          Yup.object().shape({
            color: Yup.string().required("Required"),
          })
        ),
      })
    ),
  });

  return (
    <div>
      <h3>Sign Up</h3>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          fields: [{ note: "", subOptions: [{ color: "" }] }],
        }}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          FormStore.updateForms(values);
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
          }, 400);
        }}
      >
        {({ values, errors }) => (
          <Form>
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                maxWidth: 500,
              }}
            >
              <p style={{ margin: 0 }}>First Name</p>
              <Field name="firstName" style={{ marginBottom: 5 }} />
              <p style={{ margin: 0 }}>Last Name</p>
              <Field name="lastName" style={{ marginBottom: 5 }} />
              <p style={{ margin: 0 }}>Email</p>
              <Field name="email" style={{ marginBottom: 25 }} />
              <FieldArray name="fields">
                {({ push }) => (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        push({ note: "", subOptions: [{ color: "" }] })
                      }
                      style={{ marginBottom: 10 }}
                    >
                      Add Field
                    </button>
                    {values.fields.map((_, idx) => (
                      <>
                        <p style={{ margin: 0 }}>Note {idx + 1}</p>
                        <Field
                          name={`fields[${idx}].note`}
                          style={{ marginBottom: 5 }}
                        />
                        <p style={{ marginTop: 10, marginBottom: 0 }}>
                          Choose your favorite color:
                        </p>

                        <Field
                          as="select"
                          name={`fields[${idx}].subOptions[0].color`}
                          style={{ marginBottom: 10 }}
                        >
                          <option value="">Choose a color...</option>
                          <option value="red">Red</option>
                          <option value="green">Green</option>
                          <option value="blue">Blue</option>
                        </Field>
                      </>
                    ))}
                  </>
                )}
              </FieldArray>
            </div>
            <button type="submit" style={{ marginTop: 10 }}>
              Submit
            </button>
            <p>Formik Values</p>
            <p>{JSON.stringify(values)}</p>
            <p>Formik Errors</p>
            <p>{JSON.stringify(errors)}</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(FormikForm);
