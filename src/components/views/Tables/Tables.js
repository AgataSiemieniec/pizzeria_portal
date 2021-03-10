import React from 'react';
import styles from './Tables.module.scss';
import { Link } from 'react-router-dom';


const Tables = () => (
  <div className={styles.component}>
    <h2>
      Tables view
    </h2>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/:id`}>Tables booking id</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/booking/new`}>Tables booking new</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/:id`}>Tables events id</Link>
    <Link to={`${process.env.PUBLIC_URL}/tables/events/new`}>Tables events new</Link>
  </div>
);

export default Tables;
