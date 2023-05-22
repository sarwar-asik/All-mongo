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
