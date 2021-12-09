
const xmlString = `
<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>

<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`;


const xmlDOM = new DOMParser().parseFromString(xmlString, "text/xml");

const students = xmlDOM.getElementsByTagName('student');

let list = [];
let result = {};

for (i = 0; i < students.length; i++){
  list[i] = {
    firsName: students[i].querySelector('first').textContent,
    secondName: students[i].querySelector('second').textContent,
    language: students[i].querySelector('name').getAttribute('lang'),
    age: students[i].querySelector('age').textContent,
    prof:students[i].querySelector('prof'),
  };
  
  result = {
    list: list
  }
}

console.log(result);