//Additional JavaScript
$(document).ready(function(){
		$(".primary").addClass('animated fadeInUp delay-10');
		$(".btn-round").addClass('animated fadeInUp delay-15');
        $(".secondary").hide();
        $(".warning").hide();
      	$("#warn-null").hide();
	    $(".warn-err").hide();  
	    $("#infixVal").val(""); 
      	$("#stack").text("TACK");
      	$("#tabel-container").text("[ TABLE GOES HERE  ]");

        $("#btn-default").click(function(){
        $(".secondary").addClass('animated fadeInUp delay-05');
        $(".secondary").show();
  });
      $(".btn-round").click(function(){
      $(".secondary").hide();
      $(".warning").hide();
      $("#warn-null").hide();
	  $(".warn-err").hide();
      $("#infixVal").val(""); 
      $("#stack").text("TACK");
      $("#tabel-container").text("[ TABLE GOES HERE  ]");   
   });
        
    $(".btn-default").click(function(){
        $(".logo").addClass('animated pulse delay-10 delay-15');
    });
});
      