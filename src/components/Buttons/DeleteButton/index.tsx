import { Delete } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"

export const DeleteButton = () => {
  return (
    <IconButton onClick={() => console.log('ola')}>
      <Delete color='warning'/>
    </IconButton>
  )
}