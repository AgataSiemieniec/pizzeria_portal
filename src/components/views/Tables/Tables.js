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

const demotableContent = [
  {
    hour: '12:00',
    tables: [
      {id: '1', status: 'free'},
      {id: '2', status: 'free'},
      {id: '3', status: 'event'},
      {id: '4', status: 'booked'},
      {id: '5', status: 'booked'},
      {id: '6', status: 'free'},
    ],
  },
  {
    hour: '12:30',
    tables: [
      {id: '1', status: 'booked'},
      {id: '2', status: 'event'},
      {id: '3', status: 'event'},
      {id: '4', status: 'booked'},
      {id: '5', status: 'booked'},
      {id: '6', status: 'event'},
    ],
  },
  {
    hour: '13:00',
    tables: [
      {id: '1', status: 'booked'},
      {id: '2', status: 'event'},
      {id: '3', status: 'booked'},
      {id: '4', status: 'free'},
      {id: '5', status: 'booked'},
      {id: '6', status: 'event'},
    ],
  },
  {
    hour: '13:30',
    tables: [
      {id: '1', status: 'booked'},
      {id: '2', status: 'event'},
      {id: '3', status: 'booked'},
      {id: '4', status: 'free'},
      {id: '5', status: 'booked'},
      {id: '6', status: 'event'},
    ],
  },
];

const renderActions = status => {
  switch (status) {
    case 'free':
      return (
        <Button
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/bookig/new`}
        >
          {' '}
          New Booking
        </Button>
      );
    case 'booked':
      return (
        <Button
          variant="contained"
          component={Link}
          to={`${process.env.PUBLIC_URL}/tables/booked/:id`}
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

const Tables = () => (
  <Paper className={styles.component}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Time</TableCell>
          <TableCell>Table 1</TableCell>
          <TableCell>Table 2</TableCell>
          <TableCell>Table 3</TableCell>
          <TableCell>Table 4</TableCell>
          <TableCell>Table 5</TableCell>
          <TableCell>Table 6</TableCell>
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
  </Paper>
);

export default Tables;

{/* <Link to={`${process.env.PUBLIC_URL}/tables/booking/:id`}>Tables booking id</Link>
<Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}>Tables booking new</Link>
<Link to={`${process.env.PUBLIC_URL}/tables/events/:id`}>Tables events id</Link>
<Link to={`${process.env.PUBLIC_URL}/tables/events/new`}>Tables events new</Link> */}
