const { User }= require('../models');
const { Op, where }= require('sequelize');
const { Project } = require('../models');
require("dotenv").config(); 
const jwt = require("jsonwebtoken");

async function login(req,res) {
  try {
  
  const {email}= req.body;
  console.log('email is :',email);

  const user= await User.findOne({
    where:{email},
    attributes: ["id", "email", "name", "isAdmin"],
  })

  if(!user){
    return res.status(404).json({ message: "User not found" });
  }

  const token= jwt.sign({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin,
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    },
  });
  } 
  catch (error) {
  console.error("Error during login:", error);
  res.status(500).json({ message: "Failed to login", error });
  }
}

async function createUser(req,res) {
    try {
        const { email,name,isAdmin }= req.body;
        
        if(!email.endsWith('@appinessworld.com')){
            return res.status(400).json({ 
                message: 'Only @appinessworld.com email addresses are allowed' 
              });
        }

        const existingUser= await User.findOne({
            where: {email}
        });

        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
        email,
        name,
        isAdmin: isAdmin
        });
        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
          });
        } 
    catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Failed to create user', error });
    }
}
async function getAllUsers(req, res) {
  const { page = 1, limit = 10 } = req.query; // Defaults to page 1, 10 users per page
  try {
    const { count, rows } = await User.findAndCountAll({
      attributes: ['id', 'email', 'name', 'isAdmin'],
      order: [['name', 'ASC']],
      limit,
      offset: (page - 1) * limit,
    });
    res.json({ total: count, users: rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
}


async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: ['id', 'email', 'name', 'isAdmin'],
      include: [
        // Projects managed by the user
        {
          model: Project,
          as: 'managedProjects',
          include: [
            {
              model: User, 
              as: 'projectManager',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
        // Projects where the user is a team member
        {
          model: Project,
          as: 'teamProjects',
          include: [
            {
              model: User,
              as: 'projectManager',
              attributes: ['id', 'name', 'email'],
            },
          ],
        },
      ],
    });

    if (user) {
      return res.status(200).json(user);
    }

    return res.status(404).json({ message: 'User not found' });

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      message: 'An error occurred while fetching the user.',
      error: error.message,
    });
  }
}

async function searchUsers(req,res) {
    try {
        const {query}= req.query;

        const users= await User.findAll({
            where: {
                [Op.or]: [
                  { name: { [Op.iLike]: `%${query}%` } },
                  { email: { [Op.iLike]: `%${query}%` } }
                ]
              },
              attributes: ['id', 'email', 'name','isAdmin']
        })
        res.json(users);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ message: 'Failed to search users', error });
    }
}

async function getUserProjects(req,res) {
    try {
        const { id } = req.params;
      
      const user = await User.findByPk(id, {
        include: [
          {
            model: Project,
            as: 'teamProjects',
            include: [
              { 
                model: User, 
                as: 'projectManager',
                attributes: ['id', 'name', 'email']
              }
            ]
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ projects: user.teamProjects });
    } catch (error) {
        console.error('Error fetching user projects:', error);
        res.status(500).json({ message: 'Failed to fetch user projects', error });
    }
}

async function getByemail(req, res) {
  try {
    const { email } = req.params;

    const user = await User.findOne({
      where: {
        email: email,
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send only specific fields in the response
    const response = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ message: 'Failed to fetch user projects', error });
  }
}


module.exports= {login, createUser,getAllUsers,getUserById,searchUsers,getUserProjects,getByemail};
