"use client"
import useAuth from '@/contexts/authContext';
import React from 'react'

const page = ({params}: {params: {name: string}}) => {
  const {currentUser} = useAuth();
  
  return (
    <div>{currentUser.uid === params.name && "dsf"}</div>
  )
}

export default page