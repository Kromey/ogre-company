var ogreCompany = {
	ogreCounter : 0,
	ogreContainer : null,

	init : function(panelContainer, ogreContainer) {
		var newOgre = newElm('div');
		newOgre.id = 'newOgreDiv';
		newOgre.appendChild(textNode("Choose an Ogre:"));

		for(var type in ogreTypes)
		{
			newOgre.appendChild(newElm('br'));
			newOgre.appendChild(this.makeNewOgreButton(type));
		}

		getId(panelContainer).appendChild(newOgre);

		this.ogreContainer = getId(ogreContainer);
	},

	makeNewOgreButton : function(ogreType) {
			var ogreStats = ogreTypes[ogreType];
			var newOgreType = newElm('button');
			newOgreType.id = 'new_'+ogreType;
			newOgreType.value = ogreType;
			newOgreType.appendChild(textNode(ogreStats.name));
			//newOgreType.onclick = function(){ogreCompany.addOgre(this.value);};
			newOgreType.onclick = function(){new ogre(ogreStats);};

			return newOgreType;
	},

	addOgre : function(ogreStats) {
		//Give us the new Ogre's ID, and increment our counter
		var ogreId = 'ogre_'+this.ogreCounter++;

		//Create the new Ogre's main div
		var newOgre = newElm('div');
		newOgre.id = ogreId;
		newOgre.setAttribute('class', 'ogre');

		//Ogre Close button
		var delOgre = newElm('div');
		delOgre.setAttribute('class', 'ogreDel');
		delOgre.appendChild(textNode('X'));
		delOgre.onclick = function(){destroyNode(this.parentNode);};
		newOgre.appendChild(delOgre);

		//Give the player the ability to name their Ogre
		var ogreName = newElm('input');
		ogreName.id = ogreId+'_name';
		ogreName.setAttribute('type', 'text');
		ogreName.setAttribute('class', 'ogreName');
		ogreName.onfocus = function(){this.select();}; //Select text when focused
		ogreName.onmouseup = function(){return false;}; //Prevent the click deselecting the text
		ogreName.value = ogreStats.name;
		newOgre.appendChild(ogreName);

		//Ogre cost and size
		newOgre.appendChild(this._makeLabel(ogreId, ogreStats.cost+' AU; Size '+ogreStats.size, 'ogreAttributeLabel'));

		//Give ourselves a label to identify the Ogre's type
		newOgre.appendChild(this._makeLabel(ogreId+'_label', ogreStats.name, 'ogreTypeLabel'));

		//Iterate through the Ogre's guns and give us stats for each
		for(var weapType in ogreStats.armament)
		{
			var weap = ogreStats.armament[weapType];

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
		newOgre.appendChild(this._makeTreadBoxes(ogreId, ogreStats.movement));

		//Special rules, if any
		if(null !== ogreStats.special && undefined !== ogreStats.special)
		{
			newOgre.appendChild(this._makeLabel(ogreId, ogreStats.special, 'ogreSpecialRules'));
		}

		getId('ogreContainer').appendChild(newOgre);

		return ogreId;
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
			box.id = container.id+'_'+i;
			box.setAttribute('type', 'checkbox');
			box.setAttribute('class', 'ogreWeaponBox');
			box.onclick = function(){ogreCompany._boxClicked(this);};
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

		for(var i = 0; i < treads; i++)
		{
			if(0 == i%treadInc)
			{
				//We've reached the threshold of a tread increment, adjust speed
				var speedContainer = newElm('div');
				speedContainer.setAttribute('class', 'ogreSpeedContainer');
				speed--;
				speedContainer.appendChild(this._makeLabel(ogreId+'_speed_'+speed, speed, 'ogreSpeedLabel'));
				treadContainer.appendChild(speedContainer);
			}
			//Need to group by 5s, but also reset with each treadInc
			if(0 == i%treadInc || subContainer.children.length >= 5)
			{
				var subContainer = newElm('div');
				subContainer.setAttribute('class', 'ogreTreadSubContainer');
				speedContainer.appendChild(subContainer);
			}
			var box = newElm('input');
			box.id = treadContainer.id+'_'+i;
			box.setAttribute('type', 'checkbox');
			box.setAttribute('class', 'ogreTreadBox');
			box.onclick = function(){ogreCompany._boxClicked(this);};
			subContainer.appendChild(box);
		}

		return treadContainer;
	},

	_boxClicked : function(obj) {
		//Find out if we're checking or unchecking this box
		var checking = obj.checked;
		//Now undo it -- don't worry, we'll check/uncheck the appropriate box later
		obj.checked = !obj.checked;

		var objParent = obj.parentNode;
		var containerId = null;
		while(!(containerId = objParent.id) || !getId(containerId+'_0') || 'checkbox' != getId(containerId+'_0').getAttribute('type'))
		{
			objParent = objParent.parentNode;
		}
		var i = 0;
		var id = null;
		while(true)
		{
			id = containerId+'_'+i;
			if(getId(id).checked)
			{
				i++;
			} else {
				break;
			}
		}

		if(!checking)
		{
			i--;
			id = containerId+'_'+i;
		}

		if(getId(id))
		{
			getId(id).checked = checking;
		}

		//Now we return the number of boxes that are checked
		return (i+(checking?1:0));
	},

	_adjustSpeed : function(boxObj, treadsDestroyed) {
	}
}

function ogre(ogreData)
{
	this.baseStats = ogreData;
	this.id = ogreCompany.addOgre(ogreData);

	console.log("Created new Ogre "+this.baseStats.name+" with id "+this.id);
}

