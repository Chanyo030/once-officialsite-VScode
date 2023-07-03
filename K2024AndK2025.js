// 用於處理事件管理

$(document).ready(function () {

    let authorityGroupName = $('#authorityGroupName').val()
    let authorityGroupID = $('#authorityGroupID').val()


    queryAuthorityGroupList(

        authorityGroupName,
        authorityGroupID
    )

    console.log(

        authorityGroupName,
        authorityGroupID
    )
    //一進到網頁就取得authorityGroupEdit這個entity
    let authorityGroupEditGroupIDSeesion = JSON.parse(sessionStorage.getItem('authorityGroupEdit'))

    //從authorityGroupEdit這個entity拿到groupID，並且放入html id名為groupID，的表格裡
    $('#updateGroupID').val(authorityGroupEditGroupIDSeesion.groupID);


})

$(document).on('click', 'label[id*=authorityGroupDelet_btn]', function (e) {
    //避免瀏覽器的預設行為(ex.重新整理)
    e.preventDefault()

    //[2] 消除的底線來算(看ID位置)
    let authorityGroupID = $(this).prop('id').split('_')[2]

    $('#authorityGroupDeletOK_btn').click(function (e) {

        updateAuthorityGroupDelet(
            authorityGroupID
        )

    })

    //alert 是Html的提示訊息
    // alert(
    //     authorityGroupID
    // )

    //在F12裡面
    console.log(
        authorityGroupID
    )

})


$(document).on('click', 'a[id*=groupEdit_btn]', function (e) {
    //避免瀏覽器的預設行為(ex.重新整理)
    e.preventDefault()


    //[2] 消除的底線來算(看ID位置)
    let groupID = $(this).prop('id').split('_')[2]



    getAuthorityGroupEditGroupID(
        groupID
    )



    //alert 是Html的提示訊息
    // alert(
    //     authorityGroupID
    // )

    //在F12裡面
    console.log(
        groupID
    )

})


$('#authorityGroupEditSave_btn').click(function (e) {
    let groupName = $('#groupName').val()
    let groupID = $('#groupID').val()
    let comment = $('#comment').val()

    addAuthorityGroupListAndAuthorityGroupEdit(
        groupName,
        groupID,
        comment
    )

    console.log(
        groupName,
        groupID,
        comment
    )
})


$('#authorityGroupEditUpdate_btn').click(function (e) {
    let groupName = $('#groupName').val()
    let groupID = $('#updateGroupID').val()
    let comment = $('#comment').val()



    updateAuthorityGroupListAndAuthorityGroupEdit(
        groupName,
        groupID,
        comment
    )

    console.log(
        groupName,
        groupID,
        comment
    )
})


