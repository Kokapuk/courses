import { setAuthenticatedAs } from '@/app/features/auth/authSlice';
import { resetPurchasedCourses, resetSavedVideosPositions } from '@/app/features/courses/coursesSlice';
import type { RootState } from '@/app/store';
import { Avatar, Menu, Portal, type MenuTriggerProps } from '@chakra-ui/react';
import type { RefAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UserMenu(props: MenuTriggerProps & RefAttributes<HTMLButtonElement>) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    throw Error('Not authenticated');
  }

  const logout = () => {
    dispatch(setAuthenticatedAs(null));
    dispatch(resetPurchasedCourses());
    dispatch(resetSavedVideosPositions());
  };

  const handleSelect = (value: string) => {
    switch (value) {
      case 'logout':
        logout();
        break;
    }
  };

  return (
    <Menu.Root positioning={{ placement: 'right-end' }} unmountOnExit onSelect={(e) => handleSelect(e.value)}>
      <Menu.Trigger rounded="full" focusRing="outside" cursor="pointer" {...props}>
        <Avatar.Root>
          <Avatar.Fallback name={user.email} />
        </Avatar.Root>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="logout" color="fg.error" _hover={{ bg: 'bg.error' }}>
              Logout
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
