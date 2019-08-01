const controller=require('./controller');
module.exports=function(app){
    app
    .get('/api/students', controller.studentAll)
    .post('/api/students', controller.studentNew)
    .get('/api/students/:id', controller.studentDetails)
    .put('/api/students/:id', controller.studentUpdate)
    .delete('/api/students/:id', controller.studentRemove)
}