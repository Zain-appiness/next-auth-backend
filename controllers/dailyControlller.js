const { Project } = require('../models');
const { User }= require('../models');
const { DailyUpdate}= require('../models');

async function createDailyUpdate(req,res) {
    try {
        const { projectId, taskDetails, startTime, endTime,date } = req.body;
        const userId = req.user.id; // From auth middleware
  
        const dailyUpdate = await DailyUpdate.create({
          projectId,
          userId,
          taskDetails,
          startTime,
          endTime,
          date
        });
  
        const createdUpdate = await DailyUpdate.findByPk(dailyUpdate.id, {
          include: [
            { model: User,as: 'user' },
            { model: Project, as: 'project' }
          ]
        });
  
        res.status(201).json(createdUpdate);
      } catch (error) {
        console.error('Error creating daily update:', error);
        res.status(500).json({ message: 'Failed to create daily update', error });
      }
}

async function getDailyUpdates(req,res) {
    try {
        const { projectId } = req.params;
        const updates = await DailyUpdate.findAll({
          where: { projectId },
          include: [
            { model: User,as: 'user' },
            { model: Project, as: 'project' }
          ],
          order: [['date', 'DESC'], ['startTime', 'DESC']]
        });
        res.json(updates);
      } catch (error) {
        console.error('Error fetching daily updates:', error);
        res.status(500).json({ message: 'Failed to fetch daily updates', error });
      }
}

module.exports= {createDailyUpdate,getDailyUpdates};

