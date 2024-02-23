import React from 'react'

export const UserCard = ({userName}: {userName?: string}) => {
  return (
    <div style={{border: '1px solid green', padding: '20px'}}>
        username: {userName ?? 'user'}
        <div>password: 123</div>
    </div>
  )
}
