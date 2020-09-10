var list_student = [{
    Id: 1,
    Name: 'Lê Đăng Hạnh',
    Email: 'hanh@gmail.com'
},
{
    Id: 2,
    Name: 'Lê Đăng Hà',
    Email: 'dangha@gmail.com'
},
{
    Id: 3,
    Name: 'Vũ Kim Mạnh',
    Email: 'manh@gmail.com'
}
];

window.onload = function(){
    view_students();
}
var validate = new Validation();

function is_present_student(Id){
    for(i=0;i<list_student.length;i++){
        if(list_student[i].Id == Id)
            return true;
    }
    return false;
}

function is_present_email(Email){
    for(i=0;i<list_student.length;i++){
        if(list_student[i].Email == Email)
            return true;
    }
    return false;
}

function have_diffirent_email(ID, Email){
    sv = find_SV(ID);
    if(sv.Email != Email) return true;
    else return false;
}

function is_null_param(ID,value)
{
    if(validate.is_empty(value) == true)
    {
        document.getElementById(ID).style.borderColor = "red"
        return true;                 
    }
    else
    {
        document.getElementById(ID).style.borderColor = "green"
        return false;
    } 
}

function create(){
    let Id = document.getElementById("Id").value
    let Name = document.getElementById("Name").value
    let Email = document.getElementById("Email").value

    var error = 0;
    
    if(is_present_student(Id) == true)
    {
        document.getElementById("Id").style.borderColor = "red";
        return;
    }
    if(is_present_email(Email) == true)
    {
        document.getElementById("Email").style.borderColor = "red";
        return;
    }
    if(is_null_param("Id",Id) == true)
    {
        error++;
    }
    if(is_null_param("Name",Name) == true)
    {
        error++;
    }
    if(validate.is_valid_email(Email))
    {
        document.getElementById("Email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("Email").style.borderColor = "red";
        error++;
    }
    if(error != 0)
    {
        return ;
    }
    list_student.push({
                    Id: parseInt(Id),
                    Name: Name,
                    Email: Email
                })
        
    view_students();
}

function update(){
    let Id = document.getElementById("Id").value
    let Name = document.getElementById("Name").value
    let Email = document.getElementById("Email").value

    var error = 0;
    
    if(is_null_param("Name",Name) == true)
    {
        error++;
    }
    if(validate.is_valid_email(Email))
    {
        document.getElementById("Email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("Email").style.borderColor = "red";
        error++;
    }
    if(have_diffirent_email(Id, Email)){
        document.getElementById("Email").style.borderColor = "green";
        var count =0;
        for(i=0;i<list_student.length;i++){
            if(list_student[i].Email == Email)
                count++;
        }
        if(count >0){
            document.getElementById("Email").style.borderColor = "red";
            error++;
        }   
    }
    if(error != 0)
    {
        return ;
    }

    list_student.map((sv,index) => {
                if(sv.Id == parseInt(Id))
                {
                   sv.Name = Name;
                   sv.Email = Email;
                }
            });
    view_students();
}

function find_SV(ID){
    list_student.map((sv,index) => {
        if(sv.Id == parseInt(ID))
           result = sv;
    });
    return result;
}

function importRequestView(ID){
    sv = find_SV(ID);
    document.getElementById("Id").value = sv.Id;
    document.getElementById("Name").value = sv.Name;
    document.getElementById("Email").value = sv.Email;
    document.getElementById('Id').disabled = true;
    document.getElementById('update').style.visibility = 'visible'
    document.getElementById('create').style.visibility = 'hidden'
}

function clear_request_view(){
    document.getElementById("Id").value = ''
    document.getElementById("Name").value = ''
    document.getElementById("Email").value = ''

    document.getElementById("Id").style.borderColor = null
    document.getElementById("Name").style.borderColor = null
    document.getElementById("Email").style.borderColor = null

    document.getElementById('Id').disabled = false;
    document.getElementById('update').style.visibility = 'hidden'
    document.getElementById('create').style.visibility = 'visible'

}

function deleteSV(ID){
    for( var i = 0; i < list_student.length; i++){ 
        if ( list_student[i].Id === parseInt(ID)) {
            list_student.splice(i, 1); 
        }
     }
    view_students();
}

function view_students(){
    let HTML = '';
    list_student.forEach((SV, index) => {
        HTML += `<tr>
                    <th>${SV.Id}</th>
                    <th>${SV.Name}</th>
                    <th>${SV.Email}</th>
                    <th>
                        <button type="button" class="btn btn-success" onclick='importRequestView(${SV.Id})'>Update</button>
                        <button type="button" class="btn btn-danger" onclick='deleteSV(${SV.Id})'>Delete</button>
                    </th>
                </tr>`
    })
    document.getElementById('table_student').innerHTML = HTML;
    clear_request_view()
}
