function isOperand(who)
	{
		return((!isOperator(who) && (who!="(") && (who!=")"))? true : false);
	}
	
function isOperator(who)
	{
		return((who=="+" || who=="-" || who=="*" || who=="/" || who=="^")? true : false);
	}
//lvl_check tingkatan
function lvl_check(who){
		if(who=="^")
			return(5);
		if((who=="*")||(who=="/"))
			return(4);
		if((who=="+")||(who=="-"))
			return(3);
		if(who=="(")
			return(2);
		if(who==")")
			return(1);
	}   
function main() {
    var str = document.getElementById("infixVal").value;
    var strArray = str.split(""); //convert to array
//array stack dan hasil
    var stack =[];
    var hasil =[];
    var cetakArr=[];
    var tblArr=[];
    var pop_ele=[];
    var pop_all= [];//pop semua stack akhir ke tabel-container
//cetak ke html
    var cetak=document.getElementById("stack");
    var cetaktbl = document.getElementById("tabel-container");
//-----------------------------------
if(strArray==""){
    $(".secondary").hide();
    $(".warning").addClass('animated shake delay-05 duration-05');
    $("#warn-null").show();
    $(".warning").show();
    
}
else{
    for(var i=0; i < strArray.length; i++){
       if(isOperand(strArray[i])){
           hasil.push(strArray[i]);
           pop_ele[i]=strArray[i];//PUSH hasil dengan length infix
     }
       
        if(isOperator(strArray[i])){
            while(lvl_check(strArray[i])<=lvl_check(stack[stack.length-1])){ //membandingkan operator
                pop_ele[i]+=stack[stack.length-1];
                hasil.push(stack.pop());
            }
                stack.push(strArray[i]);
        }   
       if(strArray[i]=="("){
            stack.push(strArray[i]);
        }
//pop semua array sampai "("
        if(strArray[i]==")"){
            while(stack[stack.length-1]!="("){
                pop_ele[i]+=stack[stack.length-1];
                hasil.push(stack.pop());
                if(stack[stack.length-1]==stack[-1]){
                    $(".secondary").hide();
                    $(".warning").addClass('animated shake delay-05 duration-05');
                    $(".warn-err").show();
                    $(".warning").show();
                    break;}//handling loop
            }
                if(pop_ele[i]==undefined)pop_ele[i]="";//menghilangkan undefined
                stack.pop();
        }
        //simpan stack untuk tabel-container
        for(var j=stack.length-1;j>=0;j--){
        tblArr+=stack[j]+"<br/>";
        } 
        tblArr+=",";
    }
//^kodingan stack^
//menghilangkan undifined untuk stack pada tabel-container (array --> string --> array)
    var pstack=tblArr.toString();
    var hstack=pstack.split(",");
// hasil stack dengan length infix (array --> string -->array(delete(,undefined)) --> string --> array)
    var ppop_ele=pop_ele.toString();
    var hpop_ele=ppop_ele.split(",undefined");  
    var ppop_ele1=hpop_ele.toString();
    var hpop_ele1=ppop_ele1.split(",");    
//push semua stack ke hasil
        if(strArray[i]==strArray[strArray.length]){
            for(var y=stack.length-1;y>=0;y--){
                pop_all+=stack[y]; //push semua stack ke tabel-container akhir 
                hasil.push(stack[y]);
                stack.pop();
            }
        }
//---------------tabel-container-------------    
    var result = '<div class="table-responsive"><table class="table">';
    for(var a=0; a< 3; a++) {
        result += "<tr>";
        for(var b=0; b<hstack.length; b++){
            if(a==0){ //cetak infix 
                if(b==hstack.length-1)result += "<td>"+";"+"</td>";//jika for tabel-container=length infix, maka ditambahkan nilai ";" 
                    else
                        result += "<td>"+strArray[b]+"</td>";    
            }
            else if(a==1){ //cetak stack
                result += "<td style=vertical-align:bottom;>"+hstack[b]+"</td>";}
            else { //cetak hasil
                if(b==hstack.length-1)result += "<td>"+pop_all+"</td>"; 
                    else result += "<td>"+hpop_ele1[b]+"</td>";}
        }
        result += "</tr>";
    }
    result += "</table>";
//-------------------------------   
    //cetak hasil
    for(var x=0; x < hasil.length;x++){
         cetakArr+=hasil[x]; 
        if(hasil[x]=="("){
            $(".secondary").hide();
            $(".warning").addClass('animated shake delay-05 duration-05');
            $(".warn-err").show();
            $(".warning").show();
            
        }
        }
    cetak.innerHTML=cetakArr;
    cetaktbl.innerHTML=result;
}// else strarray =""
}