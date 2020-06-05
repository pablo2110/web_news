"use strict"
 window.addEventListener("load", ()=>{
 
        $("#menu-toggle").click(function(e) {
          e.preventDefault();
          $("#wrapper").toggleClass("toggled");
        });
	
	});