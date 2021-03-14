import React from 'react';
import styles from './WaiterOrderNew.module.scss';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const demoMenu = [
  {id: '1', name: 'cake', options: ['Zio Stefanos Doughnut']},
  {id: '2', name: 'breakfast + coffe', options: ['Latte', 'Cappuccino', 'Espresso', 'Macchiato']},
  {id: '3', name: 'pizza', options: []},
];

const WaiterOrderNew = () => {

  return (
    <Paper className={styles.component} elevation={6}>
      <CssBaseline />
      <Grid item xs={12} >
        <Typography align="center" variant="h5" gutterBottom>Add New Order</Typography>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={4} align="center">
          <FormControl className={styles.formControl}>
            <InputLabel id="table">Table</InputLabel>
            <Select
              labelId="tables"
            >
              <MenuItem value={10}>1</MenuItem>
              <MenuItem value={20}>2</MenuItem>
              <MenuItem value={30}>3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>



      <Grid>
        <Button
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/waiter`}>
          Submit order
        </Button>
      </Grid>
    </Paper>
  );
};

export default WaiterOrderNew;
