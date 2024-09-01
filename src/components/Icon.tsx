import { colors } from '@/tokens/colors';
import { IconType } from 'react-icons';

export const Icon = ({ icon: IconComponent, color }: { icon: IconType; color: string }) => {
  return <IconComponent size={30} color={color} />;
};
