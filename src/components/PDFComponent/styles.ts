import { Page, Text, View, Document } from '@react-pdf/renderer';
import styled from "styled-components";


export const CustomPage = styled(Page)`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: '#E4E4E4';
  gap: 20px;
  
`

export const CustomView = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  border: 1px solid #388CC8;
  border-radius: 5px;
`

export const CustomDocument = styled(Document)`
  width: 100%;
  height: 100%;
`

export const CustomTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #388CC8;
`

export const CustomSubtitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #388CC8;
`