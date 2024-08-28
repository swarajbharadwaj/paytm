import {AppbarHomepage} from "../components/AppbarHomepage"


function Homepage() {
    return (
        <div className="h-screen sm:h-screen bg-black text-white">
            <div className="sticky top-0 sm:static">
                <AppbarHomepage />
            </div>
            <div className="flex flex-col justify-center mt-10 sm:mt-36">
                <div className="flex justify-center text-6xl sm:text-9xl font-bold py-1 sm:py-6 mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-600 to-indigo-600">
                    PaySphere
                </div>
                <div className="flex justify-center">
                    <p className="text-lg h-max w-3/4 sm:w-3/5">
                    <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-600 to-indigo-600">PaySphere</span> is a Payment's app.
                    Made for sending and receiving money(dummy) to your friends, family and relatives.</p>
                </div>
            </div>
        </div>
    )
}

export default Homepage;