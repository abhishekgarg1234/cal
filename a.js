
var cc=function(){

expr.addEventListener("keyup",function(){if (event.keyCode == 13){
                        					cal();}
						     else{
						     		checkkey();}});
one.addEventListener("click",function(){display(1);});
two.addEventListener("click",function(){display(2);});
three.addEventListener("click",function(){display(3);});
four.addEventListener("click",function(){display(4);});
five.addEventListener("click",function(){display(5);});
six.addEventListener("click",function(){display(6);});
seven.addEventListener("click",function(){display(7);});
eight.addEventListener("click",function(){display(8);});
nine.addEventListener("click",function(){display(9);});
zero.addEventListener("click",function(){display(0);});
mul.addEventListener("click",function(){display2("*");});
div.addEventListener("click",function(){display2("/");});
plus.addEventListener("click",function(){display2("+");});
minus.addEventListener("click",function(){display2("-");});
openb.addEventListener("click",function(){display2("(");});
closeb.addEventListener("click",function(){display2(")");});
equal.addEventListener("click",function(){cal();});
clear.addEventListener("click",function(){display2("cl");});
backspace.addEventListener("click",function(){display2("bk");});
dot.addEventListener("click",function(){display2(".");});
power.addEventListener("click",function(){display2("^");});
//function to concatenate numbers
function display(xxx){
	var x = document.getElementById("expr");
	x.value=x.value.concat(xxx.toString());
	document.getElementById("expr").focus();
}

function display2(xxx){
var x = document.getElementById("expr");

switch(xxx){
	case "cl":
		x.value=null;
		break;
	case "bk":
		x.value = x.value.substring(0, x.value.length - 1);
		break;
	default:
		x.value=x.value.concat(xxx);
	}

	document.getElementById("expr").focus();
}





//function to calculate the result
function cal(){
var x=document.getElementById("expr");
var sp=x.value.split("");   //splitting the string
var len=x.value.length;
var arr=[];
var tt=0;var j=0;var spi=0;
if(sp[spi]=='.'){
	if(isNaN(sp[spi+1]))
	{spi++;}
	else{
	arr[j]=sp[spi].toString()+sp[spi+1].toString();
	spi=spi+2;}
}
else{
arr[j]=sp[spi];spi++;
}
//concatinating after splitting
do{
		if(!isNaN(sp[spi])){          //if element is a number
			if(isNaN(sp[spi-1])){    //if previous element not a number
				j++;
				arr[j]=sp[spi];
			}
			else{	
				arr[j]=arr[j].toString()+sp[spi].toString();
			}
		}
		else if(sp[spi]=="."){     ///if element is a dot
				if(isNaN(sp[spi-1])){
				j++;
				arr[j]=sp[spi].toString()+sp[spi+1].toString();
				spi++;
				}
				else if(isNaN(sp[spi+1])){
		
				}
				else{
		
				arr[j]=arr[j].toString()+sp[spi].toString()+sp[spi+1].toString();
				spi++;
				}
		}
		else{		//if element not a number
			j++;
			arr[j]=sp[spi];
		}
	spi++;
}
while(spi<len);
var final=[];
final=infixtopostfix(arr);
x.value=x.value=postfix(final);
}


//function to check whether the key presses is valid or not
function checkkey(e) {
	var x = document.getElementById("expr");
	var res=x.value.split("");
	var t=res[res.length-1];
	if(t<='9' && t>='0'){
	}
	else if(t=='*' || t=='/' || t=='+' ||t=='-' || t=='(' || t==')' || t=='.' || t=='^'){
	}
	else{
	x.value = x.value.substring(0, x.value.length - 1);
	}
}


// infix to postfix conversion
function infixtopostfix(arr){
var operator=[];var final=[];
var aa=arr.length;
for(var i=0;i<aa;i++){
	if(!isNaN(arr[i])){   //if number then directly push to array final
		final.push(arr[i]);
	}
	else{
		if(arr[i]=='('){
			operator.push(arr[i]);
			if(arr[i+1]=='-'){
			i++;
			final.push(parseFloat(arr[i]+arr[i+1]));
			i++;
			}
		}
		else if(arr[i]==')'){	
			var tt=operator.pop();
			while(tt!='(' && tt!=null){
			final.push(tt);
			tt=operator.pop();
			}
		}
		else{
			if(operator.length <1){
						operator.push(arr[i]);
					      }
			else{
				while(prio(arr[i]) < prio(operator[operator.length-1])){
					final.push(operator.pop());
					}
				operator.push(arr[i]);
			    }		
		}
	}
}
while(operator.length>0)
{
final.push(operator.pop());
}
return final;
}
//setting the priority of operators
function prio(a){
	if(a=='(')
	return 0;
	else if(a=='+' || a=='-')
	return 1;
	else if(a=='*' || a== '/')
	return 2;
	else if(a=='^')
	return 3;
}



//postfix evaluation
function postfix(final){

var i=0;var ll=final.length-1;var stack=[];
while(i <= ll){
	if(!isNaN(final[i])){
		stack.push(parseFloat(final[i]));
		}
	else{
	switch(final[i]){
	case '+':

		var ax1=parseFloat(stack.pop());
		var ax2=parseFloat(stack.pop());
		var ax=parseFloat(ax1)+parseFloat(ax2);
		stack.push(parseFloat(ax));
		break;
	case '-':
		var ax1=stack.pop();
		var ax2=stack.pop();
		var ax=ax2-ax1;
		stack.push(ax);
		break;
	case '*':
		var ax1=stack.pop();
		var ax2=stack.pop();
		var ax=ax2*ax1;
		stack.push(ax);
		break;
	case '/':
		var ax1=stack.pop();
		var ax2=stack.pop();
		var ax=ax2/ax1;
		stack.push(ax);
		break;
	case '^':
		var ax1=stack.pop();
		var ax2=stack.pop();
		ax=Math.pow(ax2,ax1);
		stack.push(ax);
		break;
	}}
i++;
}
return stack.pop();
}
}


var tt=new cc();









