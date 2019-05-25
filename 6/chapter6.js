const bruce={name: "Bruece"};
const madeline={name: "Madeline"};

function greet(){
    return `Hello I'm ${this.name}`;
}

function update(birthYear, occupation){
    this.birthYear=birthYear;
    this.occupation=occupation;
}

// update.call(bruce, 1949, 'singer');
// console.log(bruce); // { name: 'Bruece', birthYear: 1949, occupation: 'singer' }
//
// update.call(madeline, 1942, 'actrees')
// console.log(madeline); //{ name: 'Madeline', birthYear: 1942, occupation: 'actrees' }

// update.apply(bruce, [1955, 'actor']);
// console.log(bruce);  //{ name: 'Bruece', birthYear: 1955, occupation: 'actor' }

const updateBruce= update.bind(bruce);
updateBruce(1904, "actor");
console.log(bruce);  //{ name: 'Bruece', birthYear: 1904, occupation: 'actor' }
updateBruce.call(madeline, 1111, 'template'); //위에서 bind를 bruce로 해서 this 인자로 madeline을 넘겨도 bruce만 변경
console.log(bruce);  //{ name: 'Bruece', birthYear: 1904, occupation: 'actor' }
console.log(madeline); //{ name: 'Madeline' }