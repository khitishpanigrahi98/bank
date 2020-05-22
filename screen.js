
let key;
const { authorize } = Qs.parse(location.search, { ignoreQueryPrefix: true })
// console.log(authorize);
key=authorize;
// console.log("Starting key")
//  console.log(key)
const subjectlength = document.querySelectorAll('input[name="subject"]');
if(subjectlength===undefined||subjectlength.length===0)
{
const addwarn2=`<div class="warnheading2"> Add a Subject to see Detailed Analysis</div> `
document.querySelector(".middleside").insertAdjacentHTML('beforeend',addwarn2);
}
else{
    if(document.querySelector('.warnhwarnheading2eading')) document.querySelector('.warnheading2').innerHTML = '';
}

document.querySelector("#misseddates").addEventListener('click',(event)=>{
    
    event.preventDefault();
    // console.log("Fetching Subjects");
    // console.log(location);
    // console.log(location.search);
    const { authorize } = Qs.parse(location.search, { ignoreQueryPrefix: true })
    // console.log(authorize);
    key=authorize;
    const rbs = document.querySelectorAll('input[name="subject"]');
    let selectedsubject;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedsubject = rb.value;
            break;
        }
    }
    // console.log(selectedsubject);
    
    // console.log(`#${selectedsubject}present`);
    var allsub; // to get all subjects
    fetch(`/findsubject?authorize=${authorize}`,).then(async (val)=>{
      //  console.log("Found Subject");
    //    console.log(val.json());
       allsub=await val.json();
      //  console.log(allsub);
      //  console.log(allsub[0].name);
       var requiredentries=[];
       let totalbunk=0,totalpresent=0;
       allsub.forEach(element => {
           if(element.name===selectedsubject)
           {
             requiredentries.push(element);
             totalbunk++;
             if(totalpresent<element.totpresent)totalpresent=element.totpresent;
           }
       });
     
        const endtable=`</table>`;
        if(document.querySelector('.dates')) document.querySelector('.dates').innerHTML = '';//notice how I am testing if the div is present or not
        const subtable=`<table class="firsttable">
        <tr>
        <th>Subject &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</th>
        <th>Present &nbsp &nbsp &nbsp &nbsp </th>
        <th>Absent &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</th>
        <th>Dates</th>
        </tr>
        
    `;
    document.querySelector(".dates").insertAdjacentHTML('beforeend',subtable);
        let cnt=0;
        requiredentries.forEach(element => {
            const subentry=` <tr >
                                <td id="subrows">${element.name} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</td>
                                <td id="subrows">${element.totpresent} &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp  &nbsp  &nbsp</td>
                                <td id="subrows">${element.bunk} &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</td>   
                                <td id="subrows">${element.absent} &nbsp<br></td>
                             </tr>
                        `
          document.querySelector(".dates").insertAdjacentHTML('beforeend',subentry);
          cnt++;
          if(cnt===requiredentries.length)
          {
            document.querySelector(".dates").insertAdjacentHTML('beforeend',endtable);
          }
        })
        







        // chart section starts
                    const asktotal=totalpresent;
                    const  askabsent=totalbunk;
                    
                    if(document.querySelector('.warnheading')) document.querySelector('.warnheading').innerHTML = '';
                    // console.log(askabsent);
                    // console.log(asktotal);
                    // console.log("Hi "+askabsent);
                    // console.log("Hiiii "+asktotal);

                    // console.log(asktotal+askabsent);
                    let presntdata=[];
                    presntdata.push(askabsent);
                    presntdata.push(asktotal);
                    // console.log(presntdata);
                    const ctx = document.getElementById('myChart').getContext('2d');
                    data = {
                    datasets: [{
                        data: presntdata,
                        label:"Random",
                        backgroundColor:[
                            "red",
                            "green",
                        ]
                    }],
                    labels: [
                        'Absent',
                        'Present'
                    ]
                    };
                    var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: data,
                    // options: options
                    })
                    let prest=asktotal-askabsent;
                    prest=prest/asktotal;
                    prest=prest*10000;
                    prest= Math.round(prest) ;
                    prest=prest/100;
                    // console.log(prest);
                    if(prest>=75)
                    {   let enterhtml=` <div class="secondclass" style="color:green">
                                                            <pr>Safe!! Current Attendence = ${prest}%</pr>   
                                    </div>`
                    if(document.querySelector('.status')) document.querySelector('.status').innerHTML = '';//notice how I am testing if the div is present or not
                    document.querySelector(".status").insertAdjacentHTML('beforeend',enterhtml);
                    }
                    else
                    {   
                    let enterhtml=` <div class="secondclass" style="color:red">
                                                            <pr>Danger!! Current Attendence = ${prest}%</pr>   
                                    </div>`
                    if(document.querySelector('.status')) document.querySelector('.status').innerHTML = '';//notice how I am testing if the div is present or not
                    document.querySelector(".status").insertAdjacentHTML('beforeend',enterhtml);
                    }


                   

                    // chart section ends
    })
})

// Example POST method implementation:
async function postData(url = '', data = {}){
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  

let headercounter=0;
document.querySelector("#datesubmit").addEventListener('click',(event)=>{
    event.preventDefault();
    let adddate=document.getElementById("datesubbunk").value;
    let addsubject=document.getElementById("addsubjectname").value;
    let addtotalpresent=document.getElementById("addtotalpresent").value;
    addtotalpresent=parseInt(addtotalpresent);
    // console.log("date "+adddate);
    // console.log(adddate.length);
    // console.log(typeof(adddate));
    // console.log("Sub "+addsubject);
    // console.log("Total "+addtotalpresent);
    if(adddate.length===0)console.log("Date Not given");
    if(addsubject==="Subject")console.log("Subject Not given");
   
    if(adddate.length>0&&addsubject!="Subject"){
      addsubject=addsubject.toLowerCase();
      addsubject = addsubject.split(" ").join("") //remember to remove spaces between subject names
        if(document.querySelector('.recentaddedsubjecttitle')) document.querySelector('.recentaddedsubjecttitle').innerHTML = ''
        if(headercounter===0)
        {
            let recentheader=`<div class="addedsubjectheader">Recently Added Subjects </div>`
            document.querySelector(".addsubject").insertAdjacentHTML('beforeend',recentheader);
            headercounter++;
        }
        const nowsub=`<div class="recentaddedsubject"> <img src="ripple.gif "height="20" width="20" >${addsubject} &nbsp &nbsp ${adddate} <img src="verified.png"height="20" width="20" ></div>`
        
        postData(`/addsubject?authorize=${key}`, {
            "name":addsubject,
            "absent": adddate,
            "bunk" : 1,
            "totpresent" : addtotalpresent
        })
        .then(data => {
          // console.log(data); // JSON data parsed by `response.json()` call
          
          document.querySelector(".addsubject").insertAdjacentHTML('beforeend',nowsub);
          document.getElementById("datesubbunk").value='';
          document.getElementById("addsubjectname").value='Subject';
          document.getElementById("addtotalpresent").value='Total Classes';
        });
    }
    
})

















document.querySelector("#logout").addEventListener('click',(event)=>{
    event.preventDefault();
    postData(`/logout?authorize=${key}`)
    .then(data => {
      console.log(data); // JSON data parsed by `response.json()` call
      if(data.stat==="True")
      {
        location.href =`/thank`
      }
    });
    
})