var ogreCompany = {
	init : function() {
		var newOgre = document.createElement('div');
		newOgre.id = 'newOgreDiv';
		newOgre.appendChild(document.createTextNode("Choose an Ogre:"));

		for(var type in ogreTypes)
		{
			var newOgreType = document.createElement('button');
			newOgreType.id = 'new_'+type;
			newOgreType.value = type;
			newOgreType.appendChild(document.createTextNode(ogreTypes[type].name));

			newOgre.appendChild(newOgreType);
		}

		document.body.appendChild(newOgre);
	}
}

var ogreArmaments = {
	"mb":{
		"name":"Main Battery",
		"attack":4,
		"range":3,
		"defense":4
	},
	"sb":{
		"name":"Secondary Battery",
		"attack":3,
		"range":2,
		"defense":3
	},
	"msl":{
		"name":"Missiles",
		"attack":6,
		"range":5,
		"defense":3
	},
	"ap":{
		"name":"Antipersonnel",
		"attack":1,
		"range":1,
		"defense":1
	}
}

var ogreTypes =
{
	"mkiii":{
		"name":"Mark III",
		"cost":17,
		"size":7,
		"movement":{
			"base":3,
			"tread":45
		},
		"armament":{
			"mb":{
				"type":ogreArmaments.mb,
				"count":1
			},
			"sb":{
				"type":ogreArmaments.sb,
				"count":4
			},
			"msl":{
				"type":ogreArmaments.msl,
				"count":2
			},
			"ap":{
				"type":ogreArmaments.msl,
				"count":8
			}
		}
	},
	"mkv":{
		"name":"Mark V",
		"cost":25,
		"size":8,
		"movement":{
			"base":3,
			"tread":60
		},
		"armament":{
			"mb":{
				"type":ogreArmaments.mb,
				"count":2
			},
			"sb":{
				"type":ogreArmaments.sb,
				"count":6
			},
			"msl":{
				"type":ogreArmaments.msl,
				"count":6
			},
			"ap":{
				"type":ogreArmaments.msl,
				"count":12
			}
		}
	}
}

