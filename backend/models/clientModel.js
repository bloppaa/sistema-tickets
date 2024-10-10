import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class Client extends Model {}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyRut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "client",
  }
);

export default Client;
