$(document).ready(function () {
    let data = [
        { no: "No.", authority_group_name: "権限グループ名称", authority_group_id: "権限グループID" }
    ];

    let table = document.getElementById("table");

    for (let i = 0; i < data.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        let no = document.createElement("div");
        no.classList.add("cell");
        no.innerHTML = data[i].no;
        row.appendChild(no);

        let authority_group_name = document.createElement("div");
        authority_group_name.classList.add("cell");
        authority_group_name.innerHTML = data[i].authority_group_name;
        row.appendChild(authority_group_name);

        let authority_group_id = document.createElement("div");
        authority_group_id.classList.add("cell");
        authority_group_id.innerHTML = data[i].authority_group_id;
        row.appendChild(authority_group_id);

        table.appendChild(row);
    }

});
