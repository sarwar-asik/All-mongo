const app = require("express");

app.post("/addData", async (req, res) => {
  const newData = new Model1(req.body);
  try {
    //  const result =   newData.save()   /////or
    const result = await Model1.create(req.body);
  } catch (error) {
    res.send({ status: 400, error: error.message });
  }
});

app.get("getJob", async (req, res) => {
  try {
    // const getData = await Model1.find({ _id: "34n123412l12341234" }); ///or///
    // const getData = await Model1.find({$or:[{_id:"afa12312SD23E234",name:"dinku"}]})
    // const getData = await Model1.find({status:{$ne:"married"}})
    const getData = await Model1.find({status:{$ne:"married"}})

    res.status(200).send(getData)
    
  } catch (error) {
    res.status(400).send({ status: "failed", error: error.message });
  }
});
