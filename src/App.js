import { useEffect, useState } from 'react'
import ETHDaddy from './abis/ETHDaddy.json'
import Domain from './components/Domain'
import Navigation from './components/Navigation'
import Search from './components/Search'
import config from './config.json'

const ethers = require('ethers')

// Components

// ABIs

// Config

function App() {
	const [account, setAccount] = useState(null)
	const [provider, setProvider] = useState(null)
	const [ethDomain, setETHDomain] = useState(null)
	const [domains, setDomains] = useState([])

	const loadBlockchainData = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		setProvider(provider)

		const network = await provider.getNetwork()

		const ethDomain = new ethers.Contract(
			config[network.chainId].ETHDaddy.address,
			ETHDaddy,
			provider
		)
		setETHDomain(ethDomain)

		const maxSupply = await ethDomain.maxSupply()
		const domains = []

		for (var i = 1; i <= maxSupply; i++) {
			const domain = await ethDomain.getDomain(i)
			domains.push(domain)
		}
		setDomains(domains)

		window.ethereum.on('accountsChanged', async () => {
			const accounts = await window.ethereum.request({
				method: 'eth_requestAccounts',
			})
			const account = ethers.utils.getAddress(accounts[0])
			setAccount(account)
		})
	}

	useEffect(() => {
		loadBlockchainData()
	}, [])

	return (
		<div>
			<Navigation account={account} setAccount={setAccount} />
			<Search />
			<div className='cards__section'>
				<h2 className='cards__title'>Domains for you</h2>

				<hr />

				<div className='cards'>
					{domains.map((domain, index) => (
						<Domain
							domain={domain}
							ethDomain={ethDomain}
							provider={provider}
							id={index + 1}
							key={index}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default App
