//const api_url = "<heroku_app_url>"
const api_url = "https://resultsforall.herokuapp.com/user"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].rno}</td>`;
		table_data += `<td>${records[i].email}</td>`;
		table_data += `<td>${records[i].sub1}</td>`;
		table_data += `<td>${records[i].sub2}</td>`;
		table_data += `<td>${records[i].sub3}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("name").value = data.name;
		document.getElementById("rno").value = data.rno;
        document.getElementById("email").value = data.email;
		document.getElementById("sub1").value = data.sub1;
        document.getElementById("sub2").value = data.sub2;
        document.getElementById("sub3").value = data.sub3;
	})
}
function calcy(){
 
	let sub1=document.getElementById("sub1").value;
	let sub2=document.getElementById("sub2").value;
	let sub3=document.getElementById("sub3").value;
	let grade="";
	
	let totalGrades=parseFloat(sub1)+parseFloat(sub2)+parseFloat(sub3);
	alert("Your total is "+totalGrades);
	let perc =(totalGrades/300)*100;
	alert("Your percentage is " +perc);
	if(perc <=100 && perc >=80)
	{
		grade='A';
	}
	else if(perc <=79 && perc >=60)
	{
		grade='B';
	}
	else if(perc <=59 && perc >=40)
	{
		grade='C';
	}
	else
	{
		grade='F';
	}
	alert("Your grade is " + grade)
	if(perc >=39.5){
		document.getElementById("showdata").innerHTML=`Your percentage is ${perc} and your grade is ${grade} and you passed.Congratulations!!`
	}
	else{
		document.getElementById("showdata").innerHTML=`Your percentage is ${perc} and your grade is ${grade} and you failed.Try Harder...`
	
	}


}

function postData() {
	var name = document.getElementById("name").value;
	var rno = document.getElementById("rno").value;
    var email = document.getElementById("email").value;
	var sub1 = document.getElementById("sub1").value;
    var sub2 = document.getElementById("sub2").value;
    var sub3 = document.getElementById("sub3").value;
	
	data = {name: name, rno: rno,email:email, sub1: sub1,sub2: sub2,sub3: sub3};
	
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var rno = document.getElementById("rno").value;
    var email = document.getElementById("email").value;
	var sub1 = document.getElementById("sub1").value;
    var sub2 = document.getElementById("sub2").value;
    var sub3 = document.getElementById("sub3").value;
	
	data = {_id: _id, name: name, rno: rno, email: email,sub1:sub1,sub2:sub2,sub3:sub3};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id":id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}