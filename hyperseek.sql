DROP TABLE IF EXISTS links;
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
  ('http://www.java.com', 'Java Stuff', 3, 'Lots of stuff about Java','data,nerdy');
