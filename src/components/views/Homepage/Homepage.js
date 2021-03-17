import React from 'react';
import styles from './Homepage.module.scss';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';

const demoHomepage= [
  {id: '1', type: 'event', table: '1', time: '15:00-16:00', people: '3', name: 'John Snow'},
  {id: '2', type: 'booking', table: '2', time: '17:00', people: '4', name: 'John Cooke'},
  {id: '3', type: 'booking', table: '3', time: '18:00', people: '1', name: 'John Doe'},
];

const demoHomepageOrders = [
  {id: '1', name: 'John Snow', phone:'71 771 71 71' },
  {id: '2', name: 'John Cooke', phone:'72 771 71 71'},
  {id: '3', name: 'John Doe', phone:'73 771 71 71'},

];

const Homepage= () => (
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
        <Typography align="center" variant="h5" gutterBottom>Dashboard</Typography>
      </Grid>
    </Grid>
    <Grid item xs={12} >
      <Typography align="center" variant="h6" gutterBottom>{`Today's reservations`}</Typography>
    </Grid>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Table</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>People</TableCell>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoHomepage.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.table&& (
                <Button
                  component={Link} to={`${process.env.PUBLIC_URL}/tables`}>
                  {row.table}
                </Button>
              )}
            </TableCell>
            <TableCell>
              {row.type}
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Grid item xs={12} >
      <Typography align="center" variant="h6" gutterBottom>{`Today's orders`}</Typography>
    </Grid>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoHomepageOrders.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.id && (
                <Button
                  component={Link} to={`${process.env.PUBLIC_URL}/tables`}>
                  {row.id}
                </Button>
              )}
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

export default Homepage;
