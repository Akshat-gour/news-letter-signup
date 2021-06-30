const exp=require("express");
const body=require("body-parser");
const request=require("request");
const https=require("https");

const app=exp();
app.use(exp.static("public"));
app.use(body.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  var firstName= req.body.first;
  var lastName= req.body.last;
  var email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  var jsonData=JSON.stringify(data);
  const url="";
  const option={
    method:"POST",
    auth:""
  }
  const request=https.request(url,option,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

})
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(3000,function(){
  console.log("Server started");
})
