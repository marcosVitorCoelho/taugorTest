import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import * as S from './styles'
import EmployeeContext from "../../contexts/EmployeeContext";
import Button from "@mui/material/Button";
import { MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import MyDocument from "../../components/PDFComponent";


const EmployeeSchema = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required("Preencha o primeiro nome").min(1, 'Digite o primeiro nome completo'),
  lastName: yup.string().required("Preencha o sobrenome").min(1, 'Digite o sobrenome completo'),
  sex: yup.string().required("Defina o sexo do funcionário").oneOf(["Masc", "Fem"], "Escolhe o sexo"),
  role: yup.string().required("Preencha o cargo do funcionário"),
  address: yup.string().required("Define o endereço do funcionário"),
  phone: yup.string().required("Preencha o telefone de contato do funcionário"),
  email: yup.string().email("Email inválido").required("Preencha seu email"),
  birthday: yup.date().required("Inclua a data de nascimento").nullable().optional(),
  salary: yup.number().required("Digite o salário do funcionário"),
  department: yup.string().required("Informe o departamento"),
  admission: yup.date().required("Inclua a data de nascimento").nullable().optional(),
});



export type employeeSchemaData = yup.InferType<typeof EmployeeSchema>

export default function EmployeePage() {
  const { handleSubmit: handleFireStoreSubmit, handleGetOneEmployee, uniqueEmployee, handleUpdateWithHistory } = useContext(EmployeeContext)
  let { id } = useParams();

  const [formData, setFormData] = useState<employeeSchemaData>({
    firstName: '',
    lastName: '',
    address: '',
    birthday: null,
    email: '',
    phone: '',
    role: '',
    salary: 0,
    sex: '',
    department: '',
    admission: null,
  });

  useEffect(() => {
    if (id) {
      handleGetOneEmployee(id)
    }
  }, [id])

  useEffect(() => {
    if (uniqueEmployee) {
      setFormData({
        firstName: uniqueEmployee?.firstName || '',
        lastName: uniqueEmployee?.lastName || '',
        address: uniqueEmployee?.address || '',
        birthday: uniqueEmployee?.birthday.toDate() || null,
        email: uniqueEmployee?.email || '',
        phone: uniqueEmployee?.phone || '',
        role: uniqueEmployee?.role || '',
        salary: uniqueEmployee?.salary || 0,
        sex: uniqueEmployee?.sex || '',
        department: uniqueEmployee?.department || '',
        admission: uniqueEmployee?.admission.toDate() || null,
      })
    }
  }, [uniqueEmployee])



  const newEmployeeForm = useForm<employeeSchemaData>({
    resolver: yupResolver(EmployeeSchema),
    defaultValues: formData,
    values: {
      firstName: uniqueEmployee?.firstName || '',
      lastName: uniqueEmployee?.lastName || '',
      address: uniqueEmployee?.address || '',
      birthday: uniqueEmployee?.birthday.toDate() || null,
      email: uniqueEmployee?.email || '',
      phone: uniqueEmployee?.phone || '',
      role: uniqueEmployee?.role || '',
      salary: uniqueEmployee?.salary || 0,
      sex: uniqueEmployee?.sex || '',
      department: uniqueEmployee?.department || '',
      admission: uniqueEmployee?.admission.toDate() || null,
    }
  })

  const { handleSubmit, register, formState: { errors } } = newEmployeeForm

  const handleInputChange = (fieldName: string, value: any) => {
    if (fieldName === 'birthday' || fieldName === 'admission') {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: new Date(value),
      }));

      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const switchSubmit = () => {
    if (id) {
      handleUpdateWithHistory(id, formData);
      return
    }
    handleFireStoreSubmit(formData)
  }

  return (
    <S.Container>
      <S.FormContainer>
        <h1>Novo Funcionário</h1>
        <p>Informação do funcionário</p>
        <S.FormInputContainer>
          <form onSubmit={handleSubmit(switchSubmit)} action="">
            <S.NamePhotoContainer>
              <TextField
                id="firstName"
                label="Nome"
                variant="outlined"
                size="small"
                color="primary"
                {...register('firstName')}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                helperText={errors.firstName && errors.firstName.message}
              />
              <TextField
                id="lastName"
                label="Sobrenome"
                variant="outlined"
                size="small"
                color="primary"
                {...register('lastName')}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                helperText={errors.firstName && errors.firstName.message}
              />
            </S.NamePhotoContainer>
            <TextField
              id="role"
              label="Cargo"
              variant="outlined"
              size="small"
              color="primary"
              {...register('role')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange("role", e.target.value)}
              helperText={errors.role && errors.role.message}
            />
            <TextField
              id="address"
              label="Endereço"
              variant="outlined"
              size="small"
              color="primary"
              {...register('address')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange("address", e.target.value)}
              helperText={errors.address && errors.address.message}
            />
            <TextField
              id="phone"
              label="Telefone"
              variant="outlined"
              size="small"
              color="primary"
              {...register('phone')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              helperText={errors.phone && errors.phone.message}
            />
            <TextField
              id="email"
              type="email"
              label="Email"
              variant="outlined"
              size="small"
              color="primary"
              {...register('email')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange("email", e.target.value)}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              id="sex"
              label="Sexo"
              variant="outlined"
              size="small"
              color="primary"
              select
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('sex')}
              defaultValue={'Masc'}
              onChange={(e) => handleInputChange("sex", e.target.value)}
              helperText={errors.sex && errors.sex.message}
            >
              <MenuItem value={'Masc'}>
                Masc
              </MenuItem>
              <MenuItem value={'Fem'}>
                Fem
              </MenuItem>
            </TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={'Nascimento'}
                format="DD/MM/YYYY"
                value={dayjs(new Date(uniqueEmployee?.birthday.seconds! * 1000).toDateString())}
                onChange={(newValue) => handleInputChange("birthday", newValue)}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label={'Admissão'}
                format="DD/MM/YYYY"
                {...register('admission')}
                value={dayjs(new Date(uniqueEmployee?.admission.seconds! * 1000).toDateString())}
                onChange={(newValue) => handleInputChange("admission", newValue)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
            <TextField
              type="number"
              id="salary"
              label="Salário"
              variant="outlined"
              size="small"
              color="primary"
              {...register('salary')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              helperText={errors.salary && errors.salary.message}
            />
            <TextField
              id="department"
              label="Departamento"
              variant="outlined"
              size="small"
              color="primary"
              {...register('department')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleInputChange("department", e.target.value)}
              helperText={errors.department && errors.department.message}
            />
            {id ? <Button variant="contained" type="submit">
              Editar
            </Button> : <Button variant="contained" type="submit">
              Cadastrar
            </Button>}
          </form>
        </S.FormInputContainer>
      </S.FormContainer>
      <S.FormContainer>
        <MyDocument formData={formData} />
      </S.FormContainer>
      <PDFDownloadLink document={<MyDocument formData={formData} />} fileName={`${formData.firstName}.pdf`}>
        {({ loading }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </S.Container>
  )
}