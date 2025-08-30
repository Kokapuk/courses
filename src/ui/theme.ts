import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    ':root': {
      colorPalette: 'blue',
      scrollbarColor: 'var(--chakra-colors-bg-emphasized) var(--chakra-colors-bg)',
      '--page-width': {
        base: '100%',
        lg: '50rem',
      },
      '--page-padding': {
        base: '1.25rem',
        lg: '0',
      },
    },
    main: {
      paddingBlock: '12',
      width: 'var(--page-width)',
      paddingInline: 'var(--page-padding)',
      marginInline: 'auto',
    },
  },
});

export default createSystem(defaultConfig, config);
