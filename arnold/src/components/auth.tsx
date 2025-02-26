import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(true);
    const [emailAddress, setEmailAddress] = useState(''); 
    const[password, setPassword] = useState(''); 
    const[confirmpassword, setConfirmPassword] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const [successMessage, setSuccessMessage] = useState(''); // State for success messages

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailAddress === '' || password === '' || confirmpassword === '') {
            setErrorMessage('Please fill in all fields');
            setSuccessMessage('');
            return;
        }

        if (password !== confirmpassword) {
            setErrorMessage('Passwords do not match');
            setSuccessMessage('');
            return;
        }

        const response = await fetch('http://localhost:5001/api/signupnewuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailAddress, password }),
        });

        if (response.ok) {
            // Store email in localStorage for the signup process
            localStorage.setItem('userEmail', emailAddress);
            
            setSuccessMessage('Account created successfully!');
            setErrorMessage('');
            setEmailAddress('');
            setPassword('');
            setConfirmPassword('');

            // Navigate to signup page after a short delay
            setTimeout(() => {
                navigate('/signup');
            }, 1000);
        } else {
            const errorData = await response.json();
            setErrorMessage(errorData.error || 'Failed to create user');
            setSuccessMessage('');
        }
    };


    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailAddress === '' || password === '') {
            setErrorMessage('Please fill in all fields');
            setSuccessMessage('');
            return;
        }

        try {
            // First, attempt to login
            const loginResponse = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailAddress, password }),
            });

            if (loginResponse.ok) {
                // Store email in localStorage
                localStorage.setItem('userEmail', emailAddress);
                
                // If login successful, check if user has data
                const userDataResponse = await fetch(`http://localhost:5001/api/user-data/${emailAddress}`);
                const userData = await userDataResponse.json();

                setSuccessMessage('Login successful!');
                setErrorMessage('');

                // Navigate based on whether user has data
                setTimeout(() => {
                    if (userData.hasData) {
                        navigate('/home');
                    } else {
                        navigate('/signup');
                    }
                }, 1000);
            } else {
                const errorData = await loginResponse.json();
                setErrorMessage(errorData.error || 'Failed to login');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Error during login');
            setSuccessMessage('');
        }
    };


    return (

        <>
        {errorMessage && (
                <div className="bg-red-500 text-white p-4 rounded mb-4">
                    {errorMessage}
                </div>
            )}
        {successMessage && (
                <div className="bg-green-500 text-white p-4 rounded mb-4">
                    {successMessage}
                </div>
            )}
        {isSignup
        
        ?

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white text-black px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white text-black px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white text-black px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              
            </div>
            
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {isSignup ? 'Already have an account? ' : 'Don\'t have an account? '}
            <button onClick={() => setIsSignup(!isSignup)} className="text-indigo-600 hover:text-indigo-500">
              {isSignup ? 'Login' : 'Signup'}
            </button>
          </p>
        </div>
      </div>

      : 

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Login in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white text-black px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white text-black px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          {isSignup ? 'Already have an account? ' : 'Don\'t have an account? '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-indigo-600 hover:text-indigo-500">
            {isSignup ? 'Login' : 'Signup'}
          </button>
        </p>
      </div>
    </div>
        
        }
        
      </>
    )
}

