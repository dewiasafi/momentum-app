export const convertDateFormat = (dateStr: string): string => {
     const [year, month, day] = dateStr.split('-');
     return `${day}-${month}-${year}`;
};

export const formatViewDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };