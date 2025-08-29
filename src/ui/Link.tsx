import { Link as ChakraLink } from '@chakra-ui/react';
import type { RefAttributes } from 'react';
import type { LinkProps } from 'react-router';
import { Link as RouterLink } from 'react-router';

export default function Link(props: LinkProps & RefAttributes<HTMLAnchorElement>) {
  return <ChakraLink as={RouterLink} {...props} />;
}
