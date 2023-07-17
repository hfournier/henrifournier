/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		'col-start-1',
		'col-start-3',
		'col-start-5',
		'col-start-7',
		'col-start-9',
		'col-start-11',
		'col-start-13',
		'col-start-15',
		'col-start-17',
		'col-start-19',
		'col-start-21',
		'col-start-23',
		'col-start-25',
		'col-start-27',
		'col-start-29',
		'col-start-31',
		'col-start-33',
		'row-start-1',
		'row-start-2',
		'row-start-3',
		'row-start-4',
		'row-start-5',
		'row-start-6',
		'row-start-7',
		'row-start-8'
	],
	darkMode: 'class',
	theme: {
		extend: {
			aspectRatio: {
				hexagon: '1.1547 / 1'
			},
			keyframes: {
				fadeIn: {
					to: {
						opacity: 1
					}
				},
				fadeOut: {
					to: {
						opacity: 0
					}
				},
				openGateLeft: {
					to: {
						transform: 'translateX(-60px)'
					}
				},
				openGateRight: {
					to: {
						transform: 'translateX(60px)'
					}
				},
				closeGate: {
					to: {
						transform: 'translateX(0)'
					}
				},
				expandTL: {
					'100%': {
						transform: 'translate(-128px, -128px)',
						opacity: 0
					}
				},
				expandTR: {
					'100%': {
						transform: 'translate(128px, -128px)',
						opacity: 0
					}
				},
				expandL: {
					'100%': {
						transform: 'translateX(calc(-50% + 16px))'
					}
				},
				expandR: {
					'100%': {
						transform: 'translateX(calc(50% - 16px))'
					}
				},
				expandBL: {
					'100%': {
						transform: 'translate(-128px, 128px)',
						opacity: 0
					}
				},
				expandBR: {
					'100%': {
						transform: 'translate(128px, 128px)',
						opacity: 0
					}
				}
			},
			colors: {
				primary: {
					50: '#FFF0E5',
					100: '#FFE1CC',
					200: '#FFC499',
					300: '#FFA666',
					400: '#FF8833',
					500: '#FF6A00',
					600: '#cc5500',
					700: '#994000',
					800: '#662B00',
					900: '#331500'
				},
				secondary: {
					50: '#E5F4FF',
					100: '#CCEAFF',
					200: '#99D5FF',
					300: '#66BFFF',
					400: '#33AAFF',
					500: '#0095FF',
					600: '#0077cc',
					700: '#005999',
					800: '#003C66',
					900: '#001E33'
				}
			},
			fontFamily: {
				baloo2: ['"Baloo 2"'],
				bubblegum: ['"Bubblegum Sans"']
			},
			gridColumnStart: {
				15: '15',
				17: '17',
				19: '19',
				21: '21',
				23: '23',
				25: '25',
				27: '27',
				29: '29',
				31: '31',
				33: '33'
			},
			gridRowStart: {
				8: '8'
			},
			content: {
				colon: '":"',
				comma: '"\\002C"',
				'left-angle': '"\\003C"',
				'left-curly': '"\\007B"',
				'left-square': '"\\005B"',
				'right-angle': '"\\232A"',
				'right-slash-angle': '"\\002F\\003E"',
				'right-curly': '"\\007D"',
				'right-square': '"\\005D"',
				'right-square-comma': '"\\005D\\002C"',
				hexagon: 'url("/images/hexagon.svg")'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};
