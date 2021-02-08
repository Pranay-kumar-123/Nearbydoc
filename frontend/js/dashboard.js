function filter()
{
    specialist=$("#specialist").val()
    locate=$("#location").val()
    location.href="/search/"+specialist+"/"+locate;
}