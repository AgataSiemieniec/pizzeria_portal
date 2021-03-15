import React from 'react';
import styles from './WaiterOrderId.module.scss';
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

const demoOrder = [
  {table: '1', name: 'breakfast "Zia Giulias Breakfast" + coffee', options: ['Espresso', 'Macchiato'], amount:'1', price:'100'},
];


const WaiterOrderId = (props) => {

  return(
    <Paper className={styles.component}>
      <CssBaseline />
      <Grid container justify="space-between">
        <Grid item xs={2}>
          <Button component={Link} to={`${process.env.PUBLIC_URL}/waiter`}>
            <HomeIcon />
          </Button>
        </Grid>
        <Grid item xs={10} >
          <Typography align="center" variant="h5" gutterBottom>Order {props.match.params.id}</Typography>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Table</TableCell>
            <TableCell>Menu</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price $</TableCell>
            <TableCell>Total $</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {demoOrder.map(order => (
            <TableRow key={order}>
              <TableCell component="th" scope="row">
                {order.table}
              </TableCell>
              <TableCell>
                {order.name}
              </TableCell>
              <TableCell>
                {order.options.join(',')}
              </TableCell>
              <TableCell>
                {order.amount}
              </TableCell>
              <TableCell>
                {order.price} $
              </TableCell>
              <TableCell>
                {order.price} $
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

WaiterOrderId.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
};

export default WaiterOrderId;
