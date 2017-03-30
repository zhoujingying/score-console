describe('',function(){
    var main = require('../index');
    it('should return a striing',function(){
        expect().toEqual();
    })

    it('should return an array with student information',function(){
        expect(main.getStuInfo(
            '张三,001,汉,2,Math:75,Chinese:95,English:80,program:80'
        )).toEqual(
            {
                name:'张三',
                stuNo:001,
                nation:'汉',
                className:2,
                subject:{
                    Math:75,
                    Chinese:95,
                    English:80,
                    program:80
                }
            }
        )
    })
    it('should return an array with aveScore and totalScore of student',function(){
        
        var stuInfo = main.getStuInfo('李四,002,汉,2,Math:85,Chinese:80,English:70,program:90');
        var stuInfoAndScore = main.countStuScore(stuInfo);
        expect(stuInfoAndScore).toEqual(
            {
                name:'李四',
                stuNo:002,
                nation:'汉',
                className:2,
                subject:{
                    Math:85,
                    Chinese:80,
                    English:70,
                    program:90
                },
                stuScore:{
                    totalScore:325,
                    aveScore:81.25
                }
            }
        );
        
    })
    it('should return an object that grouped by className ',function(){
        var stuInfo1 = main.getStuInfo('王五,003,汉,1,Math:75,Chinese:95,English:80,program:80');
        var stuInfoAndScore1 = main.countStuScore(stuInfo1);
        main.stuArr = main.addStudent(stuInfoAndScore1);
        expect(main.findClass(main.stuArr)).toEqual(
            [{
                stuInfo:[
                    {   name:'王五',
                        stuNo:003,
                        nation:'汉',
                        className:1,
                        subject:{
                            Math:75,
                            Chinese:95,
                            English:80,
                            program:80
                        },
                        stuScore:{
                            totalScore:330,
                            aveScore:82.5
                        }
                }],
                classAveScore:0,
                classNum:1
            }]
        );
    })
    it('should return an array that included diffenect class witch have counted',function(){
        // var stu1 = main.getStuInfo('xiaoming,123,han,2,Math:1,Chinese:1,English:1,program:1');
        // var stu2 =main.getStuInfo('baobao,443,han,1,Math:2,Chinese:2,English:2,program:2');
        // var stu3 = main.getStuInfo('meimei,229,han,2,Math:3,Chinese:3,English:3,program:3');
        // var score1 = main.countStuScore(stu1);
        // var score2 = main.countStuScore(stu2);
        // var score3 = main.countStuScore(stu3);
        // var stuArr = [];
        // stuArr.push(score1);
        // stuArr.push(score2);
        // stuArr.push(score3);
        // main.findClass(main.stuArr);
        // main.findClass(main.stuArr);
        var expected = [
                {
                    stuInfo:[
                        {   name:'王五',
                            stuNo:3,
                            nation:'汉',
                            className:1,
                            subject:{
                                Math:75,
                                Chinese:95,
                                English:80,
                                program:80
                            },
                            stuScore:{
                                totalScore:330,
                                aveScore:82.5
                            }
                        }
                        ],
                    classAveScore:330,
                    classMiddleScore:330,
                    classNum:1
                }
            ]
        expect(main.calculateClass(main.classArr)).toEqual(expected)
    })
    it('should return an array with student number',function(){
        expect(main.getStuNum('1,2,3,4,5')).toEqual([1,2,3,4,5]);
    })
    it('should return an array that included the students class information',function(){
        var stu = main.getStuNum('3');
        var expected = 
                [
                    {
                        stuInfo:
                            {   name:'王五',
                                stuNo:3,
                                nation:'汉',
                                className:1,
                                subject:{
                                    Math:75,
                                    Chinese:95,
                                    English:80,
                                    program:80
                                },
                                stuScore:{
                                    totalScore:330,
                                    aveScore:82.5
                                }
                            }
                            ,
                        classAveScore:330,
                        classMiddleScore:330,
                        classNum:1
                    }
                ]
        expect(main.getStuClassInfo(stu)).toEqual(expected);
    })
    it('should return a string witch has the student info and class info that inputed',function(){
        var stu = main.getStuNum('3');
        var inputArr = main.getStuClassInfo(stu);
        expect(main.toPrintString(inputArr)).toEqual(
            '\n'+'成绩单'+'\n'+'姓名|数学|语文|英语|编程|平均分|总分'+'\n'+
            '============================'+'\n'+
            '王五|75|95|80|80|82.5|330'+
            '\n'+'============================'+'\n'+
            '全班平均分为：330'+'\n'+
            '全班中位分为：330'
        );
    })
})