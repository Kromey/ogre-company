var ogreCompany = {
	init : function() {
		var newOgre = newElm('div');
		newOgre.id = 'newOgreDiv';
		newOgre.appendChild(textNode("Choose an Ogre:"));

		for(var type in ogreTypes)
		{
			var newOgreType = newElm('button');
			newOgreType.id = 'new_'+type;
			newOgreType.value = type;
			newOgreType.appendChild(textNode(ogreTypes[type].name));

			newOgre.appendChild(newOgreType);
		}

		document.body.appendChild(newOgre);
	}
}

