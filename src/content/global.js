export const initialSorting = {
	column: 'name',
	direction: 'asc',
};

export const cellHeaders = {
	characters: [
		{label: 'Name', column: 'name'},
		{label: 'Alignment', column: 'alignment'},
		{label: 'Race', column: 'race'}
	],
	weapons: [
		{label: 'Name', column: 'name'},
		{label: 'Proficiency', column: 'proficiency'},
		{label: 'Type', column: 'type'},
		{label: 'Dmg', column: 'damage'},
		{label: 'Dmg Type', column: 'damageType'},
		{label: 'Critical', column: 'critical'},
		{label: 'Range', column: 'range'}
	],
	classes: [
		{label: 'Name', column: 'name'},
		{label: 'HD', column: 'hitDie'},
		{label: 'BAB', column: 'baseAttackBonus'},
		{label: 'Spells?', column: 'spellCasting'},
		{label: 'Fort', column: 'saves.Fortitude'},
		{label: 'Ref', column: 'saves.Reflex'},
		{label: 'Will', column: 'saves.Will'},
		{label: 'SP', column: 'skillPoints.additionalLevels'}
	],
	races: [
		{label: 'Name', column: 'name'},
		{label: 'Ability Bonuses', column: 'ability_bonuses'},
		{label: 'Size', column: 'size'},
		{label: 'Speed', column: 'speed'},
		{label: 'Languages', column: 'traits.languages.automatic'},
		{label: 'Traits', column: 'traits.abilities'}
	],
	templates: [
		{label: 'Name', column: 'name'},
		{label: 'Description', column: 'description'},
		{label: 'Level Adjustment', column: 'level_adjustment'},
		{label: 'Natural Armor', column: 'natural_armor'}
	]
};

export const globalContent = {
	home: {
		title: 'Welcome to DnD Assistant',
		description: [
			`This is a platform designed to help players quickly access and lookup Dungeons & Dragons information.`,
			`Whether you need details about weapons, classes, or other game elements, we've got you covered!`
		]
	},
	characters: {
		label: {
			singular: 'Character',
			plural: 'Characters'
		},
		id: 'character',
		title: 'Characters List',
		name: '/details-character',
		addButton: {
			route: '/add-character',
			label: 'Add New Character'
		}
	},
	weapons: {
		label: {
			singular: 'Weapon',
			plural: 'Weapons'
		},
		id: 'weapon',
		title: 'Weapons List',
		name: '/details-weapon',
		addButton: {
			route: '/add-weapon',
			label: 'Add New Weapon'
		}
	},
	classes: {
		label: {
			singular: 'Class',
			plural: 'Classes'
		},
		id: 'class',
		title: 'Classes List',
		name: '/details-class',
		addButton: {
			route: '/add-class',
			label: 'Add New Class'
		}
	},
	races: {
		label: {
			singular: 'Race',
			plural: 'Races'
		},
		id: 'race',
		title: 'Races List',
		name: '/details-race',
		addButton: {
			route: '/add-race',
			label: 'Add New Race'
		}
	},
	templates: {
		label: {
			singular: 'Template',
			plural: 'Templates'
		},
		id: 'template',
		title: 'Templates List',
		name: '/details-template',
		addButton: {
			route: '/add-template',
			label: 'Add New Template'
		}
	}
}

export const damageOptions = [
  '1d2', '1d3', '1d4', '1d6', '1d8', '1d10', '1d12', '2d4', '2d6', '2d8', '2d10', '2d12',
  '3d4', '3d6', '3d8', '3d10', '3d12', '4d4', '4d6', '4d8', '4d10', '4d12', '5d4', '5d6',
  '5d8', '5d10', '6d4', '6d6', '6d8', '6d10', '7d4', '7d6', '7d8', '8d4', '8d6'
];

export const damageTypes = [
  'Bludgeoning', 'Piercing', 'Slashing',
  'Bludgeoning and Piercing', 'Bludgeoning and Slashing', 'Piercing and Slashing',
  'Bludgeoning or Piercing', 'Bludgeoning or Slashing', 'Piercing or Slashing',
  'Bludgeoning, Piercing, and Slashing',
];