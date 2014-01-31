var ogreCompany = {
	ogreCounter : 0,

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

			newOgre.appendChild(newElm('br'));
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

		//Give us the new Ogre's ID, and increment our counter
		var ogreId = 'ogre_'+this.ogreCounter++;

		//Create the new Ogre's main div
		var newOgre = newElm('div');
		newOgre.id = ogreId;
		newOgre.setAttribute('class', 'ogre');

		//Give ourselves a label to identify the Ogre's type
		var ogreLabel = newElm('span');
		ogreLabel.id = ogreId+'_label';
		ogreLabel.appendChild(textNode(ogreTypes[type].name));
		newOgre.appendChild(ogreLabel);

		//Give the player the ability to name their Ogre
		var ogreName = newElm('input');
		ogreName.id = ogreId+'_name';
		ogreName.setAttribute('type', 'text');
		ogreName.value = ogreTypes[type].name;
		newOgre.appendChild(ogreName);

		//Iterate through the Ogre's guns and give us stats for each
		for(var weapType in ogreTypes[type].armament)
		{
			var weap = ogreTypes[type].armament[weapType];

			var weapDiv = newElm('div');
			weapDiv.id = ogreId+'_'+weapType+'_div';

			//Label for the weapon's name
			weapDiv.appendChild(this._makeWeapLabel(ogreId+'_'+weapType+'_name', weap.stats.name));
			//Make labels for Atk, Rng, and Def
			weapDiv.appendChild(this._makeWeapLabel(ogreId+'_'+weapType+'_atk', 'Atk: '+weap.stats.atk));
			weapDiv.appendChild(this._makeWeapLabel(ogreId+'_'+weapType+'_rng', 'Rng: '+weap.stats.rng));
			weapDiv.appendChild(this._makeWeapLabel(ogreId+'_'+weapType+'_def', 'Def: '+weap.stats.def));

			newOgre.appendChild(weapDiv);
		}

		document.body.appendChild(newOgre);
	},

	_makeWeapLabel : function(id, val) {
		var weapLabel = newElm('span');
		weapLabel.id = id;
		weapLabel.setAttribute('class', 'ogreWeaponAttribute');
		weapLabel.appendChild(textNode(val));

		return weapLabel;
	}
}

