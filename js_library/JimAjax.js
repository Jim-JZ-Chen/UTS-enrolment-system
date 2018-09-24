function JimAjax()
{
	this.inst = null;
	this.received = false;

	if(window.XMLHttpRequest)
	{
		this.inst = new XMLHttpRequest();
	}
	else if(window.ActiveXObject)
	{
		try
		{
			this.inst = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(e1)
		{

			try
			{
				this.inst = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e2)
			{

			}
		}
	}
	this.inst.parent = this;
	
	if(!this.inst)
	{
		alert("Ajax is NOT available");
	}
	else
	{
		//document.write("<p>Ajax made</p>");
	}

	this.get = function(filePath, act)
	{
		//document.write("<br/>filePath: " + filePath);
		console.log("this.inst.responseXML1");
		this.inst.onreadystatechange = function()
		{console.log("this.inst.responseXML2");
			if(this.readyState == 4)
			{console.log("this.inst.responseXML3");
				//if(this.status == 200)
				{
					this.parent.received = true;
					console.log("this.inst.responseXML4");
					act();
				}
			}
		}

		this.inst.open('GET', filePath, true);
		this.inst.send(null);
		this.received = false;
	}


	this.getResponseArray = function()
	{
		return xmlToArray(this.inst.responseXML.documentElement);
	}

	this.getJson = function()
	{
		return JSON.parse(this.inst.responseText);
	}

	this.getObject = function()
	{
		return object = new DOMParser().parseFromString(this.inst.responseText,"text/xml");;
	}
	
}



function xmlToArray(node)
{
	var arr = new Array();

	for(var i = 0; i < node.childNodes.length; i++)
	{
		if(node.childNodes[i].nodeType == 1)
		{
			arr.push(xmlToArray(node.childNodes[i]));
		}
		else if(node.childNodes[i].nodeType == 3 && node.childNodes.length<=1)
		{
			arr.push(node.childNodes[i].nodeValue);
		}
	}
	return arr;
}





