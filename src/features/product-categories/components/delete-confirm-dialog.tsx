import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Product } from "../types";

interface DeleteConfirmDialogProps {
  open: boolean;
  product: Product | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmDialog = ({
  open,
  product,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      data-testid="delete-confirm-dialog"
    >
      <DialogTitle id="delete-dialog-title" data-testid="delete-dialog-title">
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="delete-dialog-description"
          data-testid="delete-dialog-description"
        >
          Are you sure you want to delete "{product?.productName}"? This action
          cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          color="primary"
          data-testid="cancel-delete-button"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          autoFocus
          data-testid="confirm-delete-button"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
