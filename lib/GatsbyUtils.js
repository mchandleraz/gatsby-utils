const fs = require('fs');
const path = require('path');

const moment = require('moment');

const GatbsyUtils = () => {

  const createMarkdownFile = (path, title) => {
    const stream = fs.createWriteStream(`${path}/index.md`);

    stream.on('error', (err) => {
      return console.error(err);
    });
    
    stream.on('open', () => {
      stream.write('---\n')
      stream.write(`title: "${title}"\n`)
      stream.write('date: "2017-04-03T22:12:03.284Z"\n')
      stream.write('layout: post\n')
      stream.write(`path: "/${title}/"\n`)
      stream.write('category: "General"\n')
      stream.write('description: ""\n')
      stream.write('---\n\n')
      stream.end();
    });
  }

  const newPost = (postTitle) => {
    const date = moment().format('YYYY-MM-DD');
    const workingDirectory = process.cwd();

    const config = require(`${workingDirectory}/.gatsby`);

    if (postTitle === undefined) {
      return console.error('ERROR :: Please include a dash-seperated post title');
    }

    const directory = `${workingDirectory}${config.path}${date}-${postTitle}`;

    fs.mkdir(directory, (err) => {
      if (err) {
        return console.error(err);
      }

      createMarkdownFile(directory, postTitle);
    });
  }

  return {
    newPost
  }
}

module.exports = GatbsyUtils();
