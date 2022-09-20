export const formatNumber = (num) => {
  // return num.toString().split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );
  return num ? num.toLocaleString() : 0;
};

export const formatKey = (key) => {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toUpperCase();
};
