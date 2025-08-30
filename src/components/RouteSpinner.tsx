import { Spinner, type SpinnerProps } from '@chakra-ui/react';
import type { RefAttributes } from 'react';

export default function RouteSpinner(props: SpinnerProps & RefAttributes<HTMLDivElement>) {
  return <Spinner size="xl" position="absolute" left="50%" top="50%" transform="translate(-50%, -50%)" {...props} />;
}
