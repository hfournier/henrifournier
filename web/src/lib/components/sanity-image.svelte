<script lang="ts">
	import imageUrlBuilder from '@sanity/image-url';
	import type { CropMode, FitMode, Orientation } from '@sanity/image-url/lib/types/types';
	import { env } from '$env/dynamic/public';
	export let alt: string = null;
	export let css: string = null;
	export let options: {
		blur?: number;
		crop?: CropMode;
		dpr?: number;
		fit?: FitMode;
		flip?: 'both' | 'horizontal' | 'vertical';
		focalPoint?: { x: number; y: number };
		format?: 'auto' | 'jpg' | 'pjpg' | 'png' | 'webp';
		height?: number;
		invert?: boolean;
		orientation?: Orientation;
		pad?: number;
		quality?: number;
		rect?: { left: number; top: number; width: number; height: number };
		saturation?: -100;
		sharpen?: number;
		width?: number;
	} = {};
	export let src: { asset };

	const urlFor = (source) =>
		imageUrlBuilder({
			projectId: env.PUBLIC_SANITY_PROJECT_ID,
			dataset: env.PUBLIC_SANITY_DATASET
		}).image(source);

	let image = urlFor(src);

	if (!options.format || options.format === 'auto') {
		image = image.auto('format');
	} else {
		image = image.format(options.format);
	}

	if (options.height && options.width) {
		image = image.size(options.width, options.height);
	} else {
		if (options.height) {
			image = image.height(options.height);
		}
		if (options.width) {
			image = image.width(options.width);
		}
	}

	if (options.blur && options.blur >= 1 && options.blur <= 2000) {
		image = image.blur(options.blur);
	} else if (options.blur) {
		console.log('blur value is out of range. It must be between 1 and 2000, inclusive.');
	}

	if (options.crop) {
		image = image.crop(options.crop);
	}

	if (options.dpr && options.dpr >= 1 && options.dpr <= 3) {
		image = image.dpr(options.dpr);
	} else if (options.dpr) {
		console.log('dpr value is out of range. It must be between 1 and 3, inclusive.');
	}

	if (options.flip === 'both') {
		image = image.flipHorizontal().flipVertical();
	} else if (options.flip === 'horizontal') {
		image = image.flipHorizontal();
	} else if (options.flip === 'vertical') {
		image = image.flipVertical();
	}

	if (
		options.focalPoint &&
		options.focalPoint.x >= 0.0 &&
		options.focalPoint.x <= 1.0 &&
		options.focalPoint.y >= 0.0 &&
		options.focalPoint.y <= 1.0
	) {
		image = image.focalPoint(options.focalPoint.x, options.focalPoint.y);
	} else if (options.focalPoint) {
		console.log('focalPoint values are out of range. They must be between 0.0 and 1.0, inclusive.');
	}

	if (options.fit) {
		image = image.fit(options.fit);
	}

	if (options.invert) {
		image = image.invert(options.invert);
	}

	if (options.orientation) {
		image = image.orientation(options.orientation);
	}

	if (options.pad) {
		image = image.pad(options.pad);
	}

	if (options.quality && options.quality >= 0 && options.quality <= 100) {
		image = image.quality(options.quality);
	} else if (options.quality) {
		console.log('quality value is out of range. It must be between 0 and 100, inclusive.');
	}

	if (options.rect) {
		image = image.rect(
			options.rect.left,
			options.rect.top,
			options.rect.width,
			options.rect.height
		);
	}

	if (options.saturation) {
		image = image.saturation(options.saturation);
	}

	if (options.sharpen && options.sharpen >= 0 && options.sharpen <= 100) {
		image = image.sharpen(options.sharpen);
	} else if (options.sharpen) {
		console.log('sharpen value is out of range. It must be between 0 and 100, inclusive.');
	}
</script>

<img src={image.url()} class={css} alt="{alt || ' '}}" />
