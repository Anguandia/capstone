import { writeFile, readFile, readdir } from 'fs';
import { generateToken } from '../helpers/token.js';
import User from '../models/user.js';
import Blog from '../models/blog.js';

// let users = [],
// blogList = [];

export const home = (req, res) => {
  res.json({ "message": "xxxxxxxxxxxx" })
}

export const addNums = (a, b) => a + b;

export const signup = (req, res) => {
  let user = req.body;
  const userInstance = new User(user);
  userInstance.save((err, saved) => {
    if (err) return console.log(err)
    user.id = saved._id;
    const token = generateToken(user);
    res.status(201).json({ "message": "user created", "user": saved, "token": token })
  })
  // writeFile('./users.txt', `name: ${user.identity}\n gender: ${user.gender}`, (err) => {
  //   if (err) console.log(err);
  //   else { };
  // })
  // users.push(user);
}

export const login = (req, res) => {
  let user = req.body;
  const token = generateToken(user);
  User.findOne({ name: user.name }, (err, found) => {
    if (err) throw new Error(err)
    res.status(200).json({token})
  })
}

const findUserBlogs = (id) => {
  return Blog.find({ author: id }, (err, found) => {
    if (err) throw new Error(err);
    return found;
  });
}

export const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate('blogs', 'title')
    .exec((err, user) => {
      if (err) throw new Error(err);
      res.status(200).json({ user })
    })
}

export const allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) throw new Error(err);
    users.forEach(user => user.populate('blogs'))
    res.status(200).json({ message: 'success', users });
  })
}

export const blogs = (req, res) => {
  console.log('..........');
  let blog = req.body;
  blog.author = req.user.id;
  const blogInstance = new Blog(blog);
  blogInstance.save((err, saved) => {
    if (err) throw new Error(err);
    // saved.populate('author', 'name');
    res.status(201).json({ message: 'blog created', post: saved })
  })
}

export const allBlogs = (req, res) => {
  Blog.find((err, blogs) => {
    if (err) throw new Error(err)
    Array.from(blogs).forEach(s => {
      s.populate('author');
      console.log(s.author);
    });
    return res.status(200).json({ blogs });
  })
}

export const getBlog = (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .populate('author', 'name')
    .exec((err, blog) => {
      if (err) throw new Error(err);
      console.log(blog.author);
      res.status(200).json({ blog })
    })
}