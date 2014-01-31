var ogreOdds = {
	init : function(target) {
		var attack = document.createElement('input');
		attack.id = target+'_atk';
		attack.setAttribute('type', 'text');
		attack.onchange = function(){ogreOdds.calculateOdds(target);};
		attack.onfocus = function(){this.select();};
		attack.onmouseup = function(){return false;};

		var defense = document.createElement('input');
		defense.id = target+'_def';
		defense.setAttribute('type', 'text');
		defense.onchange = function(){ogreOdds.calculateOdds(target);};
		defense.onfocus = function(){this.select();};
		defense.onmouseup = function(){return false;};

		var odds = document.createElement('input');
		odds.id = target+'_odds';
		odds.setAttribute('type', 'text');
		odds.onfocus = function(){this.blur();attack.focus();};

		var obj = document.getElementById(target);
		obj.appendChild(document.createTextNode('Attack: '));
		obj.appendChild(attack);
		obj.appendChild(document.createElement('br'));
		obj.appendChild(document.createTextNode('Defense: '));
		obj.appendChild(defense);
		obj.appendChild(document.createElement('br'));
		obj.appendChild(document.createTextNode('Odds: '));
		obj.appendChild(odds);
	},

	calculateOdds : function(target) {
		var atk = document.getElementById(target+'_atk').value;
		var def = document.getElementById(target+'_def').value;

		if(atk > 0 && def > 0)
		{
			var odds = Math.floor(atk / def);
			if(odds > 4)
			{
				odds = 'X';
			} else if(odds == 0) {
				if(0.5 > atk / def)
				{
					odds = 'NE';
				} else {
					odds = '1-2';
				}
			} else {
				odds = odds+'-1';
			}

			document.getElementById(target+'_odds').value = odds;
		}
	}
}
