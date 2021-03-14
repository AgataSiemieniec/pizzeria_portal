import React from 'react';
import styles from './WaiterOrderNew.module.scss';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


const demoMenu = [
  {id: '1', name: 'cake', options: ['Zio Stefanos Doughnut']},
  {id: '2', name: 'breakfast "Zia Giulias Breakfast" + coffee', options: ['Latte', 'Cappuccino', 'Espresso', 'Macchiato']},
  {id: '3', name: 'pizza "Nonna Albas Pizza"', options: ['Olives', 'Red peppers', 'Green peppers', 'Mushrooms', 'Fresh basil', 'Salami']},
  {id: '4', name: 'salad "Nonno Albertos Salad" ', options: ['Cucumber', 'Tomatoes', 'Olives', 'Feta cheese', 'Cheese', 'Fresh herbs', 'Black pepper']},
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
      <Grid item xs={12} className={styles.menuBox}>
        {demoMenu.map(menu => (
          <Accordion key={menu.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={styles.heading}>{menu.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup row>
                {menu.options.map(options => (
                  <FormControlLabel key={options}
                    control={
                      <Checkbox
                        name={menu.options}
                        color="primary"
                      />
                    }
                    label={options}
                  />
                ))}
              </FormGroup>
              <TextField
                className={styles.textField}
                fullWidth
                id='amount'
                label='Amount'
                name='amount'
                size='small'
                type='number'
                inputProps={{min:0, max:9}}
              />
            </AccordionDetails>
          </Accordion>
        ))}
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
