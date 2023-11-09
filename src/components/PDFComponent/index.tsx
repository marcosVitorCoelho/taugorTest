import { Text } from '@react-pdf/renderer';
import * as S from './styles'
import { employeeSchemaData } from '../../pages/employee';

interface PDFProps {
  formData: employeeSchemaData;
}

export default function MyDocument({ formData }: PDFProps) {

  const { address, department, email, firstName, lastName, sex, admission, birthday, phone, salary, role } = formData

  return (
    <S.CustomDocument>
      <S.CustomPage size="A4">
        <S.CustomTitle>{firstName + ' ' + lastName}</S.CustomTitle>
        <S.CustomView>
          <S.CustomSubtitle>Cargo</S.CustomSubtitle>
          <Text>{role}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Departamento</S.CustomSubtitle>
          <Text>{department}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Telefone</S.CustomSubtitle>
          <Text>{phone}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Email</S.CustomSubtitle>
          <Text>{email}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Endereço</S.CustomSubtitle>
          <Text>{address}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Sexo</S.CustomSubtitle>
          <Text>{sex}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Nascimento</S.CustomSubtitle>
          <Text>{birthday?.toLocaleDateString()}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Admissão</S.CustomSubtitle>
          <Text>{admission?.toLocaleDateString()}</Text>
        </S.CustomView>
        <S.CustomView>
          <S.CustomSubtitle>Salário</S.CustomSubtitle>
          <Text>{salary}</Text>
        </S.CustomView>
      </S.CustomPage>
    </S.CustomDocument>
  )
}
