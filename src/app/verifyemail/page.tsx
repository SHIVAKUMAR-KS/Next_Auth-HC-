'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() { 

    const router = useRouter()

    const [token, setToken] = useState<string | null>(null)
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
            setError(false)
        } catch (error:any) {
            setError(true)
            console.log(error.response?.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        if (urlToken) {
            setToken(urlToken)
        }
    }, [])

    useEffect(() => {
        setError(false)
        if (token) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <h2 className='p-2 bg-orange-500 text-black'>
                {token ? `${token}` : "no token"}
            </h2>
            {verified && (
                <div>
                    <h2>Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}
