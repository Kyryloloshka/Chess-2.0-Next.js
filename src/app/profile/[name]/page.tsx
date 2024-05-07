"use client"
import { getUserByUID } from '@/lib/firebase/auth';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag';

const page = ({params}: {params: {name: string}}) => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData(params.name);
  }, [params.name]);

  const getUserData = async (uid: string) => {
    try {
      const userData = await getUserByUID(uid);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.error('get user error:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return 
  }

  return (
    <div className='common-container'>
      {user?.email ? (
        <div className='bg-[#00000030] p-5 rounded-lg min-w-full overflow-hidden'>
          {loading ? <div>Loading...</div> : <div className='flex flex-col gap-6'>
          <div className="flex-col sm:flex-row flex gap-4 items-center flex-wrap">
            <img
              src={
                user.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="h-24 w-24 rounded-full bg-light-2 border-[2px] border-light-2"
            />
            <div className="flex flex-col gap-1 items-center sm:items-start">
              <div className="flex items-center gap-2 flex-nowrap">
                <p className='text-xl font-bold whitespace-nowrap'>{user.username}</p>
                {user.country.value === "world" ? <img className='h-[24px]' src='/assets/icons/world-flag.svg'></img> :
                <ReactCountryFlag countryCode={user.country.value} style={{fontSize: "24px"}} svg />}
              </div>
              <p>Status: {user.status ? user.status : "Missing"}</p>
            </div>
          </div>
          <hr className='border-dark-4'/>
          <div>
            <h3 className='font-semibold mb-2'>Statistics</h3> 
            <p>{user.bio ? user.bio: "Missing"}</p>
          </div>
          <hr className='border-dark-4'/>
          <div className="sm:max-w-[280px]">
            <h3 className='font-semibold mb-2'>Statistics</h3>
            <div className='flex'><span className='flex-auto'>parties</span> <span>{user.gamesPlayed}</span></div>
            <div className='flex'><span className='flex-auto'>victories</span> <span>{user.gamesWon}</span></div>
            <div className='flex'><span className='flex-auto'>defeats</span> <span>{user.gamesLosed}</span></div>
            <div className='flex'><span className='flex-auto'>win rate</span> <span>{user.gamesPlayed != 0 ? user.gamesWon / user.gamesPlayed * 100 : 0} %</span></div>
          </div>
          <hr className='border-dark-4'/>
          <div>
            <h3 className='font-semibold mb-2'>Games</h3> 
            <p>{user.games[0] ? <div>
              {user.games.map((game: any) => {
                <div className="flex gap-5 justify-between">
                  <div className="flex flex-col">
                    <p>{game.player[0].name}</p>
                    <p>{game.player[1].name}</p>
                  </div>
                </div>
              })}
            </div> : "No played games"}</p>
          </div>
        </div>}
      </div> 
      ) : (
        <div>User not found</div>
      )}
    </div>
  );
}

export default page