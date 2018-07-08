const config = {
    apiKey: "AIzaSyDApPOsZSN2WfDs2cK_no1OMFo-fRhsqBU",
    authDomain: "portfolio-26ceb.firebaseapp.com",
    databaseURL: "https://portfolio-26ceb.firebaseio.com",
    projectId: "portfolio-26ceb",
    storageBucket: "portfolio-26ceb.appspot.com",
    messagingSenderId: "1055758512902"
};
firebase.initializeApp(config);
const database = firebase.database();

// get elements 
const txtEmail = $('#txtEmail');
const txtPassword = $('#txtPassword');
const btnLogin = $("#btnLogin");
const btnLogOut = $("#btnLogOut");
const formContain = $('#form_contain');
// Project object
var newProject = {
    projTitle: "",
    shortDesc: "",
    longDesc: "",
    buildItems: "",
    launchLink: "",
    gitLink: "",
    dataLink: "",
    svgLink: "",
    imgLink: "",
    proType: ""
}

// add login event
btnLogin.on('click', e => {
    // TODO: Check for real email
    const email = txtEmail.val().trim();
    const pass = txtPassword.val().trim();
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

btnLogOut.on("click", function (event) {
    event.preventDefault();
    firebase.auth().signOut();
});


// add login/logout listener
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        btnLogOut.show();
        formContain.show();
        $("#project_submit").attr("data-submit", "new")
        $(".proj_container").show();
        btnLogin.hide();
        txtEmail.hide();
        txtPassword.hide();
        txtEmail.val('');
        txtPassword.val('');
    } else {
        btnLogOut.hide();
        formContain.hide();
        $(".proj_container").hide();
        btnLogin.show();
        txtEmail.show();
        txtPassword.show();
    }
});

$("#project_submit").on("click", function (event) {
    event.preventDefault();
    if ($("#project_submit").attr("data-submit") == "new") {
        newProject.projTitle = $("#project_form_title").val().trim();
        newProject.shortDesc = $("#short_desc").val().trim();
        newProject.longDesc = $("#long_desc").val().trim();
        newProject.buildItems = $("#build_items").val().trim();
        newProject.launchLink = $("#launch_link").val().trim();
        newProject.gitLink = $("#git_link").val().trim();
        newProject.dataLink = $("#data_link").val().trim();
        newProject.svgLink = $("#svg_link").val().trim();
        newProject.imgLink = $("#img_link").val().trim();
        newProject.proType = $("input[name='options']:checked").val();

        database.ref("project/").push({
            projTitle: newProject.projTitle,
            shortDesc: newProject.shortDesc,
            longDesc: newProject.longDesc,
            buildItems: newProject.buildItems,
            launchLink: newProject.launchLink,
            gitLink: newProject.gitLink,
            dataLink: newProject.dataLink,
            svgLink: newProject.svgLink,
            imgLink: newProject.imgLink,
            proType: newProject.proType
        })
        $("form").trigger("reset");
    } else if ($("#project_submit").attr("data-submit") == "edit") {
        let dataEditKey = $(this).attr("data-key");
        let editRef = database.ref(`project/${dataEditKey}`);
        newProject.projTitle = $("#project_form_title").val().trim();
        newProject.shortDesc = $("#short_desc").val().trim();
        newProject.longDesc = $("#long_desc").val().trim();
        newProject.buildItems = $("#build_items").val().trim();
        newProject.launchLink = $("#launch_link").val().trim();
        newProject.gitLink = $("#git_link").val().trim();
        newProject.dataLink = $("#data_link").val().trim();
        newProject.svgLink = $("#svg_link").val().trim();
        newProject.imgLink = $("#img_link").val().trim();
        newProject.proType = $("input[name='options']:checked").val();

        editRef.set({
            projTitle: newProject.projTitle,
            shortDesc: newProject.shortDesc,
            longDesc: newProject.longDesc,
            buildItems: newProject.buildItems,
            launchLink: newProject.launchLink,
            gitLink: newProject.gitLink,
            dataLink: newProject.dataLink,
            svgLink: newProject.svgLink,
            imgLink: newProject.imgLink,
            proType: newProject.proType
        })
        $("form").trigger("reset");
        $("#project_submit").attr("data-submit", "new");
    }
});

// Project added
database.ref("project/").on("child_added", function (snapshot) {
    // Display project
    var proDiv = $('<div>');
    var proTitle = $('<p class="proj_title">');
    var proDelete = $('<p class="proj_control">');
    var proEdit = $('<p class="proj_control">');
    proDiv.attr("id", snapshot.key);
    proTitle.text(snapshot.val().projTitle);
    proDelete.text("delete");
    proDelete.attr("data-id", snapshot.key);
    proEdit.text("edit");
    proEdit.attr("data-id", snapshot.key);
    proDiv.prepend(proTitle);
    proDiv.append(proDelete);
    proDiv.append(proEdit);
    $(".proj_container").append(proDiv);
});

//Project edit
$(document).on("click", ".proj_control", function (event) {
    event.preventDefault();
    let clickText = $(this).text();
    let dataKey = $(this).attr("data-id");
    let editProj = database.ref(`project/${dataKey}`);
    editProj.once("value", function (data) {
        if (clickText == "edit") {
            $("#project_submit").attr("data-submit", "edit");
            $("#project_submit").attr("data-key", dataKey);
            $("#project_form_title").val(data.val().projTitle);
            $("#short_desc").val(data.val().shortDesc);
            $("#long_desc").val(data.val().longDesc);
            $("#build_items").val(data.val().buildItems);
            $("#launch_link").val(data.val().launchLink);
            $("#git_link").val(data.val().gitLink);
            $("#data_link").val(data.val().dataLink);
            $("#svg_link").val(data.val().svgLink);
            $("#img_link").val(data.val().imgLink);
            $('input[name="options"][value="' + data.val().proType + '"]').prop('checked', true);
        } else if (clickText == "delete") {
            // console.log(data.val().projTitle);
            $(`#${dataKey}`).remove();
            editProj.remove();
        }
    });

});

//page layout

function popCardData() {
    var dataPop = database.ref('project/').orderByKey();
    dataPop.once("value")
        .then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var title = childSnapshot.val().projTitle;
                var svg = childSnapshot.val().svgLink;
                var sDesc = childSnapshot.val().shortDesc;
                var dataLink = childSnapshot.val().dataLink;
                var dataKey = childSnapshot.key;
                var card = $('<div class="card card-just-text mb-5">');
                var header = $('<div class="header">');
                var icon = $('<div class="icon">');
                var image = $(`<img src="assets/images/${svg}">`);
                var content = $('<div class="content text-center">');
                var titleh4 = $('<h4 class="title text-center">');
                var desc = $('<p class="description">');
                var footer = $('<div class="footer btn-center">');
                var button = $('<button class="btn btn-round page_link mb-2">');
                icon.prepend(image);
                header.prepend(icon);
                card.attr('id', dataLink);
                card.prepend(header);
                titleh4.text(title);
                desc.text(sDesc);
                content.prepend(titleh4);
                content.append(desc);
                card.append(content);
                button.text("info");
                button.attr('data-link', dataKey);
                footer.prepend(button);
                card.append(footer);
                $('.card-box').append(card);

            });
        });
}

function limitToKey(keySent) {
    if (keySent) {
        var item = database.ref(`project/${keySent}`).orderByKey();
        item.once("value")
            .then(function (snapshot) {
                $("#launch_heading").text(snapshot.val().projTitle);
                $("#launch_short").text(snapshot.val().shortDesc);
                $("#long_launch").html(snapshot.val().longDesc.replace(/.(?=[A-Z])/g, '<br />'));
                $("#exit_btn").attr('data-target', snapshot.val().dataLink);
                $("#launch_img").attr('src', `assets/images/${snapshot.val().imgLink}`);
                $('#launch_btn').attr('href', snapshot.val().launchLink);
                $('#git_hub_project_link').attr('href', snapshot.val().gitLink);
                var build = snapshot.val().buildItems.split(',');
                var buildContain = $("#build_contain");
                build.forEach( function(item) {
                    var buildItem = $('<p class="build_item text-muted">');
                    buildItem.text(item);
                    buildContain.append(buildItem);
                  });
            });
        window.scrollTo(0, 0);
        $("#main").fadeOut(300);
        $("#launch").delay(300).fadeIn(300);
    }

}

