import { Sequelize } from "sequelize";

const sequelize = new Sequelize('nocobase_notifications_inapp', 'nocobase', 'nocobase', {
  host: 'localhost',
  dialect: 'postgres'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}