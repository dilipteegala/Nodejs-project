let l = require('./largeNumber')

console.log("large number:",l.lNum);

// const fs = require('fs');

// console.time("time");
// const file = fs.readFileSync('./santa.txt').toString();
// const steps = [...file].filter(steps => steps === '(');
// const answer = steps.length - (file.length - steps.length);
// console.timeEnd("time");

// console.log(answer);

// function queston2(){
//     fs.readFile('./santa.txt',(err,data)=>{
//         console.time("time-2");
//         const directions = data.toString();
//         const directionArray = directions.split('');
//         let accumulater = 0
//         let counter = 0
//         const answer = directionArray.some((currentItem)=>{
//             if (currentItem === '(') {
//                 accumulater = accumulater+ 1;
//             } else if(currentItem ===')') {
//                 accumulater = accumulater- 1;
//             }
//             counter ++
//             return accumulater < 0
//         })
//         console.timeEnd("time-2");
//         console.log('floor',counter);   
//     })
// }

// queston2()
