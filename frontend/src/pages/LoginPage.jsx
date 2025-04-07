import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'; import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
// import toast from 'react-hot-toast'

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:"",

  });

  const { login, isLoggingIn } = useAuthStore()

  // const validateForm = () => {
  //   if (!formData.email.trim()) return toast.error("Email is required");
  //   if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
  //   if (!formData.password) return toast.error("Password is required");

  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData)
  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2' >
      {/* left */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 '>
        <div className='w-full max-w-md space-y-8'>
          {/* logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>

                <MessageSquare className="size-6 text-primary" />

              </div>
              <h1 className='text-2xl front-bold mt-2'> Welcome Back</h1>
              <p className='text-base-content/60'>Sign in to your account</p>
            </div>
          </div>

          {/* form */}
          <form className='space-y-6' onSubmit={handleSubmit}>


            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />

                </div>

                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* password */}


            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />

                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />

                <button

                  type="button"
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isLoggingIn}
            // onClick={validateForm}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                </>
              ) : (
                "Sign in"
              )
              }
            </button>
          </form>

          <div className='text-center'>

            <p className='text-base-content/60'>
              Don't have an account?{' '}
              <Link to='/signup' className='link link-primary'>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue yout conversations and catch up with your messages."

      />


    </div>
  )
}

export default LoginPage
