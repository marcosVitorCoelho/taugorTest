import { Edit } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"

export const EditButton = () => {
  return (
    <IconButton onClick={() => console.log('ola')}>
      <Edit color='info'/>
    </IconButton>
  )
}
