import React from 'react';
import UserItem from './userItem';
import Spinner from '../layout/spinner';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  if (loading) return <Spinner />
  return (
    <div style={ userStyle }>
      { users.map(user => <UserItem key={ user.id } user={ user } />) }
    </div>
  )
}

Users.prototype = {
  user: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}


export default Users;