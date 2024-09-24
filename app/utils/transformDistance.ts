const transformDistance = (distance: number) => {
  const transformDistance = distance > 1000 ? (distance / 1000).toFixed(1) + 'k' : distance;
  return `${transformDistance}m`;
};

export default transformDistance;
