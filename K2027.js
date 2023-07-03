// 用於處理事件管理
$(document).ready(function () {


    let authorityGroupMemberEditLastNameEN = $('#authorityGroupMemberEditNameEN').val()
    let authorityGroupMemberEditFirstNameEN = $('#authorityGroupMemberEditNameEN').val()
    let authorityGroupMemberEditLastNameCN = $('#authorityGroupMemberEditNameCN').val()
    let authorityGroupMemberEditFirstNameCN = $('#authorityGroupMemberEditNameCN').val()
    let authorityGroupMemberEditGender = $('#authorityGroupMemberEditGender').val()
    let authorityGroupMemberEditBirthDate = $('#authorityGroupMemberEditBirthDate').val()

    getAuthorityGroupMemberEdit(

        authorityGroupMemberEditLastNameEN,
        authorityGroupMemberEditFirstNameEN,
        authorityGroupMemberEditLastNameCN,
        authorityGroupMemberEditFirstNameCN,
        authorityGroupMemberEditGender,
        authorityGroupMemberEditBirthDate
    )

    console.log(

        authorityGroupMemberEditLastNameEN,
        authorityGroupMemberEditFirstNameEN,
        authorityGroupMemberEditLastNameCN,
        authorityGroupMemberEditFirstNameCN,
        authorityGroupMemberEditGender,
        authorityGroupMemberEditBirthDate
    )

})

$(document).on('click', 'label[id*=authorityGroupDelet_btn]', function (e) {
    //避免瀏覽器的預設行為(ex.重新整理)
    e.preventDefault()

    //[2] 消除的底線來算(看ID位置)
    let authorityGroupMemberEditNo = $(this).prop('id').split('_')[2]

    $('#authorityGroupMemberEditDeletOK_btn').click(function (e) {

        updateAuthorityGroupMemberEditDelet(
            authorityGroupMemberEditNo
        )

    })

    //alert 是Html的提示訊息
    // alert(
    //     authorityGroupMemberEditNo
    // )

    //在F12裡面
    console.log(
        authorityGroupMemberEditNo
    )

})