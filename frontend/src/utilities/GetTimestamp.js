// ------------ '19 Nov 2023 at 5:45PM' -------------

const formatFullDateString = (dateString) => {
    const dateObject = new Date(dateString)

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return dateObject.toLocaleString('en-GB', options).replace(',', ' at')
}


// ------------ 'X seconds ago / X minutes ago / X hours ago / X days ago / fullDateTime --------------

const convertRelativeDateTimeString = (postedDateTimeString) => {
    const postedDateTime = new Date(postedDateTimeString)
    
    // get current dateTime object
    const currentDateTime = new Date();

    // get time difference in seconds
    const timeDifferenceInSeconds = (currentDateTime.getTime() - postedDateTime.getTime()) / 1000;
    const seconds = timeDifferenceInSeconds; // shorter variable name for relative timestamp use below

    // show the relative timestamp
    if (seconds < 60) { 
      // if under 1 min, show seconds ago
        return `${Math.floor(seconds)} seconds ago`

    } else if (seconds < 3600) {
      // if under 60 min, show minutes ago
        return ((Math.floor(seconds/60) === 1) ? '1 minute ago' : `${Math.floor(seconds / 60)} minutes ago`);

    } else if (seconds < 86400) {
      // if under 24 hours, show hours ago
        return ((Math.floor(seconds/3600) === 1) ? '1 hour ago' : `${Math.floor(seconds / 3600)} hours ago`);

    } else if (seconds < 259200) {
      // if less than 3 days ago, show days ago
        return ((Math.floor(seconds/86400) === 1) ? '1 day ago' : `${Math.floor(seconds / 86400)} days ago`);

    } else {
      // else show fullDateTimeString
        return formatFullDateString(postedDateTime);
    }
}

export {formatFullDateString, convertRelativeDateTimeString}