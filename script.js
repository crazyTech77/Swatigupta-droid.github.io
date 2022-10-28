function resetMessages()
{
    $(".NoUsername ,.WrongUsername, .IncompleteUsername, .EverythingRight,.Fetched").fadeOut();
}

$(function ()
{
    var FetchedDetails=null;
    $(".Fetched, .WrongUsername, .IncompleteUsername, .EverythingRight").hide();
    $("#github-username").keyup(function(){
        if($(this).val().trim().length>0)
        {
            $("#check").prop("disabled",false);
            if(!$(".NoUsername").is(":visible"))
            resetMessages();
            $(".NoUsername").fadeIn();
        }
        else
        {
            $("#check").prop("disabled",true);
        }
    });
    $("#check").click(function(e){
        e.preventDefault();
        $("#github-username,#check").prop("disabled",true);
        $.getJSON("https://api.github.com/users/"+$("#github-username").val(),
        function (res) {
           FetchedDetails=res;
           console.log(FetchedDetails
            );
           if (
               res.name &&
               res.company &&
               res.login &&
               res.avatar_url &&
               res.blog &&
               res.location &&
               res.bio &&
               res.twitter_username 
            )
            {
                //profile is complete
                resetMessages();
                $(".EverythingRight").fadeIn();
                $("#fetch").prop("disabled",false);
            }
            else
            {
                //profile is incomplete
                resetMessages();
                $(".IncompleteUsername").fadeIn();
                $("#fetch").after(
                    '<button type="button" class="btn btn-primary" id="again" onclick="location.reload();">Again</button>'
                );
            }
        }
        ).fail(function() {
            resetMessages();
            $(".WrongUsername").fadeIn();
            $('#fetch').after(
                '<button type="button" class="btn btn-primary" id="again" onclick="location.reload();">Again</button>'
            );
        });
       
    });
    const name=() =>{
        console.log("new request")
    }

    $("#fetch").click(function(e){
        e.preventDefault();
        $("#avatar_url").attr("src",FetchedDetails.avatar_url);
        $("#Name").text(FetchedDetails.name);
        $("#Company").text(FetchedDetails.company);
        $("#hireable").text(FetchedDetails.hireable);
        $("#username").text(FetchedDetails.login);
        $("#blog").text(FetchedDetails.blog);
        $("#location").text(FetchedDetails.location);
        $("#bio").text(FetchedDetails.bio);
        $("#twitter_username").text(FetchedDetails.twitter_username);
        resetMessages();
        $(".Fetched").fadeIn();
        $("#fetch").prop("disabled",true);
        $(this).after(
            '<button type="button" class="btn btn-primary" id="again" onclick="location.reload();">Again</button>'
        );
    });
});

//Dark mode switch
function toggle_light_mode() {
    var app = document.getElementsByTagName("BODY")[0];
    if (localStorage.lightMode == "dark") {
        localStorage.lightMode = "light";
        app.setAttribute("light-mode", "light");
    } else {
        localStorage.lightMode = "dark";
        app.setAttribute("light-mode", "dark");
    }
}

window.addEventListener(
    "storage",
    function () {
        if (localStorage.lightMode == "dark") {
            app.setAttribute("light-mode", "dark");
        } else {
            app.setAttribute("light-mode", "light");
        }
    },
    false
);
