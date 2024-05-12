//bible
function loadChapter(){
   var file="chapters/"+document.getElementById("book").value + ".txt";
   jQuery("#chapter").load("/wp-content/themes/astra/bible/"+file);
}

function loadBook(first, last){
   var file="chapters/"+document.getElementById("book").value + ".txt";
   jQuery.get("/wp-content/themes/astra/bible/"+file, 
   function(data) {
      if(first){
         var res = data.split("</option>");
         var res2 = res[0].split("<option value=");
         var res3 = res2[1].split(">1");
         var res4 = res3[0];
         jQuery("#verses").load("/wp-content/themes/astra/bible/"+res4+'tbl.html');
         jQuery("#chapter option[value="+res4+"]").attr('selected','selected');
      }
	   else if(last){
         var res = data.split("</option>");
         var res2 = res[res.length-2].split("<option value=");
         var res3 = res2[1].split('>');
		   var res4 = res3[0];
         jQuery("#verses").load("/wp-content/themes/astra/bible/"+res4+'tbl.html');
         jQuery("#chapter option[value="+res4+"]").attr('selected','selected');
      }
   }, 'text');
}

function prevChapter(){
   var cur = document.getElementById("chapter").value;
   var firstChapter = jQuery('#chapter option:nth-child(1)').val();
   var prev = cur.substring(1, cur.length);
   prev--;
   if (cur=="B1" || cur=="B2"){
	   document.getElementById("chapter").value = "B1";
	   loadVerses();
	   return;
   }
   else if (cur==firstChapter){
      var book = document.getElementById("book").value;
      var prevBook = book.substring(1, book.length);
      prevBook--;
      document.getElementById("book").value = ("A"+ prevBook.toString());
      loadChapter();
	   loadBook(false,true);
   }
   else{
      document.getElementById("chapter").value = ("B"+ prev.toString());
   }
   loadVerses();
}

function nextChapter(){
   var cur = document.getElementById("chapter").value;
   var lastChapter = jQuery('#chapter option:last-child').val();
   var next = cur.substring(1, cur.length);
   next++;

   if (cur=="B1189") return;
   else if (cur == lastChapter){
      var book = document.getElementById("book").value;
      var nextBook = book.substring(1, book.length);
      nextBook++;
      document.getElementById("book").value = ("A"+ nextBook.toString());
	   loadChapter();
	   loadBook(true,false);
   }
   else{
	  document.getElementById("chapter").value = ("B"+ next.toString());
   }
   loadVerses();
}

function loadVerses(){
   jQuery("#verses").load("/wp-content/themes/astra/bible/"+document.getElementById("chapter").value+'tbl.html');
   var book = document.getElementById("book").value;
   var chapter = document.getElementById("chapter").value;
   localStorage.setItem("book", book);
   localStorage.setItem("chapter", chapter);
   history.pushState({}, null, `?${document.getElementById("chapter").value}`);
}

function topFunction() {
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
   document.getElementById("verses").scrollTop = 0;
 }

/*lemmas and tables*/
function nextG(isFile){
   var G = window.location.search.substring(1);
   var Cap=G[0];
   if(Cap==" ") Cap='G';
   var nG=G.substring(1,G.length);
   nG++;
   G=Cap+nG;
   if(isFile){
      jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+G+'.html',
      function(data,textStatus) {
         if (textStatus == "error") {
            //alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
            history.pushState({}, null, `?${G}`);
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val("Κενό λήμμα");
            jQuery("#Gfile").text("Το λήμμα δεν έχει προστεθεί ακόμα.");
            return;
         }
         else{
            history.pushState({}, null, `?${G}`);
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val(lemma);

            //res = data.split("<p");
            //lemma = res[2].substring(res[2].indexOf("<b>"),res[2].length);
            //lemma = lemma.substring(3,lemma.indexOf("</b>"));
            //jQuery("#strongNum").val(G);
            //jQuery("#lemma").val(lemma);
         };         
      });
   }
   else{
      jQuery("#Gtable").load("/wp-content/themes/astra/gTables/"+G+'tbl.html',
      function(data,textStatus) {
         if (textStatus == "error") {
            //alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
            history.pushState({}, null, `?${G}`);
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val("Κενό λήμμα");
            jQuery("#Gtable").text("Το λήμμα δεν έχει προστεθεί ακόμα.");
            return;
         }
         else{
            history.pushState({}, null, `?${G}`);
            //parse and find lemma
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            lemma = htmlDoc.querySelector("font:nth-child(2)").innerText;
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val(lemma);
            

            //res = data.split('size="3">');
            //lemma = res[2].substring(0, res[2].indexOf("</font>"));
            //jQuery("#strongNum").val(G);
            //jQuery("#lemma").val(lemma);
         };
      });
   }
}

function prevG(isFile){
   var G = window.location.search.substring(1);
   var Cap=G[0];
   if(Cap==" ") Cap='G';
   var nG=G.substring(1,G.length);
   nG--;
   if (parseInt(nG)<=0) return;
   G=Cap+nG;
   if(isFile){
      jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+G+'.html',
      function(data,textStatus) {
         if (textStatus == "error") {
            //alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
            history.pushState({}, null, `?${G}`);
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val("Κενό λήμμα");
            jQuery("#Gfile").text("Το λήμμα δεν έχει προστεθεί ακόμα.");
            return;
         };
         history.pushState({}, null, `?${G}`);         
         var parser = new DOMParser();
         var htmlDoc = parser.parseFromString(data, 'text/html');
         lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
         jQuery("#strongNum").val(G);
         jQuery("#lemma").val(lemma);

         //res = data.split("<p");
         //lemma = res[2].substring(res[2].indexOf("<b>"),res[2].length);
         //lemma = lemma.substring(3,lemma.indexOf("</b>"));
         //jQuery("#strongNum").val(G);
         //jQuery("#lemma").val(lemma);
      });
   }
   else{
      jQuery("#Gtable").load("/wp-content/themes/astra/gTables/"+G+'tbl.html',
      function(data,textStatus) {
         if (textStatus == "error") {
            //alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
            history.pushState({}, null, `?${G}`);
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val("Κενό λήμμα");
            jQuery("#Gtable").text("Το λήμμα δεν έχει προστεθεί ακόμα.");
            return;
         }
         else{
            history.pushState({}, null, `?${G}`);
            //parse and find lemma
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            lemma = htmlDoc.querySelector("font:nth-child(2)").innerText;
            jQuery("#strongNum").val(G);
            jQuery("#lemma").val(lemma);


            //res = data.split('size="3">');
            //lemma = res[2].substring(0, res[2].indexOf("</font>"));
            //jQuery("#strongNum").val(G);
            //jQuery("#lemma").val(lemma);
         };
      });
   }
}

//search
function search(isFile){
   jQuery(".loader_div").show();
   var input = document.getElementById("searchInput").value;
   var Cap=input[0];
   var second=input[1];
   var greekDict = ['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'];
   var tonedLetters = ['Ά','Έ','Ή','Ί','Ό','Ύ','Ώ'];
   var englishDict=['A','B','G','D','E','Z','H','U','I','K','L','M','N','J','O','P','R','S','T','Y','F','X','C','V'];
   var numbers = [1,2,3,4,5,6,7,8,9];

   if((Cap=="G"||Cap=="g")&&(numbers.toString().includes(second))){
      Cap=Cap.toUpperCase();
      var nG=input.substring(1,input.length);
      if (parseInt(nG)<=0) return;
      input=Cap+nG;
      if(isFile){
         jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+input+'.html',
         function(data,textStatus) {
            if (textStatus == "error") {
               alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
               return;
            };
            history.pushState({}, null, window.location.href.split('/?')[0]+`/?${input}`);
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/html');
            lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
            jQuery("#strongNum").val(input);
            jQuery("#lemma").val(lemma);

            //res = data.split("<p");
            //lemma = res[2].substring(res[2].indexOf("<b>"),res[2].length);
            //lemma = lemma.substring(3,lemma.indexOf("</b>"));
            //jQuery("#strongNum").val(input);
            //jQuery("#lemma").val(lemma);
         });
      }
      else{
         if(jQuery().get("/wp-content/themes/astra/gTables/"+input+'tbl.html') == 'undefined'){
            alert("Το λήμμα δεν έχει προστεθεί ακόμα.");    
            return; 
         }
         var newTab = window.open(window.location.href.split('/?')[0]+`?${input}`, '_blank');
         if (newTab) newTab.focus();
         else alert('Please allow popups for this website');
      }
   }
   else if(Cap==" " || !Cap){
      alert("Παρακαλώ εισάγετε strong number ή λήμμα.");
      return;
   }
   else if(!greekDict.includes(Cap.toUpperCase()) && !greekDict.includes(Cap.toLowerCase())
   && !tonedLetters.includes(Cap.toUpperCase()) && !tonedLetters.includes(Cap.toLowerCase())){
      alert("Λάθος Είσοδος.");
   }
   //search when lemma is selected from the strongLemma table //should be altered
   else{ 
      var first = takeFirstLetter(input);
      var engFirst = englishDict[greekDict.indexOf(first)];
      //new testament
      if(isFile && window.location.href.includes("new-testament")){
         var gFile="";
         var correctedInput = correctInput(input);
         jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemma/"+engFirst+'.html',
         function(data) {
            jQuery(data).find('tr').each(function () {               
               var strong,lemma,word; 
               strong = jQuery(this).find('td')[0].innerText;
               lemma = jQuery(this).find('td')[1].innerText;
               word = jQuery(this).find('td')[2].innerText;
               var checkLemma = checkLemmaEquality(correctedInput,lemma);
               var checkWord = checkLemmaEquality(correctedInput,word);
               if (checkLemma || checkWord){
                  gFile=strong;
                  return;
               }; 
            });
            jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+gFile+'.html',
            function(data,textStatus) {
               if (textStatus == "error") {
                  alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
                  return;
               };
               history.pushState({}, null, window.location.href.split('/?')[0]+`/?${gFile}`);
               var parser = new DOMParser();
               var htmlDoc = parser.parseFromString(data, 'text/html');
               lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
               jQuery("#strongNum").val(gFile);
               jQuery("#lemma").val(lemma);


               //res = data.split("<p");
               //lemma = res[2].substring(res[2].indexOf("<b>"),res[2].length);
               //lemma = lemma.substring(3,lemma.indexOf("</b>"));
               //jQuery("#strongNum").val(gFile);
               //jQuery("#lemma").val(lemma);
            });
         });
      }
      //old testament
      else if(isFile && window.location.href.includes("old-testament")){
         var gFile="";
         var correctedInput = correctInput(input);
         jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemmaOld/"+engFirst+'.html',
         function(data) {
            jQuery(data).find('tr').each(function () {               
               var strong,lemma,word;
               strong = jQuery(this).find('td')[0].innerText;
               lemma = jQuery(this).find('td')[1].innerText;
               word = jQuery(this).find('td')[2].innerText;
               var checkLemma = checkLemmaEquality(correctedInput,lemma);
               var checkWord = checkLemmaEquality(correctedInput,word);
               if (checkLemma || checkWord){
                  gFile=strong;
                  return;
               }; 
            });
            jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+gFile+'.html',
            function(data,textStatus) {
               if (textStatus == "error") {
                  alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
                  return;
               };
               history.pushState({}, null, window.location.href.split('/?')[0]+`/?${gFile}`);
               var parser = new DOMParser();
               var htmlDoc = parser.parseFromString(data, 'text/html');
               lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
               jQuery("#strongNum").val(gFile);
               jQuery("#lemma").val(lemma);


               //res = data.split("<p");
               //lemma = res[2].substring(res[2].indexOf("<b>"),res[2].length);
               //lemma = lemma.substring(3,lemma.indexOf("</b>"));
               //jQuery("#strongNum").val(gFile);
               //jQuery("#lemma").val(lemma);
            });
         });
      }
      else{
         var gFile="";
         var correctedInput = correctInput(input);
         jQuery(document).load("/wp-content/themes/astra/strongLemma/"+engFirst+'.html',
         function(data) {
            jQuery(data).find('tr').each(function () {               
               var strong,lemma,word; 
               strong = jQuery(this).find('td')[0].innerText;
               lemma = jQuery(this).find('td')[1].innerText;
               word = jQuery(this).find('td')[2].innerText;
               var checkLemma = checkLemmaEquality(correctedInput,lemma);
               var checkWord = checkLemmaEquality(correctedInput,word);
               if (checkLemma || checkWord){
                  gFile=strong;
                  return;
               }; 
            });
            var newTab = window.open(window.location.href.split('/?')[0]+`?${gFile}`, '_blank');
            if (newTab) newTab.focus();
         });
      }
   }
   document.getElementById("searchInput").value="";
   setTimeout(function() {
   jQuery(".loader_div").hide();
   }, 800);
}

function takeFirstLetter(input){
   var first = input[0];
   if((first=='Ά')||(first=='ά')) first='Α';
   else if((first=='Έ')||(first=='έ')) first='Ε';
   else if((first=='Ή')||(first=='ή')) first='Η';
   else if((first=='Ί')||(first=='ί')) first='Ι';
   else if((first=='Ό')||(first=='ό')) first='Ο';
   else if((first=='Ύ')||(first=='ύ')) first='Υ';
   else if((first=='Ώ')||(first=='ώ')) first='Ω';
   else first = first.toUpperCase();
   return first;
}

function correctInput(input){
   var correctedInput=[];
   for(i=0; i<input.length; i++){
      if(alpha.includes(input[i])) correctedInput[i]='α';
      else if(epsilon.includes(input[i])) correctedInput[i]='ε';
      else if(hta.includes(input[i])) correctedInput[i]='η';
      else if(iota.includes(input[i])) correctedInput[i]='ι';
      else if(omicron.includes(input[i])) correctedInput[i]='ο';
      else if(ypsilon.includes(input[i])) correctedInput[i]='υ';
      else if(omega.includes(input[i])) correctedInput[i]='ω';
      else correctedInput[i] = input[i].toLowerCase();
   }
   return correctedInput.join('');
}

function correctLemma(lemma){
   var correctedLemma=[];
   for(i=0; i<lemma.length; i++){  
      if(alpha.includes(lemma[i])) correctedLemma[i]='α';
      else if(epsilon.includes(lemma[i])) correctedLemma[i]='ε';
      else if(hta.includes(lemma[i])) correctedLemma[i]='η';
      else if(iota.includes(lemma[i])) correctedLemma[i]='ι';
      else if(omicron.includes(lemma[i])) correctedLemma[i]='ο';
      else if(ypsilon.includes(lemma[i])) correctedLemma[i]='υ';
      else if(omega.includes(lemma[i])) correctedLemma[i]='ω';
      else correctedLemma[i] = lemma[i].toLowerCase();
   }
   return correctedLemma.join('');
}

var alpha = [ 'ἀ','ἁ','ἄ','ἅ','ἆ','ἇ','ᾶ','ὰ','Ἀ','Ἁ','Ἄ','Ἆ','Ἇ','ἂ','ἃ','Ἂ','Ἃ','Ἅ','ᾼ',
'ᾀ','ᾲ','ᾈ','ᾳ','ᾌ','ᾄ','ᾌ','ᾄ','ᾊ','ᾀ','ᾷ','ᾲ','ᾍ','ᾅ','ᾆ','ᾎ','Ἄ','ᾂ','ᾏ','ᾈ','ᾈ','Ά','ά'];
var epsilon = ['ἔ','ἕ','ἑ','ἐ','Ἐ','Ἑ','Ἔ','Ἕ','ἓ','ὲ','Ε','Έ','έ'];
var hta = [,'ἢ','ἤ','ἥ','ἧ','ἦ','ἡ','ἠ','Ἠ','Ἡ','Ἢ','Ἣ','Ἤ','Ἥ','Ἦ','Ἧ','ᾒ','ᾖ','ᾗ',
'ῆ','ῃ','ᾐ','ᾐ','ῄ','ᾖ','ἦ','ᾑ','ῂ','ῆ','ὴ','ῇ','ῠ','ᾘ','ᾙ','ᾚ','ᾛ','ᾞ','ᾟ','ᾙ','ή','Ή'];
var iota = ['ἰ','ἱ','ἴ','ἵ','ἶ','ἷ','ῖ','Ἰ','Ἱ','Ἴ','Ἵ','Ἶ','Ἷ','ὶ','ϊ','ΐ','ῒ','ί','Ί'];
var omicron = ['ὀ','ὁ','ὅ','ὄ','Ὀ','Ὁ','Ὂ','Ὃ','Ὄ','Ὅ','ὂ','ὃ','ὸ','ό','Ό'];
var ypsilon = ['ὑ','ὐ','ὒ','ὔ','ὕ','ὓ','ὖ','ὗ','ῦ','ῢ','ΰ','ὺ','Ὑ','Ὓ','Ὗ','Ὕ','Υ','Ύ','ύ'];
var omega = ['ὠ','ὡ','ὢ','ὣ','ὤ','ὥ','ὦ','ὧ','ᾧ','ᾦ','ᾠ','ᾢ','Ὠ','Ὡ','Ὢ',
'Ὣ','Ὤ','Ὥ','Ὦ','Ὧ','ᾨ','ᾩ','ῳ','ῴ','ώ','ᾥ','ὼ','ῶ','ῷ','ῤ','ῥ','Ῥ','ῤ','ῥ'];

function checkLemmaEquality(input,lemma){
   var correctedLemma = correctLemma(lemma);
   if(correctedLemma==input){
      return true;
   }
}

function startsWith(){
   var input = document.getElementById("filterBy").value;
   //choose between new and old testament
   if(window.location.href.includes("new-testament")){
      if (input=="search"){
         document.getElementById("strongLemma").innerHTML = "";
         return;
      }
      else if (input=="all"){
         displayLoader();
         jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemma/all.html");
         return;
      }
      else{
         jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemma/"+input+'.html');
      }
   }
   else if(window.location.href.includes("old-testament")){
      if (input=="search"){
         document.getElementById("strongLemma").innerHTML = "";
         return;
      }
      else if (input=="all"){
         displayLoader();
         jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemmaOld/all.html");
         return;
      }
      else{
         jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemmaOld/"+input+'.html');
      }
   }
   
}

//click on a specific lemma 
jQuery(document).on("click","#strongLemma tr", function(e){
   var G = this.innerHTML.split("</font>")[0].split('font size="4">')[1];
   jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+G+'.html',
   function(data,textStatus) {
      if (textStatus == "error") {
         alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
         return;
      };
      history.pushState({}, null, `?${G}`);
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(data, 'text/html');
      lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
      jQuery("#strongNum").val(G);
      jQuery("#lemma").val(lemma);


      //res = data.split("<p");
      //lemma = res[2].substring(res[2].indexOf("<b>"),res[2].length);
      //lemma = lemma.substring(3,lemma.indexOf("</b>"));
      //jQuery("#strongNum").val(G);
      //jQuery("#lemma").val(lemma);
   });
});

//loader
function displayLoader(){
   var loader = document.getElementById("addLoader");
   loader.setAttribute( 'class', 'loader' );
   setTimeout(function() { loader.removeAttribute( 'class', 'loader' ); }, 4000);
}

function popupOn() {
   document.getElementById("overlay").style.display = "block";
   if (window.location.href.includes("new-testament")){
      jQuery("#text").load("/wp-content/themes/astra/update_new.html");
   }
   else if(window.location.href.includes("old-testament")){
      jQuery("#text").load("/wp-content/themes/astra/update_old.html");
   }
   else if(window.location.href.includes("tables")){
      jQuery("#text").load("/wp-content/themes/astra/update_new_old.html");
   } 
   else if(window.location.href.includes("bible")){
      jQuery("#text").load("/wp-content/themes/astra/update_bible.html");
   }
 }
 
 function popupOff() {
   document.getElementById("overlay").style.display = "none";
 }