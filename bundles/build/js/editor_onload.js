$(window).resize(function () {

    //$("body").css("min-height", $(window).height() - 90);
//    $(".emailrender").css("height", $(window).height()-120);
    $("#downloadModal TEXTAREA").css("height", $(window).height() - 70);
    var rightmenu=$('.rightsidemenu').width()/2;
    var rightsidemenu=rightmenu+15;
    var previewwidth=154/2;
    $('.rightsidemenu .preview').css("marginLeft",rightsidemenu-previewwidth);


});





$(window).ready(function () {

    $('.export_options').click(function(){
        $('.rightsidebar').css({right: '0px'});
    });
    tinymcereload();
    var rightmenu=$('.rightsidemenu').width()/2;
    var rightsidemenu=rightmenu+15;
    var previewwidth=154/2;
    $('.rightsidemenu .preview').css("marginLeft",rightsidemenu-previewwidth);

////////////
    $('.close_export_options').click(function(e){
        e.preventDefault();
        $('.rightsidebar').css({right: '-300px'});
    });

    $('[aria-label="Text color"]').bind('mouseenter',function(){
        $(this).find('.picker').colpick({
            layout:'hex',
            submit:0,
            flat:true,
            onChange:function(hsb,hex,rgb,fromSetColor) {
                //$('.picker').val('#' + hex);
            }
        });

    });
    $('.mod_thumb').tooltip();


});
//////GLOBAG BG COLOR CHANGER
// $('.global_bgcolor_picker').ColorPicker({
//     color: '#0000ff',
//     flat: true,
//     onShow: function (colpkr) {
//         $(colpkr).fadeIn(500);
//         $('.global_bgcolor_picker').fadeIn(500);

//         return false;
//     },
//     onHide: function (colpkr) {
//         $(colpkr).fadeOut(500);
//         $('.global_bgcolor_picker').fadeOut(500);
//         return false;
//     },
//     onChange: function (hsb, hex, rgb) {
//         $('[st-sortable]').attr('bgcolor','#' + hex);
//     }

// });//close click function
$('.global_bgcolor').colpick({
    //flat:true,
    layout:'hex',
    submit:0,
    onChange:function(hsb,hex,rgb,fromSetColor) {
        $('[st-sortable]').attr('bgcolor','#' + hex);
        //if(!fromSetColor) $('#picker3').val(hex).css('border-color','#'+hex);
    }
});

$('.global_bgcolor').click(function(){
    $('.global_bgcolor_picker').fadeIn(500);
});

$('.global_bgcolor_picker').mouseleave(function(){
    $(this).fadeOut(500);
});


var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};


$(document).ready(function () {

    $('.darkoverlay_download').find('li').on('click', 'a', function(e){
        e.preventDefault();
        var $el = $(e.currentTarget);


        saveLayoutSrc($el.data('template_id')).done(function(){
            setTimeout(function(){
                window.location = $el.attr('href');
            }, 1000);

        });

    });

    //REMOVE HYPERLINKS
    //$("body").css("min-height", $(window).height() - 90);
    $('.emailrender a').click(function(event) {event.preventDefault();});
    $('iframe a').click(function(event) {event.preventDefault();});
    //insert colorselection box
    $("[st-bgcolor='edit']").prepend('<div class="colorSelectorinner"></div>');



//    $(".emailrender ").css("min-height", $(window).height()-120 );
    $("#downloadModal TEXTAREA").css("height", $(window).height() - 40);
    $('iframe').css({"height":$(window).height()-120});

    saved_html();
    mouseover();
    move_up_down();
    upload_buttons();
    var er = $('.emailrender');

    er.find('[st-sortable]').find('table:first').prepend('<div class="innerbg"></div>');
    er.css("height", "auto");
});

$('img[st-image]').each(function(i, el){
    var $el = $(el);
    if(!$el.attr('id')) {
        //generate random ID
        $el.attr('id', Math.random().toString(36).slice(2));
    }
});



$('img[st-image]').on('load', function(e){
    var img = e.currentTarget;

    var $el = $(e.currentTarget);

    if($el.parent().is('a')) {
        if(!$el.parent().parent().hasClass('imgpop')) {
            $el.parent().wrap('<div class="imgpop" />');
        }
    } else {
        if(!$el.parent().hasClass('imgpop')) {
            $el.wrap('<div class="imgpop" />');
        }
    }

    if($el.parents('.imgpop').find('.uploader_wrap').length == 0 && img.clientWidth!= 0 && img.clientHeight!= 0 ){
        var str = '<div class="uploader_wrap" style="width:'+img.clientWidth+'px; margin-top:'+(img.clientHeight/2-20)+'px"><div class="upload_buttons"><div class="img_link"></div><div class="img_upload"></div><div class="img_edit" style="visibility: hidden"></div></div></div>';

        $el.parents('.imgpop').prepend(str);
    }
    $el.parents('td').mouseenter(function(){
        $(this).find('.uploader_wrap').css('opacity','1');
    }).mouseleave(function(){
        $(this).find('.uploader_wrap').css('opacity','0');
    });
    upload_append();
});


function upload_buttons(){

    $('[st-image]').each(function(i, el){
        var $el = $(el);

        if($el.parent().is('a')) {
            if(!$el.parent().parent().hasClass('imgpop')) {
                $el.parent().wrap('<div class="imgpop" />');
            }
        } else {
            if(!$el.parent().hasClass('imgpop')) {
                $el.wrap('<div class="imgpop" />');
            }
        }

        if($el.parents('.imgpop').find('.uploader_wrap').length == 0 && el.clientWidth!= 0 && el.clientHeight!= 0 ){
            var str = '<div class="uploader_wrap" style="width:'+el.clientWidth+'px; margin-top:'+(el.clientHeight/2-20)+'px"><div class="upload_buttons"><div class="img_link"></div><div class="img_upload"></div><div class="img_edit"></div></div></div>';

            $el.parents('.imgpop').prepend(str);
        }
        $el.parents('td').mouseenter(function(){
            $(this).find('.uploader_wrap').css('opacity','1');
        }).mouseleave(function(){
            $(this).find('.uploader_wrap').css('opacity','0');
        });
    });
    upload_append();
//    $('[st-image]').mouseenter(function(){
//        $(this).parents('.imgpop').find('.uploader_wrap').css('opacity','1');
//    }).mouseleave(function(){
//        $(this).parents('.imgpop').find('.uploader_wrap').css('opacity','0');
//    });

//
//    $('.uploader_wrap').each(function(){
//        var uploadimgwidth=$(this).parents('.imgpop').find('[st-image]').width();
//        var uploadimgheight=$(this).parents('.imgpop').find('img[st-image]').get(0).clientHeight;
//        console.log(uploadimgwidth, uploadimgheight);
//        $(this).css({'width':uploadimgwidth,'marginTop':uploadimgheight/2-20});
//
//
//
//        $(this).mouseenter(function(){
//            $(this).css('opacity','1');
//        });
//
//        $(this).mouseleave(function(){
//            $(this).css('opacity','0');
//        });
//    });


}
///////////////////////////////
function saved_html() {
    var er = $('.emailrender');

    er.find('[st-sortable]').find('table:first').prepend('<div class="innerbg"></div><div class="addremove"><div class="drag"></div><div class="remove"></div></div>');
    er.find('[st-button]').prepend('<div class="buttonbg"></div>');
//$('.emailrender').find('.imgpop').prepend('<div class="uploader_wrap"><div class="upload_buttons"><div class="img_link"></div><div class="img_upload"></div></div></div>');


//move the remoce button to right top corner
    var innertable= er.find('table:first').find('table:first').width()-80;
    var parent=    er.find('table:first').find('table:first').width();
    $('.emailrender .addremove').css({marginLeft:innertable});
    $('.emailrender .move_controls').css({marginLeft: parent/2 - 61 });
//$('.emailrender').find('table:first').find('td:first').mouseenter(function(){$(this).find('table:first').addClass('selecthover');});
    er.find('table:first').find('td:first').mouseleave(function(){$(this).find('table:first').removeClass('selecthover');});
    er.find('[st-sortable]').wrap('<div class="view" />');
    er.find('.view').wrap('<div class="module" />');


}
////////////////////////////////
function mouseover() {
//$('.module .view').find('table:first').find('table:first').prepend('<div class="move_controls"><div class="move_up"></div><div class="drag"></div><div class="move_down"></div></div>');

    $('.module .view').find('table:first').find('table:first').find('.addremove').remove();
    $('.module .view').find('table:first').find('table:first').prepend('<div class="addremove"><div class="drag"></div><div class="remove"></div></div>');
    $('.module .view').find('table:first').find('table:first').find('.innerbg').remove();
    $('.modules_sidebar').find('[st-sortable]').find('table:first').prepend('<div class="innerbg"></div>');
    $('.modules_sidebar').find('[st-button]').prepend('<div class="buttonbg"></div>');
//$('.modules_sidebar').find('.imgpop').prepend('<div class="uploader_wrap"><div class="upload_buttons"><div class="img_link"></div><div class="img_upload"></div></div></div>');
//move the remoce button to right top corner
    var innertable=$('.module .view').find('table:first').find('table:first').width()-80;
    var parent=    $('.module .view').find('table:first').find('table:first').width();
    $('.addremove').css({marginLeft:innertable});
    $('.move_controls').css({marginLeft: parent/2 - 61 });



}
$('.mce-colorbutton').bind('click',function(){
});



function tinymcereload() {
    tinymce.init({
        selector: ".emailrender [st-content]",
        inline: true,
        resize: false,
        object_resizing : false,
        plugins: [ "advlist link image textcolor", "media"
        ],
        toolbar: " undo | redo | fontsizeselect | bold | italic | underline | alignleft aligncenter alignright | link | forecolor",
        menubar: false,
        toolbar_items_size: 'medium',
        force_hex_style_colors : true,
        image_advtab: true,

        extended_valid_elements: 'span[st-webversion|st-unsubscribe|style], td[st-webversion|st-unsubscribe|style], table[st-webversion|st-unsubscribe|style]'
    });

    tinymce.init({
        selector: ".emailrender [st-title]",
        inline: true,
        //fixed_toolbar_container: "#mytoolbar",
        resize: false,
        object_resizing : false,
        plugins: [
            "link image lists",
            "responsivefilemanager textcolor"

        ],
        toolbar: " undo | redo | fontsizeselect | bold | italic | underline | alignleft aligncenter alignright | link | forecolor",
        //forced_root_block : '',
        menubar: false,
        toolbar_items_size: 'medium',
        force_hex_style_colors : true,
        //theme_advanced_buttons3_add : "forecolor",
//external_filemanager_path:"http://stampliaeditor.3rillstudios.com/wp-content/themes/emailmadv7/assets/js/filemanager/", 
//filemanager_title:"Image Manager" , 
//external_plugins: { "filemanager" : "http://stampliaeditor.3rillstudios.com/wp-content/themes/emailmadv7/assets/js/filemanager/plugin.min.js"},

        //invalid_elements: "em",
        cleanup : true,
        'formats' : {
            'alignleft' : {'selector' : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img, td', attributes: {"align":  'left'}},
            'aligncenter' : {'selector' : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img, td', attributes: {"align":  'center'}},
            'alignright' : {'selector' : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img, td', attributes: {"align":  'right'}},
            'alignfull' : {'selector' : 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img, td', attributes: {"align":  'justify'}}
        }


    });

// tinymce.init({
//     selector: ".emailrender [st-image]",
//     inline: true,
//    // fixed_toolbar_container: "#mytoolbar",
//     force_hex_style_colors : true,
//      menubar: false,
//      resize: false,
//      object_resizing : false,
//      forced_root_block : '',
//      plugins: [
//     "link image",
//     "insertdatetime media jbimages"
//   ],

//     toolbar: "link | jbimages",
//     relative_urls: false
// });
}


$(document).ready(function () {
    $('#download_btn').click(function(){
        $('.darkoverlay_download').fadeIn(500);
    });

    $(' .alertclose').click(function(){
        $(this).parents('.darkoverlay_download').fadeOut(500);
    });
    $('.alert_close').click(function(){
        $(this).parents('.darkoverlay_download').fadeOut(500);
    });


    $('#testmail_btn').click(function(){
        $('.darkoverlay_testmail').fadeIn(500);
    });

    $(' .testmailclose').click(function(){
        $(this).parents('.darkoverlay_testmail').fadeOut(500);
    });
    $('.testmail_close').click(function(){
        $(this).parents('.darkoverlay_testmail').fadeOut(500);
    });



    $('.export-button').click(function(){
        $('.export-button').removeClass('mc_select');
        $(this).addClass('mc_select');
        $('.export-box').fadeOut(500);
        $('#'+$(this).data('provider')+'_optionsbox').fadeIn(500);



    })
    .each(function(i, el){
        var $el = $(el);
        var position = $el.position();
        $('#'+$el.data('provider')+'_optionsbox').css({'left':position.left+260,'top':position.top});
    });


    $('.module_sidebar_wrap').scroll(function(){
        $('.export-button').each(function(i, el){
            var $el = $(el);
            var position = $el.position();
            $('#'+$el.data('provider')+'_optionsbox').css({'left':position.left+260,'top':position.top});
        });
    });

    $('.close').click(function(e){
        e.preventDefault();
        $('.export-button').removeClass('mc_select');
        $('.export-box').fadeOut(500);

    });

    $('form.export-template').submit(function(e){
        e.preventDefault();
        var $el = $(this);
        if($el.find('.export_type').val()) {
           
            $el.find('.templatename_submit').val('...');
            saveLayoutSrc($el.find('.templateedit_id').val()).done(function(){
                $('#notifications').removeClass('saving');
                var data = {
                    'export_type': $el.find('.export_type').val(),
                    'template_type': 'edit',
                    'template_id': $el.find('.templateedit_id').val(),
                    'template_name': $el.find('.templatename').val()
                };

              var providerName = $el.find('.export_type').val();

                var exporting = $.ajax({
                    'url': $el.attr('action'),
                    'data': data,
                    'type':'POST',
                    'datatype': 'html'
                });

                exporting.done(function(data) {

                    $('.export-button').removeClass('mc_select');
                    $('.export-box').fadeOut(500);

                    $('#notifications').html(data);
                    setTimeout(function(){
                        $('#notifications').find('.note').fadeOut();
                    }, 4000);

                    $el.find('.templatename_submit').val('Export');

                    analytics.identify({
                      "Export": true
                    });
                    analytics.track("Export template in builder",
                      {
                        "export type": providerName
                    });

                });

                exporting.fail(function(xhr) {

                    $el.find('.templatename_submit').val('Export');
                    $('#notifications').html('<div class="note"><div class="note_red"></div><div class="note_msg">Export failed</div></div>');
                    setTimeout(function(){
                      console.log(xhr.responseText);
                        $('#notifications').find('.note').fadeOut();
                    }, 4000);
                });
            });

        }
    });


    $('#testmail').on('submit', function(event){
        event.preventDefault();
        var id = $(this).attr("data-id");
        saveLayoutSrc(id).done(function(){
            var data = {
                email: $('.testmail_input').val(),
                subject: $('.testmail_subject').val(),
                id: id
            };
            $('#notifications').html('<div class="note"><div class="note_green"></div><div class="note_msg">Sending email</div></div>');

            //console.log(data);

            $.ajax
            (
                {
                    url:"/editor/testemail",
                    type:'POST',
                    data:data,
                    success:function(results)
                    {

                        //$("#mc_result").empty();
                        //$("#mc_result").append(results);

                        analytics.identify({
                          "Test email": true
                        });
                        analytics.track("Test email");

                        $('#notifications').find('.note').fadeOut(function(){
                            $('#notifications').find('.note').remove();
                            $('#notifications').append(results);
                            $('.testmail_close').trigger('click');
                            setTimeout(function(){
                                $('#notifications').find('.note').fadeOut(function(){
                                    $('#notifications').find('.note').remove();

                                });
                            }, 3000);

                        });


                    },
                    error: function(){
                        $('#notifications').find('.note').fadeOut(function(){

                            $('#notifications').find('.note').remove();
                            $('#notifications').append('<div class="note"><div class="note_red"></div><div class="note_msg">Could not send your test email</div></div>');
                            setTimeout(function(){
                                $('#notifications').find('.note').fadeOut(function(){
                                    $('#notifications').find('.note').remove();
                                });
                            }, 3000)
                        });
                    }
                }
            );
        });



    });


////GLOBAL BG COLOR CHANGER
    $('.innerbg').bind('mouseover',function(){
        var seldiv=$(this).parents('[st-sortable]');
        $(this).colpick({
            //flat:true,
            layout:'hex',
            submit:0,
            onChange:function(hsb,hex,rgb,fromSetColor) {

                $(seldiv).find('.devicewidth, .container').attr('bgcolor','#' + hex);
                //if(!fromSetColor) $('#picker3').val(hex).css('border-color','#'+hex);
            }
        });
    });

////BUTTON BG COLOR CHANGER
    $(document).on('mouseover', '.buttonbg', function(){
        var seldiv = $(this).parent('[st-button]');
        $(this).colpick({
            //flat:true,
            layout:'hex',
            submit:0,
            onChange:function(hsb,hex,rgb,fromSetColor) {

                seldiv.attr('bgcolor','#' + hex);
                seldiv.css('background-color','#' + hex);
                //if(!fromSetColor) $('#picker3').val(hex).css('border-color','#'+hex);
            }
        });
    });
////TEXT COLOR CHANGER
    $(document).on('mouseover', '.picker', function(){
        var seldiv=$(this).parent('[st-button]');
        $(this).colpick({
            //flat:true,
            layout:'hex',
            submit:0,
            onChange:function(hsb,hex,rgb,fromSetColor) {

                $(seldiv).val('#' + hex);
                //if(!fromSetColor) $('#picker3').val(hex).css('border-color','#'+hex);
            }
        });
    });


    window.featherEditor = new Aviary.Feather({
        apiKey: '7b5d1adf7f1f8bb5',
        apiVersion: 3,
        theme: 'dark', // Check out our new 'light' and 'dark' themes!
        tools: 'all',
        onLoad: function(){
            $('.img_edit').css('visibility', 'visible');
        },
        onSave: function(imageID, newURL) {
            var $img = $('#'+imageID);
            $img.src = newURL;
            $.ajax({
                type: 'POST',
                url: '/editor/upload',
                data: {
                    url: newURL,
                    templateEditId: $('a.html_download').data('template_id')
                },
                success: function(res){
                    $img.attr('src', res);
                    featherEditor.close();
                }
            });
        },
        onError: function(errorObj) {
            console.log(errorObj);
        }
    });


});
$('#myonoffswitch').change(function(){

    if($('#myonoffswitch').is(':checked')){
        $('.mobileoverlay').fadeOut();
        $('body').css({'overflow':''});


    }
    else
    {
        $('.mobileoverlay').fadeIn();
        preview_mobile();
        $('body').css({'overflow':'hidden'});
        var $content = $("iframe.editframe").contents();
        $content.find("body").find('a').click(function(e) {
            e.preventDefault();
        });

    }
});



function upload_append() {

    $(document).on('click', '.img_upload', function(){

        $('.darkoverlay_imgupload').remove();

        $(this).parents(".imgpop").append('<div class="darkoverlay_imgupload">'+

            '<div class="imageuploader">'+
            '<header><h3>Upload Image</h3></header>'+
            '<div class="imgupload_form">'+
            '<form action="/editor/upload" method="post" enctype="multipart/form-data" id="UploadForm">'+
            '<div class="fileUpload"><span>Choose file</span>'+
            '<input id="uploadFile" placeholder="Choose File" disabled="disabled" />'+
            '<input id="uploadBtn" name="ImageFile" required type="file" class="upload" />'+
            '<input id="imgwidth" name="imgwidth" type="hidden" class="upload" />'+
            '<input id="imgheight" name="imgheight" type="hidden" class="upload" />'+
            '<input id="templateEditId" name="templateEditId" type="hidden" class="upload" value="'+$('a.html_download').data('template_id')+'" />'+
            '</div>'+
            '<div class="imgupload_ctrls">'+
            '<a class="close_upload" href="#">Close</a>'+
            '<input type="submit"  id="save_upload" value="Upload" />'+
            '</div>'+
            '</form>'+
            '<div id="output" style="display:none;"></div>'+

            '</div>'+
            '</div>'+
            '</div>');
        var imgwidth=$(this).parents('.imgpop').find('[st-image]').attr('width');
        var imgheight=$(this).parents('.imgpop').find('[st-image]').attr('height');
        $('#imgwidth').val(imgwidth);
        $('#imgheight').val(imgheight);
        $(".close_upload").bind('click',function(e){
            e.preventDefault();
            $(this).parents(".darkoverlay_imgupload").remove();
        });

    });
    $(document).on('change', '#uploadBtn', function(e){
        var $el = $(e.currentTarget);
        $('.fileUpload').find('span').text($el.val().replace('C:\\fakepath\\', ''));
    });


}


function open_editor(avData, $img) {
//    if (typeof window.Aviary == 'undefined') {
//        console.log('aviary not loaded');
//        setTimeout(function(){
//            open_editor(avData);
//        }, 500)
//    } else {
        var featherEditor = new Aviary.Feather({
            apiKey: '7b5d1adf7f1f8bb5',
            apiVersion: 3,
            theme: 'dark', // Check out our new 'light' and 'dark' themes!
            tools: 'all',
            onSave: function(imageID, newURL) {
                $img.src = newURL;
                $.ajax({
                    type: 'POST',
                    url: '/editor/upload',
                    data: {
                        url: newURL,
                        templateEditId: $('a.html_download').data('template_id')
                    },
                    success: function(res){
                        $img.attr('src', res);
                        featherEditor.close();
                    }
                });
            },
            onError: function(errorObj) {
                alert(errorObj.message);
            }
        });
//        setTimeout(function(){
            featherEditor.launch(avData);
//        }, 300);

//    }


}


function img_link() {
    $(document).on('click', '.img_edit', function(e){
        var $el = $(e.currentTarget);
        var $img = $el.closest('.imgpop').find('img[st-image]');
        var avData = {
            image: $img.attr('id'),
            url: $img.attr('src')
        };
        open_editor(avData, $img);

        analytics.track("Edit img in builder");
    });

    $(document).on('keyup', '#custom-color', function(e){

        $('#user-color').css('color', '#'+$(this).val())
            .attr('data-mce-color', $(this).val());
        if(e.keyCode == 13){
            $("#user-color").click();
        }
    });

    $(document).on('click', '.img_link', function(){
        var link = $(this).parents(".imgpop").find('a').attr('href');
        if(typeof link ==='undefined') {
            link = '';
        }
        $(this).parents(".imgpop").append('<div class="darkoverlay_imglink">'+

            '<div class="imageuploader">'+
            '<header><h3>Image Link</h3></header>'+
            '<div class="imgupload_form">'+
            '<input id="img_link" type="text" value="'+link+'" />'+
            '<div class="imgupload_ctrls">'+
            '<a class="close_link" href="#">Close</a>'+
            '<a class="save_link" href="#">Save</a>'+
            '</div>'+

            '</div>'+
            '</div>');

        $(".close_link").bind('click',function(e){
            e.preventDefault();
            $(this).parents(".darkoverlay_imglink").remove();
        });

        $(".save_link").bind('click',function(){
            var link=$(this).parents(".imageuploader").find('#img_link').val();
            if ($(this).parents('.imgpop').find('img').parent("a").length) {
                $(this).parents('.imgpop').find('img').parent("a").attr('href',link);
                $(this).parents(".darkoverlay_imglink").remove();
            }
            else {
                $(this).parents('.imgpop').find('img').wrap('<a href='+link+'>');
                $(this).parents(".darkoverlay_imglink").remove();
            }


        });

    });
}


$(document).ready(function () {
    upload_append();
    img_link();
    $('.no-provider').on('click', function(e){
        window.location = e.currentTarget.getAttribute('data-href');
    })
});

$(document).on('submit', '#UploadForm', function(e){

    e.preventDefault();
    $('.darkoverlay_imgupload').css({'display':'none'});
    $("#save_upload").attr("disabled", "");
    $(this).parents('.imgpop').find(".uploader_wrap").after("<span style='background:#ffffff;border-radius:3px;position:absolute;'><img src='/bundles/stampliabuilder/img/imgloader.gif'></span>");
    // $('#output').parents('.imgpop').find('[st-image]').attr('src','http://stampliaeditor.3rillstudios.com/wp-content/themes/stampliav9/assets/img/imgloader.gif');
    //$("#output").html("<span>Uploading...</span>");
    $(this).ajaxSubmit({
        target: "#output",
        success:  afterSuccess
    });

});

function afterSuccess()  {
    var output = $('#output');
    var imgurl = output.text();
    //console.log('success', imgurl);

    var $img = output.parents('.imgpop').find('[st-image]');
    $img.attr('src',imgurl);


    $(".imgpop").find('span').remove();
    $("#UploadForm").resetForm();
    $("#save_upload").removeAttr("disabled");
    output.parents(".darkoverlay_imgupload").remove();
    var featherEditor = new Aviary.Feather({
        apiKey: '7b5d1adf7f1f8bb5',
        apiVersion: 3,
        theme: 'dark', // Check out our new 'light' and 'dark' themes!
        tools: 'all',
        onSave: function(imageID, newURL) {
            $img.src = newURL;
            $.ajax({
                type: 'POST',
                url: '/editor/upload',
                data: {
                    url: newURL,
                    templateEditId: $('a.html_download').data('template_id')
                },
                success: function(res){
                    $img.attr('src', res);
                    featherEditor.close();
                }
            });
        },
        onError: function(errorObj) {
            alert(errorObj.message);
        }
    });
    featherEditor.launch({
        image: $img.attr('id'),
        url: $img.attr('src')
    });
}
//$(".close_upload").click(function(){$(this).parents(".darkoverlay_imgupload").remove();});