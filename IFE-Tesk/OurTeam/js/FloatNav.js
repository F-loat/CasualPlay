/******************************
*                             *
*		        OurTeam           * 
*                             *
*******************************/

//****************************浮动导航************************************************
window.onscroll = function () {                                                    //*
  var t = document.documentElement.scrollTop || document.body.scrollTop;           //*
  if (t >= 400) { document.getElementById("fixed-search").style.display = "block"; //*  
  } else {                                                                         //*
     document.getElementById("fixed-search").style.display = "none";               //*
  }                                                                                //*
}                                                                                  //*
//************************************************************************************
