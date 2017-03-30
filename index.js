var readline = require('readline');

var str = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
str.question('请输入学生信息',function(answer){
    console.log(answer+'meimei');
    // str.close;
})


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
            stuNo:Number(inputInfo[1]),
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
    var stuList = [];
    for(var stuVal of stuArr){
        var ifStu = false;
        for(var listVal of stuList){
            if(stuVal.className === listVal.stuInfo.className) return false;
            else return true;
        }
        if(!ifStu) stuList.push(stuVal);
    }
    classArr.push({
        stuInfo:stuList,
        classAveScore:0,
        classNum:stuList[0].className
    });
    return classArr;
}
function calculateClass(classArr){
    var result = [];
    var totalScores = [];
    var total = 0;
    classArr = classArr;

    classArr.forEach(function(val){
        val.stuInfo.forEach(function(sVal){
            total += sVal.stuScore.totalScore;
            totalScores.push(sVal.stuScore.totalScore);
            // totalScores.push(sVal.stuScore.totalScore).sort(function(a,b){return a-b});
            totalScores.sort(function(a,b){return a-b});
            val.classAveScore = total/totalScores.length;
            val.classMiddleScore = totalScores[Math.floor(totalScores.length/2)];
        })
        result.push(val);
    })
    return result;
}
function getStuNum(numStr){
    var numArr = [];
    numStr.split(',').forEach(function(val){
        numArr.push(Number(val));
    })
    return numArr;
}
function getStuClassInfo(stuNumArr){
    var stuInfo = [];
    var stuList = [];
    stuNumArr.forEach(function(nVal){
        classArr.forEach(function(val){
            stuList = val.stuInfo;
            stuList.forEach(function(sVal){
                if(nVal === sVal.stuNo){
                    // stuInfo.push(sVal.stuInfo);
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
