const csv=require('csv-parser');
const fs=require('fs');
const db=require('./db');
const config=require('./config');

function dateChange(date){
    var t=date.split('/');
    var res="";
    for(var i=2;i>=0;i--){
        res+=t[i];
        if(i>0)
            res+='-';
    }
    return res;
}

function insert(values){
    var stmt='insert into patients values(?,?,?,?,?,?,?,?,?,?,?)';
     // var values=[aadhar,farmer_id,fname,lname,phone_no,age,gender,category,farm_address,state,district,village,pincode,bank_name,account_no,ifsc_code];

      db.query(stmt,values,(err,results)=>{
        if(err)
            throw err;
        // if(results.affectedRows>0){
        //     console.log('farmer added successsfully');
        //     //res.send(JSON.stringify('ok'));
        // }
        // else{
        //     //res.send(JSON.stringify('not ok'));
        // }
      });
}

const results =[];
fs.createReadStream('covid19.csv')
    .pipe(csv({}))
    .on('data',(data)=>results.push(data))
    .on('end',()=>{
        console.log(config.dataIntoDatabase);
        var i=0
        if(!config.dataIntoDatabase){
                results.forEach(item => {
                    var date=dateChange(item.reportedOn);
                    var age=parseInt(item.ageEstimate);
                    
                    if(age>0){
                        age=age
                    }else{
                        age=null;
                        i++;
                    }
                    console.log(age,i);
                 var values=[parseInt(item.patientId),date,item.onsetEstimate,age,item.gender,item.city,item.district,item.state,item.status,item.notes,item.contractedFrom];
                 insert(values);
                });
        //console.log('Done');
        config.dataIntoDatabase=true;
        console.log(config.dataIntoDatabase);
        }
    })

//
//console.log(results);