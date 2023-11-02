import { Clock } from '../app/features/clock';

const NewTab = () => {
  document.body.className = 'w-full h-full';
  return <Clock />;
};

export default NewTab;
