import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"

import icon from "astro-icon"

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		icon({
			include: {
				devicon: [
					"javascript",
					"netlify",
					"alpinejs",
					"angular",
					"svelte",
					"astro",
					"typescript",
					"bootstrap",
					"nodejs",
					"tailwindcss",
					"github",
					"mongodb",
					"nestjs"
				],
				"fa6-brands": ["github", "linkedin"],
				logos: ["stripe"],
				mdi: ["close", "email", "phone"]
			}
		})
	]
})
