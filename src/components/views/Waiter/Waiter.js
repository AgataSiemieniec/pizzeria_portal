import React from 'react';
import styles from './Waiter.module.scss';
import PropTypes from 'prop-types';
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


class Waiter extends React.Component {
  static propTypes = {
    fetchTables: PropTypes.func,
    updateStatus: PropTypes.func,
    loading: PropTypes.shape({
      active: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
    }),
    tables: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]),
  }

  componentDidMount(){
    const { fetchTables } = this.props;
    fetchTables();
  }

  renderActions(tableId, status){
    const { updateStatus } = this.props;
    switch (status) {
      case 'free':
        return (
          <>
            <Button onClick={() => updateStatus(tableId, 'thinking')}>
              thinking
            </Button>
            <Button
              component={Link}
              to={`${process.env.PUBLIC_URL}/waiter/order/new`}
              onClick={() => updateStatus(tableId, 'new order')}
            >
              {' '}
              new order
            </Button>
          </>
        );
      case 'thinking':
        return (
          <Button
            component={Link}
            to={`${process.env.PUBLIC_URL}/waiter/order/new`}
            onClick={() => updateStatus(tableId, 'new order')}
          >
            new order
          </Button>
        );
      case 'ordered':
        return (
          <Button onClick={() => updateStatus(tableId, 'prepared')}>
          prepared
          </Button>
        );
      case 'prepared':
        return (
          <Button onClick={() => updateStatus(tableId, 'delivered')}>
          delivered
          </Button>
        );
      case 'delivered':
        return (
          <Button onClick={() => updateStatus(tableId, 'paid')}>paid</Button>
        );
      case 'paid':
        return (
          <Button onClick={() => updateStatus(tableId, 'free')}>free</Button>
        );
      default:
        return null;
    }
  }

  render() {
    const { loading: { active, error }, tables } = this.props;

    if(active || !tables.length){
      return (
        <Paper className={styles.component}>
          <p>Loading...</p>
        </Paper>
      );
    } else if(error) {
      return (
        <Paper className={styles.component}>
          <p>Error! Details:</p>
          <pre>{error}</pre>
        </Paper>
      );
    } else {
      return (
        <Paper className={styles.component} elevation={6}>
          <CssBaseline />
          <Grid item xs={10} >
            <Typography align="center" variant="h5" gutterBottom>Waiter</Typography>
          </Grid>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Table</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tables.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {row.status}
                  </TableCell>
                  <TableCell>
                    {row.order && (
                      <Button component={Link} to={`${process.env.PUBLIC_URL}/waiter/order/${row.order}`}>
                        {row.order}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {this.renderActions(row.id, row.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

export default Waiter;
