$(document).ready(function () {
    
    $("#mc_templatename_submit").click(function (e) {
        e.preventDefault();
        $('.innerbg').closest('.devicewidth, .container').attr('hasbackground');
        $('#notifications').empty();

        var e = "";
        var emailrendercontent=$(".emailrender").html();
        
        $("#download-layout").html(emailrendercontent);

        var contentattr=$('[st-content]').attr( "st-content" );
        var t = $("#download-layout");
        
        t.find(".preview, .configuration, .drag, .remove, .colorSelectorinner, .confirmbox").remove();
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
        t.find('p').css({'margin':'0','padding':'0','marginBottom':'0'});
        t.find(".mce-content-body").removeClass("mce-content-body");
        console.log(t.find('.innerbg').closest('.devicewidth, .container').html());

        t.find(".innerbg").remove();
        t.find(".buttonbg").remove();

        formatSrc = $.htmlClean($("#download-layout").html(), {
            format: true,
            allowComments:true,
            allowedAttributes: [
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
                                ["st-content"],
                                ["st-title"],
                                ["st-sortable"],
                                ["st-image"],
                                ["st-webversion"],
                                ["st-unsubscribe"],
                                ["mc:edit"],
                                ['mc:label'],
                                ["mc:repeatable"],
                                ]
        });

        $("#download-layout").html(formatSrc);

        $('#download-layout').find('[st-sortable]').each(function(){
            $(this).attr("mc:repeatable", "x");
        });

        var contentattr=$('#download-layout').find('[st-content]').attr( "st-content" );
        $('#download-layout').find('[st-content]').each(function(){
            var contentattr=$(this).attr( "st-content" );
            $(this).attr("mc:edit",contentattr);

        });

        var contentattr=$('#download-layout').find('[st-title]').attr( "st-title" );
        $('#download-layout').find('[st-title]').each(function(){
            var titleattr=$(this).attr( "st-title" );
            $(this).attr("mc:edit",titleattr);

        });

        $('#download-layout').find('[st-image]').each(function(){
            var imageattr=$(this).attr( "st-image" );
            $(this).attr("mc:edit",imageattr);
            $(this).attr("mc:label","image");

        });
        /////////////////END ADD THE MAILCHIMP TAGS HERE////////////////
        var addmctags= $("#download-layout").html();
        ///////////////////////////////
        templateheader=$('textarea.templatehead').text();
        templatefooter='</body></html>';
        $("#downloadModal textarea").empty();
        $("#downloadModal textarea").val(templateheader+addmctags+templatefooter);

        var $mc_upload=$("#downloadModal textarea").val();
        var $mc_user_api_key=$(".mailchimp_user_apis").val();
        var $mc_template_name=$(".mc_templatename_field").val();
        $('#notifications').append('<div class="note"><div class="note_green"></div><div class="note_msg">Exporting</div></div>');

        var sitename=$('#sitename').val();
        
        $.ajax({
            url: "/editor/exportmailchimp",
            type:"POST",
            data: {
                html: $mc_upload,
                template_name: $mc_template_name
            }
        }).done(function(response) {
            $('#notifications').find('.note').remove();
            var result = response;
            $('#notifications').append(result);
            $('#notifications').find('.note').delay(3000).queue(function() {
                $(this).remove();
            });
        });
//        $.ajax
//        (
//                        {
//                            url:sitename+"/wp-admin/admin-ajax.php",       
//                            type:'POST',
//                            data:'action=my_special_ajax_call&mailchimp_html=' +$mc_upload+'&mc_user_api=' +$mc_user_api_key+'&mc_template_name=' +$mc_template_name,
//                            success:function(results)
//                            {
//                                $('#notifications').find('.note').remove();
//                                var result= results;
//                                $('#notifications').append(result);
//                                $('#notifications').find('.note').delay(3000).queue(function() {
//                                    $(this).remove();
//                                });
//
//                            }
//                        }
//        ); 

    });
});
