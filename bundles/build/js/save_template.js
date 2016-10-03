///////////SAVE FUNCTION
function saveLayoutSrc(id) {
    var e = "";
    $(".emailrender").find('.innerbg').closest('.devicewidth, .container').attr('hasbackground', 'true');


    $('.emailrender').css({'height': 'auto'});


    var emailrendercontent = $(".emailrender").html();

//    console.log('email render content', emailrendercontent);

    var t = $("#download-layout");
    t.html(emailrendercontent);
//    console.log('t.html', t.html());

    t.find('.innerbg').closest('.devicewidth, .container').each(function(i, el){
//        console.log(i, el);
        var $el = $(el);

        if(!$el.attr('bgcolor')) {
            var col = $el.closest('table').attr('bgcolor');
//            console.log(col);
            $el.attr('bgcolor', col);
            $el.attr('hasbackground', true);
        }

    });

    t.find('.ui-sortable-helper').remove();

    t.find('[st-content], [st-title]').removeAttr('id');

    t.find('.innerbg').closest('.devicewidth, .container').attr('hasbackground', 'true');

    t.find(".preview, .configuration, .move_controls, .addremove, .colorSelectorinner").remove();
    t.find(".module").addClass("removeClean");
    t.find(".box-element").addClass("removeClean");
    t.find(".module .module .module .module .module .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".module .module .module .module .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".module .module .module .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".module .module .removeClean").each(function () {
        cleanHtml(this)
    });

    t.find(".module .removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".removeClean").each(function () {
        cleanHtml(this)
    });
    t.find(".removeClean").remove();
    //t.find(".mce-content-body").remove();
    t.find(".mce-content-body").removeClass("mce-content-body");

    t.find(".innerbg").remove();
    t.find(".buttonbg").remove();
    t.find(".uploader_wrap").remove();
    t.find(".mce-panel").remove();

    t.find('[st-unsubscribe]').each(function() {
        $(this).attr('st-unsubscribe', 'st-unsubscribe');
    });
    t.find('[st-webversion]').each(function() {
        $(this).attr('st-webversion', 'st-webversion');
    });

//    console.log('before clean',t.html());

    //$("#download-layout .emailrender").removeClass("ui-sortable");
    //$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");


    var formatSrc = $.htmlClean(t.html(), {
        format: true,
        allowComments:true,
        allowedAttributes: [
            ['id'],
            ["class"],
            ["width"],
            ["height"],
            ["style"],
            ["align"],
            ["cellspacing"],
            ["cellpadding"],
            ["bgcolor"],
            ["valign"],
            ["border"],
            ["hasbackground"],
            ["st-content"],
            ["st-title"],
            ["st-sortable"],
            ["st-bgcolor"],
            ["st-image"],
            ["st-unsubscribe"],
            ["st-webversion"],
            ["st-button"]

        ]
    });

    t.html(formatSrc);
    var $savehtml = "<html>\n"
        + "<head>" + $('textarea.templatehead').text() + "</head>"
        + "<body>"
        + formatSrc
        + "</body>\n</html>";

    var sitename=$('#sitename').val();


    //TODO generate screenshot and save
    var r = $.Deferred();

    var data = {
        html: $savehtml,
        id: id
    };
//        console.log(data);
    var a = $.ajax
    (
        {
            url:"/editor/save",
            type:'POST',
            data:data
        }
    );



    a.done(function(results){
        r.resolve(results);
        $('#notifications').addClass('saving').html(results);

        setTimeout(function(){
            $('#saving-screenshot').remove();
            $('#notifications.saving').find('.note').fadeOut(function(){
                $('#notifications.saving').find('.note').remove();
            });
            $('.emailrender').css({'z-index': 1, 'position':'static'});
        }, 8000);

        var c = $.Deferred();
        $('.emailrender').css({'z-index': 9999, 'position':'relative'}).append('<div id="saving-screenshot" style="z-index:9998;position: absolute;top:0;bottom: 0;left: 50%;width: 700px; margin-left:-350px;">'+formatSrc+'</div>');

        var domain = window.location.protocol+'//'+window.location.hostname;
        $('#saving-screenshot').find('img').each(function(i, el){
            var $el = $(el);
            var src = $el.attr('src');
            if(src){
                $el.attr('src', src.replace(domain, '').replace(mainHostname, ''));
            }

        });

//    console.log($('#saving-screenshot').html());

//    var prev = er.html();
//    er.html(formatSrc);
        try{
            html2canvas(document.getElementById('saving-screenshot'), {
                onrendered: function(canvas) {

                    //$('#templateedit-screenshot-'+templateId).append(canvas);
                    /* canvas is the actual canvas element,
                     to append it to the page call for example
                     document.body.appendChild( canvas );
                     */

                    var urlData = canvas.toDataURL();

                    //TODO upload to server and get URL
                    $('#notifications').addClass('saving');
                    c.resolve(urlData);
                    $('#saving-screenshot').remove();

                }
            });

        }catch(e){
            $('#saving-screenshot').remove();
            $('.emailrender').css({'z-index': 1, 'position':'static'});
        }



        c.done(function(urlData){
            var data = {
                screenshot: urlData,
                html: $savehtml,
                id: id
            };
//        console.log(data);
            var a = $.ajax
            (
                {
                    url:"/editor/save",
                    type:'POST',
                    data:data
                }
            );
            a.done(function(){
                $('#notifications').addClass('saving');
                setTimeout(function(){
                    $('#notifications.saving').find('.note').fadeOut(function(){
                        $('#notifications.saving').find('.note').remove();
                    });
                }, 4000);

            })

        });




    });



    return r;

}


$(document).ready(function () {

    $('.savebtn').click(function(event){
        event.preventDefault();

        $('#notifications').empty();
        $('#notifications').append('<div class="note"><div class="note_green"></div><div class="note_msg">Saving</div></div>');

        saveLayoutSrc($(this).attr("data-id"));

    });

//    setInterval(function(){saveLayoutSrc($('.savebtn').data('id'))}, 10000);

});
