import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Home() {

	const user = useSelector((state)=> state.auth.status)
	return (

		<div className="homePage">
			<div class="container">
			<h1 className='homeTitle'>QuickLink </h1>
			<section class="animation">
				<div class="first"><div>Explore. Create. Share.</div></div>
				<div class="second"><div> Your Digital Haven.</div></div>
				<div class="third"><div>Click. Connect. QuickLink.</div></div>
			</section>
			<Link to={user ? '/allpost' : '/signup'}>
			<button >
				Get Started Now!
			</button>
			</Link>
		</div>
		</div>


	)
}

export default Home