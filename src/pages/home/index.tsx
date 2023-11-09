import * as S from './styles'
import { useContext } from "react";
import CustomTable from '../../components/Table';
import EmployeeContext from '../../contexts/EmployeeContext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { rows, columns } = useContext(EmployeeContext)

  const navigate = useNavigate();

  const handleNewEmployee = () => {
    navigate("/employee")
  }

  return (
    <S.Container>
      <S.TableContainer>
        <CustomTable rows={rows} columns={columns} />
      </S.TableContainer>
      <Button variant="contained" onClick={handleNewEmployee}>
        Novo Funcionário
      </Button>
    </S.Container>
  );
}