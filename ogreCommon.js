function newElm(type)
{
	return document.createElement(type);
}

function textNode(msg)
{
	return document.createTextNode(msg);
}

function getId(id)
{
	return document.getElementById(id);
}

function destroyNode(nodeRef)
{
	if(typeof nodeRef == 'object')
	{
		var node = nodeRef;
	} else {
		var node = getId(nodeRef);
	}
	
	if(node && node.parentNode)
	{
		node.parentNode.removeChild(node);
	}
}
