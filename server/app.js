const express=require('express');
const config=require('./config');
//const read=require('./read');
const db=require('./db');

const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const sessions=require('express-session');
const app=express();

app.use(cookieParser());

app.use(sessions({
    secret:'covid19_hackathon',
    saveUninitialized:true,
    resave:false,
}));
app.options('*', cors()) // include before other routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var state;
var state_present;
var start_age;
var end_age;
var age_present;
var gender;
var gender_present;
var start_date,end_date;
var date_present;
var present;

var output=[]

// var stmt=`select count(*) as no_of_dead,reportedOn as date from patients `;



app.post('/filter_parameters',(req,res)=>{
    console.log(req.body);
    state=req.body.state;
    state_present=req.body.state_present;
    gender=req.body.gender;
    gender_present=req.body.gender_present;
    var age_range=req.body.age.split('-');
  //  console.log(age_range);
    start_age=parseInt(age_range[0]);
    end_age=parseInt(age_range[1]);
   // console.log(start_age,end_age);
    age_present=req.body.age_present;
    start_date=req.body.start_date;
    end_date=req.body.end_date;
    date_present=req.body.date_present;
    if(state_present || age_present || date_present || gender_present)
        present=true;
});

 app.get('/graph_parameters',(req,res)=>{
    var stmt=`select count(*) as no_of_dead,reportedOn as date from patients `;
    if(present){
        stmt+=`where `;

    if(state_present){
        stmt+=`state="${state}" `;
    }
    if(age_present){
        if(state_present)
            stmt+=`and ageEstimate BETWEEN ${start_age} and ${end_age} `;
        else
            stmt+=`ageEstimate BETWEEN ${start_age} and ${end_age} `;
    }
    if(gender_present){
        if(age_present || state_present)
            stmt+=`and gender="${gender}" `;
        else    
            stmt+=`gender="${gender}" `;
    }
    if(date_present){
        if(gender_present||age_present||state_present)
            stmt+=`and reportedOn BETWEEN "${start_date}" and "${end_date}" `;
        else    
            stmt+=`(reportedOn BETWEEN "${start_date}" and "${end_date}") `;
    }
}
    stmt+=`group by reportedOn`;
     db.query(stmt,(err,results)=>{
        console.log(results);
        //console.log(results.affectedRows);
        results.forEach(element => {
           // console.log(element.no_of_dead,element.date);
            obj={
                dead:element.no_of_dead,
                date:element.date
            }
           // console.log(obj);
           output.push(obj);
        });
        
        if(err)
            throw err;
            //console.log(results.affectedRows);
        // if(results.affectedRows>0){
        //     console.log(' successsfully');
        //     //res.send(JSON.stringify('ok'));
        // }
        else{
            //res.send(JSON.stringify('not ok'));
           console.log(output);
          res.json(output);
        //   console.log(results);
        //    res.json(results);
            console.log('successfully');
        }
      });
      present=false;
 });


app.listen(config.port,()=>{
    console.log('server is listening at port '+config.port);
})





















//  function helper(){
//     if(present){
//         stmt+=`where `;

//     if(state_present){
//         stmt+=`state="${state}" `;
//     }
//     if(age_present){
//         if(state_present)
//             stmt+=`and ageEstimate=${age} `;
//         else
//             stmt+=`ageEstimate=${age} `;
//     }
//     if(gender_present){
//         if(age_present || state_present)
//             stmt+=`and gender="${gender}" `;
//         else    
//             stmt+=`gender="${gender}" `;
//     }
//     if(date_present){
//         if(gender_present||age_present||state_present)
//             stmt+=`and reportedOn BETWEEN "${start_date}" and "${end_date}" `;
//         else    
//             stmt+=`(reportedOn BETWEEN "${start_date}" and "${end_date}") `;
//     }
// }
//     stmt+=`group by reportedOn`;
//      db.query(stmt,(err,results)=>{
//        // console.log(results);
//         //console.log(results.affectedRows);
//         results.forEach(element => {
//            // console.log(element.no_of_dead,element.date);
//             obj={
//                 dead:element.no_of_dead,
//                 date:element.date
//             }
//            // console.log(obj);
//            output.push(obj);
//         });
        
//         if(err)
//             throw err;
//             //console.log(results.affectedRows);
//         // if(results.affectedRows>0){
//         //     console.log(' successsfully');
//         //     //res.send(JSON.stringify('ok'));
//         // }
//         else{
//             //res.send(JSON.stringify('not ok'));
//            // console.log(output);
//             console.log('successfully');
//             return output;
//         }
//       });
//      // console.log(output);
//     // output.forEach(element => {
//     //       console.log(element);
//     //   });
// }

// // var a=helper();
// // console.log(a);