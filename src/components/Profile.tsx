import useAuth from '@/contexts/authContext'
import React from 'react'

const Profile = () => {
  const currentUser = useAuth()
  return (
    <div>{currentUser ? currentUser.currentUser.displayName : "none"}</div>
  )
}

export default Profile