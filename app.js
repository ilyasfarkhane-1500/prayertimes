
let cities = [
    {
        arabicName: "الدارالبيضاء",
        isoName: "casablanca"
    },
    {
        arabicName: "الرباط",
        isoName: "rabat"
    },
    {
        arabicName: "مراكش",
        isoName: "Marrakech" 
    },
    {
        arabicName: "سلا",
        isoName: "Salé" 
    },
    {
        arabicName: "أكادير",
        isoName: "agadir" 
    }
]
console.log(cities)
for(let city of cities){
    const content = `
        <option>${city.arabicName}</option>
    `
    document.getElementById("selectElement").innerHTML+=content
}
function selectEl(){

    let selectElement = document.getElementById("selectElement")
    document.getElementById("cityDispaly").innerHTML=selectElement.value
   let cityName = ""
   for(let city of cities){
    if(city.arabicName==selectElement.value){
        cityName=city.isoName
    }
   }
   getTimes(cityName)

}

selectEl();


function getTimes(ville){
    let params = {
        country: "Ma",
        city: ville
    }
    axios.get("http://api.aladhan.com/v1/timingsByCity", {
        params : params
    })

    .then((Response)=>{
        let timin = Response.data.data.timings
         let timinDate = Response.data.data.date.readable
         let timinDateAr = Response.data.data.date.hijri.weekday.ar
           
        fillTimesForPrayer("Isha",timin.Isha)
        fillTimesForPrayer("Maghrib",timin.Maghrib)
        fillTimesForPrayer("Asr",timin.Asr)
        fillTimesForPrayer("Dhuhr",timin.Dhuhr)
        fillTimesForPrayer("Sunrise",timin.Sunrise)
        fillTimesForPrayer("Fajr",timin.Fajr)
       

       document.getElementById("date").innerHTML=timinDate
       document.getElementById("dayAr").innerHTML=timinDateAr
    
    })
    .catch((error)=>{
        alert(error)
    })
}
function fillTimesForPrayer(id,time){
    document.getElementById(id).innerHTML=time;
}
