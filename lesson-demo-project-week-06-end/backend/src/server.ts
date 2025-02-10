import app from './app';
import { config } from './config/env';

app.listen(config.APP_PORT, (): void => {
  // eslint-disable-next-line no-undef
  console.log(`Server running on port ${config.APP_PORT}`);
});