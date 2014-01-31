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
			newOgreType.onclick = function(){ogreCompany.addOgre(this.value);};

			newOgre.appendChild(newOgreType);
		}

		document.body.appendChild(newOgre);
	},

	addOgre : function(type) {
		if(ogreTypes[type] == undefined)
		{
			console.log("Unknown Ogre type: "+type);
			return false;
		}

		alert('Making new Ogre '+ogreTypes[type].name);
	}
}

