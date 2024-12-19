const { Project } = require('../models');
const { User }= require('../models');
const { DailyUpdate}= require('../models');
const { Op } = require('sequelize');

async function createProject(req,res) {
    try {
        const { name, startDate, endDate, projectManagerId, teamMemberIds } = req.body;

        const project = await Project.create({
          name,
          startDate,
          endDate,
          projectManagerId
        });
  
        if (teamMemberIds && teamMemberIds.length > 0) {
          await project.setTeamMembers(teamMemberIds);
        }
  
        const createdProject = await Project.findByPk(project.id, {
          include: [
            { model: User, as: 'projectManager' },
            { model: User, as: 'teamMembers' }
          ]
        });
  
        res.status(201).json(createdProject);
      } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Failed to create project', error });
      }
}

async function getAllProjects(req,res) {
    try {
        const projects = await Project.findAll({
          include: [
            { model: User, as: 'projectManager' },
            { model: User, as: 'teamMembers' }
          ]
        });
        res.json(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Failed to fetch projects', error });
      }
}

async function getProjectById(req,res) {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id, {
          include: [
            { model: User, as: 'projectManager' },
            { model: User, as: 'teamMembers' },
            { 
              model: DailyUpdate,
              as: 'dailyUpdates', 
              include: [{ model: User, as: 'user'}]
            }
          ]
        });
  
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
  
        res.json(project);
      } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Failed to fetch project', error });
      }
}

async function updateProject(req,res) {
    try {
        const { id } = req.params;
        const { name, startDate, endDate, projectManagerId, teamMemberIds } = req.body;
  
        const project = await Project.findByPk(id);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
  
        await project.update({
          name,
          startDate,
          endDate,
          projectManagerId
        });
  
        if (teamMemberIds) {
          await project.setTeamMembers(teamMemberIds);
        }
  
        const updatedProject = await Project.findByPk(id, {
          include: [
            { model: User, as: 'projectManager' },
            { model: User, as: 'teamMembers' }
          ]
        });
  
        res.json(updatedProject);
      } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Failed to update project', error });
      }
}

async function deleteProject(req,res) {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
  
        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
      } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Failed to delete project', error });
      }
}

module.exports ={createProject,getAllProjects,getProjectById,updateProject,deleteProject};