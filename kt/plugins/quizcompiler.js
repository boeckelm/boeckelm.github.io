window.addEventListener("load", function() {
	var idcnt = 1;
	var qs = document.getElementsByClassName("quiz");
	if (qs) for (qi=0; qi<qs.length; qi++) {
		var q = qs[qi];
		var is = q.getElementsByTagName("input");
		if (is) for (ii=0; ii<is.length; ii++) {
			var i = is[ii];
			var answer = i.innerHTML;
			
			var wrapper = document.createElement("div");
			var check = document.createElement("input");
				check.type = "checkbox";
				check.id = "quizAnswer"+idcnt;
			wrapper.appendChild(check);
			var label = document.createElement("label");
				label.htmlFor = "quizAnswer"+idcnt;
				label.innerHTML = i.value;
			wrapper.appendChild(label);
			
			i.outerHTML = wrapper.outerHTML;
			
			idcnt++;
		}
		
		/*q.appendChild(document.createElement("br"));*/
		var button1 = document.createElement("input");
			button1.type="submit";
			button1.setAttribute("onclick", "check(this); return false;");
			button1.value="Check";
		q.appendChild(button1);
		var button1 = document.createElement("input");
			button1.type="submit";
			button1.setAttribute("onclick", "resetquiz(this); return false;");
			button1.value="Reset";
		q.appendChild(button1);
	}
});

function check(elem) { //elem = form
	var ae = elem.parentElement.getElementsByTagName("div"); //liste der antwort elemente
	var da = elem.parentElement.getAttribute("data-correct").split(","); // die richtigen antworten lesen
	
	var ca = [];
	var sa = [];
	// mit diesen array können wir leicht korrekte antworten prüfen: ( sa[i] == ca[i] ? richtig : falsch )
	for (i=0; i<ae.length; i++) {
		sa.push(ae[i].firstChild.checked);
	   //Bitte beachte das die ersten beiden ae-Einträge der Titel und 
  // die Frage des Quiz sind
	ca.push(da.indexOf((i-1).toString())>-1);
	}
	
	//antworten neuen style zuordnen
	for (i=0; i<ae.length; i++) {
		if (ca[i])
			ae[i].lastChild.className="correct";
		else if (sa[i])
			ae[i].lastChild.className="wrong";
		else
			ae[i].lastChild.className="";
	}
}

function resetquiz(elem) {
	var ae = elem.parentElement.getElementsByTagName("div"); //liste der antwort elemente
	for (i=0; i<ae.length; i++) {
		ae[i].lastChild.className="";
		ae[i].firstChild.checked=false;
	}
}
