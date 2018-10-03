var products = new Array();


function loadDoc() {
    /*
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      showProducts(this.responseText);
    }
  };
  xhttp.open("GET", "productlist.text", true);
  xhttp.send();
    */
}

/*
function showProducts(text) {
	var result = text.split(";");
	for(i=0;i<=result.length-1;i++){
		var temp= result[i];
		temp= temp.split(",");
		products.push([temp[0], temp[1],temp[2],temp[3]]);	
	}
	
	displayProducts();

}

function displayProducts(){
	/*for(i=1;i<3;i++){
		document.getElementById(i + "-i").src = products[i-1][1];
	}
}*/


function activeTab(tab) {
	if(isANumber(tab)==true){
		
		for(i=1;i<5;i++){	
			document.getElementById("tab-" + i).classList.remove('active');
		}
	}
    switch (tab) {
			
        case 1:
            document.getElementById("tab-1").classList.add('active');
            document.getElementById("tab-text").innerHTML = "This is a description about a bike"
            break;
        case 2:
            document.getElementById("tab-2").classList.add('active');
            document.getElementById("tab-text").innerHTML = "Lorem ipsum dolor sit amet, ne suas periculis vim, qui dicta mediocrem ex. Sit viris moderatius eloquentiam id, dictas forensibus ut vim, quo probo insolens ea. Cum et essent fierent definitionem, in graeco malorum ius. Vidit deserunt eu est. Eam populo nusquam et, at inani euismod tractatos vis.";
            break;
        case 3:
            document.getElementById("tab-3").classList.add('active');
            document.getElementById("tab-text").innerHTML = "The Right Bike Guarantee lets you return any new bike within 30 days and swap it for a different one. <br/><br/> If you're not happy with your new bike for any reason, just bring it back to one of our stores and we'll exchange it as long as it's clean and isn't broken - by this we mean things like buckled wheels, crash damage, broken components, cracked frames etc. Worn brakes and tyres are acceptable."
            break;
        case 4:
            document.getElementById("tab-4").classList.add('active');
            document.getElementById("tab-text").innerHTML = "The best way to find out what size of frame you should get is to come in store and try the bike out yourself!"
            break;
			
        case "xxsmall":
            document.getElementById("xxsmall").classList.add('active');
            document.getElementById("xsmall").classList.remove('active');
            document.getElementById("small").classList.remove('active');
            document.getElementById("medium").classList.remove('active');
            document.getElementById("large").classList.remove('active');
            document.getElementById("xlarge").classList.remove('active');
            break;

        case "xsmall":
            document.getElementById("xxsmall").classList.remove('active');
            document.getElementById("xsmall").classList.add('active');
            document.getElementById("small").classList.remove('active');
            document.getElementById("medium").classList.remove('active');
            document.getElementById("large").classList.remove('active');
            document.getElementById("xlarge").classList.remove('active');
            break;

        case "small":
            document.getElementById("xxsmall").classList.remove('active');
            document.getElementById("xsmall").classList.remove('active');
            document.getElementById("small").classList.add('active');
            document.getElementById("medium").classList.remove('active');
            document.getElementById("large").classList.remove('active');
            document.getElementById("xlarge").classList.remove('active');
            break;
        case "medium":
            document.getElementById("xxsmall").classList.remove('active');
            document.getElementById("xsmall").classList.remove('active');
            document.getElementById("small").classList.remove('active');
            document.getElementById("medium").classList.add('active');
            document.getElementById("large").classList.remove('active');
            document.getElementById("xlarge").classList.remove('active');
            break;
        case "large":
            document.getElementById("xxsmall").classList.remove('active');
            document.getElementById("xsmall").classList.remove('active');
            document.getElementById("small").classList.remove('active');
            document.getElementById("medium").classList.remove('active');
            document.getElementById("large").classList.add('active');
            document.getElementById("xlarge").classList.remove('active');
            break;
        case "xlarge":
            document.getElementById("xxsmall").classList.remove('active');
            document.getElementById("xsmall").classList.remove('active');
            document.getElementById("small").classList.remove('active');
            document.getElementById("medium").classList.remove('active');
            document.getElementById("large").classList.remove('active');
            document.getElementById("xlarge").classList.add('active');
            break;
    }
}

function openNav() {
    openOverlay("sideNavOverlay");
    translateElement("sidenav", 0);
}

function openNav(nav) {
    translateElement(nav, 0);
    openOverlay("sideNavOverlay");
}

function openModal(productID) {
    document.getElementById("modal").style.display = "block";
	document.getElementById("modal-footer").style.display = "block";
    openOverlay("modalOverlay");
}


function openExtender(type) {
    translateElement("navExtended", 0);
	
	for(i=1;i<6;i++){	
		document.getElementById("snav-" + i).classList.remove('active');
	}
	
    document.getElementById("snav-" + type).classList.add('active');

	displayImages(6);
}

function displayImages(number) {
    
    for (i = 1; i <= 6; i++) {
        document.getElementById(i).style.display = "none";
    }
    for (i = 1; i <= number; i++) {
        document.getElementById(i).style.display = "inherit";
    }
    
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
	document.getElementById("modal-footer").style.display = "none";
    activeTab(1);
    activeTab('xxsmall')

    document.getElementById("modalOverlay").style.display = "none";

}

function closeOverlay(overlayID) {
    document.getElementById(overlayID).classList.add('fadeOut');

    setTimeout(function () {
        document.getElementById(overlayID).style.display = "none";
        document.getElementById(overlayID).classList.remove('fadeOut');

    }, 500);  
    
}

function openOverlay(overlayID) {
    document.getElementById(overlayID).style.display = "block";

    document.getElementById(overlayID).classList.add('fadeIn');

    setTimeout(function () {
        document.getElementById(overlayID).classList.remove('fadeIn');

    }, 500);  
}


function closeNav() {
    translateElement("sidenav", -105);
    translateElement("s-sidenav", -105);
    translateElement("navExtended", -155);
    document.getElementById('navExtended').style.display = "none";

    setTimeout(function () {
        document.getElementById('navExtended').style.display = "block";
    }, 500);  

    closeSearch();
    
    displayImages(0);
    

	for(i=1;i<6;i++){	
		document.getElementById("snav-" + i).classList.remove('active');
    }

    closeOverlay("sideNavOverlay");
}

function closeSearch() {
    document.getElementById('searchOverlay').style.display = "none";
    document.getElementById("searchBar").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("searchBar").style.color = "#fff";
    document.getElementById("magnify").style.color = "#fff";
}

function activateSearch() {
    document.getElementById("searchBar").style.backgroundColor = "#fff";
    document.getElementById("searchBar").style.color = "rgba(0,0,0,0.87)";
    document.getElementById("magnify").style.color = "rgba(0,0,0,0.87)"
    document.getElementById("searchOverlay").style.display = "block";
}


function translateElement(id, end) {
    document.getElementById(id).style.transform = "translateX(" + end + "%)";
}


function isANumber(str) {
    return !/\D/.test(str);
}


function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}


function getEngine() { //Redirects users using IE or Safari to the chrome download page
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    var isFirefox = typeof InstallTrigger !== 'undefined';

    if (isIE == true || isSafari == true || isFirefox == true) {
        window.open("https://www.google.com/chrome/", "_self");
    }
}
