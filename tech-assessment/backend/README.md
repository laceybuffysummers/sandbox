# Eaton Tech Assessment APP - API

## Requirements
- [Nodejs 8+](https://nodejs.org/en/)
- Microsoft SQL Server 2012+. There are several installation options:
  - On Windows:
    - Download the version you need [here](https://www.microsoft.com/en-ca/sql-server/sql-server-downloads)
    - For verification purpose, you can use the free Express edition
    - The installation is straightforward, just click on the download exe file and follow the instructions
  - On Linux:
    - RedHat: follow instructions [here](https://docs.microsoft.com/sql/linux/quickstart-install-connect-red-hat)
    - Ubuntu: follow instructions [here](https://docs.microsoft.com/sql/linux/quickstart-install-connect-ubuntu)
    - Suse: follow instructions [here](https://docs.microsoft.com/sql/linux/quickstart-install-connect-suse)
  - Docker:
    - Windows container: follow instructions [here](https://hub.docker.com/r/microsoft/mssql-server-linux/)
    - Linux container: follow instructions [here](https://docs.microsoft.com/sql/linux/quickstart-install-connect-docker)
- SQL Server client tool to connect to the SQL Server to create database:
  - Download and install SQL Server Management Studio [here](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-2017), or
  - Use `sqlcmd` command-line tool (included in the instructions above)

## Create Database
- You can use the GUI tool SQL Server Management Studio to create a new database, e.g. `techassessment`
- If you use `sqlcmd`, follow the above guidelines to create a new database. E.g.
  - Connect: `sqlcmd -S localhost -U SA -P '<YourPassword>'`
  - Create new database: `CREATE DATABASE <YourDatabaseName>`

## Configuration
- Edit configuration in `config/default.json` and
- Custom environment variables names in `config/custom-environment-variables.json`,
- for example it will read `verrsion` from **API_VERSION** environment variable.

Following variables can be configured:
- `authExpiresIn` the JWT token expiry (e.g. 1h, 1d, 1w..)
- `authSecret` the secret to encode/decode JWT tokens
- `port` the port to which the app listens
- `logLevel` the log level `debug` or `info`
- `version` the version of api
- `dbUrl` the url to the MSSQL database

## Local Deployment

- Install dependencies `npm i`
- Run lint check `npm run lint`
- Start app `npm start`

## Verification
- Generate test data `npm run generate-test-data`
- Import `docs/postman_collection.json` and `docs/postman_environment.json` into Postman
- Execute the calls in Postman to verify the endpoints. ***NOTE***:
  - You should use Postman Runner to execute all the calls from top to down
  - Otherwise, if you want execute calls one by one, you should execute the login calls (in Authentication directory) first, so that the bearer takens are cached for the subsequent calls
- Check Logs table in the database to verify the logs are created for successful POST/PUT/DELETE calls. You also can search log records by using the calls in Postman `Log` folder

## Initialize Database
If you want to initialize the database with some users

- Update the users you want to create in `test_files/init-db.js`
- Run `npm run init-db`
- It will recreate all tables and insert the users into the database
