"use client"
import { getUserByUID } from '@/lib/firebase/auth';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'



const page = ({params}: {params: {name: string}}) => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Викликаємо функцію getUserByUID під час завантаження компонента
    getUserData(params.name);
  }, [params.name]); // Передаємо uid у залежності компонента, щоб функція викликалася при зміні uid

  const getUserData = async (uid: string) => {
    try {
      // Викликаємо функцію getUserByUID з переданим uid
      const userData = await getUserByUID(uid);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('Помилка при отриманні користувача:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return 
  }

  return (
    <div className='common-container'>
      {user?.email ? (
        <div className='bg-[#00000030] p-5 rounded-lg'>
          {loading ? <div>Loading...</div> : <>
          <p>Email: {user.email}</p>
          <p>Games Played: {user.gamesPlayed}</p>
          <p>Username: {user.username}</p>
          <p>Games Losed: {user.gamesLosed}</p>
          <p>Games Won: {user.gamesWon}</p>
          <p>Country: {user.country}</p>
          <p>Status: {user.status ? user.status : "Missing"}</p>
          <p>Bio: {user.bio ? user.bio: "Missing"}</p>
          <p>Games: {user.games[0] ? user.games : "No played game"}</p></>}
        </div> 
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
}

export default page