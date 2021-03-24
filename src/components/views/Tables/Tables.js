import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

const demotableContent = [
  {
    hour: '12:00',
    tables: [
      {id: '1', status: 'free'},
      {id: '2', status: 'free'},
      {id: '3', status: 'event'},
      {id: '4', status: 'free'},
      {id: '5', status: 'free'},
      {id: '6', status: 'event'},
    ],
  },
  {
    hour: '12:30',
    tables: [
      {id: '1', status: 'booked'},
      {id: '2', status: 'event'},
      {id: '3', status: 'event'},
      {id: '4', status: 'booked'},
      {id: '5', status: 'event'},
      {id: '6', status: 'event'},
    ],
  },
  {
    hour: '13:00',
    tables: [
      {id: '1', status: 'booked'},
      {id: '2', status: 'event'},
      {id: '3', status: 'booked'},
      {id: '4', status: 'booked'},
      {id: '5', status: 'event'},
      {id: '6', status: 'booked'},
    ],
  },
  {
    hour: '13:30',
    tables: [
      {id: '1', status: 'booked'},
      {id: '2', status: 'event'},
      {id: '3', status: 'booked'},
      {id: '4', status: 'booked'},
      {id: '5', status: 'event'},
      {id: '6', status: 'booked'},
    ],
  },
];

const renderActions = (status) => {
  switch (status) {
    case 'free':
      return (
        <Button
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/booking/new`}
        >
          {' '}
          -
        </Button>
      );
    case 'booked':
      return (
        <Button
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/booking/:id`}
        >
          {' '}
          Booked
        </Button>
      );
    case 'event':
      return (
        <Button
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/events/:id`}
        >
          {' '}
          Event
        </Button>
      );
    default:
      return null;
  }
};

const Tables = () => {
  return (
    <Paper className={styles.component} elevation={6}>
      <CssBaseline />
      <Grid container justify="space-between">
        <Grid item xs={2}>
          <Button
            component={Link}
            to={`${process.env.PUBLIC_URL}/waiter`}>
            <HomeIcon />
          </Button>
        </Grid>
        <Grid item xs={10} >
          <Typography align="center" variant="h5" gutterBottom>Tables availability</Typography>
        </Grid>
      </Grid>
      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider> */}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Table 1</TableCell>
            <TableCell>Table 2</TableCell>
            <TableCell>Table 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demotableContent.map(row => (
            <TableRow key={row.hour}>
              <TableCell component="th" scope="row">
                {row.hour}
              </TableCell>
              {row.tables.map((table) => (
                <TableCell key={row.table} component="th" scope="row">
                  {renderActions(table.status)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Grid className={styles.buttonGroup}>
        <Button
          className={styles.button}
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/booking/new`}>
          Add new booking
        </Button>
        <Button
          className={styles.button}
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/events/new`}>
          Add new event
        </Button>
      </Grid>
    </Paper>
  );
};

export default Tables;

