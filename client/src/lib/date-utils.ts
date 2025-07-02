export const format = (date: Date, formatStr: string): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const shortMonths = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  
  switch (formatStr) {
    case 'PPP':
      return `${months[month]} ${day}, ${year}`;
    case 'MMM d':
      return `${shortMonths[month]} ${day}`;
    case 'MMM d, yyyy':
      return `${shortMonths[month]} ${day}, ${year}`;
    default:
      return date.toLocaleDateString();
  }
};