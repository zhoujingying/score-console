var readline = require('readline');

var str = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
str.question('请输入学生信息',function(answer){
    console.log('meimei');
    // str.close;
})
var stuArr = [];
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

function addStudent(stu){
    stuArr.push(stu);
    return stuArr;
}

function findClass(stuArr){
    
    var stuList = [];

    for(var stuVal of stuArr){
        var ifStu = false;
        for(var listVal of stuList){
            if(stuVal.className === listVal.stuInfo.className){
                return false;
            }else{
                return true;
            }
        }
        if(!ifStu){
            stuList.push(stuVal);
        }
    }
    var classGrop = {
        stuInfo:stuList,
        classAveScore:0,
        classTotalScore:0,
        classNum:stuList[0].className
    }
    return classGrop;
    
    
}
module.exports = {
    getStuInfo:getStuInfo,
    countStuScore:countStuScore,
    addStudent:addStudent,
    findClass:findClass
}
