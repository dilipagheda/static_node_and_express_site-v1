const express = require('express');
const bodyParser = require('body-parser');
const { projects } = require('./data.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use('/static', express.static('public'));

app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.locals.projects = projects;
  res.render('index');
});

app.get('/about', (req, res) => {
 res.render('about');
});

app.get('/project/:id', (req, res) => {
  let project = projects[req.params.id];
  if(req.params.id > projects.length || project === undefined){
    let error = new Error(`There is no such project with id:${req.params.id}`);
    error.status = 500;
    console.dir(error);
    res.locals.error = error;
    res.status(error.status);
    return res.render('error');
  }
  console.log(project);
  res.locals.project = project;
  res.render('project');
 });

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  console.dir(err);
  res.render('error');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('The application is running on localhost:3000!')
});