import { Sequelize } from "sequelize";
const sequelize = new Sequelize("mariadb://root:root@localhost:3306/pitu");
export default sequelize;