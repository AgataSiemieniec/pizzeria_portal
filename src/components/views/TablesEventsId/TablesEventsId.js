import React from 'react';
import styles from './TablesEventsId.module.scss';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const demoEvent = [
  {table: '2', date: '19-03-2021', time: '18:00', people: '3', name: 'John Snow', phone:'71 771 71 71'},
];


const TablesEventsId= (props) => {

  return(
    <Paper className={styles.component} elevation={6}>
      <CssBaseline />
      <Grid container justify="space-between">
        <Grid item xs={2}>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/waiter`}>
            <HomeIcon />
          </Button>
        </Grid>
        <Grid item xs={10} >
          <Typography align="center" variant="h5" gutterBottom>Event {props.match.params.id}</Typography>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Table</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>People</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoEvent.map(row => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row.table}
              </TableCell>
              <TableCell>
                {row.date}
              </TableCell>
              <TableCell>
                {row.time}
              </TableCell>
              <TableCell>
                {row.people}
              </TableCell>
              <TableCell>
                {row.name}
              </TableCell>
              <TableCell>
                {row.phone}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

TablesEventsId.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
};

export default TablesEventsId;
