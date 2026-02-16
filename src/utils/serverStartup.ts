import os from 'node:os'
import boxen from 'boxen'
import { bold, dim, green } from 'colorette'

export const getNetworkAddress = () => {
	const interfaces = os.networkInterfaces()
	for (const name of Object.keys(interfaces)) {
		for (const net of interfaces[name] || []) {
			// Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			if (net.family === 'IPv4' && !net.internal) {
				return net.address
			}
		}
	}
	return 'localhost'
}

export const displayServerInfo = (port: string | number) => {
	const appName = process.env.APP_NAME || 'Express Server'
	const localUrl = `http://localhost:${port}`
	const networkUrl = `http://${getNetworkAddress()}:${port}`
	const time = new Date().toLocaleTimeString()

	const message = `
  ${green(bold(`🚀 ${appName}`))} ${dim(`started at ${time}`)}

  ${bold('Local')}:   ${green(localUrl)}
  ${bold('Network')}: ${green(networkUrl)}
`

	return console.log(
		boxen(message, {
			padding: 0.25,
			margin: 0,
			borderStyle: 'round',
			borderColor: 'cyan',
		}),
	)
}
