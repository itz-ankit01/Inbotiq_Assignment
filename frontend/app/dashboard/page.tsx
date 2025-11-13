'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (!token || !storedUser) {
      router.push('/login')
      return
    }

    // Set user from localStorage immediately
    try {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    } catch (error) {
      console.error('Error parsing user data:', error)
    }

    // Verify token with backend
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.data.success) {
          setUser(response.data.data)
          localStorage.setItem('user', JSON.stringify(response.data.data))
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          router.push('/login')
        }
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [router])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const roleColor = user.role === 'Admin' ? 'from-purple-500 to-pink-500' : 'from-blue-500 to-cyan-500'
  const roleIcon = user.role === 'Admin' ? '👑' : '👤'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, <span className="text-blue-600">{user.name}</span>
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${roleColor} text-white`}>
                  <span className="mr-1">{roleIcon}</span>
                  {user.role}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">Active</p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Role</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{user.role}</p>
              </div>
              <div className="text-3xl">{roleIcon}</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900 mt-1 truncate">{user.email}</p>
              </div>
              <div className="text-3xl">📧</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {user.role} Dashboard
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Welcome to your personalized dashboard. This is your {user.role.toLowerCase()} workspace where you can manage your account and access features.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-sm font-medium text-gray-700">Secure</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm font-medium text-gray-700">Fast</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-sm font-medium text-gray-700">Modern</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

