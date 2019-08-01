const Students=require('./models');

module.exports={
    studentAll: (req, res)  =>
        Students
        .find()
        .then(all=>console.log(all) || res.json(all))
        .catch(err=>console.log(err)|| res.json(err)),

    studentNew: (req, res) => {
        console.log("entered new controller", req.body);
        Students
        .create(req.body)
        .then(anew => console.log("created in controller",anew)|| res.json(anew))
        .catch(err=>console.log(err) || res.json(err))
    },

    studentRemove: (req, res) => Students
        .findByIdAndDelete(req.params.id)
        .then(deleted=> console.log("deleted", deleted))
        .catch(err=>console.log(err) || res.json(err)),

    studentDetails:(req, res) => Students
        .findById(req.params.id)
        .then(one=>console.log(one) || res.json(one))
        .catch(err=>console.log(err) || res.json(err)),

    studentUpdate: (req, res) => Students
        .findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
        .then(updated =>console.log("updated",updated)||res.json(updated))
        .catch(err=>console.log(err) || res.json(err)),
}