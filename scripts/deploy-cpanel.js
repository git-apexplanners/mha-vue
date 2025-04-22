// This script deploys the built Vue.js application to cPanel using FTP
// Run with: node scripts/deploy-cpanel.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ftp from 'basic-ftp'
import dotenv from 'dotenv'
import chalk from 'chalk'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const config = {
  host: process.env.FTP_HOST || '',
  port: parseInt(process.env.FTP_PORT || '21'),
  user: process.env.FTP_USER || '',
  password: process.env.FTP_PASSWORD || '',
  secure: process.env.FTP_SECURE === 'true',
  remoteDir: process.env.FTP_REMOTE_DIR || '/public_html',
  localDir: path.resolve(__dirname, '../build')
}

// Validate configuration
const validateConfig = () => {
  const requiredFields = ['host', 'user', 'password']
  const missingFields = requiredFields.filter(field => !config[field])

  if (missingFields.length > 0) {
    console.error(chalk.red(`Error: Missing required configuration: ${missingFields.join(', ')}`))
    console.error(chalk.yellow('Please create a .env file with the following variables:'))
    console.error(chalk.yellow(`
FTP_HOST=your-cpanel-host.com
FTP_PORT=21
FTP_USER=your-username
FTP_PASSWORD=your-password
FTP_SECURE=true
FTP_REMOTE_DIR=/public_html
    `))
    process.exit(1)
  }
}

// Deploy function
const deploy = async () => {
  console.log(chalk.blue('Starting deployment to cPanel...'))

  // Validate configuration
  validateConfig()

  // Check if build directory exists
  if (!fs.existsSync(config.localDir)) {
    console.error(chalk.red('Error: build directory not found. Run "npm run build" first.'))
    process.exit(1)
  }

  const client = new ftp.Client()
  client.ftp.verbose = process.env.NODE_ENV === 'development'

  try {
    // Connect to FTP server
    console.log(chalk.blue(`Connecting to ${config.host}...`))
    await client.access({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      secure: config.secure
    })

    console.log(chalk.green('Connected successfully!'))

    // Navigate to remote directory
    console.log(chalk.blue(`Navigating to ${config.remoteDir}...`))
    await client.ensureDir(config.remoteDir)

    // Upload files
    console.log(chalk.blue(`Uploading files from ${config.localDir}...`))
    await client.uploadFromDir(config.localDir)

    console.log(chalk.green('Deployment completed successfully!'))
  } catch (err) {
    console.error(chalk.red('Deployment failed:'), err)
    process.exit(1)
  } finally {
    client.close()
  }
}

// Run the deployment
deploy()
