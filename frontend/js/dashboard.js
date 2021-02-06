function filter()
{
    specialist=$("#specialist").val()
    locate=$("#location").val()
    console.log(specialist,locate);
    $.ajax({
        url: "/api/filter?specialist="+specialist+"&location="+locate,
        method: "GET",
        success: function(result) {
            console.log(result);
        },
        error: function(err) {
            console.log(err);
           // alert("Please Enter Valid Question") //change this url ....
        }
    });
}