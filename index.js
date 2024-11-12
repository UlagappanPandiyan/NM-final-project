const pageAnimation = () => {
    document.querySelector('body').style.opacity = 1;
}

let flag = false;

const onSubmit = async () => {
    let gender;
    let data = [];
    let skills = [];

    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const website = document.getElementById('inputWebsite').value;
    const image = document.getElementById('inputImage').value;
    const gen = document.getElementsByName('gender');
    const ele = document.getElementsByName('skills');

    for (let i = 0; i < gen.length; i++) {
        if (gen[i].checked) {
            gender = gen[i].value;
        }
    }

    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            skills.push(ele[i].value);
        }
    }

    data.push({
        name: name,
        email: email,
        website: website,
        image: image,
        gender: gender,
        skills: [...skills]
    });

    // Send data to the server to store in PostgreSQL
    try {
        await fetch('http://localhost:5000/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data[0])
        });
        console.log('Student enrolled successfully');
    } catch (error) {
        console.error('Error enrolling student:', error);
    }

    if (!flag) {
        showTable();
        flag = true;
    }
    addRow(data);
}

const showTable = () => {
    const temp = document.querySelector('template');
    const dataTable = temp.content.cloneNode(true);
    const enrolledSection = document.querySelector('.enrolled-section');
    const old_child = enrolledSection.children[0];
    enrolledSection.replaceChild(dataTable, old_child);
}

const addRow = (data) => {
    console.log(data);
    let table = document.getElementById('table-data');
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML = `<td>
       <span class="font-weight-bold">${data[0].name}</span><br/>
       <span>${data[0].gender}</span></br>
       <span>${data[0].email}</span></br>
       <a href="http://${data[0].website}"
       target="_blank"
       rel="noopener noreferrer">
       <u>${data[0].website}</u></a></br>
       ${data[0].skills.map((skill) => {
        return `<span>${skill}</span>`;
       }).join(', ')}
    </td>`;

    row.insertCell(1).innerHTML = `<td style="width:100px;height:120px">
    <img src="${data[0].image}" onerror="this.src='assets/fallback-image.jpg'"
    alt="image"/>
    </td>`;
}
