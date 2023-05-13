const { readFileSync, writeFileSync }=require('fs')
const { resolve } =require('path')

const read = (filename) => {
  const data = readFileSync(resolve( filename + '.json'), 'utf-8');
  return JSON.parse(data);
};

const write = (filename, data) => {
  writeFileSync(resolve( filename + '.json'), JSON.stringify(data, null, 4));
  return true;
};

module.exports={ read, write };
