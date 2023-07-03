function queryAuthorityGroupList(
    //放function會用到的值 (從前端要給後端的資料)
    authorityGroupName,
    authorityGroupID
) {
    //前端要傳遞給後端的參數
    let queryAuthorityGroupList = {
        //對照req:上面addHome方法參數 
        authorityGroupName: authorityGroupName,
        authorityGroupID: authorityGroupID
    }

    $.ajax({
        url: 'http://localhost:8080/api/queryAuthorityGroupList',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        //宣告資料型態為JSON
        dataType: 'json',
        //將後端返回的entity轉成JSON格式
        data: JSON.stringify(queryAuthorityGroupList),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupListAll } = authorityManagementRes
            // authorityGroupListAll 是在Eclipse裡AuthorityManagementRes所建立的List清單

            //抓取後端資料 --> 呈現至前端
            //避免反覆生成多筆資料，因此利用以下寫法做清空處理
            $('#authorityGroupList_Table').empty()

            //append 串接在指定的id或選擇器下
            $('#authorityGroupList_Table').append(`<tbody>
            <tr>
                <th class="authorityGroupNo" id="authorityGroupNo">No.</th>
                <th class="authorityGroupName" id="authorityGroupName">権限グループ名称</th>
                <th class="authorityGroupID" id="authorityGroupID">権限グループID</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>`)

            //數字排序  count(計數,總數)
            let count = 1

            //List在前端是陣列，所以會有index
            //jquery的foreach語法，jquery的each function通常是用來遍歷選擇的元素們
            $.each(authorityGroupListAll, function (index, value) {

                $('#authorityGroupList_Table').append(`<tr>
                <td>${count}</td>
                <td>${value.authorityGroupName}</td>
                <td>${value.authorityGroupID}</td>
                <td></td>
                <td><a class="btn btn-secondary" id="authorityEdit_btn" href="./K2026.html" target="_blank"
                        for="permissionGroupList_permissionEdit">権限編集</a></td>
                <td><a class="btn btn-secondary" id="authorityMemberEdit_btn" href="./K2027.html"
                        for="permissionGroupList_targetEdit">対象編集</a></td>
                <td><a class="btn btn-secondary" id="groupEdit_btn_${value.authorityGroupID}" href="./K2025_update.html"
                        for="permissionGroupList_groupEdit">グループ編集</a></td>
                <td><label type="button" class="btn btn-secondary" for="permissionGroupList_delete" data-toggle="modal"
                data-target="#exampleModal" id="authorityGroupDelet_btn_${value.authorityGroupID}">削除</label>
                </td>
            </tr>

        </tbody>`)

                //數字排序
                count++
            })



            sessionStorage.setItem('authorityGroupList', JSON.stringify(authorityGroupListAll))
        },



        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

function updateAuthorityGroupDelet(
    authorityGroupID
) {
    let updateAuthorityGroupDelet = {
        authorityGroupID
    }
    $.ajax({
        url: 'http://localhost:8080/api/updateAuthorityGroupDelet',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        dataType: 'json',
        //傳送資料
        data: JSON.stringify(updateAuthorityGroupDelet),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupList } = authorityManagementRes
            // alert(message)

            //抓取後端資料 --> 轉換JSON格式 --> 設定到前端(''內為自定義名)
            sessionStorage.setItem('authorityGroupList', JSON.stringify(authorityGroupList))



        },

        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    }
    )
}


function addAuthorityGroupListAndAuthorityGroupEdit(
    //放function會用到的值 (從前端要給後端的資料)
    groupName,
    groupID,
    comment
) {
    //前端要傳遞給後端的參數
    let addAuthorityGroupListAndAuthorityGroupEdit = {
        //對照req:上面addHome方法參數 
        groupName: groupName,
        groupID: groupID,
        comment: comment
    }

    $.ajax({
        url: 'http://localhost:8080/api/addAuthorityGroupListAndAuthorityGroupEdit',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        //宣告資料型態為JSON
        dataType: 'json',
        //將後端返回的entity轉成JSON格式
        data: JSON.stringify(addAuthorityGroupListAndAuthorityGroupEdit),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupList, authorityGroupEdit, message } = authorityManagementRes
            // alert('')

            //抓取後端資料 --> 轉換JSON格式 --> 設定到前端

            if (message === 'グループ名称、グループIDを重複しないください。') {

                alert('グループ名称、グループIDを重複しないください。')
            } else if (message === 'グループIDをローマ字で入力してください。') {
                alert('グループIDをローマ字で入力してください')
            } else if (message === 'グループ名称、グループIDを入力してください。') {
                alert('グループ名称、グループIDを入力してください。')
            }

            else {
                sessionStorage.setItem('authorityGroupList', JSON.stringify(authorityGroupList))
                sessionStorage.setItem('authorityGroupEdit', JSON.stringify(authorityGroupEdit))
                window.location.href = '/K2024.html'
            }

        },

        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

function getAuthorityGroupEditGroupID(
    groupID,

) {
    let getAuthorityGroupEditGroupID = {
        //對照req:上面addHome方法參數  
        groupID: groupID,

    }

    $.ajax({
        url: 'http://localhost:8080/api/getAuthorityGroupEditGroupID',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        //宣告資料型態為JSON
        dataType: 'json',
        //將後端返回的entity轉成JSON格式
        data: JSON.stringify(getAuthorityGroupEditGroupID),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupEdit } = authorityManagementRes


            //設置authorityGroupEdit這個entity到sessionStorage
            sessionStorage.setItem('authorityGroupEdit', JSON.stringify(authorityGroupEdit))

            // alert(authorityGroupEditGroupIDSeesion)

            window.location.href = '/K2025_update.html'
        },

        error: function (e) {
            console.log(e)
            alert('Failed')
        }
    })
}

function updateAuthorityGroupListAndAuthorityGroupEdit(
    groupName,
    groupID,
    comment
) {
    let updateAuthorityGroupListAndAuthorityGroupEdit = {
        //對照req:上面addHome方法參數  
        groupName: groupName,
        groupID: groupID,
        comment: comment
    }

    $.ajax({
        url: 'http://localhost:8080/api/updateAuthorityGroupListAndAuthorityGroupEdit',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        //宣告資料型態為JSON
        dataType: 'json',
        //將後端返回的entity轉成JSON格式
        data: JSON.stringify(updateAuthorityGroupListAndAuthorityGroupEdit),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupList, authorityGroupEdit, message } = authorityManagementRes

            if (message === 'グループ名称、グループIDを重複しないください。') {

                // window.location.href = 'http://127.0.0.1:5501/K2024.html'
                alert('グループ名称、グループIDを重複しないください。')
            } else if (message === 'グループIDをローマ字で入力してください。') {
                alert('グループIDをローマ字で入力してください')
            } else if (message === 'グループ名称、グループIDを入力してください。') {
                alert('グループ名称、グループIDを入力してください。')
            }

            else {
                sessionStorage.setItem('authorityGroupList', JSON.stringify(authorityGroupList))
                sessionStorage.setItem('authorityGroupEdit', JSON.stringify(authorityGroupEdit))
                window.location.href = '/K2024.html'


            }
        },

        error: function (e) {
            console.log(e)
            alert('Failed')
        }
    })
}

function getAuthorityGroupMemberEdit(
    //放function會用到的值 (從前端要給後端的資料)
    authorityGroupMemberEditLastNameEN,
    authorityGroupMemberEditFirstNameEN,
    authorityGroupMemberEditLastNameCN,
    authorityGroupMemberEditFirstNameCN,
    authorityGroupMemberEditGender,
    authorityGroupMemberEditBirthDate


) {
    //前端要傳遞給後端的參數
    let getAuthorityGroupMemberEdit = {
        //對照req:上面addHome方法參數 
        authorityGroupMemberEditLastNameEN: authorityGroupMemberEditLastNameEN,
        authorityGroupMemberEditFirstNameEN: authorityGroupMemberEditFirstNameEN,
        authorityGroupMemberEditLastNameCN: authorityGroupMemberEditLastNameCN,
        authorityGroupMemberEditFirstNameCN: authorityGroupMemberEditFirstNameCN,
        authorityGroupMemberEditGender: authorityGroupMemberEditGender,
        authorityGroupMemberEditBirthDate: authorityGroupMemberEditBirthDate

    }

    $.ajax({
        url: 'http://localhost:8080/api/getAuthorityGroupMemberEdit',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        //宣告資料型態為JSON
        dataType: 'json',
        //將後端返回的entity轉成JSON格式
        data: JSON.stringify(getAuthorityGroupMemberEdit),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupMemberEditAll } = authorityManagementRes
            // authorityGroupListAll 是在Eclipse裡AuthorityManagementRes所建立的List清單

            //抓取後端資料 --> 呈現至前端
            //避免反覆生成多筆資料，因此利用以下寫法做清空處理
            $('#authorityGroupMemberEdit_Table').empty()

            //append 串接在指定的id或選擇器下
            $('#authorityGroupMemberEdit_Table').append(`<tbody>
            <tr>
                <th class="no" id="authorityGroupMemberEditNo">No.</th>
                <th class="NameEN" id="authorityGroupMemberEditNameEN">名前（英）</th>
                <th></th>
                <th class="nameCN" id="authorityGroupMemberEditNameCN">名前（中）</th>
                <th></th>
                <th class="sex" id="authorityGroupMemberEditGender">性別</th>
                <th class="year" id="authorityGroupMemberEditBirthDate">年齡</th>
                <th></th>
                <th></th>
                <th class="blank"></th>
                <th></th>
            </tr>`)

            //數字排序  count(計數,總數)
            let count = 1

            //List在前端是陣列，所以會有index
            //jquery的foreach語法，jquery的each function通常是用來遍歷選擇的元素們
            $.each(authorityGroupMemberEditAll, function (index, value) {

                $('#authorityGroupMemberEdit_Table').append(`<tr>
                    <td>${count}</td>
                    <td>
                    ${value.authorityGroupMemberEditLastNameEN}
                    ${value.authorityGroupMemberEditFirstNameEN}
                    </td>
                    <td></td>
                    <td>
                    ${value.authorityGroupMemberEditLastNameCN}
                    ${value.authorityGroupMemberEditFirstNameCN}
                    </td>
                    <td></td>
                    <td>${value.authorityGroupMemberEditGender}</td>
                    <td>${value.authorityGroupMemberEditBirthDate}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="authorityGroup_date">
                    <label type="button" class="btn btn-secondary" for="permissionGroupList_delete" data-toggle="modal"
                    data-target="#exampleModal" id="authorityGroupDelet_btn_${value.authorityGroupMemberEditNo}">削除</label>
                    </td>
                    </tr>

        </tbody>`)

                //數字排序
                count++
            })



            sessionStorage.setItem('authorityGroupMemberEdit', JSON.stringify(authorityGroupMemberEditAll))
        },



        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

function updateAuthorityGroupMemberEditDelet(
    authorityGroupMemberEditNo
) {
    let updateAuthorityGroupMemberEditDelet = {
        authorityGroupMemberEditNo
    }
    $.ajax({
        url: 'http://localhost:8080/api/updateAuthorityGroupMemberEditDelet',
        method: 'POST',
        // 以下兩行為 Json固定寫法：利用json做傳遞
        contentType: 'application/json',
        dataType: 'json',
        //傳送資料
        data: JSON.stringify(updateAuthorityGroupMemberEditDelet),
        // 當成功時就會執行function括號裡的參數
        success: function (authorityManagementRes) {
            // 對照res的內容，可以接收後端回傳的資料，且呈現於前端(等於後面是自定義名稱)
            let { authorityGroupMemberEdit } = authorityManagementRes
            // alert(message)

            //抓取後端資料 --> 轉換JSON格式 --> 設定到前端(''內為自定義名)
            sessionStorage.setItem('authorityGroupMemberEdit', JSON.stringify(authorityGroupMemberEdit))



        },

        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    }
    )
}
