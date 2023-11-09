import { Edit } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  id: string;
}

export const EditButton = ({ id }: EditButtonProps) => {

  const navigate = useNavigate();

  const handleNewEmployee = () => {
    navigate(`/employee/${id}`)
  }

  return (
    <IconButton onClick={handleNewEmployee}>
      <Edit color='info' />
    </IconButton>
  )
}
