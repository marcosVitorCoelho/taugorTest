import {ReactNode, createContext} from "react";
import { Column, Data } from "../interfaces/table.interface";
import { DeleteButton } from "../components/Buttons/DeleteButton";
import { EditButton } from "../components/Buttons/EditButton";
import {db} from '../services/firebaseConfig'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { employeeSchema } from "../pages/employee";

interface EmployeeContextType {
  rows: Data[],
  columns: Column[],
  handleSubmit: (values: employeeSchema) => void;
}

interface EmployeeContextProps {
  children: ReactNode;
}


function createData(
  firstName: string,
  lastName: string,
  phone: string,
  sex: string,
  salary: number,
  department: string,
  role: string,
  del: ReactNode,
  edit: ReactNode,
): Data {
  return {firstName, lastName, phone, sex, department, salary, role, del, edit};
}


const EmployeeContext = createContext({} as EmployeeContextType)

const EmployeeContextProvider: React.FC<EmployeeContextProps> = ({
  children,
}) => {

  const columns: Column[] = [
    { id: 'firstName', label: 'Nome', minWidth: 170},
    { id: 'lastName', label: 'Sobrenome', minWidth: 170},
    { id: 'role', label: 'Cargo', minWidth: 170},
    {
      id: 'phone',
      label: 'Telefone',
      minWidth: 170,
    },
    { id: 'sex', label: 'Sexo', minWidth: 170 },
    {
      id: 'department',
      label: 'Setor',
      minWidth: 170,
    },
    {
      id: 'salary',
      label: 'Salário',
      minWidth: 170,
      format: (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    },
    {
      id: 'edit',
      label: 'Editar',
      minWidth: 170,
    },
    {
      id: 'del',
      label: 'Excluir',
      minWidth: 170,
    },
  ];


  const handleSubmit = async (values: employeeSchema) => {
      try{
        await addDoc(collection(db, 'employees'),{
          firstName: values.firstName,
          lastName: values.lastName,
          role: values.role,
          phone: values.phone,
          sex: values.sex,
          department: values.department,
          salary: values.salary,
          email: values.email,
          address: values.address,
          admission: values.admission,
          createdAt: Timestamp.now()
        })
      }catch(err) {
        alert(err);
      }
  }


  const rows = [
    createData('João', 'Marcos', '123456', 'Masc', 12000,  'RH',  'Tech', <DeleteButton />, <EditButton />),
  ]



  return (
    <EmployeeContext.Provider 
        value={{
          rows: rows, 
          columns: columns,
          handleSubmit,
        }}
      >
      {children}
    </EmployeeContext.Provider>
  )
}


export default EmployeeContext;
export { EmployeeContextProvider };