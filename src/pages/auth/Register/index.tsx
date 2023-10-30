import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Button } from "@mui/material";
import * as S from "../styles";
import { useContext } from "react";
import CustomInput from "../../../components/Input";
import { Link } from "react-router-dom";
import UserAuthenticationContext from "../../../contexts/UserAuthContext";

const SignInSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Preencha seu email"),
  password: yup.string().required("Digite sua senha").min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
});

type userCreationSchema = yup.InferType<typeof SignInSchema>

export default function CreateUser() {
  const { handleCreateUser } = useContext(UserAuthenticationContext);

  const handleSubmit = async (values: userCreationSchema) => {
    try {
      handleCreateUser(values);
    } catch (error) {
      console.warn(error);
    }
  };

  const initialValues: userCreationSchema = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <S.FormContainer>
      <h1>Crie uma conta!</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <S.FormInputContainer>
              <Field
                name="email"
                label="Email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                component={CustomInput}
              />
              <Field
                name="password"
                label="Senha"
                type="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                component={CustomInput}
              />
              <Field
                name="confirmPassword"
                label="Confirme sua senha"
                type="password"
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                component={CustomInput}
              />
              <Button variant="contained" type="submit">
                Criar conta
              </Button>
            </S.FormInputContainer>
          </Form>
        )}
      </Formik>
      <Link to="/">Já é cadastrado? Login</Link>
    </S.FormContainer>
  );
}