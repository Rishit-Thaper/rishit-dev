import { IconType } from 'react-icons';

export const Icon = ({ icon: IconComponent, color, size }: { icon: IconType; color: string; size?: number }) => {
  return <IconComponent size={size ?? 30} color={color} />;
};
