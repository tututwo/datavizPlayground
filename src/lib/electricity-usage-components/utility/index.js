import { format } from 'd3';
// const formatDouble = d3.format("02");
export const formatTimecode = (d) => {
  const minutes = Math.floor(d / 60000);
  const seconds = Math.floor((d / 1000) % 60);
  return `${format('02')(minutes)}:${format('02')(seconds)}`;
};
export const formatSeconds = function(d) {
  return Math.round(d / 1000) + " sec";
}