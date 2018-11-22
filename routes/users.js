var express = require('express');
var router = express.Router();

var users = [
  { id: 1, name: "Tom", email: "Tom@gmail.com", age: 30 },
  { id: 2, name: "Jack", email: "Jack@gmail.com", age: 27 },
  { id: 3, name: "Mary", email: "Mary@gmail.com", age: 25 },
  { id: 4, name: "Fiona", email: "Fiona@gmail.com", age: 20 }
];
//[0:{},1:{}]
router
  .route("/users")
  .get(function(req, res) {//讀所有資料
     res.json(users);
  }) 
  .post(function(req, res) {//新增資料
    var _user = req.body;
    // console.log(_user);
    users.push(_user);
    res.json({message:"新增成功"})
  }); 
router
  .route("/users/:id")
  .get(function(req, res) {
   // res.send("get user " + req.params.id )
    var _user = users.filter(function(user){//讀一筆資料
      return user.id == req.params.id;
    })
    res.json(_user);
  }) 
  .put(function(req, res) {//修改資料
      var _user = req.body;  
      var index = 0;
      //找到要修改資料的索引值
      users.find(function(user,i){
         if(user.id == req.params.id){
           index = i;
           return;
         }
      })
      //進行修改 splice(從第幾個位置index,刪除幾筆資料,加入的資料1,加入資料2,....)
      users.splice(index, 1, _user);

      res.json({message:"修改成功"})


  }) 
  .delete(function(req, res) {//刪除資料
    users = users.filter(function(user){
      return user.id != req.params.id;
    })
    res.json({message:"刪除成功"})
  }); 




module.exports = router;
