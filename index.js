var listSV = [{
    MSSV: 1,
    Ten: 'Lê Đăng Hạnh',
    Email: 'hanh@gmail.com'
},
{
    MSSV: 2,
    Ten: 'Lê Đăng Hà',
    Email: 'dangha@gmail.com'
},
{
    MSSV: 3,
    Ten: 'Vũ Kim Mạnh',
    Email: 'manh@gmail.com'
}
];

window.onload = function(){
    viewDSSV();
}
var validate = new Validation();

function is_present_student(MSSV){
    for(i=0;i<listSV.length;i++){
        if(listSV[i].MSSV == MSSV)
            return true;
    }
    return false;
}

function is_present_email(Email){
    for(i=0;i<listSV.length;i++){
        if(listSV[i].Email == Email)
            return true;
    }
    return false;
}

function have_diffirent_email(ID, Email){
    SinhVien = find_SV(ID);
    if(SinhVien.Email != Email) return true;
    else return false;
}

function is_null_param(ID,value)
{
    //Kiểm tra mã sinh viên rổng
    if(validate.KiemTraRong(value) == true)
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
    let MSSV = document.getElementById("MSSV").value
    let Ten = document.getElementById("Ten").value
    let Email = document.getElementById("Email").value

    var error = 0;
    
    if(is_present_student(MSSV) == true)
    {
        document.getElementById("MSSV").style.borderColor = "red";
        return;
    }
    if(is_present_email(Email) == true)
    {
        document.getElementById("Email").style.borderColor = "red";
        return;
    }
    if(is_null_param("MSSV",MSSV) == true)
    {
        error++;
    }
    if(is_null_param("Ten",Ten) == true)
    {
        error++;
    }
    if(validate.KiemTraEmail(Email))
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
    listSV.push({
                    MSSV: parseInt(MSSV),
                    Ten: Ten,
                    Email: Email
                })
        
    viewDSSV();
}

function update(){
    let MSSV = document.getElementById("MSSV").value
    let Ten = document.getElementById("Ten").value
    let Email = document.getElementById("Email").value

    var error = 0;
    
    if(is_null_param("Ten",Ten) == true)
    {
        error++;
    }
    if(validate.KiemTraEmail(Email))
    {
        document.getElementById("Email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("Email").style.borderColor = "red";
        error++;
    }
    if(have_diffirent_email(MSSV, Email)){
        document.getElementById("Email").style.borderColor = "green";
        var count =0;
        for(i=0;i<listSV.length;i++){
            if(listSV[i].Email == Email)
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

    listSV.map((sv,index) => {
                if(sv.MSSV == parseInt(MSSV))
                {
                   sv.Ten = Ten;
                   sv.Email = Email;
                }
            });
    viewDSSV();
}

function find_SV(ID){
    listSV.map((sv,index) => {
        if(sv.MSSV == parseInt(ID))
           result = sv;
    });
    return result;
}

function importRequestView(ID){
    SinhVien = find_SV(ID);
    title = document.getElementById('title').innerHTML = 'Sửa sinh viên'
    document.getElementById("MSSV").value = SinhVien.MSSV;
    document.getElementById("Ten").value = SinhVien.Ten;
    document.getElementById("Email").value = SinhVien.Email;
    document.getElementById('MSSV').disabled = true;
    document.getElementById('update').style.visibility = 'visible'
    document.getElementById('create').style.visibility = 'hidden'
}

function clear_request_view(){
    document.getElementById("MSSV").value = ''
    document.getElementById("Ten").value = ''
    document.getElementById("Email").value = ''

    document.getElementById("MSSV").style.borderColor = null
    document.getElementById("Ten").style.borderColor = null
    document.getElementById("Email").style.borderColor = null

    document.getElementById('MSSV').disabled = false;
    document.getElementById('update').style.visibility = 'hidden'
    document.getElementById('create').style.visibility = 'visible'
}

function viewDSSV(){
    let HTML = '';
    listSV.forEach((SV, index) => {
        HTML += `<tr>
                    <th>${SV.MSSV}</th>
                    <th>${SV.Ten}</th>
                    <th>${SV.Email}</th>
                    <th>
                        <button type="button" class="btn btn-success" onclick='importRequestView(${SV.MSSV})'>Cập Nhật</button>
                        <button type="button" class="btn btn-danger" onclick='deleteSV(${SV.MSSV})'>Xóa</button>
                    </th>
                </tr>`
    })
    document.getElementById('tableSV').innerHTML = HTML;
    clear_request_view()
}
