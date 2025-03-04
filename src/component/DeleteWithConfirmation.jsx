import React, { useState } from 'react'
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteWithConfirmation = ({ id, handleDeleteCategory }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirmDelete = () => {
    handleDeleteCategory(id)
    setOpen(false)
  }

  return (
    <>
      {/* Delete Icon with Tooltip */}
      <Tooltip title="Delete Category" arrow>
        <IconButton onClick={handleOpen} color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      {/* Confirmation Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-delete-dialog"
        sx={{ '& .MuiDialog-paper': { padding: '30px 10px' } }}
      >
        <DialogTitle id="confirm-delete-dialog">
          Are you sure you want to delete this category?
        </DialogTitle>
        <DialogActions
        //   sx={{
        //     justifyContent: "center",
        //   }}
        >
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteWithConfirmation
