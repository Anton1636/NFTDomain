const hre = require('hardhat')

const tokens = n => {
	return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
	const [deployer] = await ethers.getSigners()
	const NAME = 'ETH Daddy'
	const SYMBOL = 'ETHD'

	const ETHDaddy = await ethers.getContractFactory('ETHDaddy')
	const ethDaddy = await ETHDaddy.deploy(NAME, SYMBOL)
	await ethDaddy.deployed()

	console.log(`Deployed Domain Contract at: ${ethDaddy.address}\n`)

	const names = [
		'test1.domain',
		'test2.domain',
		'test3.domain',
		'test4.domain',
		'test5.domain',
		'test6.domain',
	]

	const costs = [
		tokens(0.1),
		tokens(200),
		tokens(1.2),
		tokens(0.7),
		tokens(2.3),
		tokens(4),
	]

	for (var i = 0; i < names.length; i++) {
		const transaction = await ethDaddy
			.connect(deployer)
			.list(names[i], costs[i])
		await transaction.wait()

		console.log(`Listed Domain ${i + 1}: ${names[i]}`)
	}
}

main().catch(error => {
	console.error(error)
	process.exitCode = 1
})
