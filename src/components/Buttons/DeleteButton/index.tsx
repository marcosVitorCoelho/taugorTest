import { Delete } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import { useContext } from "react";
import EmployeeContext from "../../../contexts/EmployeeContext";

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {

  const { handleDelete } = useContext(EmployeeContext)

  return (
    <IconButton onClick={() => handleDelete(id)}>
      <Delete color='warning' />
    </IconButton>
  )
}