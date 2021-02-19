function filter()
{
    specialist=$("#specialist").val()
    locate=$("#location").val()
    location.href="/search/"+specialist+"/"+locate;
}

function clickbtn(){
    window.location.href="/apis/Appointments/602df9c23c55c420444d3522"
}