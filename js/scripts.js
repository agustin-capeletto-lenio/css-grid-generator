$.fn.eachSlice=function(e,c){for(var l=$(this),n=0;n<l.length;n+=e)c.call(l.slice(n,n+e).get(),n/e);return l};



function updateColInput() {
  var colValues = [];
  $(".input-cols .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    colValues.push(currentMix)
  });
  var newCols = colValues.join(" ");  
  $('#grid-container').css('grid-template-columns', newCols);   
}

function updateRowInput() {
  var rowValues = [];
  $(".input-rows .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    rowValues.push(currentMix);
  });
  var newRows = rowValues.join(" ");  
  $('#grid-container').css('grid-template-rows', newRows);   
}

function updateRowGapInput() {
  var gapValues = [];
  $(".input-row-gap .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    gapValues.push(currentMix);
  });
  var newGaps = gapValues.join(" ");  
  $('#grid-container').css('grid-row-gap', newGaps);     
}

function updateColGapInput() {
  var gapValues = [];
  $(".input-col-gap .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    gapValues.push(currentMix);
  });
  var newGaps = gapValues.join(" ");  
  $('#grid-container').css('grid-column-gap', newGaps);     
}

function updateGrid() { 
var SavedItems = [$("[data-name]")];

  $('#grid-container').html('');  



  updateColInput();
  updateRowInput();
  updateRowGapInput();  
  updateColGapInput();

  var numGrid = document.getElementById('grid-container').style.gridTemplateRows;
  var numGridToo = document.getElementById('grid-container').style.gridTemplateColumns; 
  
  var colNumber = numGridToo.split(" ").length;
  var rowNumber = numGrid.split(" ").length;
  var spaceCount = (numGrid.split(" ").length) * (numGridToo.split(" ").length) ;
  
  $("#grid-container").append(new Array(++spaceCount).join('<section><div><input type="checkbox"><span data-row="" data-col=""></span></div></section>'));
  
  $('section').each(function(i){
      var num = (i%colNumber) + 1;
      $(this).find("span").attr("data-col", num);
  });
  
  $('section').eachSlice(colNumber, function(colNumber) {
      var reRow = colNumber + 1;
      $(this).find("span").attr("data-row", reRow);
  });
  
  var areaRowsArr = Array(rowNumber).fill(".");
  var areaColsArr = Array(colNumber).fill(".");
  
  var areaRowsArrTotal = [].concat(...Array(colNumber).fill(areaRowsArr));
  var areaRowsArrTotal = _.chunk(areaRowsArrTotal, colNumber); 
 
  var areaRowsArrTotalString = "";
  $.each( areaRowsArrTotal, function(i,val) { areaRowsArrTotalString += "\'" + val.join(" ") + "\'" + " "; });  

  document.getElementById('grid-container').style.gridTemplateAreas = areaRowsArrTotalString;   

$("#grid-container").append(SavedItems);
console.log(SavedItems);


};

function removeRows() { $('.input-rows').children().last().remove(); updateGrid(); }
function removeCols() { $('.input-cols').children().last().remove(); updateGrid(); }


$(document).ready(function() {

  updateGrid();

var areaColors = ["rgba(230, 25, 75, 0.3)","rgba(60, 180, 75, 0.3)","rgba(255, 225, 25, 0.3)","rgba(245, 130, 48, 0.3)","rgba(70, 240, 240, 0.3)","rgba(240, 50, 230, 0.3)","rgba(0, 128, 128, 0.3)","rgba(170, 255, 195, 0.3)"];





  $('#add-column').on("click", function() {
    $(".input-cols").append("<div class='input-container'><input type='number' min='0' step='0.25' value='1'><select name='' id=''><option value='fr'>fr</option><option value='px'>px</option><option value='%'>%</option></select><button class='remove-item'>x</button></div>");
    updateGrid();
  });

  $('body').on('click', '#add-row', function() {
    $(".input-rows").append("<div class='input-container'><input type='number' min='0' step='0.25' value='1'><select name='' id=''><option value='fr'>fr</option><option value='px'>px</option><option value='%'>%</option></select><button class='remove-item'>x</button></div>");
    updateGrid();
  });


  $(document).on('change','input#show-coords',function () {
    $('section span').toggleClass("hidden-coords");
  });

  $(document).on('change','section input[type=checkbox]',function () {
if (areaColors.length === 0) {
areaColors = ["rgba(230, 25, 75, 0.3)","rgba(60, 180, 75, 0.3)","rgba(255, 225, 25, 0.3)","rgba(245, 130, 48, 0.3)","rgba(70, 240, 240, 0.3)","rgba(240, 50, 230, 0.3)","rgba(0, 128, 128, 0.3)","rgba(170, 255, 195, 0.3)"];

}
    var addAreaContainer = $("#add-area-container").detach(); 

var SavedItems = [$(".saved-area")];


      if ($(this).is(':checked')) {
        $('.saved-area.adding').remove();
        $('#area-name').val();
    var selectedCol = [];
    var selectedRow = [];
    $('section input:checked').each(function(i){
        var thisCol = $(this).siblings("span").data("col");
        var thisRow = $(this).siblings("span").data("row"); 
        selectedCol.push(thisCol);
        selectedRow.push(thisRow);    
    });  
    var thisColUniques = _.uniq(selectedCol);
    var thisRowUniques = _.uniq(selectedRow);

    var areaCols = thisColUniques.join(" / ");   
    var areaRows = thisRowUniques.join(" / ");    

    var minCol = _.minBy(thisColUniques);
    var minRow = _.minBy(thisRowUniques);

    if (thisRowUniques.length == 1 ) { var maxRow = _.maxBy(thisRowUniques); } else { var maxRow = _.maxBy(thisRowUniques) + 1 }
    if (thisColUniques.length == 1 ) { var maxCol = _.maxBy(thisColUniques); } else { var maxCol = _.maxBy(thisColUniques) + 1 }

    var IEmaxCol = _.maxBy(thisColUniques);
    var IEmaxRow = _.maxBy(thisRowUniques);

    
  if (thisColUniques.length > 1 && thisRowUniques.length == 1 ) {
      $("#grid-container").append("<section class='saved-area adding' style='grid-row:"+areaRows+" / "+areaRows+";grid-column:"+minCol+" / "+maxCol+"'><div style='background:repeating-linear-gradient(45deg,rgba(76, 175, 80, 0.15),rgba(76, 175, 80, 0.15) 10px,transparent 10px,transparent 20px)'></div></section>");
  } else if (thisColUniques.length == 1 && thisRowUniques.length > 1 ) {
    $("#grid-container").append("<section class='saved-area adding' style='grid-row:"+minRow+" /  "+maxRow+";grid-column:"+areaCols+" / "+areaCols+"'><div style='background:repeating-linear-gradient(45deg,rgba(76, 175, 80, 0.15),rgba(76, 175, 80, 0.15) 10px,transparent 10px,transparent 20px)'></div></section>");  
  } else if (thisColUniques.length == 1 && thisRowUniques.length == 1 ) {
    $("#grid-container").append("<section class='saved-area adding' style='grid-row:"+areaRows+" / "+areaRows+";grid-column:"+areaCols+" / "+areaCols+"'><div style='background:repeating-linear-gradient(45deg,rgba(76, 175, 80, 0.15),rgba(76, 175, 80, 0.15) 10px,transparent 10px,transparent 20px)'></div></section>");  
  } else if (thisColUniques.length > 1 && thisRowUniques.length > 1 ) {
    $("#grid-container").append("<section class='saved-area adding' style='grid-row:"+minRow+" /  "+maxRow+";grid-column:"+minCol+" / "+maxCol+"'><div style='background:repeating-linear-gradient(45deg,rgba(76, 175, 80, 0.15),rgba(76, 175, 80, 0.15) 10px,transparent 10px,transparent 20px)'></div></section>");    
  }

      $(".saved-area.adding > div").append(addAreaContainer);
      $(".saved-area.adding > div").append("<div class='remove-area'>x</div>");

      $('#add-area-container').addClass('active');
        $(".saved-area.adding > div").append("<div class='handle-resize'><svg x='0px' y='0px' viewBox='0 0 20 20' enable-background='new 0 0 20 20' xml:space='preserve'><path fill='#FFFFFF' d='M6.987,10.987l-2.931,3.031L2,11.589V18h6.387l-2.43-2.081l3.03-2.932L6.987,10.987z M11.613,2l2.43,2.081  l-3.03,2.932l2,2l2.931-3.031L18,8.411V2H11.613z'/></svg></div>");

      }
                $('#area-name').focus();

  });



  $('#remove-row').on("click", function() { removeRows(); });
  $('#remove-col').on("click", function() { removeCols(); });

  $(document).on('mousedown','.handle-resize',function () { 
      $('section').addClass('dragging');
   });
  $(document).on('mouseup','.handle-resize',function () { 
      $('section').removeClass('dragging');
   });

  $(document).on('click','.remove-item',function () { 
      $(this).closest('.input-container').remove();
      updateGrid();

   });


  $(document).on('change','.input-cols select, .input-rows select, .input-gaps select',function () { updateGrid();     $("section span").removeClass("hidden-coords"); });
  $(document).on('input','.input-cols input, .input-rows input, .input-gaps input',function () { updateGrid();    $("section span").removeClass("hidden-coords"); });

  $(document).on('input','#area-name',function () { $("#add-area").prop("disabled", false); });

  $(document).on('click','section.adding .remove-area',function () { 
    var addAreaContainer = $("#add-area-container").detach(); 
    $(this).parents("section").remove(); 
    $(".sidebar").append(addAreaContainer);
    $('#add-area-container').removeClass('active');
    $('#area-name').val("");    
    $("section input[type=checkbox]:checked").prop("checked", false);

  });

  $(document).on('click','section[data-name] .remove-area',function () { 
    $(this).parents("section").remove(); 


  });

$('#area-name').bind("enterKey",function(e){

});
$('#area-name').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");

    }
});



  $(document).on('click enterKey','#add-area, #area-name',function () { 
    
    if($('#area-name').val()) {

      //$(this).prop("disabled", true);
      var selectedCol = [];
      var selectedRow = [];


      var randomColor = areaColors[Math.floor(Math.random() * areaColors.length)];
      console.log(randomColor);



areaColors = jQuery.grep(areaColors, function(value) {
  return value != randomColor;
});
      console.log(areaColors);

      $('section input:checked').each(function(i){
          var thisCol = $(this).siblings("span").data("col");
          var thisRow = $(this).siblings("span").data("row"); 
          selectedCol.push(thisCol);
          selectedRow.push(thisRow);    
      });  
      var thisColUniques = _.uniq(selectedCol);
      var thisRowUniques = _.uniq(selectedRow);

      var areaCols = thisColUniques.join(" / ");   
      var areaRows = thisRowUniques.join(" / ");    

      var minCol = _.minBy(thisColUniques);
      var minRow = _.minBy(thisRowUniques);

      if (thisRowUniques.length == 1 ) { var maxRow = _.maxBy(thisRowUniques); } else { var maxRow = _.maxBy(thisRowUniques) + 1 }
      if (thisColUniques.length == 1 ) { var maxCol = _.maxBy(thisColUniques); } else { var maxCol = _.maxBy(thisColUniques) + 1 }

      var IEmaxCol = _.maxBy(thisColUniques);
      var IEmaxRow = _.maxBy(thisRowUniques);

      var areaName = $('#area-name').val();
      var addAreaContainer = $("#add-area-container").detach(); 

    if (thisColUniques.length > 1 && thisRowUniques.length == 1 ) {
        $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area active' style='grid-row:"+areaRows+" / "+areaRows+";grid-column:"+minCol+" / "+maxCol+"'><div></div></section>");
    } else if (thisColUniques.length == 1 && thisRowUniques.length > 1 ) {
      $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area active' style='grid-row:"+minRow+" /  "+maxRow+";grid-column:"+areaCols+" / "+areaCols+"'><div></div></section>");  
    } else if (thisColUniques.length == 1 && thisRowUniques.length == 1 ) {
      $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area active' style='grid-row:"+areaRows+" / "+areaRows+";grid-column:"+areaCols+" / "+areaCols+"'><div></div></section>");  
    } else if (thisColUniques.length > 1 && thisRowUniques.length > 1 ) {
      $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area active' style='grid-row:"+minRow+" /  "+maxRow+";grid-column:"+minCol+" / "+maxCol+"'><div></div></section>");    
    }

      $(".saved-area.active").css("background", randomColor);

      $("section input[type=checkbox]:checked").prop("checked", false);
      $('.saved-area').removeClass('active');
      $('.saved-area.adding').remove();
        $(".sidebar").append(addAreaContainer);
        $(".saved-area > div").append("<div class='remove-area'>x</div>");
      $('#area-name').val("");
      $('#add-area-container').removeClass('active');



    }
  });

  $('.code-modal-backdrop, .code-modal-close').on("click", function() { $('.code-modal').removeClass("active"); });
  
  $(document).on('click','section.adding',function () { 
                $('#area-name').focus();

});



  $('#get-code').on("click", function() {
    var currentGap = document.getElementById('grid-container').style.gap;       
    var currentRows = document.getElementById('grid-container').style.gridTemplateRows;
    var currentCols = document.getElementById('grid-container').style.gridTemplateColumns; 
    var currentAreas = document.getElementById('grid-container').style.gridTemplateAreas;   
    $('.code-modal').addClass("active");   
    $('.code-modal-code').remove();
    $('.code-modal-content').append("<div class='code-modal-code'>.grid-container { <div>display: grid;</div><div>grid-template-columns: "+currentCols+";</div><div>grid-template-rows: "+currentRows+";</div><div>grid-template-areas: "+currentAreas+";</div><div>grid-gap: "+currentGap+";</div> } </div> "); 
    
    //if ($("section[data-name]").length) { $('.code-modal-content').append("<div class='code-modal-code'><span class='code-modal-comment'>// Use data-area attribute to position your elements in the areas.</span></div> "); }

    $("section[data-name]").each(function(i){
      var savedArea = $(this).data("name");
      var currentRows = $(this).css('grid-row');   
      var currentCols = $(this).css('grid-column');   
      $('.code-modal-content').append('<div class="code-modal-code">[data-area="'+savedArea+'"] {<div>grid-row: '+currentRows+';</div><div>grid-column: '+currentCols+';</div>}</div>');     
    });


    if ($('input#IEsupport').is(':checked')) {
    $('.code-modal-content').append("<div>@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {</div><div class='code-modal-code'>.grid-container { <div>display: -ms-grid;</div><div>-ms-grid-columns: "+currentCols+";</div><div>-ms-grid-rows: "+currentRows+"; }</div></div><div>}</div>"); 

    }    

  });

});
