import { ReactNode, createContext, useEffect, useState } from "react";
import { Column, Data } from "../interfaces/table.interface";
import { DeleteButton } from "../components/Buttons/DeleteButton";
import { EditButton } from "../components/Buttons/EditButton";
import { db } from '../services/firebaseConfig'
import { collection, addDoc, Timestamp, query, onSnapshot, doc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore'
import { employeeSchemaData } from "../pages/employee";
import { v4 as uuidv4 } from 'uuid';

interface EmployeeContextType {
  rows: Data[] | undefined,
  columns: Column[],
  handleSubmit: (values: employeeSchemaData) => void;
  handleDelete: (id: string) => void;
  handleUpdateWithHistory: (id: string, newData: employeeSchemaData) => void;
  handleGetOneEmployee: (id: string) => void;
  uniqueEmployee: employeeData | undefined;
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
  return { firstName, lastName, phone, sex, department, salary, role, del, edit };
}

type Optional = {
  id?: string | undefined;
  firstName: string;
  lastName: string;
  sex: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  salary: number;
  department: string;
}

interface employeeData extends Optional {
  birthday: Timestamp;
  admission: Timestamp;
  id: string;
}

const EmployeeContext = createContext({} as EmployeeContextType)

const EmployeeContextProvider: React.FC<EmployeeContextProps> = ({
  children,
}) => {

  const [employeesData, setEmployeesData] = useState<employeeData[]>([])
  const [uniqueEmployee, setUniqueEmployee] = useState<employeeData>()
  const [listData, setListData] = useState<Data[]>([])

  const columns: Column[] = [
    { id: 'firstName', label: 'Nome', minWidth: 170 },
    { id: 'lastName', label: 'Sobrenome', minWidth: 170 },
    { id: 'role', label: 'Cargo', minWidth: 170 },
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


  const handleSubmit = async (values: employeeSchemaData) => {
    console.log(values)
    try {
      await addDoc(collection(db, 'employees'), {
        id: uuidv4(),
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
        birthday: values.birthday,
        createdAt: Timestamp.now()
      })
    } catch (err) {
      alert(err);
    }
  }

  const handleGetEmployeeDate = async () => {
    try {
      const q = query(collection(db, 'employees'))
      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return doc.data()
        })
        const employees: employeeData[] = data.map((employee) => {
          return {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            role: employee.role,
            phone: employee.phone,
            sex: employee.sex,
            department: employee.department,
            salary: employee.salary,
            email: employee.email,
            address: employee.address,
            admission: employee.admission,
            birthday: employee.birthday
          }
        })
        setEmployeesData(employees)
      })
    } catch (err) {
      alert(err);
    }
  }

  const handleGetOneEmployee = async (id: string) => {
    try {
      const q = query(collection(db, 'employees'))
      onSnapshot(q, (querySnapshot) => {
        const [data] = querySnapshot.docs.filter((doc) => doc.data().id === id)
        const employee = data.data()
        setUniqueEmployee(employee as employeeData)
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const q = query(collection(db, 'employees'))
      onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.filter((doc) => doc.data().id === id)
        const dataId = data.map((data) => data.id)
        deleteDoc(doc(db, 'employees', dataId[0]))
      })
    } catch (err) {
      alert(err)
    }
  }

  const handleUpdateWithHistory = async (id: string, newData: employeeSchemaData) => {
    try {
      const q = query(collection(db, 'employees'))
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.filter((doc) => doc.data().id === id);
      const oldData = data.map((doc) => doc.data());
      const oldDataId = data.map((doc) => doc.id);

      const newValue = {
        id: newData.id || oldData[0].id,
        birthday: newData.birthday || oldData[0].birthday,
        admission: newData.admission || oldData[0].admission,
        firstName: newData.firstName || oldData[0].firstName,
        lastName: newData.lastName || oldData[0].lastName,
        sex: newData.sex || oldData[0].sex,
        role: newData.role || oldData[0].role,
        address: newData.address || oldData[0].address,
        phone: newData.phone || oldData[0].phone,
        email: newData.email || oldData[0].email,
        salary: newData.salary || oldData[0].salary,
        department: newData.department || oldData[0].department,
      }

      const employeeDocRef = doc(db, "employees", oldDataId[0]);
      await updateDoc(employeeDocRef, newValue);

      await addDoc(collection(db, 'history'), {
        documentId: id,
        oldValue: oldData,
        newValue: newData,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Erro ao atualizar o documento:', error);
    }
  };


  useEffect(() => {
    if (employeesData !== null) {
      setListData(employeesData.map((employee) =>
        createData(employee.firstName, employee.lastName, employee.phone, employee.sex, employee.salary, employee.department, employee.role, <DeleteButton id={employee.id} />, <EditButton id={employee.id} />)
      ));
    }
  }, [employeesData]);

  useEffect(() => {
    handleGetEmployeeDate()
  }, [])

  return (
    <EmployeeContext.Provider
      value={{
        rows: listData,
        columns: columns,
        handleSubmit,
        handleDelete,
        handleUpdateWithHistory,
        handleGetOneEmployee,
        uniqueEmployee
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}


export default EmployeeContext;
export { EmployeeContextProvider };