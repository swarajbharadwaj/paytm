import { Button } from "./Button"
import { Link } from 'react-router-dom'

export function AppbarHomepage() {

    function logout() {
        localStorage.removeItem('token');
    }

    return (
        <div className="flex justify-between shadow-xl sm:h-14">
            <div className="flex flex-col justify-center text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-600 to-indigo-600 sm:ml-4">
                <Link to={'/'}>
                    PaySphere
                </Link>   
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex gap-4 mr-4 mt-2">
                    <Link to="/signin">
                    <div>
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full" >
                Login
            </button>
        </div>
                    </Link>
                    <Link to="/signup">
                        <div>
            <button type="button" onClick={logout} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-full" >
                Signup
            </button>
        </div>
                    </Link>
                </div>
            </div>            
        </div>
    )
}