/** @format */

export const formatDate = (date) => {
	// console.log(date);
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
};
