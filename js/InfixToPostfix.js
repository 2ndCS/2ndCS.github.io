function push_stack(stackArr,ele)
	{
		stackArr[stackArr.length]=ele;
	}

function pop_stack(stackArr)
	{
		var _temp=stackArr[stackArr.length-1];
		delete stackArr[stackArr.length-1];
		stackArr.length--;
		return(_temp);
	}

function isOperand(who)
	{
		return((!isOperator(who) && (who!="(") && (who!=")"))? true : false);
	}
	
function isOperator(who)
	{
		return((who=="+" || who=="-" || who=="*" || who=="/" || who=="^")? true : false);
	}

function topStack(stackArr)
	{
		return(stackArr[stackArr.length-1]);
	}

function isEmpty(stackArr)
	{
		return((stackArr.length==0)? true : false);
	}

/* Check for Precedence */
function prcd(who)
	{
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

function InfixToPostfix(infixStr,postfixStr,retType)
{
	var postfixStr=new Array();
	var stackArr=new Array();
	var postfixPtr=0;
	infixStr=strToTokens(infixStr);
	for(var i=0; i<infixStr.length; i++)
	{
		if(isOperand(infixStr[i]))
		{
			postfixStr[postfixPtr]=infixStr[i];
			postfixPtr++;
		}
		if(isOperator(infixStr[i]))
		{
			if(infixStr[i]!="^")
			{
				while((!isEmpty(stackArr)) && (prcd(infixStr[i])<=prcd(topStack(stackArr))))
				{
					postfixStr[postfixPtr]=topStack(stackArr);
					pop_stack(stackArr);
					postfixPtr++;
				}
			}
			else
			{
				while((!isEmpty(stackArr)) && (prcd(infixStr[i])<prcd(topStack(stackArr))))
				{
					postfixStr[postfixPtr]=topStack(stackArr);
					pop_stack(stackArr);
					postfixPtr++;
				}
			}
			push_stack(stackArr,infixStr[i]);
		}
		if(infixStr[i]=="(")
			push_stack(stackArr,infixStr[i]);
		if(infixStr[i]==")")
		{
			while(topStack(stackArr)!="(")
			{
				postfixStr[postfixPtr]=pop_stack(stackArr);
				postfixPtr++;
			}
			pop_stack(stackArr);
		}
	}
	while(!isEmpty(stackArr))
	{
		if(topStack(stackArr)=="(")
			pop_stack(stackArr)
		else
			postfixStr[postfixStr.length]=pop_stack(stackArr);
	}
	var returnVal='';
	for(var i=0; i<postfixStr.length; i++)
	{
		returnVal+=postfixStr[i];
	}
	if(retType==0)
		return(returnVal);
	else
		return(postfixStr);
}


function strToTokens(str)
{
	var strArr=str.split("");
	var tempStr=new String("");	
	var tokens=new Array();
	var tokens_index=0;
	for(var i=0; i<strArr.length; i++)
	{
		if(isOperand(strArr[i]))
		{
			tempStr+=strArr[i];
		}
		if(isOperator(strArr[i]) || strArr[i]==")" || strArr[i]=="(")
		{
			if(tempStr!="")
			{
				tokens[tokens_index]=tempStr;
				tokens_index++;
			}
			tempStr="";
			tokens[tokens_index]=strArr[i];
			tokens_index++;
		}
		if(i==strArr.length-1)
			if(tempStr!="")
				tokens[tokens_index]=tempStr;
	}
	return(tokens);
}