const SCHOOL = 'GIBZ Zug'
const CLASS = 'INFAWU2'

const WebUntisLib = require('webuntis');

const untis = new WebUntisLib.WebUntisAnonymousAuth(SCHOOL, 'mese.webuntis.com');

untis
    .login()
    .then(() => {
        return untis.getClasses();
    })
    .then((classes) => {
        // Get timetable for the first class
	const ourClass = classes.filter(classElement => classElement.name === CLASS)[0]
        return untis.getTimetableForToday(ourClass.id, WebUntisLib.TYPES.CLASS);
	//return untis.getTimetableForWeek(new Date(), ourClass.id, WebUntisLib.TYPES.CLASS, 1)
    })
    .then((timetable) => {
	let output = `## ${timetable[0].kl[0].name} ##\n------------------------------------------------------\n`
	for (const lesson of timetable) {
		output += `|  ${lesson.startTime}\t|\n|-------|\t${lesson.su[0].name}\t${lesson.te[0].longname}\t${lesson.ro[0].name}\n|  ${lesson.endTime}\t|\n`
		output += "------------------------------------------------------\n"
	}
	console.log(output)
    });
