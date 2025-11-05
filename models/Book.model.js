import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.postgres.js';

const Book = sequelize.define('Book', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'books', timestamps: false });

export default Book;
