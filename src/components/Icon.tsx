import { colors } from '@/tokens/colors';
import { IconType } from 'react-icons';

export const Icon = ({ icon: IconComponent }: { icon: IconType }) => {
  return <IconComponent size={30} color={colors.greyTwo} />;
};
