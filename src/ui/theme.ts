import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  globalCss: {
    ':root': {
      colorPalette: 'blue',
      '--page-width': {
        base: '100%',
        md: '50rem',
      },
      '--page-padding': {
        base: '1.25rem',
        md: '0',
      },
    },
    main: {
      paddingTop: '12',
      width: 'var(--page-width)',
      paddingInline: 'var(--page-padding)',
      marginInline: 'auto',
    },
  },
});

export default createSystem(defaultConfig, config);
