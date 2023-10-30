import * as S from './styles'
import { useContext } from "react";
import CustomTable from '../../components/Table';
import EmployeeContext from '../../contexts/EmployeeContext';

export default function Home() {
  const {rows, columns} = useContext(EmployeeContext)

  return (
    <S.Container>
      <CustomTable rows={rows} columns={columns}/>
    </S.Container>
  );
}