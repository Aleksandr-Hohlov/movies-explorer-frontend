export const movieDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const min = duration % 60;
  return hours ? `${hours}ч ${min}м` : `${min}м`;
};
