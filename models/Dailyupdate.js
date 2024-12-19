module.exports = (sequelize, DataTypes) => {
  const DailyUpdate = sequelize.define('DailyUpdate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskDetails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  });

  DailyUpdate.associate = (models) => {
    // DailyUpdate belongs to User
    DailyUpdate.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    // DailyUpdate belongs to Project
    DailyUpdate.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project',
    });
  };

  return DailyUpdate;
};
