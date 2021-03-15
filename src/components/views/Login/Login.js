import React from 'react';
import styles from './Login.module.scss';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControl from '@material-ui/core/FormControl';
import { Avatar } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Login = () => (
  <Paper className={styles.component} elevation={6}>
    <CssBaseline />
    <div className={styles.form}>
      <Typography align="center" variant="h5" gutterBottom>Sign in </Typography>
      <FormControl >
        <Grid>
          <Avatar>
            <AccountCircle/>
          </Avatar>
          <TextField
            id="logn"
            label="Login"
            name="login"
            margin="normal"
            required
            autoComplete="login"
            autoFocus
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            margin="normal"
            type="password"
            required
            fullWidth
          />
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              color="primary"
              value="remember"
            />
          }
          label="Remember me"
        />
        <Button
          className={styles.button}
          variant="contained"
          type="submit"
          fullWidth
          component={Link}
          to={`${process.env.PUBLIC_URL}/login`}>
          Sign in
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href='/#'>
              {`Forgot password?`}
            </Link>
          </Grid>
          <Grid item xs>
            <Link href='/#'>
              {`Don't have an account?`}
            </Link>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  </Paper>
);

export default Login;
