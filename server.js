'use strict';

const express = require('express');
const pg = require('pg');

let app = express();
app.set('view engine', 'ejs');
const PORT = process.env.PORT || 3000;

const CONSTRING = process.env.DATABASE_URL || 'postgres://ncarignan:password@localhost:5432/hyperseek';
let client = new pg.Client(CONSTRING);
client.connect();

// Links
let links = [
  {
    title: 'HTML Stuff',
    url: 'http://www.html.com',
    description: 'Lots of stuff about HTML',
    category: 'Web Development'
  },
  {
    title: 'CSS Stuff',
    url: 'http://www.css.com',
    description: 'Lots of stuff about CSS',
    category: 'Web Development'
  },
  {
    title: 'jQuery Stuff',
    url: 'http://www.jquery.com',
    description: 'Lots of stuff about jQuery',
    category: 'Front End Development'
  },
  {
    title: 'React Stuff',
    url: 'http://www.react.com',
    description: 'Lots of stuff about React',
    category: 'Front End Development'
  },
  {
    title: 'Angular Stuff',
    url: 'http://www.angular.com',
    description: 'Lots of stuff about Angular',
    category: 'Front End Development'
  },
  {
    title: 'Vue Stuff',
    url: 'http://www.vue.com',
    description: 'Lots of stuff about Vue',
    category: 'Front End Development'
  },
  {
    title: 'Python Stuff',
    url: 'http://www.python.com',
    description: 'Lots of stuff about Python',
    category: 'Back End Development'
  },
  {
    title: 'Java Stuff',
    url: 'http://www.java.com',
    description: 'Lots of stuff about Java',
    category: 'Back End Development'
  }
];

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/categories', showCategories);
app.get('/links', showLinks);

function showCategories( request, response ) {
  let SQL = 'SELECT * FROM categories';
  client.query(SQL)
    .then( data => {
      let categories = data.rows;
      response.render('categories', {items:categories});
    })
}

function showLinks( request, response ) {
  let SQL = 'SELECT * FROM links';
  client.query(SQL)
    .then( data => {
      let listings = data.rows;
      console.log(listings);
      response.render('links', {items:listings});
    })
}

client.query(`DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100),
  category_description TEXT,
  category_icon VARCHAR(255),
  parent INT
);

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL,
  url VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  keywords VARCHAR(255)
);

INSERT INTO categories (category, parent) VALUES
  ('Web Development', 0),
  ('Front End Development',0),
  ('Back End Development',0);

INSERT INTO links (url,title,category_id,description, keywords) VALUES
  ('http://www.html.com', 'HTML Stuff', 1, 'Lots of stuff about HTML', 'html,semantics,markup,websites,seo'),
  ('http://www.css.com', 'CSS Stuff', 1, 'Lots of stuff about CSS','css,animation,less,sass,presentation'),
  ('http://www.jquery.com', 'jQuery Stuff', 2, 'Lots of stuff about jQuery','javascript,js,events,selectors'),
  ('http://www.react.com', 'React Stuff', 2, 'Lots of stuff about React','javascript,components,events,facebook,redux'),
  ('http://www.angular.com', 'Angular Stuff', 2, 'Lots of stuff about Angular','javascript,components,events,google'),
  ('http://www.vue.com', 'Vue Stuff', 2, 'Lots of stuff about Vue','javascript,components'),
  ('http://www.python.com', 'Python Stuff', 3, 'Lots of stuff about Python','data,whitespace,ai,ml'),
  ('http://www.java.com', 'Java Stuff', 3, 'Lots of stuff about Java','data,nerdy');`);

app.use( express.static('./public') );

app.listen( PORT, () => console.log('Server Up on ', PORT) );
