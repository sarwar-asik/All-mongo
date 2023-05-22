# Aggregation of Mongodb

### $match Just Find operation

    db.practice3.aggregate([
        {$match: {gender:"Female",age:{$gt:94}} }
     ]).project({age:1,name:-1,gender:true})

### $AddFields and $projects

       db.practice3.aggregate([
        {$addFields: {salary:10}},
        {$project: {salary:1,name:true}}
      ])

### get a random salary (not easy system && not set in original documents)

                db.practice3.aggregate([
                {
                    $addFields: {
                        salary:{
                            $toInt: {
                            $floor: {
                                $multiply: [{$rand: {}},100 ]
                            }
                        }
                        }
                    },
                }

                ])

#### ### get a random salary (not easy system && also set in original documents)

        db.practice3.aggregate([
        {
            $addFields: {
                salary:{
                    $toInt: {
                    $floor: {
                        $multiply: [{$rand: {}},100 ]
                    }
                }
                }
            },
        },
        {$merge:"practice3"}

        ])

        // .project({age:1,name:-1,gender:true,salary:true})

### ($out:"output db") create a new db with some fields !!!

        db.practice3.aggregate([
            {$project: {name:1,age:1}},
            {$out: "ShortDetails"}
         ])

### $group (for get unique combination in fields)

    1(simple).
     db.practice3.aggregate([

          {$group: {_id: "$age"}}

        ])
    2 .
    db.practice3.aggregate([
        {$group: {_id: {
            age:"$salary",
            gender:"$gender",
            passion:"$occupation"
        }}}
        ])

### use $group ,$sort,$limit together

        db.practice3.aggregate([

            {$group: {_id:"$salary",
                person:{$sum:1}
            }},
            {$project: {
                _id:0,
                salary:"$_id",
                person:1
            }},
            {$sort:{_id:-1}},
            {$limit:4}
        ])

### sum the salary of the company ...

        db.practice3.aggregate([
            {
                $group:{
                    _id:null,
                    count:{$sum:"$salary"}
                }
            }
        ])

### get Maximum $max and $min  ,$subtract (minus ) !!! salary >>

        db.practice3.aggregate([
            {
                $group:{
                    _id:null,
                    count:{$sum:"$salary"},
                    maxSalary:{$max: "$salary"},
                    minSalary:{$min: "$salary"}
                }
            },

    //// get subtract salary ///
    {
      $project: {
          count:1,
          maxSalary:1,
          minSalary:1,
        salarySubstract:{$subtract: ["$maxSalary","$minSalary"]}


      }
    }
        ])

### $unwind (for separate group of array fields)

        db.practice3.aggregate([
        {
            $unwind:"$friends"
        },
        {$group:{
            _id:"$friends",
            count:{$sum:1}
        }},
        {$sort: {count:1}}
        ])

### $facet for sub pipeline

        db.practice3.aggregate([
            {$match: {_id:ObjectId("64634040e5044eef0fa0d60e")}},
        {
            $facet:{
                "friendsCount":[
                    {$project: {friensCount:{$size:"$friends"}}}
                    ],
                "interestsCount":[
                        {$project: {inetresCount:{$size:"$interests"}}}
                        ],

                "SkillsCount":[
                    {$project: {interesCount:{$size:"$skills"}}}]
            }
        }
        ])

### $lookup !!! for get 2 db data together

    db.additionalnfo.aggregate([
        {$match: {userEmail:"cthame2q@tumblr.com"}},
        {$lookup: {
            from: "practise3",
            localField: "userEmail",
            foreignField: "email",
            as: "newData"
            }}
        ])
