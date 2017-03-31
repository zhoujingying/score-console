var readline = require('readline');

var r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

var firstLine = '1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1～3）\n';
entry(firstLine);
function entry(str){
r1.question(str,function(answer){
    if(answer == 1){
        flag = 'chooseFirst';
        main(flag,answer);
    }
    if(answer == 2){
        flag = 'chooseSecond';
        main(flag,answer);
    }
    if(answer == 3){
        flag = 'chooseThird';
        main(flag,answer);
    }
    if(answer == 'w'){
        entry('1.添加学生\n2.生成成绩单\n3.退出\n请输入你的选择（1～3）\n');
    }
})
}

var flag = 'chooseFirst';
function main(flag,str){
    if(flag === 'chooseFirst'){
        r1.question('请输入学生信息(格式：姓名，学号，名族，班级，学科：成绩，...)',function(answer){
            var stu = getStuInfo(answer);
            var countScore = countStuScore(stu);
            addStudent(countScore);
            findClass();
            calculateClass(classArr);
            entry(firstLine);
        });
    }
    if(flag === 'chooseSecond'){

        r1.question('请输入要打印的学生的学号（格式：学号，学号,...）',function(answer){
            var stuNum = getStuNum(answer);
            var classInfo = getStuClassInfo(stuNum);
            console.log(toPrintString(classInfo));
            entry(firstLine);
        });

    }
    if(flag === 'chooseThird'){
        r1.close();
    }
}

var stuArr = [];
var classArr = [];


function addStudent(stu){
    stuArr.push(stu);
    return stuArr;
}

function getStuInfo(str){
    var inputInfo =  str.split(',');
    var stu  =  {
            name:inputInfo[0],
            stuNo:inputInfo[1],
            nation:inputInfo[2],
            className:Number(inputInfo[3]),
            subject:{
                    Math:Number(inputInfo[4].split(':')[1]),
                    Chinese:Number(inputInfo[5].split(':')[1]),
                    English:Number(inputInfo[6].split(':')[1]),
                    program:Number(inputInfo[7].split(':')[1])
                }
        }
        return stu;
}
function countStuScore(obj){
    obj.stuScore = {};
    obj.stuScore.totalScore = (obj.subject.Math+obj.subject.Chinese+obj.subject.English+obj.subject.program);
    obj.stuScore.aveScore = obj.stuScore.totalScore/4;
    return obj;
}

function findClass(){
     // console.log(stuArr);
    var stuList = [];
    for(var stuVal of stuArr){
        var ifStu = false;
        for(var listVal of stuList){
            console.log(stuVal);
            if(stuVal.className === listVal.className) ifStu = false;
            else ifStu = true;
        }
        if(!ifStu) stuList.push(stuVal);
    }
    console.log(stuList);
    classArr.push({
        stuInfo:stuList,
        classAveScore:0,
        classNum:stuList[0].className
    });
    return classArr;
}
function calculateClass(){
    var result = [];
    var totalScores = [];
    var total = 0;

    classArr.forEach(function(val){
        val.stuInfo.forEach(function(sVal){
            total += sVal.stuScore.totalScore;
            totalScores.push(sVal.stuScore.totalScore);
            totalScores.sort(function(a,b){return a-b});
            val.classAveScore = total/totalScores.length;
            val.classMiddleScore = totalScores[Math.floor(totalScores.length/2)];
        })
        result.push(val);
    })
    return result;
}
function getStuNum(numStr){
    return numStr.split(',');
}
function getStuClassInfo(stuNumArr){
    var stuInfo = [];
    var stuList = [];
    stuNumArr.forEach(function(nVal){
        classArr.forEach(function(val){
            stuList = val.stuInfo;
            stuList.forEach(function(sVal){
                if(nVal === sVal.stuNo){
                    stuInfo.push({
                        stuInfo:sVal,
                        classAveScore:val.classAveScore,
                        classMiddleScore:val.classMiddleScore,
                        classNum:val.classNum

                    })
                }
            })
            
        })
    })
    return stuInfo;
}
function toPrintString(inputStuArr){
    var str = '';
    inputStuArr.forEach(function(val){
       str = '\n'+'成绩单'+'\n'+'姓名|数学|语文|英语|编程|平均分|总分'+'\n'+
            '============================'+'\n'+
            val.stuInfo.name+'|'+val.stuInfo.subject.Math+'|'+val.stuInfo.subject.Chinese+'|'+
            val.stuInfo.subject.English+'|'+val.stuInfo.subject.program+'|'+val.stuInfo.stuScore.aveScore+'|'+val.stuInfo.stuScore.totalScore+
            '\n'+'============================'+'\n'+
            '全班平均分为：'+val.classAveScore+'\n'+
            '全班中位分为：'+val.classMiddleScore;
        // console.log(str);
    })
    return str;
}
module.exports = {
    stuArr:stuArr,
    classArr:classArr,
    getStuInfo:getStuInfo,
    countStuScore:countStuScore,
    addStudent:addStudent,
    findClass:findClass,
    calculateClass:calculateClass,
    getStuNum:getStuNum,
    getStuClassInfo:getStuClassInfo,
    toPrintString:toPrintString
}
