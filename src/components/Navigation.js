import logo from '../assets/logo.svg'

const ethers = require('ethers')

const Navigation = ({ account, setAccount }) => {
	const connectHandler = async () => {
		const accounts = await window.ethereum.request({
			method: 'eth_requestAccounts',
		})
		const account = ethers.utils.getAddress(accounts[0])
		setAccount(account)
	}

	return (
		<nav>
			<div className='nav__link'>
				<img src={logo} alt='logo' />
				<h1>ETH Domain</h1>
				<ul className='nav__links'>
					<li>
						<a href='/'>Domains</a>
					</li>
					<li>
						<a href='/'>Hosting</a>
					</li>
					<li>
						<a href='/'>Commerce</a>
					</li>
					<li>
						<a href='/'>Marketing</a>
					</li>
				</ul>
			</div>
			{account ? (
				<button type='button' className='nav__connect'>
					{account.slice(0, 6) + ' ' + account.slice(38, 42)}
				</button>
			) : (
				<button type='button' className='nav__connect' onClick={connectHandler}>
					Connect
				</button>
			)}
		</nav>
	)
}

export default Navigation
