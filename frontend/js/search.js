var doctorlist,doctorId,doctorName;
locate=location.href.split("/").splice(-1)[0];
specialist=location.href.split("/").splice(-2)[0];
var date = new Date();
var currentDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
var currentTime = ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
$('#date').val(currentDate);
$('#time').val(currentTime);
$.ajax({
    url: "/api/filter?specialist="+specialist+"&location="+locate,
    method: "GET",
    success: function(result) {
        console.log(result.result);
        doctorlist=result.result;
        code=`<table class="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">Doctor Location</th>
            <th scope="col">Enroll</th>
          </tr>
        </thead>
        <tbody>`;
        for(var i=0;i<doctorlist.length;i++)
        {
            code+=` <tr>
            <th scope="row">${i+1}</th>
            <td>${doctorlist[i].username}</td>
            <td>${doctorlist[i].location}</td>
            <td><button type="button" class="btn btn-primary" onClick="assign(${i})"  data-bs-toggle="modal" data-bs-target="#selectTimeModal">Enroll</button></td>
          </tr>`
        }
        code+=`</tbody>
        </table>`
        $("#doctors").html(code);
    },
    error: function(err) {
        console.log(err);
       // alert("Please Enter Valid Question") //change this url ....
    }
});
function assign(index)
{
    console.log(index,doctorlist[index]);
    doctorId=doctorlist[index]._id;
    doctorName=doctorlist[index].username;
}
function bookap()
{
    data={"doctorId":doctorId,date:$("#date").val(),time:$("#time").val(),"doctorName":doctorName};
    $.ajax({
        url: "/api/createAppointment",
        method: "POST",
        data:data,
        success: function(result) {
            console.log(result);
            location.href="/dashboard"
        },
        error: function(err) {
            console.log(err);
           // alert("Please Enter Valid Question") //change this url ....
        }
    }); 
    
}