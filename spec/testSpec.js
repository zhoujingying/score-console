describe('',function(){
    var main = require('../index');
    it('should return a striing',function(){
        expect().toEqual();
    })

    it('should return an array with student information',function(){
        expect(main.getStuInfo(
            'xiaoming,123,han,2,Math:75,Chinese:95,English:80,program:80'
        )).toEqual(
            {
                name:'xiaoming',
                stuNo:123,
                nation:'han',
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
        
        var stuInfo = main.getStuInfo('xiaoming,123,han,2,Math:75,Chinese:95,English:80,program:80');
        expect(main.countStuScore(stuInfo)).toEqual(
            {
                name:'xiaoming',
                stuNo:123,
                nation:'han',
                className:2,
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
        );
    })
    it('should return an object that grouped by className ',function(){
        var stuInfo = main.getStuInfo('xiaoming,123,han,2,Math:75,Chinese:95,English:80,program:80');
        var stuInfoAndScore = main.countStuScore(stuInfo);
        var stuArr = main.addStudent(stuInfoAndScore);
        expect(main.findClass(stuArr)).toEqual(
            {
                stuInfo:[
                    {   name:'xiaoming',
                        stuNo:123,
                        nation:'han',
                        className:2,
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
                classTotalScore:0,
                classNum:2
            }
        );
    })
    it('should return an array that included diffenect class witch have counted',function(){
        var stu1 = main.getStuInfo('xiaoming,123,han,2,Math:1,Chinese:1,English:1,program:1');
        var stu2 =main.getStuInfo('baobao,443,han,1,Math:2,Chinese:2,English:2,program:2');
        var stu3 = main.getStuInfo('meimei,229,han,2,Math:3,Chinese:3,English:3,program:3');
        var score1 = main.countStuScore(stu1);
        var score1 = main.countStuScore(stu2);
        var score1 = main.countStuScore(stu3);
        var stuPush = main.addStudent(score1);
        var stuPush = main.addStudent(score1);
        var stuPush = main.addStudent(score1);
        var expected = [
                {
                    stuInfo:[
                        {   name:'xiaoming',
                            stuNo:123,
                            nation:'han',
                            className:2,
                            subject:{
                                Math:1,
                                Chinese:1,
                                English:1,
                                program:1
                            },
                            stuScore:{
                                totalScore:4,
                                aveScore:1
                            }
                        },
                        {
                            name:'meimei',
                            stuNo:229,
                            nation:'han',
                            className:2,
                            subject:{
                                Math:3,
                                Chinese:3,
                                English:3,
                                program:3
                            },
                            stuScore:{
                                totalScore:12,
                                aveScore:3
                            }
                        }
                        ],
                    classAveScore:8,
                    classMiddleScore:0,
                    classNum:2
                },{
                    stuInfo:[
                        {   name:'baobao',
                            stuNo:443,
                            nation:'han',
                            className:1,
                            subject:{
                                Math:2,
                                Chinese:2,
                                English:2,
                                program:2
                            },
                            stuScore:{
                                totalScore:8,
                                aveScore:2
                            }
                        }],
                    classAveScore:0,
                    classMiddleScore:0,
                    classNum:2
                }
            ]
        expect(main.calculateClass(stuArr)).toEqual(expected)
    })
})