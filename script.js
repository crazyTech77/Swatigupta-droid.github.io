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
            }
        }
        ).fail(function() {
            resetMessages();
            $(".WrongUsername").fadeIn();
        });
       
    });

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
        $(this).after(
            '<button type="button" class="btn btn-primary" onclick="location.reload();">Again</button>'
            );
    });
});