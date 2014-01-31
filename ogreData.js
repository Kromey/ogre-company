var ogreArmaments = {
	"mb":{
		"name":"Main Battery",
		"atk":4,
		"rng":3,
		"def":4
	},
	"sb":{
		"name":"Secondary Battery",
		"atk":3,
		"rng":2,
		"def":3
	},
	"msl":{
		"name":"Missiles",
		"atk":6,
		"rng":5,
		"def":3
	},
	"ap":{
		"name":"Antipersonnel",
		"atk":1,
		"rng":1,
		"def":1
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
				"stats":ogreArmaments.mb,
				"count":1
			},
			"sb":{
				"stats":ogreArmaments.sb,
				"count":4
			},
			"msl":{
				"stats":ogreArmaments.msl,
				"count":2
			},
			"ap":{
				"stats":ogreArmaments.ap,
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
				"stats":ogreArmaments.mb,
				"count":2
			},
			"sb":{
				"stats":ogreArmaments.sb,
				"count":6
			},
			"msl":{
				"stats":ogreArmaments.msl,
				"count":6
			},
			"ap":{
				"stats":ogreArmaments.ap,
				"count":12
			}
		}
	}
}

