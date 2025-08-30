import type { RootState } from '@/app/store';
import Link from '@/ui/Link';
import { Card, Heading, SkeletonCircle, Stack, type CardRootProps } from '@chakra-ui/react';
import { lazy, Suspense, type RefAttributes } from 'react';
import { useSelector } from 'react-redux';

const UserMenu = lazy(() => import('./UserMenu'));

export default function Header(props: CardRootProps & RefAttributes<HTMLDivElement>) {
  const authenticated = useSelector((state: RootState) => !!state.auth.user);

  return (
    <Card.Root
      as="header"
      height="16"
      borderRadius="0"
      borderWidth="0 0 1px 0"
      position="sticky"
      top="0"
      zIndex="1"
      {...props}
    >
      <Card.Body
        flexDirection="row"
        alignItems="center"
        height="100%"
        width="var(--page-width)"
        paddingBlock="0"
        paddingInline="var(--page-padding)"
        marginInline="auto"
      >
        <Heading as="h1" size="2xl">
          Courses
        </Heading>
        <Stack as="nav" direction="row" marginLeft="auto" gap="8">
          <Link to="/">Courses</Link>
          {authenticated ? (
            <Suspense fallback={<SkeletonCircle size="10" />}>
              <UserMenu />
            </Suspense>
          ) : (
            <Link to="/auth">Log In</Link>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
