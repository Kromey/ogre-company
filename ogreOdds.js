var ogreOdds = {
	init : function(target) {
		var attack = newElm('input');
		attack.id = target+'_atk';
		attack.setAttribute('type', 'text');
		attack.onchange = function(){ogreOdds.calculateOdds(target);};
		attack.onfocus = function(){this.select();};
		attack.onmouseup = function(){return false;};

		var defense = newElm('input');
		defense.id = target+'_def';
		defense.setAttribute('type', 'text');
		defense.onchange = function(){ogreOdds.calculateOdds(target);};
		defense.onfocus = function(){this.select();};
		defense.onmouseup = function(){return false;};

		var odds = newElm('input');
		odds.id = target+'_odds';
		odds.setAttribute('type', 'text');
		odds.onfocus = function(){this.blur();attack.focus();};

		var obj = getId(target);
		obj.appendChild(textNode('Attack: '));
		obj.appendChild(attack);
		obj.appendChild(newElm('br'));
		obj.appendChild(textNode('Defense: '));
		obj.appendChild(defense);
		obj.appendChild(newElm('br'));
		obj.appendChild(textNode('Odds: '));
		obj.appendChild(odds);
	},

	calculateOdds : function(target) {
		var atk = getId(target+'_atk').value;
		var def = getId(target+'_def').value;

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

			getId(target+'_odds').value = odds;
		}
	}
}
