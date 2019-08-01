const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
const formatDate = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	return [year, month, day].map(formatNumber).join('-');
}
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}
const getLanguageColor = language => {
	switch (language) {
		case "Java":
			return "#b07219";
		case "JavaScript":
			return "#f1e05a";
		case "Kotlin":
			return "#F18E33";
		case "Dart":
			return "#00B4AB";
		case "Objective-C":
			return "#438eff";
		case "Swift":
			return "#ffac45";
		case "Python":
			return "#3572A5";
		case "HTML":
			return "##438ef";
		case "CSS":
			return "#563d7c";
		case "C#":
			return "#178600";
		case "Vue":
			return "#2c3e50";
		case "PHP":
			return "#4F5D95";
		case "TypeScript":
			return "#2b7489";
		default:
			return "#F18E33";
	}
}

const friendNum = num => {
	if (num <= 1000) {
		return num;
	} else if (num > 1000 && num <= 100 * 1000) {
		return (num / 1000).toFixed(1) + "k";
	} else {
		return parseInt(num / 1000) + "k";
	}
}

module.exports = {
	formatTime: formatTime,
	formatDate: formatDate,
	getLanguageColor: getLanguageColor,
	friendNum: friendNum
}
