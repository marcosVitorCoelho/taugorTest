import { Field, Form, Formik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import * as S from './styles'
import EmployeeContext from "../../contexts/EmployeeContext";
import CustomInput from "../../components/Input";
import DateInput from "../../components/DateInput";
import Button from "@mui/material/Button";


const SignInSchema = yup.object().shape({
  firstName: yup.string().required("Preencha o primeiro nome").min(1, 'Digite o primeiro nome completo'),
  lastName: yup.string().required("Preencha o sobrenome").min(1, 'Digite o sobrenome completo'),
  sex: yup.string().required("Defina o sexo do funcionário"),
  role: yup.string().required("Preencha o cargo do funcionário"),
  address: yup.string().required("Define o endereço do funcionário"),
  phone: yup.string().required("Preencha o telefone de contato do funcionário"),
  email: yup.string().email("Email inválido").required("Preencha seu email"),
  birthday: yup.date().required("Inclua a data de nascimento").max(new Date(), "Insira uma data válida").nullable(),
  salary: yup.string().required("Digite o salário do funcionário"),
  department: yup.string().required("Informe o departamento"),
  admission: yup.date().required("Inclua a data de nascimento").max(new Date(), "Insira uma data válida").nullable(),
});

export type employeeSchema = yup.InferType<typeof SignInSchema>

export default function EmployeePage(){

  const {handleSubmit} = useContext(EmployeeContext)

  const initialValues: employeeSchema = {
    firstName: '',
    lastName: '',
    address: '',
    birthday: null,
    email: '',
    phone: '',
    role: '',
    salary: '',
    sex: '',
    department: '',
    admission: null
  }

  return (
    <S.FormContainer>
      <h1>Novo Funcionário</h1>

      <p>Informação do funcionário</p>
      <Formik 
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <S.FormInputContainer>
              <Field
                    name="firstName"
                    label="Nome"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    component={CustomInput}
                />
              <Field
                    name="lastName"
                    label="Sobrenome"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    component={CustomInput}
                />
              <Field
                    name="sex"
                    label="Sexo"
                    error={touched.sex && Boolean(errors.sex)}
                    helperText={touched.sex && errors.sex}
                    component={CustomInput}
                />
              <Field
                    name="role"
                    label="Cargo"
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                    component={CustomInput}
                />
              <Field
                    name="department"
                    label="Departamento"
                    error={touched.department && Boolean(errors.department)}
                    helperText={touched.department && errors.department}
                    component={CustomInput}
                />
              <Field
                    name="address"
                    label="Endereço"
                    error={touched.address && Boolean(errors.address)}
                    helperText={touched.address && errors.address}
                    component={CustomInput}
                />
              <Field
                    name="phone"
                    label="Telefone"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    component={CustomInput}
                />
              <Field
                    name="email"
                    label="Email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    component={CustomInput}
                />
              <Field
                    name="salary"
                    label="Salário"
                    error={touched.salary && Boolean(errors.salary)}
                    helperText={touched.salary && errors.salary}
                    component={CustomInput}
                />
                <Field
                    name="birthday"
                    label="Aniversãrio"
                    error={touched.birthday && Boolean(errors.birthday)}
                    helperText={touched.birthday && errors.birthday}
                    component={DateInput}
                />
                <Field
                    name="admission"
                    label="Admissão"
                    error={touched.admission && Boolean(errors.admission)}
                    helperText={touched.admission && errors.admission}
                    component={DateInput}
                />
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </S.FormInputContainer>
          </Form>
        )}
      </Formik>
    </S.FormContainer>
  )
}