const attributesInitial = {
	strength: 0,
	dexterity: 0,
	constitution: 0,
	intelligence: 0,
	wisdom: 0,
	charisma: 0,
};

const characterInitial = {
	name: "",
	race: "",
	classes: [
		{
			class: "",
			level: "",
		},
	],
	alignment: "",
	attributes: {
		strength: 0,
		dexterity: 0,
		constitution: 0,
		intelligence: 0,
		wisdom: 0,
		charisma: 0,
	},
	hit_points: {
		current: 0,
		max: 0,
	},
	skills: {},
	feats: [
		{
			name: "",
			givenBy: "",
			source: "",
			Rules: "",
		},
	],
	inventory: [
		{
			name: "",
			type: "",
			damage: "",
			critical: "",
			armor_class: 0,
		},
	],
};
