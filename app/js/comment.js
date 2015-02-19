var commentPage = function() {

    var comment_detail = {
        author_name: " apurva",
        comment_value: "hahahah"
    };

    var coords = {
        xcord: 0,
        ycord: 0
    };

    function getCoords(event) {
        var x = event.clientX;
        var y = event.clientY;

        coords = {
            xcord: x,
            ycord: y
        };
    }

    function clicky() {
        var li = document.getElementsByClassName("image");
        li[0].addEventListener('click', getCoords, false);
    }




    function getImageId() {
        var x = document.getElementsByClassName("image");
        var y = x[0].getAttribute("id");
        return {
            image_id: y
        };
    }

    function addCommentDetails() {
        var aname = document.getElementById("name").value;
        var comment = document.getElementById("comment").value;
        comment_detail = {
            author_name: aname,
            comment_value: comment
        };
    }


    function getCommentDetails() {

        var list = document.getElementById("addComment");
        list.addEventListener('click', add, false);
    }



    function displayCommentBox() {

        var list = document.getElementById("comment-button");
        list.addEventListener('click', displaycomment, false);

        var flag = 1;

        function displaycomment() {
            if (flag == 1) {
                makev = document.getElementById("comment-form");
                makev.style.setProperty("display", "block");
                flag = 0;
            } else {
                flag = 1;
                makev = document.getElementById("comment-form");
                makev.style.setProperty("display", "none");
            }
        }
        clicky();
        getCommentDetails();

    }

    function add() {
        var field = ["image_id", "author_name", "comment_value", "position_x", "position_y"];
        var image = getImageId();
        var comment_details = addCommentDetails();
        var json = {};
        json.image_id = image.image_id;
        json.author_name = comment_detail.author_name;
        json.comment_value = comment_detail.comment_value;
        json.position_x = coords.xcord;
        json.position_y = coords.ycord;
        console.log(json);
        insertPage.insertIntoMongo(json);
    }

    return {
        displayCommentBox: displayCommentBox
    };
}();
