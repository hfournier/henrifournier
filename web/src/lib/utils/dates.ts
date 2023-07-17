const getNumberOfWeek = (date: Date): number => {
	const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
	const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
	return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const formatBlogDate = (date: string): string => {
	const today = new Date();
	const dateToFormat = new Date(date);

	if (dateToFormat.getFullYear() === today.getFullYear()) {
		if (dateToFormat.getMonth() === today.getMonth()) {
			if (getNumberOfWeek(dateToFormat) === getNumberOfWeek(today)) {
				if (dateToFormat.getDate() === today.getDate()) {
					const hours = Math.floor((today.getTime() - dateToFormat.getTime()) / 60 / 60 / 1000);
					const minutes = Math.floor(
						(today.getTime() - dateToFormat.getTime()) / 60 / 1000 - hours * 60
					);
					const hourText = hours < 2 ? 'hour' : 'hours';
					const minuteText = minutes < 2 ? 'minute' : 'minutes';
					if (hours < 1) {
						return `${minutes} minutes ago`;
					} else {
						return `${hours} ${hourText} and ${minutes} ${minuteText} ago`;
					}
				} else {
					const days = today.getDate() - dateToFormat.getDate();
					return days === 1 ? 'Yesterday' : `${days} days ago`;
				}
			} else {
				let suffix: string;
				switch (dateToFormat.getDate()) {
					case 1:
						suffix = 'st';
						break;

					case 2:
						suffix = 'nd';
						break;

					case 3:
						suffix = 'rd';
						break;

					default:
						suffix = 'th';
						break;
				}
				return `On the ${dateToFormat.toLocaleDateString('en-CA', {
					day: 'numeric'
				})}${suffix}`;
			}
		} else {
			return `On ${dateToFormat.toLocaleDateString('en-CA', {
				month: 'short',
				day: 'numeric'
			})}`;
		}
	} else {
		return `On ${dateToFormat.toLocaleDateString('en-CA', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		})}`;
	}
};
