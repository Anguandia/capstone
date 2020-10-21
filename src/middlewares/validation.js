export const validName = (req, res, next) => {
  let name = req.body.name;
  if (!name.includes(' ')) {
    res.status(400).json({message: 'full name needed'})
  }
  else if (name.length < 6) {
    res.status(400).json({message: 'name too short'})
  }
  else {
    next();
  }
}