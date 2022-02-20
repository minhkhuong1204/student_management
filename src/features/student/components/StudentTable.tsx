import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles, Paper } from '@material-ui/core';
import { capitalizeString, getMarkColor } from 'utils/';

const useStyles = makeStyles((theme) => ({
  table: {
    minHeight: '250px'
  },
  edit: {
    marginRight: theme.spacing(1)
  }
}))

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City
  }
  onEdit?: (student: Student) => void,
  onRemove?: (student: Student) => void
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({} as Student);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    // Set selected student
    setSelectedStudent(student)
    
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    // call onRemove
    onRemove?.(student)
    // Hide dialog
    setOpen(false);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align='right'>Action</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {studentList?.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell width={310}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button size='small' className={classes.edit} color='primary' onClick={() => onEdit?.(student)}>Edit</Button>
                  <Button size='small' color='secondary' onClick={() => handleRemoveClick(student)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove student dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student name "{selectedStudent?.name}". <br />
            This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant='outlined'>Cancel</Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent)} autoFocus color="secondary" variant='contained'>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
