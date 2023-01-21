import { addDecorator } from '@storybook/react';
import { themeProvider, routerProvider, centered, storeProvider} from './decorators';
import { withInfo } from '@storybook/addon-info';

addDecorator(withInfo);
addDecorator(storeProvider);
addDecorator(routerProvider);
addDecorator(themeProvider);
addDecorator(centered);
