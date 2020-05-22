document.querySelector(".loginbutton").addEventListener('click',(event)=>{
    event.preventDefault();
    console.log("Log in Working");
    email=document.querySelector(".email").value;
    password=document.querySelector(".password").value;
    name=document.querySelector(".name").value;
    // console.log("Hi "+email);
    // console.log("Hiiiii "+password);
    // console.log("Hiellll "+name);


// Example POST method implementation:
async function postData(url = '', data = {}) {
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
  
  postData('/signup', {email, password ,name }).then((data)=>{
   if(data.bad)
   {
       console.log("Got Error ")
       alert("ENTER VALID MAIL ID AND PASSWORD");
        location.href =`/error`
        console.log(data)
   }
   else
   {
    console.log(data)
    console.log(data.token)
    location.href =`/data?authorize=${data.token}`
   }
  }).catch((e) => {
  console.log("catch "+e);
})

})
