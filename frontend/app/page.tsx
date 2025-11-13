import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Full-Stack Mini Project
          </h1>
          <p className="text-xl text-gray-600">
            Role-based authentication system built with Next.js and Express
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            Sign In
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Auth</h3>
            <p className="text-gray-600 text-sm">JWT-based authentication with bcrypt password hashing</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900 mb-2">Role-Based</h3>
            <p className="text-gray-600 text-sm">User and Admin roles with protected routes</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900 mb-2">Modern Stack</h3>
            <p className="text-gray-600 text-sm">Next.js, Express, MongoDB, and TailwindCSS</p>
          </div>
        </div>
      </div>
    </main>
  )
}

