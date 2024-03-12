"use client"
import React, { useState } from 'react'
import  useAuth from '@/contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '@/lib/firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const userLoggedIn = useAuth()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    if (!isRegistering) {
      setIsRegistering(true)
      await doCreateUserWithEmailAndPassword(email, password)
      router.replace("/")
    }
  }
  if (userLoggedIn?.userLoggedIn) {
    router.replace("/")
  }
  return (
    <>
      <main className="w-full h-screen flex self-center place-content-center place-items-center">
        <div className="w-96 text-light-2 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center mb-6">
            <div className="mt-2">
              <h3 className="text-light-2 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
            </div>

          </div>
          <form
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <div>
              <label className="text-sm text-gray-300 font-bold">
                Email
              </label>
              <input
                type="email"
                autoComplete='email'
                required
                value={email} onChange={(e) => { setEmail(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-light-2 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 font-bold">
                Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete='new-password'
                required
                value={password} onChange={(e) => { setPassword(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-light-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 font-bold">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete='off'
                required
                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-light-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
              />
            </div>

            {errorMessage && (
              <span className='text-red-600 font-bold'>{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 hover:shadow-xl transition duration-300'}`}
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>
            <div className="text-sm text-center">
              Already have an account? {'   '}
              <Link href={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Register