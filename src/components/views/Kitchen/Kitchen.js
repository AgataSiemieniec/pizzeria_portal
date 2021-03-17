import React from 'react';
import styles from './Kitchen.module.scss';
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

const demoKitchen = [
  {table: '1', order: '123', products: ['pizza', 'coffee', 'salad'], status: ['open']},
  {table: '2', order: '234', products: ['pizza', 'coffee'], status:'done'},
  {table: '3', order: '456', products: ['coffee', 'salad'], status:'done'},

];

const Kitchen = () => (
  <Paper className={styles.component} elevation={6}>
    <CssBaseline />
    <Grid item xs={10} >
      <Typography align="center" variant="h5" gutterBottom>Kitchen</Typography>
    </Grid>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Table</TableCell>
          <TableCell>Order</TableCell>
          <TableCell>Products</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {demoKitchen.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.table && (
                <Button
                  component={Link} to={`${process.env.PUBLIC_URL}/tables`}>
                  {row.table}
                </Button>
              )}
            </TableCell>
            <TableCell>
              {row.order && (
                <Button
                  component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                  {row.order}
                </Button>
              )}
            </TableCell>
            <TableCell>
              {row.products.join(',')}
            </TableCell>
            <TableCell>
              {row.status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default Kitchen;
