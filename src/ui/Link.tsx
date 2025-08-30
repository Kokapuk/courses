import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import type { RefAttributes } from 'react';
import type { LinkProps as RouterLinkProps } from 'react-router';
import { Link as RouterLink } from 'react-router';

export type LinkProps = ChakraLinkProps & Pick<RouterLinkProps, 'to'>;

export default function Link(props: LinkProps & RefAttributes<HTMLAnchorElement>) {
  return <ChakraLink as={RouterLink} {...props} />;
}
