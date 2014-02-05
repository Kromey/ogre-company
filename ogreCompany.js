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
		newOgre.appendChild(this._makeLabel(ogreId+'_label', ogreTypes[type].name, 'ogreTypeLabel'));

		//Give the player the ability to name their Ogre
		var ogreName = newElm('input');
		ogreName.id = ogreId+'_name';
		ogreName.setAttribute('type', 'text');
		ogreName.setAttribute('class', 'ogreName');
		ogreName.value = ogreTypes[type].name;
		newOgre.appendChild(ogreName);

		//Iterate through the Ogre's guns and give us stats for each
		for(var weapType in ogreTypes[type].armament)
		{
			var weap = ogreTypes[type].armament[weapType];

			var weapDiv = newElm('div');
			weapDiv.id = ogreId+'_'+weapType+'_div';

			//Label for the weapon's name
			weapDiv.appendChild(this._makeWeapLabel(ogreId, weapType, 'name', weap.stats.name));
			//Make labels for Atk, Rng, and Def
			if(null !== weap.stats.atk && undefined !== weap.stats.atk)
			{
				weapDiv.appendChild(this._makeWeapAttrLabel(ogreId, weapType, 'atk', 'Atk: '+weap.stats.atk));
			}
			if(null !== weap.stats.rng && undefined !== weap.stats.rng)
			{
				weapDiv.appendChild(this._makeWeapAttrLabel(ogreId, weapType, 'rng', 'Rng: '+weap.stats.rng));
			}
			if(null !== weap.stats.def && undefined !== weap.stats.def)
			{
				weapDiv.appendChild(this._makeWeapAttrLabel(ogreId, weapType, 'def', 'Def: '+weap.stats.def));
			}

			//Now make checkboxes for each gun
			weapDiv.appendChild(this._makeWeapBoxes(ogreId, weapType, weap.count));

			newOgre.appendChild(weapDiv);
		}

		//Tread boxes
		newOgre.appendChild(this._makeTreadBoxes(ogreId, ogreTypes[type].movement));

		//Special rules, if any
		if(null !== ogreTypes[type].special && undefined !== ogreTypes[type].special)
		{
			newOgre.appendChild(this._makeLabel(ogreId, ogreTypes[type].special, 'ogreSpecialRules'));
		}

		document.body.appendChild(newOgre);
	},

	_makeLabel : function(id, val, style) {
		var label = newElm('span');
		label.id = id
		label.setAttribute('class', style);
		label.appendChild(textNode(val));

		return label;
	},

	_makeWeapLabel : function(ogreId, weapType, label, val) {
		var id = ogreId+'_'+weapType+'_'+label;
		return this._makeLabel(id, val, 'ogreWeaponLabel');
	},

	_makeWeapAttrLabel : function(ogreId, weapType, label, val) {
		var id = ogreId+'_'+weapType+'_'+label;
		return this._makeLabel(id, val, 'ogreWeaponAttributeLabel');
	},

	_makeWeapBoxes : function(ogreId, weapType, count) {
		var container = newElm('div');
		container.id = ogreId+'_'+weapType+'_count';

		var subContainer;

		for(var i = 0; i < count; i++)
		{
			if(0 == i%5)
			{
				subContainer = newElm('div');
				subContainer.setAttribute('class', 'ogreWeaponBoxSubContainer');
				container.appendChild(subContainer);
			}
			var box = newElm('input');
			box.setAttribute('type', 'checkbox');
			box.setAttribute('class', 'ogreWeaponBox');
			box.id = container.id+'_'+i;
			subContainer.appendChild(box);
		}

		return container;
	},

	_makeTreadBoxes : function(ogreId, movement) {
		var speed = movement.base;
		var treads = movement.tread;

		var treadInc = treads / speed;

		var treadContainer = newElm('div');
		treadContainer.id = ogreId+'_treads';
		treadContainer.appendChild(this._makeLabel(ogreId+'_treads_label', treads+' Tread Units', 'ogreTreadsLabel'));
		treadContainer.appendChild(this._makeLabel(ogreId+'_treads_base', 'Move starts at '+speed, 'ogreBaseSpeedLabel'));
		var subContainer;

		for(var i = speed; i > 0; i--)
		{
			var speedContainer = newElm('div');
			speedContainer.setAttribute('class', 'ogreSpeedContainer');
			for(var j = 0; j < treadInc; j++)
			{
				if(0 == j%5)
				{
					subContainer = newElm('div');
					subContainer.setAttribute('class', 'ogreTreadSubContainer');
					speedContainer.appendChild(subContainer);
				}
				var box = newElm('input');
				box.setAttribute('type', 'checkbox');
				box.setAttribute('class', 'ogreTreadBox');
				box.id = treadContainer.id+'_'+j;
				subContainer.appendChild(box);
			}
			speedContainer.appendChild(this._makeLabel(ogreId+'_treads_'+i, i-1, 'ogreSpeedLabel'));
			treadContainer.appendChild(speedContainer);
		}

		return treadContainer;
	}
}

