import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditForm = ({ open, handleClose, onSave, data }) => {
  const [editedData, setEditedData] = useState({}); // State to manage edited data

  useEffect(() => {
    setEditedData(data || {});
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedData); // Pass the edited data to the parent component
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className='dialog' fullWidth maxWidth="lg">
      <DialogTitle className='dialogtitle'>Edit Information</DialogTitle>
      <DialogContent className='dialogcontent'>
        {/* Customize the form based on your data structure */}
        <TextField
          label="Field 1"
          variant="outlined"
          fullWidth
          name="field1"
          value={editedData.field1 || ''}
          onChange={handleInputChange}
        />
        <TextField
          label="Field 2"
          variant="outlined"
          fullWidth
          name="field2"
          value={editedData.field2 || ''}
          onChange={handleInputChange}
        />
        {/* Add more fields as needed */}
      </DialogContent>
      <DialogActions className='dialogActions'>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
