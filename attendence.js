document.querySelector("#mybutton").addEventListener('click',(event)=>{
    event.preventDefault();
    console.log("Fetching Subjects");
    console.log(location);
    console.log(location.search);
    const { authorize } = Qs.parse(location.search, { ignoreQueryPrefix: true })
    console.log(authorize);
   
})
