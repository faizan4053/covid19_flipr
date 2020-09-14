var str = '26/04/2020';
var res = str.split("/");
var i;
var t=""
for(i=3-1;i>=0;i--){
    t+=res[i];
    if(i>0)
        t+='-'
    //console.log(res[i])
}

console.log(t)