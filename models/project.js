module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Project.associate = (models) => {
    // Project belongs to a single User (Project Manager)
    Project.belongsTo(models.User, {
      foreignKey: 'projectManagerId',
      as: 'projectManager',
    });

    // Project belongs to many Users (Team Members)
    Project.belongsToMany(models.User, {
      through: 'ProjectMembers',
      foreignKey: 'projectId',
      as: 'teamMembers',
    });

    // Project has many DailyUpdates
    Project.hasMany(models.DailyUpdate, {
      foreignKey: 'projectId',
      as: 'dailyUpdates',
    });
  };

  return Project;
};
